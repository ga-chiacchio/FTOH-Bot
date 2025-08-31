import { gameMode, GameMode } from "../../changeGameState/changeGameModes";
import { qualiTime } from "../../changeGameState/qualy/qualiMode";
import { showPlayerQualiPosition } from "../../changeGameState/qualy/showPositionQualy";
import { playerList } from "../../changePlayerState/playerList";
import { sendChatMessage, sendSuccessMessage } from "../../chat/chat";
import { MESSAGES } from "../../chat/messages";
import { serialize } from "../../utils";
import { laps } from "../laps";
import { lapPositions } from "./handleLapChange";
import { handleRaceFinish } from "./handleRaceFinish";
import { notifySpectatorsCurrentLap } from "./notifyCurrentLap";

export function processLapAndCheckSessionEnd(
  pad: { p: PlayerObject; disc: DiscPropertiesObject },
  room: RoomObject,
  lapTime: number,
  playerAndDiscs: { p: PlayerObject; disc: DiscPropertiesObject }[]
) {
  const p = pad.p;
  const playerData = playerList[p.id];
  const currentLap = playerData.currentLap;

  if (gameMode !== GameMode.QUALY) {
    const lapIndex = currentLap - 2;
    const position = lapPositions[lapIndex].push({
      id: p.id,
      name: p.name,
      currentLap: currentLap,
      time: lapTime,
    });

    if (gameMode !== GameMode.TRAINING) {
      if (currentLap <= laps) {
        sendChatMessage(room, MESSAGES.CURRENT_LAP(currentLap, laps), p.id);

        if (position > 1) {
          const prevPlayer = lapPositions[lapIndex][position - 2];
          const distance =
            prevPlayer.currentLap > currentLap
              ? prevPlayer.currentLap - currentLap
              : serialize(playerList[prevPlayer.id].lapTime);

          sendChatMessage(
            room,
            MESSAGES.POSITION_AND_DISTANCE_AHEAD(
              position,
              distance,
              typeof distance === "number" ? "laps" : "seconds"
            ),
            p.id
          );
        } else {
          notifySpectatorsCurrentLap(room, currentLap, playerAndDiscs);
        }
      } else {
        handleRaceFinish(p, room, lapTime, position === 1);
      }
    }
  } else {
    showPlayerQualiPosition(room, p.id);

    if (room.getScores().time >= qualiTime * 60) {
      sendSuccessMessage(room, MESSAGES.FINISH_QUALI(), p.id);
      room.setPlayerTeam(p.id, 0);
    }
  }
}
