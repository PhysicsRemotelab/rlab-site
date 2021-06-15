import { Lab } from "../labs/model";

export interface Measurement {
    id: number;
    labId: number;
    result: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    lab: Lab;
}
