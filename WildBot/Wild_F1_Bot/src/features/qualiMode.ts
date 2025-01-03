import {DEFAULT_LAPS, laps} from "./laps";
import {
    MAX_PLAYER_NAME,
    sendChatMessage,
    sendErrorMessage,
    sendNonLocalizedSmallChatMessage,
    sendSuccessMessage
} from "./chat";
import {MESSAGES} from "./messages";
import {playerList} from "./playerList";
export let qualiMode = false;
export let qualiTime = 2;

let arrayPlayers:  { name: string, time: number }[] = []


export function updatePlayerTime(name: string, time: number) {
    const existingPlayer = arrayPlayers.find(player => player.name.toLowerCase() === name.toLowerCase());
    
    if (existingPlayer) {
        existingPlayer.time = time;
    } else {
        arrayPlayers.push({ name, time });
    }
}

export function clearPlayers() {
    arrayPlayers = [];
}



export function setQualiTime(player: PlayerObject, time: number, room: RoomObject) {
    if (!qualiMode) {
        sendErrorMessage(room, MESSAGES.NOT_IN_QUALI(), player.id);
        return false;
    }

    if (isNaN(time) || time < 0) {
        sendErrorMessage(room, MESSAGES.INVALID_TIME(), player.id);
        return false;
    }

    let msg;
    if (time === 0) {
        qualiTime = Number.MAX_VALUE;
        msg = MESSAGES.INFINITE_QUALI();
    } else {
        qualiTime = time;
        msg = MESSAGES.QUALI_TIME(qualiTime);
    }

    room.setTimeLimit(qualiTime);
    sendSuccessMessage(room, msg);
}

export function changeQuali(newValue: boolean, room: RoomObject) {
    if (newValue) {
        qualiMode = true;
        room.setTimeLimit(qualiTime);
        sendSuccessMessage(room, MESSAGES.TIME_TO_QUALY());
        return;
    }

    qualiMode = false;
    room.setTimeLimit(0);
    sendSuccessMessage(room, MESSAGES.TIME_TO_RACE());
}

export function getPlayersOrderedByQualiTime(room: RoomObject) {

    return arrayPlayers.sort((a, b) => {
        if (a.time < b.time) return -1;
        if (a.time > b.time) return 1;
        return 0;
    });
}

export function printAllTimes(room: RoomObject, toPlayerID?: number) {
    if (!qualiMode) {
        sendErrorMessage(room, MESSAGES.TIMES_IN_RACE(), toPlayerID);
        return;
    }

    let orderedList = getPlayersOrderedByQualiTime(room);
    

    let i = 1;

    sendNonLocalizedSmallChatMessage(room, ` P -       Name       | Best Lap`, toPlayerID);
    orderedList.forEach(p => {
        if (p.time !== undefined) {
            const position = i.toString().padStart(2, '0');

            const spaces = (MAX_PLAYER_NAME - p.name.length) / 2.0;
            const leftSpacesLength = Math.ceil(spaces);
            const rightSpacesLength = Math.trunc(spaces);

            const leftSpaces = ' '.repeat(leftSpacesLength);
            const rightSpaces = ' '.repeat(rightSpacesLength);

            
            const displayedTime = p.time === 1.7976931348623157e+308 ? 'N/A' : p.time.toFixed(3);

            sendNonLocalizedSmallChatMessage(room,
                `${position} - ${leftSpaces}${p.name}${rightSpaces} | ${displayedTime}`,
                toPlayerID
            );
            i++;
        }
    });

    if (i === 1) {
        sendChatMessage(room, MESSAGES.NO_TIMES(), toPlayerID);
    }
}

export function reorderPlayersInRoom(room: RoomObject) {
    const orderedPlayers = getPlayersOrderedByQualiTime(room);
    console.log("orderedPlayers", orderedPlayers);
    

    const playerListInRoom = room.getPlayerList();
    console.log("playerListInRoom", playerListInRoom);

    const validPlayers = orderedPlayers.filter(player => {
        const playerObj = playerListInRoom.find(p => p.name === player.name);
        return playerObj && playerObj.id;
    });
    console.log("validPlayers", validPlayers);

    const playerIds = validPlayers.map(p => {
        const playerObj = playerListInRoom.find(pObj => pObj.name === p.name);
        return playerObj?.id;
    }).filter(id => id !== undefined);
    console.log("playerIds", playerIds);

    if (playerIds.length > 0) {
        room.reorderPlayers(playerIds, true);
    }
}

