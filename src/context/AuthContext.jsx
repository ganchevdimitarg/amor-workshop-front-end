import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {ADMIN_LOGIN_EMAIL} from "../config";
import {
    clearSession,
    getSessionUserId,
    getUsers,
    makeId,
    saveUsers,
    setSessionUserId,
} from "../utils/storage";

const AuthContext = createContext(null);

function sanitize(user) {
    if (!user) return null;
    const {password: _password, ...rest} = user;
    return rest;
}

export function AuthProvider({children}) {
    const [users, setUsers] = useState(() => getUsers());
    const [userId, setUserId] = useState(() => getSessionUserId());

    useEffect(() => {
        saveUsers(users);
    }, [users]);

    const user = useMemo(
        () => sanitize(users.find((candidate) => candidate.id === userId) || null),
        [users, userId]
    );

    function register({firstName, lastName, email, password}) {
        const normalizedEmail = email.trim().toLowerCase();
        if (users.some((candidate) => candidate.email === normalizedEmail)) {
            throw new Error("EMAIL_EXISTS");
        }
        const newUser = {
            id: makeId("user"),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: normalizedEmail,
            password,
            phone: "",
            address: "",
            transportCompany: "",
            createdAt: new Date().toISOString(),
        };
        setUsers((prev) => [...prev, newUser]);
        setUserId(newUser.id);
        setSessionUserId(newUser.id);
        return sanitize(newUser);
    }

    function login(email, password) {
        const normalizedEmail = email.trim().toLowerCase();
        const match = users.find(
            (candidate) => candidate.email === normalizedEmail && candidate.password === password
        );
        if (!match) {
            throw new Error("INVALID_CREDENTIALS");
        }
        setUserId(match.id);
        setSessionUserId(match.id);
        return sanitize(match);
    }

    function logout() {
        setUserId(null);
        clearSession();
    }

    // Remembers the shipping details from the most recent order so next
    // time's form arrives pre-filled.
    function updateProfile(partial) {
        if (!userId) return;

        setUsers((prev) => {
            const normalizedEmail = partial.email?.trim().toLowerCase();

            if (
                normalizedEmail &&
                prev.some((candidate) => candidate.id !== userId && candidate.email === normalizedEmail)
            ) {
                throw new Error("EMAIL_EXISTS");
            }

            return prev.map((candidate) =>
                candidate.id === userId
                    ? {
                        ...candidate,
                        ...partial,
                        firstName: partial.firstName?.trim() ?? candidate.firstName,
                        lastName: partial.lastName?.trim() ?? candidate.lastName,
                        email: normalizedEmail ?? candidate.email,
                        phone: partial.phone?.trim() ?? candidate.phone,
                        address: partial.address?.trim() ?? candidate.address,
                        transportCompany: partial.transportCompany ?? candidate.transportCompany,
                    }
                    : candidate
            );
        });
    }

    function deleteProfile() {
        if (!userId) return;
        setUsers((prev) => prev.filter((candidate) => candidate.id !== userId));
        setUserId(null);
        clearSession();
    }

    const isAdmin = Boolean(user && user.email === ADMIN_LOGIN_EMAIL.toLowerCase());

    const value = {user, isAdmin, register, login, logout, updateProfile, deleteProfile};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
    return ctx;
}
