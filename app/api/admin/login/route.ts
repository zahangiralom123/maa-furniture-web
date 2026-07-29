import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(req : Request)
{
    const {username , password} = await req.json();
    if(username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD
    )
    {
        return NextResponse.json({success : false, message : "Invalid Credentials"}, {status : 401});
    }
    const   cookieStore = await cookies();
    cookieStore.set("admin-session", process.env.ADMIN_SECRET!, {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : "strict",
        path : "/",
        maxAge : 60 * 60 * 24 * 7,
    });
    return NextResponse.json({success : true});
}