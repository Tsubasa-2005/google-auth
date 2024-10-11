import jwt from 'jsonwebtoken';

export interface UserTokenPayload extends jwt.JwtPayload {
    id: number;
    name: string;
    imageURL: string;
}