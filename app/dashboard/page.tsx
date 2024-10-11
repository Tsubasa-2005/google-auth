// src/app/dashboard/page.tsx
'use client';

import { useEffect } from "react";
import useSignInAdapter from "@/app/dashboard/page.adapter";


export default function DashboardPage() {
    const { onSignIn, user } = useSignInAdapter();

    useEffect(() => {
        if (!user) {
            onSignIn(); // Trigger the sign-in process to fetch user data
        }
    }, [user, onSignIn]);

    if (!user) return <div>Loading...</div>;

    return (
        <main>
            <h1>Welcome to the Dashboard</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </main>
    );
}