import { PlaceType as PlaceCategory, Place as PlaceType } from "../../src/@types";
import { BasePlaces } from "./BasePlaces";

export class FamousPlaces extends BasePlaces {
    protected placeType = PlaceCategory.FAMOUS_PLACE;

    constructor(places: PlaceType[]) {
        super(places);
    }

    /**
     * Get and remove a random famous place from the set
     * @returns A random famous place or undefined if set is empty
     */
    getRandomFamousPlace(): PlaceType | undefined {
        return this.getRandomPlace();
    }

    /**
     * Remove a specific famous place from the set
     * @param place The famous place to remove
     * @returns true if the place was in the set and removed, false otherwise
     */
    removeFamousPlace(place: PlaceType): boolean {
        return this.removePlace(place);
    }

    /**
     * Get all remaining famous places as an array
     */
    getAllFamousPlaces(): PlaceType[] {
        return this.getAllPlaces();
    }

    /**
     * Get the current number of famous places
     */
    get numberOfFamousPlaces(): number {
        return this.size;
    }
}
