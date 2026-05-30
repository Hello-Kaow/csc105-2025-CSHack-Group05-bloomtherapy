import type { BucketItem } from "../types/bucket";

const API_URL = "http://localhost:3000/api";

type CreateBucketData = {
    title: string;
    description?: string;
    completed?: boolean;
    tag?: string;
    achievedDay?: number;
};

type UpdateBucketData = Partial<Omit<BucketItem, "id">>;

async function request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error("Something went wrong with the bucket API");
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
}

export const bucketApi = {
    getBuckets: () => {
        return request<BucketItem[]>(`${API_URL}/buckets`);
    },

    createBucket: (bucketData: CreateBucketData) => {
        return request<BucketItem>(`${API_URL}/buckets`, {
            method: "POST",
            body: JSON.stringify(bucketData),
        });
    },

    updateBucket: (id: BucketItem["id"], bucketData: UpdateBucketData) => {
        return request<BucketItem>(`${API_URL}/buckets/${id}`, {
            method: "PUT",
            body: JSON.stringify(bucketData),
        });
    },

    deleteBucket: (id: BucketItem["id"]) => {
        return request<void>(`${API_URL}/buckets/${id}`, {
            method: "DELETE",
        });
    },
};