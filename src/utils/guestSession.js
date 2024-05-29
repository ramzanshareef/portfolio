"use server";

import { getSession } from "./session";

const guestAccesKey = process.env.GUEST_ACCESS_KEY;

export const guestSession = async (password) => {
    if (password === guestAccesKey) {
        const session = await getSession();
        session.isSub = "true";
        await session.save();
        return true;
    }
    return false;
}