"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {UserTokenPayload} from "@/lib/utils/payload_type";

interface AdapterProps {
    onSignIn: () => Promise<void>;
    user: UserTokenPayload | null;
}

export default function useSignInAdapter(): AdapterProps {
    const router = useRouter();
    const [user, setUser] = useState<UserTokenPayload | null>(null);

    const handleSignIn = async () => {
        try {
            const sessionResponse = await fetch("/api/get-session", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!sessionResponse.ok) {
                console.error("Failed to retrieve session from /api/get-session.");
                return;
            }

            const sessionData = await sessionResponse.json();

            const authResponse = await fetch("/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ session: sessionData.session }),
            });

            if (!authResponse.ok) {
                console.error("Authentication failed on /api/auth/google.");
                return;
            }

            const userResponse = await fetch("/api/session");
            if (userResponse.ok) {
                const userData = await userResponse.json();
                setUser(userData.user as UserTokenPayload);

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