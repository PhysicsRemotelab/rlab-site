export interface User {
    id?: string;
    email?: string;
    emailVerified?: boolean;
    sub?: string;
    name?: string;
    nickname?: string;
    picture?: string;
    updatedAt?: Date;
    createdAt?: Date;
}
