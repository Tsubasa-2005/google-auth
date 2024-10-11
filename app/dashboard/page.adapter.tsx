// src/app/index.adapter.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface AdapterProps {
    onSignIn: () => Promise<void>;
    user: any | null;
}

export default function useSignInAdapter(): AdapterProps {
    const router = useRouter();
    const [user, setUser] = useState<any | null>(null);

    const handleSignIn = async () => {
        try {
            // Step 1: Retrieve session data from `/api/get-session`
            const sessionResponse = await fetch("/api/get-session", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!sessionResponse.ok) {
                console.error("Failed to retrieve session from /api/get-session.");
                return;
            }

            const sessionData = await sessionResponse.json();

            // Step 2: Authenticate using the session's access token with `/api/auth/google`
            const authResponse = await fetch("/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ session: sessionData.session }),
            });

            if (!authResponse.ok) {
                console.error("Authentication failed on /api/auth/google.");
                return;
            }

            // Step 3: Fetch user data from `/api/session`
            const userResponse = await fetch("/api/session");
            if (userResponse.ok) {
                const userData = await userResponse.json();
                setUser(userData.user);

                // Step 4: Navigate to the dashboard if successful
                router.push("/dashboard");
            } else {
                console.error("Failed to retrieve user data from /api/session.");
            }
        } catch (error) {
            console.error("Error during sign-in process:", error);
        }
    };

    return { onSignIn: handleSignIn, user };
}