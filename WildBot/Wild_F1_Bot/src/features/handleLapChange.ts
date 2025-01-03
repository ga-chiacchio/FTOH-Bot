import {playerList} from "./playerList";
import {CHECK_IF_TROLLING, checkIfTrolling, getRunningPlayers, inHitbox} from "./utils";
import {CIRCUITS, currentMapIndex} from "./maps";
import {qualiMode, qualiTime, updatePlayerTime} from "./qualiMode";
import {sendBestTimeRace, sendChatMessage, sendErrorMessage, sendSuccessMessage, sendWorseTime} from "./chat";
import {MESSAGES} from "./messages";
import {laps} from "./laps";
import {drsOn, enableDRS} from "./handleDRSZone";
import { rainIntensity } from "./rain";
import { ACTUAL_CIRCUIT } from "../room";
import { Teams } from "./teams";
import { bestTimes, getAbbreviatedTrackName, updateBestTime } from "../circuits/bestTimes";
import { LEAGUE_MODE } from "./leagueMode";


export const lapPositions: {
    id: number,
    name: string,
    currentLap: number,
    time: number
}[][] = []
for (let i = 0; i < laps; i++) {
    lapPositions[i] = []
}

export const finishList: {
    name: string,
    pits: number,
    time: number,
    fullTime: number
}[] = []

function serialize(number: number) {
    return parseFloat(number.toFixed(3))
}

function ifInLapChangeZone(player: { p: PlayerObject, disc: DiscPropertiesObject }, room: RoomObject) {
    return room.getScores().time > 0 && inHitbox(player, CIRCUITS[currentMapIndex].info.finishLine.bounds)
}


export function checkPlayerLaps(playersAndDiscs: { p: PlayerObject, disc: DiscPropertiesObject }[], room: RoomObject) {
    const players = getRunningPlayers(playersAndDiscs)

    players.forEach(pad => {
        const p = pad.p
        playerList[p.id].lapTime += 1 / 60

        if (!ifInLapChangeZone(pad, room) && playerList[p.id].lapChanged) {
            // EXITING CHANGE ZONE
            playerList[p.id].lapChanged = false
        }
        if (!ifInLapChangeZone(pad, room)) {
            // NOT IN CHANGE ZONE
            return;
        }

        if (playerList[p.id].lapChanged) {
            // ALREADY IN CHANGE ZONE
            return;
        }

        // ENTERED CHANGE ZONE

        if (CHECK_IF_TROLLING && checkIfTrolling(pad, CIRCUITS[currentMapIndex].info.finishLine.passingDirection)) {
            sendErrorMessage(room, MESSAGES.TROLLING_DETECTED(), p.id)
            room.setPlayerTeam(p.id, 0)
            return;
        }

        const currentLap = ++playerList[p.id].currentLap
        playerList[p.id].lapChanged = true

        if (currentLap > 1) {
            if (!drsOn && currentLap == 2) enableDRS(room);
            const lapTime = serialize(playerList[p.id].lapTime)
            let bestTimeP = serialize(playerList[p.id].bestTime)

            const playersWithEveryoneLaps = playersAndDiscs.filter(pla => {
                const player = playerList[pla.p?.id];
                return player && player.everyoneLaps;
            });

            let correctRainIntensity = Math.round(rainIntensity)
            let roundWear = 100 - Math.round(playerList[p.id].wear)
            const circuitBestTime: number | string = bestTimes[ACTUAL_CIRCUIT.info.name]?.[0] || 999.999;

            const abbreviatedTrackName = getAbbreviatedTrackName(ACTUAL_CIRCUIT.info.name);

            if (abbreviatedTrackName) {
                const circuitBestTime: number | string = bestTimes[abbreviatedTrackName]?.[0] || 999.999;

                if (typeof circuitBestTime === 'number' && lapTime < circuitBestTime) {
                    updateBestTime(ACTUAL_CIRCUIT.info.name, lapTime, p.name);
                    playerList[p.id].bestTime = lapTime;
                    sendBestTimeRace(room, MESSAGES.TRACK_RECORD(p.name, lapTime), undefined);
                    updatePlayerTime(p.name, lapTime)
                } else if (lapTime < bestTimeP || bestTimeP === undefined) {
                    playerList[p.id].bestTime = lapTime;
                    playersWithEveryoneLaps.forEach(pla => {
                        sendSuccessMessage(room, MESSAGES.LAP_TIME_FROM(lapTime, p.name), pla.p.id);
                    });
                    sendSuccessMessage(room, MESSAGES.LAP_TIME(lapTime), p.id);
                    updatePlayerTime(p.name, lapTime)
                } else {
                    sendWorseTime(room, MESSAGES.WORSE_TIME(lapTime, serialize(lapTime-bestTimeP)), p.id);
                    playersWithEveryoneLaps.forEach(pla => {
                        sendSuccessMessage(room, MESSAGES.LAP_TIME_FROM(lapTime, p.name), pla.p.id);
                    });
                }
            } else {
                console.log(`Circuito ${ACTUAL_CIRCUIT.info.name} não encontrado no mapeamento de nomes.`);
            }
            
            if(qualiMode){
                playerList[p.id].kers = 100
            }
            sendChatMessage(room, MESSAGES.RAIN_INTENSITY_LAP(correctRainIntensity), pad.p.id)
            sendChatMessage(room, MESSAGES.TYRE_WEAR_LAP(roundWear), p.id)

            if (!qualiMode) {
                if (currentLap <= laps) {
                    const lapIndex = currentLap - 2
                    const position = lapPositions[lapIndex].push({
                        id: p.id,
                        name: p.name,
                        currentLap: currentLap,
                        time: lapTime
                    })
                    sendChatMessage(room, MESSAGES.CURRENT_LAP(currentLap, laps), p.id)

                    if (position > 1) {
                        const prevPlayerIndex = position - 2
                        const prevPlayer = lapPositions[lapIndex][prevPlayerIndex]

                        if (prevPlayer.currentLap > currentLap) {
                            const distance = prevPlayer.currentLap - currentLap
                            sendChatMessage(room, MESSAGES.POSITION_AND_DISTANCE_AHEAD(position, distance, "laps"), p.id)
                        } else {
                            const distance = serialize(playerList[prevPlayer.id].lapTime)
                            sendChatMessage(room, MESSAGES.POSITION_AND_DISTANCE_AHEAD(position, distance, "seconds"), p.id)
                        }
                    } else {    
                        const playersOnSpec = playersAndDiscs.filter(pla => pla.p.team !== Teams.RUNNERS)
                        playersOnSpec.forEach(pla => {
                            sendChatMessage(room, MESSAGES.CURRENT_LAP(currentLap, laps), pla.p.id)
                        });
                    }
                } else {
                    const fullTime = lapPositions.reduce((acc, curr) => {
                        const time = curr.find(c => c.id == p.id)?.time ?? 0
                        return acc + time
                    }, 0) + lapTime
                    finishList.push({
                        name: p.name,
                        pits: playerList[p.id].pits,
                        time: playerList[p.id].bestTime,
                        fullTime: fullTime
                    })
                    sendSuccessMessage(room, MESSAGES.FINISH_RACE(), p.id)
                    room.setPlayerTeam(p.id, 0)
                    return
                }
            } else {
                const qualiTimeLimit = qualiTime * 60 ;
                if (room.getScores().time >= qualiTimeLimit) {
                    sendSuccessMessage(room, MESSAGES.FINISH_QUALI(), p.id);
                    room.setPlayerTeam(p.id, 0);
                    return;
                }
                
            }
            
        }

        playerList[p.id].lapTime = 0
    })
}
