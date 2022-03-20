export interface Lab {
    id: number;
    code: string;
    name: string;
    description: string;
    image: string;
    updatedAt: Date;
    createdAt: Date;
    isDisabled: boolean;
    status: string;
}
