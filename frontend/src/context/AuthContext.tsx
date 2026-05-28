import { createContext, useContext, useState, type ReactNode } from "react";

type User = {
    id: string;
    username: string;
};

type AuthContextType = {
    isLoggedIn: boolean;
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
        const [token, setToken] = useState<string | null>(() => {
        const t = localStorage.getItem("token");
        return t && t !== "undefined" ? t : null;
    });
    const [user, setUser] = useState<User | null>(() => {
    try {
        const stored = localStorage.getItem("user");
        return stored && stored !== "undefined" ? JSON.parse(stored) : null;
    } 
    catch {
        return null;
    }
    });

    const login = (newToken: string, newUser: User) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn: !!token, user, token, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
}