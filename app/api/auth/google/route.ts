import apiClient from "@/app/api/client";
import { setCookie } from "@/lib/utils/cookie";
import { GoogleAuthRequest } from "@/generated";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const requestBody = await request.json();
        console.log("Full Request Body:", requestBody);

        const { user, accessToken } = requestBody.session;

        const googleAuthRequest: GoogleAuthRequest = {
            signInRequest: { email: user.email, name: user.name, imageURL: user.image, token: accessToken }
        };

        console.log("Google Auth Request:", googleAuthRequest);

        const response = await apiClient.googleAuthRaw(googleAuthRequest);

        if (response.raw.ok) {
            const token = response.raw.headers.get("set-cookie");

            if (token) {
                console.log("aaaaaaaaaa")
                await setCookie(token);
                console.log("aaaaabbbbbbbbbbbbbbbb")
                return NextResponse.json({ success: true }, { status: 200 });
            } else {
                return NextResponse.json({ error: 'トークンが存在しません。' }, { status: 500 });
            }
        } else {
            const errorData = await response.raw.json();
            return NextResponse.json({ error: errorData.error || 'ログインに失敗しました' }, { status: response.raw.status });
        }
    } catch (error: any) {
        const errorResponseBody = await error.response.text();
        const parsedBody = JSON.parse(errorResponseBody);
        console.log("Error Response Body:", parsedBody.message);
        return NextResponse.json({ message: parsedBody.message }, { status: error.response.status });
    }
}
