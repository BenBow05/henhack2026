"use client";

import { createContext, useContext, useState } from "react";
import { User } from "@/data/types";

interface UserContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	const login = async (email: string, password: string) => {
		const found = await fetch(
			`http://localhost:3001/users?email=${email}&password=${password}`,
		).then((res) => res.json());

		if (found) {
			setUser(found[0]);
			console.log("Logged in user:", found[0]);
			localStorage.setItem("userData", found[0]);
			return true;
		}

		return false;
	};

	const logout = () => {
		setUser(null);
		localStorage.clear();
	};

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
}

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) throw new Error("useUser must be used inside UserProvider");
	return context;
};
