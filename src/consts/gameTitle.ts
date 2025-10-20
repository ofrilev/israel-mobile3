import { GamePhase } from "../@types";

export const getGameTitle = (gamePhase: GamePhase) => {
    switch (gamePhase) {
        case GamePhase.CITIES:
            return "ערים וישובים";
        case GamePhase.MOUNTAINS:
            return "הרים";
        case GamePhase.FAMOUS_PLACES:
            return "מקומות ידועים";
    }
}

