const BASE_URL = "http://localhost:3000/api/diaries";

function getToken(): string {
    return localStorage.getItem("token") ?? "";
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error("Diary API error");
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
}

export type Diary = {
    id: string;
    title: string;
    story: string;
    date: string;
    authorId: string;
};

export type CreateDiaryData = {
    title: string;
    story: string;
    date: string;
};

export type UpdateDiaryData = Partial<CreateDiaryData>;

export const journalApi = {
    getDiaries: () =>
        request<Diary[]>(BASE_URL),

    createDiary: (data: CreateDiaryData) =>
        request<Diary>(BASE_URL, {
            method: "POST",
            body: JSON.stringify(data),
        }),

    updateDiary: (id: string, data: UpdateDiaryData) =>
        request<Diary>(`${BASE_URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        }),

    deleteDiary: (id: string) =>
        request<void>(`${BASE_URL}/${id}`, {
            method: "DELETE",
        }),
};