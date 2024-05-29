import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const getSession = async () => {
    const session = await getIronSession(cookies(), {
        password: process.env.SESSION_SECRET,
        cookieName: "user-session",
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: "strict",
            path: "/",
        },
    });
    return session;
};