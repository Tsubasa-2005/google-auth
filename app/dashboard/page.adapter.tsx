"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { UserTokenPayload } from "@/lib/utils/payload_type";

interface AdapterProps {
    onSignIn: () => Promise<void>;
    getUser: () => Promise<void>;
    user: UserTokenPayload | null;
    error: string | null;
}

export default function useSignInAdapter(): AdapterProps {
    const router = useRouter();
    const [user, setUser] = useState<UserTokenPayload | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch user data from /api/getUser
    const getUser = useCallback(async () => {
        if (user) return; // Only execute if user is null

        try {
            const userResponse = await fetch("/api/session", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();
                setUser(userData.user as UserTokenPayload);
                setError(null);
            } else {
                setError("Failed to retrieve user data from /api/getUser.");
            }
        } catch (error) {
            setError(`Error fetching user data: ${error}`);
        }
    }, [user]);

    const handleSignIn = async () => {
        try {
            const sessionResponse = await fetch("/api/get-session", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!sessionResponse.ok) {
                setError("Failed to retrieve session from /api/get-session.");
                router.push("/signin");
                return;
            }

            const sessionData = await sessionResponse.json();

            const authResponse = await fetch("/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ session: sessionData.session }),
            });

            if (authResponse.ok) {
                setError(null);
                router.push("/dashboard");
            } else {
                setError("Authentication failed on /api/auth/google.");
                router.push("/signin");
            }
        } catch (error) {
            setError(`Error during sign-in process: ${error}`);
            router.push("/signin");
        }
    };

    return { onSignIn: handleSignIn, getUser, user, error };
}