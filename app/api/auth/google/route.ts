import apiClient from "@/app/api/client";
import { setCookie } from "@/lib/utils/cookie";
import { GoogleAuthRequest } from "@/generated";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const requestBody = await request.json();

        const { user, accessToken } = requestBody.session;

        const googleAuthRequest: GoogleAuthRequest = {
            signInRequest: { email: user.email, name: user.name, imageURL: user.image, token: accessToken }
        };

        const response = await apiClient.googleAuthRaw(googleAuthRequest);

        if (response.raw.ok) {
            const token = response.raw.headers.get("set-cookie");

            if (token) {
                await setCookie(token);
                return NextResponse.json({ success: true }, { status: 200 });
            } else {
                return NextResponse.json({ error: 'トークンが存在しません。' }, { status: 500 });
            }
        } else {
            const errorData = await response.raw.json();
            return NextResponse.json({ error: errorData.error || 'ログインに失敗しました' }, { status: response.raw.status });
        }
    } catch (error) {
        if (error instanceof Error && "response" in error) {
            const responseError = error as { response: Response };
            const errorResponseBody = await responseError.response.text();
            const parsedBody = JSON.parse(errorResponseBody);
            return NextResponse.json({ message: parsedBody.message }, { status: responseError.response.status });
        }

        return NextResponse.json({ message: '予期しないエラーが発生しました。' }, { status: 500 });
    }
}
