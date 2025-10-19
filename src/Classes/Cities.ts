import { CityRegion, PlaceType as PlaceCategory, Place as PlaceType } from "../../src/@types";
import {
  aravaDeadSeaRegionPlaces,
  beerTuviaRegionPlaces,
  centralIsraelTowns,
  galileeRegionPlaces,
  haifaCarmelRegionPlaces,
  israelCities,
  jerusalemRegionTowns
} from "../../src/consts/cities";
import { BasePlaces } from "./BasePlaces";

export class Cities extends BasePlaces {
    protected placeType = PlaceCategory.CITY;
    private cityPools: Map<CityRegion, PlaceType[]>;
    private regionOrder: CityRegion[];
    private currentRegion: CityRegion;
    private consecutiveScores: number = 0;
    private usedCities: Set<string> = new Set();
    private roundRobinIndex: number = 0;
    private isRoundRobinMode: boolean = false;

    constructor(places: PlaceType[]) {
        super(places);
        
        // Initialize city pools with enum keys
        this.cityPools = new Map([
            [CityRegion.MAIN_CITIES, israelCities],
            [CityRegion.CENTRAL_TOWNS, centralIsraelTowns],
            [CityRegion.JERUSALEM_REGION, jerusalemRegionTowns],
            [CityRegion.BEER_TUVIA_REGION, beerTuviaRegionPlaces],
            [CityRegion.HAIFA_CARMEL_REGION, haifaCarmelRegionPlaces],
            [CityRegion.GALILEE_REGION, galileeRegionPlaces],
            [CityRegion.ARAVA_DEAD_SEA_REGION, aravaDeadSeaRegionPlaces]
        ]);
        
        // Define progression order
        this.regionOrder = [
            CityRegion.MAIN_CITIES,
            CityRegion.CENTRAL_TOWNS,
            CityRegion.JERUSALEM_REGION,
            CityRegion.BEER_TUVIA_REGION,
            CityRegion.HAIFA_CARMEL_REGION,
            CityRegion.GALILEE_REGION,
            CityRegion.ARAVA_DEAD_SEA_REGION
        ];
        
        this.currentRegion = CityRegion.MAIN_CITIES;
    }

    /**
     * Get and remove a random city from the set with progressive difficulty
     * @returns A random city or undefined if set is empty
     */
    getRandomCity(): PlaceType | undefined {
        return this.popRandomPlace();
    }

    /**
     * Get next city based on performance
     * - First 3 consecutive scores > 0: progress through regions in order
     * - After combo > 3: use round-robin from ALL regions
     * @param lastScore The most recent score
     * @returns A random city from selected region
     */
    getNextCity(lastScore: number): PlaceType | undefined {
        // Update consecutive score tracking BEFORE advancing region
        // This ensures the advancement happens at the right time
        const previousConsecutiveScores = this.consecutiveScores;
        
        // Track consecutive positive scores
        if (lastScore > 0) {
            this.consecutiveScores++;
        } else if (lastScore < 0) {
            // Only reset on actual miss (negative score means it's a new game, score 0 = initialization)
            this.consecutiveScores = 0;
            this.isRoundRobinMode = false; // Reset to linear progression on miss
        }

        // If combo > 3, enter round-robin mode across ALL regions
        if (this.consecutiveScores > 3) {
            this.isRoundRobinMode = true;
        }

        // Advance region when we hit 3, 6, 9, etc. (every 3 successful guesses)
        // But only in linear mode (not round-robin)
        if (!this.isRoundRobinMode && 
            this.consecutiveScores > 0 && 
            this.consecutiveScores % 3 === 0 && 
            previousConsecutiveScores !== this.consecutiveScores) {
            const currentIndex = this.regionOrder.indexOf(this.currentRegion);
            const nextIndex = (currentIndex + 1) % this.regionOrder.length;
            this.currentRegion = this.regionOrder[nextIndex];
        }

        let selectedCity: PlaceType | undefined;

        if (this.isRoundRobinMode) {
            // Round-robin mode: cycle through ALL regions
            selectedCity = this.getNextCityRoundRobin();
        } else {
            // Linear progression mode: get from current region
            selectedCity = this.getNextCityFromRegion(this.currentRegion);
            
            // If current region is exhausted, try next regions
            if (!selectedCity) {
                const currentIndex = this.regionOrder.indexOf(this.currentRegion);
                for (let i = 1; i < this.regionOrder.length; i++) {
                    const nextIndex = (currentIndex + i) % this.regionOrder.length;
                    const nextRegion = this.regionOrder[nextIndex];
                    selectedCity = this.getNextCityFromRegion(nextRegion);
                    if (selectedCity) {
                        this.currentRegion = nextRegion;
                        break;
                    }
                }
            }
        }

        return selectedCity;
    }

