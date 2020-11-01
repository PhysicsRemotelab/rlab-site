export interface User {
    id?: string;
    email?: string;
    emailVerified?: boolean;
    roles?: Role[];
    name?: string;
    nickname?: string;
    picture?: string;
    updatedAt?: Date;
    createdAt?: Date;
}

export interface Role {
    name: string;
}
