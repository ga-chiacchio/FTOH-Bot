import { handleAvatar, Situacions } from "../changePlayerState/handleAvatar";
import { playerList } from "../changePlayerState/playerList";
import { getPlayerAndDiscs } from "../playerFeatures/getPlayerAndDiscs";
import { Tires } from "../tires&pits/tires";
import { getRunningPlayers } from "../utils";

export const REJOIN_TIME_LIMIT = 60; //seconds

export let playersLeftInfo: PlayerLeftInfo[] = [];

export interface PlayerLeftInfo {
  id: number;
  name: string;
  ip: string;
  leagueTeam: string | null;
  didHardQualy: boolean;
  totalTime: number;
  bestTime: number;
  tires: Tires;
  wear: number;
  lapsOnCurrentTire: number;
  showTires: boolean;
  maxSpeed: number;
  pits: any;
  pitTargetTires: any;
  pitFailures: any;
  pitInitialPos: any;
  speedEnabled: boolean;
  kers: number;
  gas: number;
  prevGas: number;
  language: string;
  everyoneLaps: any;
  voted: boolean;
  leftAt: string;
}

export function addPlayerLeftInfo(player: PlayerLeftInfo) {
  playersLeftInfo.push(player);
}

export function clearPlayersLeftInfo() {
  playersLeftInfo = [];
}

export function allowPlayersRejoinRace(room: RoomObject) {
  const playersAndDiscs = getPlayerAndDiscs(room);
  const players = getRunningPlayers(playersAndDiscs);
  players.forEach((p) => {
    const pdata = playerList[p.p.id];
    if (pdata && pdata.canLeavePitLane === false) {
      room.sendAnnouncement("✅ Agora você pode sair do box!", p.p.id);
      handleAvatar(Situacions.CanLeavePit, p.p, room);
      pdata.canLeavePitLane = true;
    }
  });
}
