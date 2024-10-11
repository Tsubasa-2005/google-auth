import { DefaultApi, Configuration } from "@/generated";
import { cookies } from "next/headers";

const getTokenAsync = async (): Promise<string> => {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('session');

    if (!sessionToken) {
        return '';
    }

    return sessionToken.value;
};

const apiClient = new DefaultApi(new Configuration({
    basePath: process.env.API_BASE_URL,
    accessToken: async () => await getTokenAsync(), // accessTokenにトークン取得関数を渡す
}));

export default apiClient;