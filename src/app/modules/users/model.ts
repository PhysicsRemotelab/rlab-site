export interface User {
    id?: string;
    email?: string;
    emailVerified?: boolean;
    sub?: string;
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
