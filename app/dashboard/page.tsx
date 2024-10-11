'use client';

import { useEffect } from "react";
import useSignInAdapter from "@/app/dashboard/page.adapter";


export default function DashboardPage() {
    const { onSignIn, user } = useSignInAdapter();

    useEffect(() => {
        if (!user) {
            onSignIn().then(r => r);
        }
    }, [user, onSignIn]);

    if (!user) return <div>Loading...</div>;

    return (
        <main>
            <h1>Welcome to the Dashboard</h1>
            <p>Name: {user.id}</p>
            <p>Email: {user.name}</p>
        </main>
    );
}