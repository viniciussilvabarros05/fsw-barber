"use server";

import { cookies } from "next/headers";

export const saveCookies:(session:string)=>Promise<void> = async (session:string ) => {
    cookies().set("session",JSON.stringify(session))

     
};
