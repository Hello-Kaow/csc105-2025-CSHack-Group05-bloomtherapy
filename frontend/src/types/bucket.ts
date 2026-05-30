export type BucketItem = {
    id: number | string;
    title: string;
    description?: string;
    completed: boolean;
    tag?: string;
    achievedDay?: number;
};