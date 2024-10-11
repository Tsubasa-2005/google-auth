import 'server-only';
import jwt from 'jsonwebtoken';
import {UserTokenPayload} from "@/lib/utils/payload_type";

export function parseToken(token: string): UserTokenPayload | null {
    try {
        const decoded = jwt.decode(token);

        if (!decoded || typeof decoded === 'string') {
            console.error("Invalid token");
            return null;
        }

        return decoded as UserTokenPayload;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}