import { gameMode, GameMode } from "../../changeGameState/changeGameModes";
import { updatePositionList } from "../../changeGameState/race/positionList";
import { playerList } from "../../changePlayerState/playerList";
import { sendErrorMessage } from "../../chat/chat";
import { MESSAGES } from "../../chat/messages";
import { presentationLap } from "../../commands/handleCommands";
import {
  getRunningPlayers,
  CHECK_IF_TROLLING,
  checkIfTrolling,
} from "../../utils";
import { checkBlueFlag } from "../handleSectorChange";
import { CIRCUITS, currentMapIndex } from "../maps";
import { ifInLapChangeZone } from "./handleLapChange";
import { processCompletedLap } from "./processCompleteLap";
import { resetLapData } from "./resetLapData";

export function checkPlayerLaps(
  playersAndDiscs: { p: PlayerObject; disc: DiscPropertiesObject }[],
  room: RoomObject
) {
  if (presentationLap) return;

  const players = getRunningPlayers(playersAndDiscs);
  const circuit = CIRCUITS[currentMapIndex].info;
  const sectorOne = circuit.sectorOne;
  const hasSector = !sectorOne;

  players.forEach((pad) => {
    const p = pad.p;
    const playerData = playerList[p.id];
    const now = performance.now();
    const delta = (now - playerData.lastLapTimeUpdate) / 1000;

    playerData.lapTime += delta;
    playerData.sectorTimeCounter += delta;
    playerData.lastLapTimeUpdate = now;

    if (!ifInLapChangeZone(pad, room)) {
      playerData.lapChanged = false;
      return;
    }

    if (playerData.lapChanged) return;

    // Verifica se está trolando
    if (
      CHECK_IF_TROLLING &&
      checkIfTrolling(pad, circuit.finishLine.passingDirection)
    ) {
      sendErrorMessage(room, MESSAGES.TROLLING_DETECTED(), p.id);
      if (!hasSector) room.setPlayerTeam(p.id, 0);
      return;
    }

    const completedLap = !hasSector || playerData.currentSector === 3;

    if (!completedLap) return;

    const currentLap = ++playerData.currentLap;
    playerData.lapChanged = true;

    if (currentLap > 1) processCompletedLap(pad, room, hasSector);

    resetLapData(playerData, p.id, room);

    if (gameMode !== GameMode.QUALY && gameMode !== GameMode.TRAINING) {
      updatePositionList(players, room);
      checkBlueFlag(p, room);
    }
  });
}
