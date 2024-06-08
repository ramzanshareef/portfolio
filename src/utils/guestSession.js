"use server";

import { getSession } from "./session";

const guestAccesKey = process.env.GUEST_ACCESS_KEY;

export const guestSession = async () => {
    const session = await getSession();
    session.isSub = "true";
    await session.save();
    return true;
}