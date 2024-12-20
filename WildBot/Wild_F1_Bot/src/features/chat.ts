import {getPlayerLanguage, LocalizedMessageFunction} from "./messages";

export const MAX_PLAYER_NAME = 22

enum COLORS {
    BLUE = 0x0000FF,
    GREEN = 0x65FF33,
    CYAN = 0x00FFFF,
    RED = 0xFF0000,
    MAGENTA = 0xFF00FF,
    YELLOW = 0xFFFF00,
    WHITE = 0xFFFFFF,
    ORANGE = 0xF78B2D,
    DARK_YELLOW = 0x93BF0F,
    PURPLE = 0xFF33D0,
    DARK_GREEN = 0x00FF04,
    BLACK = 0x000000
}

enum FONTS {
    NORMAL = "normal",
    BOLD = "bold",
    ITALIC = "italic",
    SMALL = "small",
    SMALL_BOLD = "small-bold",
    SMALL_ITALIC = "small-italic"
}

enum SOUNDS {
    MUTE = 0,
    CHAT = 1,
    NOTIFICATION = 2
}

export function sendMessage(room: RoomObject, message: LocalizedMessageFunction, toPlayerID?: number, color?: COLORS, font?: FONTS, sound?: SOUNDS) {
    if (toPlayerID) {
        const language = getPlayerLanguage(toPlayerID)
        console.log(language, message, message[language])
        room.sendAnnouncement(message[language], toPlayerID, color, font, sound)
    } else {
        room.getPlayerList().forEach(player => {
            const language = getPlayerLanguage(player.id);
            console.log(language, message, message[language])
            room.sendAnnouncement(message[language], player.id, color, font, sound)
        })
    }
}

export function sendNonLocalizedSmallChatMessage(room: RoomObject, message: string, toPlayerID?: number) {
    room.sendAnnouncement(message, toPlayerID, COLORS.WHITE, FONTS.SMALL, SOUNDS.CHAT)

}

export function sendErrorMessage(room: RoomObject, message: LocalizedMessageFunction, toPlayerID?: number) {
    sendMessage(room, message, toPlayerID, COLORS.RED, FONTS.BOLD, SOUNDS.NOTIFICATION)
}

export function sendAlertMessage(room: RoomObject, message: LocalizedMessageFunction, toPlayerID?: number){
    sendMessage(room, message, toPlayerID, COLORS.YELLOW, FONTS.BOLD, SOUNDS.NOTIFICATION)
}

export function sendSuccessMessage(room: RoomObject, message: LocalizedMessageFunction, toPlayerID?: number) {
    sendMessage(room, message, toPlayerID, COLORS.GREEN, FONTS.BOLD, SOUNDS.NOTIFICATION)
}

export function sendChatMessage(room: RoomObject, message: LocalizedMessageFunction, toPlayerID?: number) {
    sendMessage(room, message, toPlayerID, COLORS.WHITE, FONTS.NORMAL, SOUNDS.CHAT)
}

export function sendSmallChatMessage(room: RoomObject, message: LocalizedMessageFunction, toPlayerID?: number) {
    sendMessage(room, message, toPlayerID, COLORS.WHITE, FONTS.SMALL, SOUNDS.CHAT)
}

export function sendBestTimeRace(room: RoomObject, message: LocalizedMessageFunction, toPlayerID?: number) {
    sendMessage(room, message, toPlayerID, COLORS.PURPLE, FONTS.NORMAL, SOUNDS.NOTIFICATION)
}

export function sendWorseTime(room: RoomObject, message: LocalizedMessageFunction, toPlayerID?: number) {
    sendMessage(room, message, toPlayerID, COLORS.DARK_YELLOW, FONTS.NORMAL, SOUNDS.CHAT)
}

export function sendRedMessage(room: RoomObject, message: LocalizedMessageFunction, toPlayerID?: number) {
    sendMessage(room, message, toPlayerID, COLORS.RED, FONTS.NORMAL, SOUNDS.NOTIFICATION)
}

export function sendYellowMessage(room: RoomObject, message: LocalizedMessageFunction, toPlayerID?: number){
    sendMessage(room, message, toPlayerID, COLORS.YELLOW, FONTS.NORMAL, SOUNDS.NOTIFICATION)
}

export function sendGreenMessage(room: RoomObject, message: LocalizedMessageFunction, toPlayerID?: number) {
    sendMessage(room, message, toPlayerID, COLORS.GREEN, FONTS.NORMAL, SOUNDS.NOTIFICATION)
}

export function sendBlueMessage(room: RoomObject, message: LocalizedMessageFunction, toPlayerID?: number){
    sendMessage(room, message, toPlayerID, COLORS.BLUE, FONTS.NORMAL, SOUNDS.NOTIFICATION)
}

export function sendBlackMessage(room: RoomObject, message: LocalizedMessageFunction, toPlayerID?: number) {
    sendMessage(room, message, toPlayerID, COLORS.BLACK, FONTS.NORMAL, SOUNDS.NOTIFICATION)
}




