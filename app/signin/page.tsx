"use client";

import { signIn } from "next-auth/react";

export default function Home() {
    return (
        <main
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
            }}
        >
            <div>
                <button
                    style={{ marginRight: 10 }}
                    onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                >
                    Sign in
                </button>
            </div>
        </main>
    );
}