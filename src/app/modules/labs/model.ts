import { User } from "../users/model";

export interface Lab {
    id: number;
    name: string;
    description: string;
    image: string;
    userId: number;
    updatedAt: Date;
    createdAt: Date;
    users: User[];
    isDisabled: boolean;
}
