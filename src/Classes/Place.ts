import { Place as PlaceType } from "../../src/@types";

export class Places {
    private placesSet: Set<PlaceType>;

    constructor(places: PlaceType[]) {
        this.placesSet = new Set(places);
    }

    /**
     * Get a random place from the set without removing it
     * @returns A random place or undefined if set is empty
     */
    private getRandomPlace(): PlaceType | undefined {
        if (this.placesSet.size === 0) return undefined;
        const places = Array.from(this.placesSet);
        return places[Math.floor(Math.random() * places.length)];
    }

    /**
     * Remove and return a random place from the set
     * @returns A random place or undefined if set is empty
     */
    public popRandomPlace(): PlaceType | undefined {
        const randomPlace = this.getRandomPlace();
        if (randomPlace) {
            this.placesSet.delete(randomPlace);
        }
        return randomPlace;
    }

    /**
     * Remove a specific place from the set
     * @param place The place to remove
     * @returns true if the place was in the set and removed, false otherwise
     */
    removePlace(place: PlaceType): boolean {
        return this.placesSet.delete(place);
    }

    /**
     * Get the current number of places in the set
     */
    get size(): number {
        return this.placesSet.size;
    }

    /**
     * Get all remaining places as an array
     */
    getAllPlaces(): PlaceType[] {
        return Array.from(this.placesSet);
    }
}