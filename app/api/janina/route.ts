import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from 'openai';

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

import axios from "axios";
import prismadb from "@/lib/prismadb";
import { checkSubscription, checkSubscription1 } from "@/lib/subscription";


export async function GET(
    req: Request
){
    const { userId } =auth();
    try{
const isPro = await checkSubscription() || await checkSubscription1();

if(isPro){

    return NextResponse.json({
        isPro:true,
        
    })
    
}
else {
    return NextResponse.json({
        isPro:false,

    })
}
    }catch(error){
        console.log("[CONVERSATION_ERROR]",error);
        return new NextResponse("Internal error",{status: 500});
    }
}