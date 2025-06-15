import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from 'openai';
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription, checkSubscription1 } from "@/lib/subscription";
import Replicate from "replicate";
import { measureMemory } from "vm";
import axios from "axios";

const openai = new OpenAI({

    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
});



export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;
        console.log(prompt);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // if (!openai.apiKey) {
        //     return new NextResponse("OpenAI API key not configured ", { status: 500 });
        // }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        // if (!amount) {
        //     return new NextResponse("Amount is required", { status: 400 });
        // }

        // if (!resolution) {
        //     return new NextResponse("Resolution is required", { status: 400 });
        // }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription() || await checkSubscription1();

        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired.", { status: 403 });
        }
        const messages = [{ "role": "user", "content": prompt }]

       console.log("before");
       
        const response = await axios.post(process.env.IMAGE_URL!, { message:prompt }, {
            // responseType: "arraybuffer", // Needed for binary image data
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log("aftyer");
        
        // Convert image buffer to base64
        // const base64Image = Buffer.from(response.data.image_base64, "binary").toString("base64");


        console.log(response.data.image_base64);


        if (!isPro) {
            await increaseApiLimit();
        }

        //console.log(response);
        // return NextResponse.json(response,{status:200});
        console.log({
             content: response.data.image_base64,
            role: "nexzenith"
        });
        
        return NextResponse.json({
            content: response.data.image_base64,
            role: "nexzenith"
        });

    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}