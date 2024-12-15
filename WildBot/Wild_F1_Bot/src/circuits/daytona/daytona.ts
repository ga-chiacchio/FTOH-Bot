import {Circuit, CircuitInfo, Direction} from "../Circuit";
import daytona_json from "./daytona.json";

const DAYTONA_INFO: CircuitInfo = {
    finishLine: {
        bounds: {
            minX: 5,
            maxX: 35,
            minY: -170,
            maxY: 515
        },
        passingDirection: Direction.RIGHT
    },
    name: "Daytona International Speedway",
    boxLine: {
        minX: -1150,
        maxX: -70,
        minY: -290,
        maxY: -170
    },
    pitlaneStart: {
        minX: -1777,
        maxX: -1747,
        minY: -343,
        maxY: -313
    },
    pitlaneEnd: {
        minX: 1979,
        maxX: 2009,
        minY: -449,
        maxY: -409
    },
    drsStart: [{
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
    }],
    drsEnd: [{
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
    }],
    checkpoints: [],
    lastPlace: {
        x: daytona_json.redSpawnPoints[daytona_json.redSpawnPoints.length - 1][0],
        y: daytona_json.redSpawnPoints[daytona_json.redSpawnPoints.length - 1][1],
    }
}

export const DAYTONA: Circuit = {
    map: JSON.stringify(daytona_json),
    info: DAYTONA_INFO
}