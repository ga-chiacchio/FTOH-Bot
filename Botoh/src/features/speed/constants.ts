export const constants = {
  // ===============================
  // Velocidade e Performance Base
  // ===============================
  NORMAL_SPEED: 1,
  DRS_SPEED_GAIN: 0.001,
  ERS_PENALTY: -0.006,
  JUMP_START_PENALTY: -0.005,
  FULL_GAS_SPEED: 0.00025,
  ZERO_GAS_PENALTY: 0.005,
  PENALTY_SPEED: 0.97,

  // ===============================
  // Pitlane e Safety Car
  // ===============================
  DEFAULT_PIT_SPEED: 0.97,
  SAFETY_CAR_SPEED: 0.985,
  SAFETY_CAR_INDY_SPEED: 0.993,

  // ===============================
  // Slipstream (vácuo)
  // ===============================
  // When change MAX_SLIPSTREAM, change the max speed pressing X in Indianapolis too
  MAX_SLIPSTREAM: 0.0002, // Max of speed gains with full slipstream
  RESIDUAL_SLIPSTREAM_TIME: 2, // How much time does it take to the slipstream to end
  SLIPSTREAM_RESIDUAL_VALUE: 0.0002 * 0.2, // How much powerfull is the slipstream when you are closer
  SLIPSTREAM_ACTIVATION_DISTANCE: 500, // The distance you have to be to the slipstream start to act
  SLIPSTREAM_LATERAL_TOLERANCE: 38, // The width of the slipstream effects

  // ===============================
  // Chuva e Aderência
  // ===============================
  SLIDE_FACTOR: 2.5, // Multiplicador de deslizamento na chuva
};

export function changeConstant(key: keyof typeof constants, value: number) {
  if (key in constants) {
    constants[key] = value;
  }
}
