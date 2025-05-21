import { bestTimes } from "../bestTimes";
import { Circuit, CircuitInfo, Direction } from "../Circuit";
import podium_json from "./podium.json";

const PODIUM_INFO: CircuitInfo = {
  finishLine: {
    bounds: {
      minX: -1000,
      maxX: -1000,
      minY: -1000,
      maxY: -1000,
    },
    passingDirection: Direction.LEFT,
  },
  name: "Podium",
  boxLine: {
    minX: -1000,
    maxX: -1000,
    minY: -1000,
    maxY: -1000,
  },
  pitlaneStart: {
    minX: -1000,
    maxX: -1000,
    minY: -1000,
    maxY: -1000,
  },
  pitlaneEnd: {
    minX: -1000,
    maxX: -1000,
    minY: -1000,
    maxY: -1000,
  },
  drsStart: [
    {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
    },
  ],
  drsEnd: [
    {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
    },
  ],
  checkpoints: [],
  lastPlace: {
    x: podium_json.redSpawnPoints[podium_json.redSpawnPoints.length - 1][0],
    y: podium_json.redSpawnPoints[podium_json.redSpawnPoints.length - 1][1],
  },
  BestTime: bestTimes.podium,
  Limit: 5,
  Votes: 0,
};

export const PODIUM: Circuit = {
  map: JSON.stringify(podium_json),
  info: PODIUM_INFO,
};
