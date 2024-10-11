import type {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
    debug:false,
    session: {
        strategy: "jwt",
        maxAge: 60 * 2,
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.id_token;
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                accessToken: token.accessToken,
                user: {
                    ...session.user,
                },
            };
        },
    }
};