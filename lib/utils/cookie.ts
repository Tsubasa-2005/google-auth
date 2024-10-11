import 'server-only';
import { cookies } from 'next/headers';

export async function setCookie(token: string) {

    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);

    cookies().set('session', token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}
