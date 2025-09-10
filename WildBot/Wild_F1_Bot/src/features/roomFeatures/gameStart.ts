import { handleGameStateChange } from "../changeGameState/gameState";
import { laps } from "../zones/laps";
import { resetPlayer } from "../changePlayerState/players";
import { resetAllRainEvents } from "../rain/rain";
import { positionList } from "../changeGameState/race/positionList";
import { finishList, lapPositions } from "../zones/laps/handleLapChange";
import { log } from "../discord/logger";
import { updatePlayerActivity } from "../afk/afk";
import { setCameraAuto } from "../camera/cameraFollow";
import { LEAGUE_MODE } from "../hostLeague/leagueMode";
import { checkRunningPlayers } from "../changeGameState/publicGameFlow/startStopGameFlow";
import { GameMode, gameMode } from "../changeGameState/changeGameModes";
import { handleRRAllCommand } from "../commands/playerState/handleRRCommand";
import { resetBestPit } from "../tires&pits/trackBestPit";
import { resetBestLap } from "../zones/laps/trackBestLap";

export function GameStart(room: RoomObject) {
  room.onGameStart = function (byPlayer) {
    byPlayer == null
      ? log(`Game started`)
      : log(`Game started by ${byPlayer.name}`);
    handleGameStateChange("running", room);

    if (gameMode !== GameMode.TRAINING) {
      room.startRecording();
    }
    resetBestLap();
    resetBestPit();

    resetAllRainEvents();
    setCameraAuto();
    room.getPlayerList().forEach((p) => {
      resetPlayer(p, room, p.id, true);
      updatePlayerActivity(p);
    });
    finishList.splice(0, finishList.length);
    positionList.splice(0, positionList.length);
    for (let i = 0; i < laps; i++) {
      lapPositions[i] = [];
    }
    if (!LEAGUE_MODE) {
      checkRunningPlayers(room);
      // if (gameMode === GameMode.QUALY) {
      //   handleRRAllCommand(room);
      // }
    }
  };
}
