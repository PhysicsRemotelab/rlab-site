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
    LabUser: LabUser;
}

export interface LabUser {
    labId: number;
    userId: number;
    takenAt: Date;
    takenUntil: Date;
    freedAt?: Date;
}

export interface Role {
    name: string;
}
