import { EventEmitter } from "events";
import { Occupation } from "./enums";
import { AnimalInterface } from "./interfaces";
import { AssignedName } from "./types";

/**
 * Represents a typical animal.
 */
export abstract class AnimalBaseClass extends EventEmitter implements AnimalInterface {
    /**
     * @event AnimalBaseClass#beginSleep
     * @param {number} timestamp - The time at which this animal began sleeping.
     * @public Show in docs only.
     */
    private beginSleep!: (timestamp: number) => void;

    public readonly totalFeet: number = 0;
    public readonly totalHands: number = 0;
    public readonly hasFeathers: boolean = false;

    protected name: Partial<AssignedName> = {};

    public get canFly(): boolean {
        return this.hasFeathers;
    }

    public abstract get fullName(): string;
    public abstract setName(assignedName: AssignedName): void;
}

/**
 * Represents a typical human being.
 */
export class Human extends AnimalBaseClass {
    /**
     * @event Human#beginChores
     * @param {number} timestamp - The time at which the human began their chores.
     * @example
     * ```js
     * // Listen for event
     * human.on("beginChores", (timestamp) => console.log(timestamp));
     * ```
     * @public Show in docs only.
     */
    private beginChores!: (timestamp: number) => void;

    public override readonly totalFeet = 2;
    public override readonly totalHands = 2;
    public readonly occupation: Occupation;

    constructor(occupation?: Occupation) {
        super();
        this.occupation = occupation ?? Occupation.None;
    }

    public get isEmployed(): boolean {
        return this.occupation !== Occupation.None && this.occupation !== Occupation.Student;
    }

    public override get fullName(): string {
        return `${this.name.firstName} ${this.name.lastName}`;
    }

    public override setName(assignedName: AssignedName): void {
        this.name = assignedName;
    }
}

/**
 * Represents a typical bird.
 */
export class Bird extends AnimalBaseClass {
    /**
     * @event Bird#beginFlight
     * @param {number} timestamp - The time at which the bird starts flying.
     * @example
     * ```js
     * // Listen for event
     * bird.on("beginFlight", (timestamp) => console.log(timestamp));
     * ```
     * @public Show in docs only.
     */
    private beginFlight!: (timestamp: number) => void;

    public override readonly totalFeet = 2;

    /**
     * @fires {@link beginFlight}
     */
    public startFlying(): void {
        if (!this.hasFeathers) throw new Error("This bird cannot fly!");
        this.emit("beginFlight", Date.now());
    }

    public override get fullName(): string {
        return `${this.name.firstName} ${this.name.lastName}`.trimEnd();
    }

    public override setName(assignedName: Partial<AssignedName>): void {
        this.name = assignedName;
    }
}
