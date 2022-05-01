export interface User {
    id?: string;
    code?: string;
    email?: string;
    emailVerified?: boolean;
    sub?: string;
    name?: string;
    nickname?: string;
    picture?: string;
    firstName?: string;
    lastName?: string;
    updatedAt?: Date;
    createdAt?: Date;
}
