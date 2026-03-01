"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowLeft } from "lucide-react";

export default function Login() {
	const router = useRouter();
	const [form, setForm] = useState({ email: "", password: "" });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// placeholder authentication logic
		// TODO: replace with real auth call
		router.push("/");
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="bg-[#299963] px-4 py-8 shadow-lg">
				<div className="max-w-6xl mx-auto flex items-center justify-between">
					<Link href="/" className="flex items-center gap-3 text-white">
						<ArrowLeft className="w-6 h-6" />
						<span className="text-2xl font-bold">Back</span>
					</Link>
					<h1 className="text-3xl font-bold bg-gradient-to-r from-accent from-[80%] to-secondary to-[75%] bg-clip-text text-transparent">
						Gatherly
					</h1>
					<div />
				</div>
			</header>

			<main className="flex items-center justify-center py-12 px-4">
				<form
					onSubmit={handleSubmit}
					className="w-full max-w-md bg-card rounded-xl shadow-lg p-8 border border-border space-y-6"
				>
					<h2 className="text-2xl font-semibold text-center">Login</h2>

					<div>
						<label htmlFor="email">
							<Mail className="w-4 h-4" /> Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							value={form.email}
							onChange={handleChange}
							className="mt-1"
							placeholder="you@example.com"
						/>
					</div>

					<div>
						<label htmlFor="password">
							<Lock className="w-4 h-4" /> Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							value={form.password}
							onChange={handleChange}
							className="mt-1"
							placeholder="••••••••"
						/>
					</div>

					<button type="submit" className="w-full">
						Sign in
					</button>

					<p className="text-sm text-center text-muted-foreground">
						Don&apos;t have an account?{" "}
						<Link href="/signup" className="text-primary underline">
							Sign up
						</Link>
					</p>
				</form>
			</main>
		</div>
	);
}
