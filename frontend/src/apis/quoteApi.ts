const BASE_URL = "http://localhost:3000/api/quotes";

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
        throw new Error("Quote API error");
    }

    return response.json();
}

export const quoteApi = {
    getQuote: () =>
        request<{ text: string }>(BASE_URL),

    updateQuote: (text: string) =>
        request<{ text: string }>(BASE_URL, {
            method: "PUT",
            body: JSON.stringify({ text }),
        }),
};