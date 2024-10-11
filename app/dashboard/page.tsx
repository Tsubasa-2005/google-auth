"use client";

import { useEffect } from "react";
import useSignInAdapter from "@/app/dashboard/page.adapter";

export default function DashboardPage() {
    const { user, error, getUser } = useSignInAdapter();

    useEffect(() => {
        if (!user) {
            getUser().then(r => r);
        }
    }, [user, getUser]);

    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>Loading...</div>;

    return (
        <main>
            <h1>Welcome to the Dashboard</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </main>
    );
}