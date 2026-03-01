"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/data/types";

interface UserContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => void;
	updateUser: (u: User) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	const login = async (email: string, password: string) => {
		const found = await fetch(
			`http://localhost:3001/users?email=${email}&password=${password}`,
		).then((res) => res.json());

		if (found && Array.isArray(found) && found.length > 0) {
			setUser(found[0]);
			console.log("Logged in user:", found[0]);
			localStorage.setItem("userData", JSON.stringify(found[0]));
			return true;
		}

		return false;
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("userData");
	};

	const updateUser = (u: User) => {
		setUser(u);
		try {
			localStorage.setItem("userData", JSON.stringify(u));
		} catch (e) {
			console.warn("Failed to persist updated user", e);
		}
	};

	useEffect(() => {
		try {
			const stored = localStorage.getItem("userData");
			if (stored) {
				setUser(JSON.parse(stored));
			}
		} catch (e) {
			console.warn("Failed to parse stored userData", e);
		}
	}, []);

	return (
		<UserContext.Provider value={{ user, login, logout, updateUser }}>
			{children}
		</UserContext.Provider>
	);
}

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) throw new Error("useUser must be used inside UserProvider");
	return context;
};
