import { Commands } from "../../features/commands/commands";

export default function en_commands(
  handleAdminCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleCircuitCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleCommandsCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleMapsCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleSpeedCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleTimesCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handlePositionsCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleVSCCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleQModeCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleTModeCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleQTimeCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleRModeCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleBBCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleTiresCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleHelpCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleClearBansCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleLapsCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleWaitTimeCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleLanguageCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleAvatarCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleClearTimeCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleMuteCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleRainCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleSlipstreamCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleGasCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleGhostCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleRREnabledCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleRRCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleRainItensity: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleEndRainCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleAfkCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleEnableQualyForPub: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleEnableTyresCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleTipsCommands: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleExplainTyresCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleExplainServerCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleExplainRainCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleExplainErsCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleEveryoneLapsCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleTpCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleIndyModeCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleFlagCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleVoteCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleClearCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleRecordCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleAjustPlayerCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleNerfListCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handlePresentationLapCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleChangePropierties: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleSetTeam: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleSeeTeams: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleDiscordCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleCameraProperties: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleCameraPlayerFollow: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleCameraPositionFollow: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleChangeGameFLow: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleSetMinimumPit: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void,
  handleRejoinCommand: (
    byPlayer: PlayerObject,
    args: string[],
    room: RoomObject
  ) => void
): Commands {
  return {
    "!admin": handleAdminCommand,
    "!commands": handleCommandsCommand,
    "!circuit": handleCircuitCommand,
    "!maps": handleMapsCommand,
    "!speed": handleSpeedCommand,
    "!times": handleTimesCommand,
    "!positions": handlePositionsCommand,
    "!vsc": handleVSCCommand,
    "!qmode": handleQModeCommand,
    "!tmode": handleTModeCommand,
    "!qtime": handleQTimeCommand,
    "!rmode": handleRModeCommand,
    "!bb": handleBBCommand,
    "!tyres": handleTiresCommand,
    "!tires": handleTiresCommand,
    "!help": handleHelpCommand,
    "!clear_bans": handleClearBansCommand,
    "!laps": handleLapsCommand,
    "!wait_time": handleWaitTimeCommand,
    "!lang": handleLanguageCommand,
    "!avatar": handleAvatarCommand,
    "!clear_time": handleClearTimeCommand,
    "!mute": handleMuteCommand,
    "!rain": handleRainCommand,
    "!slipstream": handleSlipstreamCommand,
    "!gas": handleGasCommand,
    "!ghost": handleGhostCommand,
    "!toggle_rr": handleRREnabledCommand,
    "!rr": handleRRCommand,
    "!rain_intensity": handleRainItensity,
    "!end_rain": handleEndRainCommand,
    "!afk": handleAfkCommand,
    "!volver": handleAfkCommand,
    "!enable_qualy_for_pub": handleEnableQualyForPub,
    "!enable_tyres": handleEnableTyresCommand,
    "!tips": handleTipsCommands,
    "!explain_tyres": handleExplainTyresCommand,
    "!explain_server": handleExplainServerCommand,
    "!explain_rain": handleExplainRainCommand,
    "!explain_ers": handleExplainErsCommand,
    "!everyone_laps": handleEveryoneLapsCommand,
    "!tp": handleTpCommand,
    "!imode": handleIndyModeCommand,
    "!flag": handleFlagCommand,
    "!vote": handleVoteCommand,
    "!clear": handleClearCommand,
    "!record": handleRecordCommand,
    "!adjust": handleAjustPlayerCommand,
    "!nerf": handleNerfListCommand,
    "!presentation": handlePresentationLapCommand,
    "!constants": handleChangePropierties,
    "!team": handleSetTeam,
    "!view_teams": handleSeeTeams,
    "!discord": handleDiscordCommand,
    "!camera_properties": handleCameraProperties,
    "!camera_id": handleCameraPlayerFollow,
    "!camera_position": handleCameraPositionFollow,
    "!game_flow": handleChangeGameFLow,
    "!min_pit": handleSetMinimumPit,
    "!rejoin": handleRejoinCommand,
  };
}
