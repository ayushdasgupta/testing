import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from 'openai';
import ChatCompletionRequestMessage from 'openai';
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription, checkSubscription1 } from "@/lib/subscription";
import axios from "axios";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});
//Const openai =new OpwenAIApi(configuration);

// const instructionMessage: ChatCompletionRequestMessage = {
//     role: "system",
//     content: "You are a code generator. You must answer only in markdown code snippets. Use code code comments for explanation."
// }

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        
        const { messages } = body;
        console.log(messages);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // if(!openai.apiKey){
        //     return new NextResponse("OpenAI API key not configured ",{status:500});
        // }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }
        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription() || await checkSubscription1();

        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired.", { status: 403 });
        }


        // const response = await openai.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages: [instructionMessage, ...messages],
        // });
        console.log('before');
        
        const response = await axios.post(process.env.CODE_URL!, {
            prompt: messages,
            max_tokens:500
        },);

        console.log("after");
        
        if (!isPro) {
            await increaseApiLimit();
        }

        //console.log(chatCompletion.choices[0].message.content);
        return NextResponse.json(response.data);

    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}