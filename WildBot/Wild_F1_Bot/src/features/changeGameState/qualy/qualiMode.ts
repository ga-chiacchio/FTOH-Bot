import { sendErrorMessage, sendSuccessMessage } from "../../chat/chat";
import { MESSAGES } from "../../chat/messages";
import { LEAGUE_MODE } from "../../hostLeague/leagueMode";
import { GameMode, gameMode } from "../changeGameModes";

export let qualiTime = 1;
export let raceTime = LEAGUE_MODE ? 0 : 7;

export function setQualiTime(
  player: PlayerObject,
  time: number,
  room: RoomObject
) {
  if (gameMode !== GameMode.QUALY) {
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
