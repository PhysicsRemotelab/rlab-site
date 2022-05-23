import { User } from '@auth0/auth0-spa-js';
import { Lab } from '../labs/model';

export interface Measurement {
    id: number;
    labId: number;
    lab: Lab;
    user: User;
    userId: number;
    result: string;
    displayName: string;
    createdAt: Date;
    updatedAt: Date;
    labName: string;
}
