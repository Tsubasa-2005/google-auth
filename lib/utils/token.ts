import 'server-only';
import jwt from 'jsonwebtoken';

// JWTのペイロードの型を定義
interface UserTokenPayload extends jwt.JwtPayload {
    id: number;
    name: string;
    imageURL: string;
}

// 型を指定したデコード関数
export function parseToken(token: string): UserTokenPayload | null {
    try {
        // jwt.decode は署名検証なしでトークンをデコードします
        const decoded = jwt.decode(token);

        // 型をチェックしてペイロードが期待される構造かどうかを確認
        if (!decoded || typeof decoded === 'string') {
            console.error("Invalid token");
            return null;
        }

        // decoded が期待される UserTokenPayload の型かどうか確認
        return decoded as UserTokenPayload;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}