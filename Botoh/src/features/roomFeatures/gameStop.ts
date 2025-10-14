import { sendChatMessage } from "../chat/chat";
import { handleGameStateChange } from "../changeGameState/gameState";
import { LEAGUE_MODE } from "../hostLeague/leagueMode";
import { MESSAGES } from "../chat/messages";
import { resetPlayers } from "../changePlayerState/players";

// import { rainEnabled, resetAllRainEvents, setRainChances } from "../rain/rain";
import {
  changeGameStoppedNaturally,
  gameStopedNaturally,
} from "../changeGameState/gameStopeedNaturally";
import { movePlayersToCorrectSide } from "../movePlayers/movePlayerToCorrectSide";
import {
  gameMode,
  GameMode,
  changeGameMode,
  generalGameMode,
  GeneralGameMode,
} from "../changeGameState/changeGameModes";
import {
  clearPlayers,
  getPlayersOrderedByQualiTime,
} from "../changeGameState/qualy/playerTime";
import { printAllTimes } from "../changeGameState/qualy/printAllTimes";
import { reorderPlayersInRoomRace } from "../movePlayers/reorderPlayersInRoom";
import { getTimestamp, timerController } from "../utils";
import { printAllPositions } from "../changeGameState/race/printAllPositions";
import { log } from "../discord/logger";
import { changeLaps } from "../commands/adminThings/handleChangeLaps";
import { handleRREnabledCommand } from "../commands/adminThings/handleRREnabledCommand";
import { handleFlagCommand } from "../commands/flagsAndVSC/handleFlagCommand";
import { clearPlayerBuffAndNerfLists } from "../commands/adjustThings/handleNerfListCommand";
import PublicGameFlow from "../changeGameState/publicGameFlow/publicGameFLow";
import { sendDiscordFile, sendDiscordReplay } from "../discord/discord";
import {
  sendQualiResultsToDiscord,
  sendRaceResultsToDiscord,
} from "../discord/logResults";
import { gameStarted, setGameStarted } from "./gameTick";
import { positionList } from "../changeGameState/race/positionList";
import { sendDiscordMessage } from "../discord/sendDiscordLink";
import { clearPlayersLeftInfo } from "../comeBackRace.ts/comeBackToRaceFunctions";

export function GameStop(room: RoomObject) {
  room.onGameStop = function (byPlayer) {
    if (byPlayer == null) {
      log(`Game stopped`);
    } else {
      changeGameStoppedNaturally(false);
      log(`Game stopped by ${byPlayer.name}`);
    }

    handleGameStateChange(null, room);
    if (gameMode !== GameMode.TRAINING) {
      // const replay = room.stopRecording();
      // console.log(replay?.length, replay);
      // if (replay && gameStarted) {
      //   sendDiscordReplay(replay);
      // } else {
      //   log("Replay discarted");
      // }
    }
    setGameStarted(false);

    if (timerController.positionTimer !== null) {
      clearTimeout(timerController.positionTimer);
      timerController.positionTimer = null;
      log("Temporizer canceled by onGameStop");
    }

    if (positionList.length > 0) {
      const fileName = `RaceResults-${getTimestamp()}.json`;

      sendDiscordFile(positionList, fileName, "RACE_RESULTS");
    }

    const qualiResults = getPlayersOrderedByQualiTime();
    if (qualiResults.length > 0) {
      const fileName = `QualiResults-${getTimestamp()}.json`;

      sendDiscordFile(qualiResults, fileName, "QUALI_RESULTS");
    }

    // resetAllRainEvents();
    if (gameMode !== GameMode.WAITING) {
      if (gameStopedNaturally && !LEAGUE_MODE) {
        PublicGameFlow(room);
        changeGameStoppedNaturally(false);
      } else {
        handleGameStateChange(null, room);
        if (generalGameMode === GeneralGameMode.GENERAL_QUALY) {
          sendQualiResultsToDiscord();
          printAllTimes(room);
          reorderPlayersInRoomRace(room);
          movePlayersToCorrectSide();
          changeGameMode(GameMode.RACE, room);
          changeLaps("7", undefined, room);
          resetPlayers(room);
          handleRREnabledCommand(undefined, ["false"], room);
        } else if (gameMode == GameMode.TRAINING) {
          sendQualiResultsToDiscord();
          printAllTimes(room);
          reorderPlayersInRoomRace(room);
          movePlayersToCorrectSide();
          resetPlayers(room);
          handleRREnabledCommand(undefined, ["false"], room);
        } else {
          sendRaceResultsToDiscord();
          printAllPositions(room);
          movePlayersToCorrectSide();
          resetPlayers(room);
          sendDiscordMessage(room);
        }
      }
      clearPlayers();
      // if (rainEnabled) {
      //   setRainChances(0);
      // }
    }

    handleFlagCommand(undefined, ["reset"], room);
    clearPlayerBuffAndNerfLists();
    clearPlayersLeftInfo();
  };
}
