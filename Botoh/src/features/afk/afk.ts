import { afkKickTime, afkAlertTime } from "../../../roomconfig.json";
import {
  GameMode,
  gameMode,
  GeneralGameMode,
  generalGameMode,
} from "../changeGameState/changeGameModes";
import { gameState } from "../changeGameState/gameState";
import { Teams } from "../changeGameState/teams";
import { playerList } from "../changePlayerState/playerList";
import { sendAlertMessage } from "../chat/chat";
import { MESSAGES } from "../chat/messages";
import { handleVSCCommand } from "../commands/flagsAndVSC/handleVSCCommand";
import { presentationLap } from "../commands/gameState/handlePresentationLapCommand";
import { LEAGUE_MODE } from "../hostLeague/leagueMode";
import { vsc } from "../speed/handleSpeed";

const activities: { [key: number]: number } = {};
export function afkKick(room: RoomObject) {
  const players = room.getPlayerList();
  const afkKickTimeMilisseconds = afkKickTime * 1000;
  const afkAlertTimeMilliseconds = afkAlertTime * 1000;

  for (let id in activities) {
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      const playerId = player.id;
      const playerPropierties = playerList[playerId];

      if (playerPropierties && playerPropierties.canLeavePitLane === true) {
        continue;
      }

      const afkDuration = Date.now() - activities[playerId];

      if (
        room.getScores() != null &&
        room.getScores().time > 0 &&
        gameState === "running" &&
        gameMode !== GameMode.WAITING &&
        gameMode !== GameMode.TRAINING &&
        generalGameMode !== GeneralGameMode.GENERAL_QUALY &&
        player.team === Teams.RUNNERS
      ) {
        if (afkDuration > afkKickTimeMilisseconds) {
          if (LEAGUE_MODE) {
            if (!vsc && !presentationLap) {
              handleVSCCommand(undefined, undefined, room);
            } else {
              updatePlayerActivity(player);
            }
          } else {
            room.kickPlayer(playerId, "AFK", false);
          }
        } else if (
          afkDuration > afkAlertTimeMilliseconds &&
          !playerPropierties.afkAlert
        ) {
          sendAlertMessage(room, MESSAGES.AFK_MESSAGE(), playerId);
          playerPropierties.afkAlert = true;
        }
      }
    }
  }
}

export function updatePlayerActivity(player: PlayerObject) {
  activities[player.id] = Date.now();
  const playerPropierties = playerList[player.id];
  if (playerPropierties) {
    playerPropierties.afkAlert = false;
  }
}
