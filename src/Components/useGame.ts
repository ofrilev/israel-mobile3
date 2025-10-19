import { useState } from "react";
import { GameState } from "../Classes/GameState";
import { Place } from "../../src/@types";

export const useGame = (gameState: GameState) => {
    const [currentPlace, setCurrentPlace] = useState<Place | undefined>(gameState.getCurrentPlace());
    const [totalScore, setTotalScore] = useState(gameState.getTotalScore());
    const [currentScore, setCurrentScore] = useState(gameState.getCurrentScore());

    const pickPlace = () => {
        const city = gameState.pickNewPlace();
        setCurrentPlace(city);
    };

    const updateScore = (score: number) => {
        gameState.updateScore(score);
        setCurrentScore(score);
        setTotalScore(gameState.getTotalScore());
        return score; // Return the score for bonus calculations
    };

    return { 
        currentPlace, 
        pickPlace, 
        totalScore, 
        currentScore, 
        updateScore 
    };
}