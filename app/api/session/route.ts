import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {parseToken} from "@/lib/utils/token";

export async function GET() {
    try {
        const cookieStore = cookies();
        const sessionToken = cookieStore.get('session');

        if (!sessionToken) {
            return NextResponse.json({ error: 'No session token found' }, { status: 401 });
        }

        const user = parseToken(sessionToken.value);

        return NextResponse.json({ user: user }, { status: 200 });
    } catch (error) {
        console.error('Failed to retrieve session:', error);
        return NextResponse.json({ error: 'Failed to retrieve session' }, { status: 500 });
    }
}
