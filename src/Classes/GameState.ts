import { GamePhase, Place as PlaceType } from '../@types';
import { israelCities } from '../consts/cities';
import { BasePlaces } from './BasePlaces';
import { Cities } from './Cities';

export class GameState {
  private static instance: GameState;
  private places: BasePlaces;
  private cities?: Cities; // Store Cities reference for getNextCity
  private totalScore: number = 0;
  private currentScore: number = 0;
  private currentPlace?: PlaceType;
  private remainingPlaces: number;
  private isGameComplete: boolean = false;

  private constructor(places: BasePlaces) {
    this.places = places;
    // Store Cities instance if that's what we're using
    if (places instanceof Cities) {
      this.cities = places;
    }

    // For Cities, use getNextCity with initial score of 0
    if (this.cities) {
      this.currentPlace = this.cities.getNextCity(0);
      this.remainingPlaces = this.cities.getTotalCitiesCount();
    } else {
      this.currentPlace = this.places.getRandomPlace();
      this.remainingPlaces = this.places.size;
    }
  }

  private static instances: Map<string, GameState> = new Map();

  public static getInstance(phase: GamePhase): GameState {
    // Check if instance already exists for this phase
    if (!GameState.instances.has(phase)) {
      // Create new instance based on phase
      let places: BasePlaces;
      switch (phase) {
        case GamePhase.CITIES:
          places = new Cities(israelCities);
          break;
        case GamePhase.MOUNTAINS:
          places = new Cities(israelCities);
          // places = new Mountains(israelMountains);
          break;
        case GamePhase.FAMOUS_PLACES:
          places = new Cities(israelCities);
          // places = new FamousPlaces(israelFamousPlaces);
          break;
      }
      GameState.instances.set(phase, new GameState(places));
    }
    return GameState.instances.get(phase)!;
  }

  public getCurrentPlace(): PlaceType | undefined {
    return this.currentPlace;
  }

  public getTotalScore(): number {
    return this.totalScore;
  }

  public getCurrentScore(): number {
    return this.currentScore;
  }

  public getRemainingPlaces(): number {
    return this.remainingPlaces;
  }

  public getIsGameComplete(): boolean {
    return this.isGameComplete;
  }

  public updateScore(score: number): void {
    this.currentScore = score;
    this.totalScore += score;
  }

  public pickNewPlace(): PlaceType | undefined {
    // Use getNextCity for Cities, otherwise use generic getRandomPlace
    if (this.cities) {
      this.currentPlace = this.cities.getNextCity(this.currentScore);
      this.remainingPlaces = this.cities.getRemainingCitiesCount();

      if (!this.currentPlace) {
        this.isGameComplete = true;
      }
    } else {
      if (this.remainingPlaces <= 0) {
        this.isGameComplete = true;
        this.currentPlace = undefined;
        return undefined;
      }

      this.currentPlace = this.places.getRandomPlace();
      if (this.currentPlace) {
        this.remainingPlaces--;
      }
    }

    return this.currentPlace;
  }

  public resetGame(): void {
    this.totalScore = 0;
    this.currentScore = 0;
    this.isGameComplete = false;

    // Reset Cities progression if using Cities
    if (this.cities) {
      this.cities.resetProgression();
      this.currentPlace = this.cities.getNextCity(0);
      this.remainingPlaces = this.cities.getTotalCitiesCount();
    } else {
      this.remainingPlaces = this.places.size;
      this.currentPlace = this.places.getRandomPlace();
      if (this.currentPlace) {
        this.remainingPlaces--;
      }
    }
  }

  /**
   * Get progression info (for Cities only)
   */
  public getProgressionInfo(): {
    currentRegion: string;
    consecutiveScores: number;
    isRoundRobinMode: boolean;
    regionDisplayName: string;
  } | null {
    if (this.cities) {
      const region = this.cities.getCurrentRegion();
      return {
        currentRegion: region,
        consecutiveScores: this.cities.getConsecutiveScores(),
        isRoundRobinMode: this.cities.isInRoundRobinMode(),
        regionDisplayName: this.cities.getRegionDisplayName(region),
      };
    }
    return null;
  }
}
