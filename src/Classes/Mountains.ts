import { PlaceType as PlaceCategory, Place as PlaceType } from "../../src/@types";
import { BasePlaces } from "./BasePlaces";

export class Mountains extends BasePlaces {
    protected placeType = PlaceCategory.MOUNTAIN;

    constructor(places: PlaceType[]) {
        super(places);
    }

    /**
     * Get and remove a random mountain from the set
     * @returns A random mountain or undefined if set is empty
     */
    getRandomMountain(): PlaceType | undefined {
        return this.getRandomPlace();
    }

    /**
     * Remove a specific mountain from the set
     * @param mountain The mountain to remove
     * @returns true if the mountain was in the set and removed, false otherwise
     */
    removeMountain(mountain: PlaceType): boolean {
        return this.removePlace(mountain);
    }

    /**
     * Get all remaining mountains as an array
     */
    getAllMountains(): PlaceType[] {
        return this.getAllPlaces();
    }

    /**
     * Get the current number of mountains
     */
    get numberOfMountains(): number {
        return this.size;
    }
}