    /**
     * Get next city using round-robin from all regions
     */
    private getNextCityRoundRobin(): PlaceType | undefined {
        const totalRegions = this.regionOrder.length;
        
        // Try all regions starting from current round-robin index
        for (let i = 0; i < totalRegions; i++) {
            const regionIndex = (this.roundRobinIndex + i) % totalRegions;
            const region = this.regionOrder[regionIndex];
            const city = this.getNextCityFromRegion(region);
            
            if (city) {
                // Move to next region for next call
                this.roundRobinIndex = (regionIndex + 1) % totalRegions;
                return city;
            }
        }
        
        // All cities exhausted
        return undefined;
    }

    /**
     * Get a random unused city from a specific region
     */
    private getNextCityFromRegion(region: CityRegion): PlaceType | undefined {
        const pool = this.cityPools.get(region);
        if (!pool) return undefined;
        
        const availableCities = pool.filter(city => !this.usedCities.has(city.name));
        
        if (availableCities.length === 0) {
            return undefined;
        }
        
        return this.selectAndMarkCity(availableCities);
    }

    /**
     * Select a random city from array and mark it as used
     */
    private selectAndMarkCity(cities: PlaceType[]): PlaceType {
        const randomIndex = Math.floor(Math.random() * cities.length);
        const selectedCity = cities[randomIndex];
        this.usedCities.add(selectedCity.name);
        return selectedCity;
    }

    /**
     * Remove a specific city from the set
     * @param city The city to remove
     * @returns true if the city was in the set and removed, false otherwise
     */
    removeCity(city: PlaceType): boolean {
        return this.removePlace(city);
    }

    /**
     * Get all remaining cities as an array
     */
    getAllCities(): PlaceType[] {
        return this.getAllPlaces();
    }

    /**
     * Get the current number of cities
     */
    get numberOfCities(): number {
        return this.size;
    }

    /**
     * Get the current region for debugging/display
     */
    getCurrentRegion(): CityRegion {
        return this.currentRegion;
    }

    /**
     * Get the number of consecutive positive scores
     */
    getConsecutiveScores(): number {
        return this.consecutiveScores;
    }

    /**
     * Check if in round-robin mode
     */
    isInRoundRobinMode(): boolean {
        return this.isRoundRobinMode;
    }

    /**
     * Reset the progression system (for new game)
     */
    resetProgression(): void {
        this.currentRegion = CityRegion.MAIN_CITIES;
        this.consecutiveScores = 0;
        this.usedCities.clear();
        this.roundRobinIndex = 0;
        this.isRoundRobinMode = false;
    }

    /**
     * Get total available cities across all pools
     */
    getTotalCitiesCount(): number {
        let total = 0;
        for (const pool of this.cityPools.values()) {
            total += pool.length;
        }
        return total;
    }

    /**
     * Get remaining cities count (not yet used)
     */
    getRemainingCitiesCount(): number {
        return this.getTotalCitiesCount() - this.usedCities.size;
    }

    /**
     * Get region name in Hebrew for display
     */
    getRegionDisplayName(region: CityRegion): string {
        const regionNames: Record<CityRegion, string> = {
            [CityRegion.MAIN_CITIES]: 'ערים מרכזיות',
            [CityRegion.CENTRAL_TOWNS]: 'מרכז הארץ',
            [CityRegion.JERUSALEM_REGION]: 'אזור ירושלים',
            [CityRegion.BEER_TUVIA_REGION]: 'אזור באר טוביה',
            [CityRegion.HAIFA_CARMEL_REGION]: 'חיפה והכרמל',
            [CityRegion.GALILEE_REGION]: 'הגליל',
            [CityRegion.ARAVA_DEAD_SEA_REGION]: 'הערבה וים המלח'
        };
        return regionNames[region];
    }
}