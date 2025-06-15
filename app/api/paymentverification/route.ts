import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto"
import { absoluteUrl } from "@/lib/utils";
import bodyParser from "body-parser";
import { NextApiRequest } from "next";
import { any } from "zod";




export async function POST(request: NextRequest) {


    try {
        // const data = await bodyParser.json();
        // const reqBody=await request.json()
        // const {response:{razorpay_signature,razorpay_payment_id,razorpay_subscription_id}}= await request.body

        const result: { [key: string]: string } = {};

        request.body?.getReader().read().then(({ done, value }) => {
            if (done) {
                console.log("end");
                return

            }
            const decoder = new TextDecoder()
            // console.log(JSON.stringify(decoder.decode(value)));
            const inputString = decoder.decode(value)

            const keyValuePairs: string[] = inputString.split('&');

            // Initialize an empty object to store key-value pairs


            // Iterate over each key-value pair
            keyValuePairs.forEach((pair: string) => {
                // Split the pair by "=" to separate key and value
                const [key, value]: string[] = pair.split('=');
                // Assign key-value pair to the result object
                result[key] = value;
            });




        })


        console.log(result);



        const { userId } = auth();
        const user = await currentUser();
        const settingsUrl = absoluteUrl("/settings")

        // console.log(userId);

        // console.log(data);


        // console.log(result.razorpay_payment_id);
        // console.log(result.razorpay_signature);
        // console.log(result.razorpay_subscription_id);




        const userSubscription = await prismadb.userSubscription1.findUnique({
            where: {
                userId: userId as string
            }
        });;

        // const subscription_id = userSubscription.razorpaySubscriptionId

        const genarated_signature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_API_SECRET!
            )
            .update(result.razorpay_payment_id + "|" + result.razorpay_subscription_id, "utf-8")
            .digest("hex");

        const isAuthentic = genarated_signature === result.razorpay_signature

        if (!isAuthentic) {
            console.log("Payment Failed");
            return NextResponse.redirect(settingsUrl)


        }
        // await prismadb.userSubscription1.update({
        //     where: { userId: userId },
        //     data: { razorpaySignature: result.razorpay_signature, razorpayPaymentId: result.razorpay_payment_id }
        // })
        //         const addDays=(date:Date, days:number)=> {
        //             const result = new Date(date);
        //             result.setDate(result.getDate() + days);
        //             return result;
        //           }
        //           const currentDate = new Date();
        // const futureDate = addDays(currentDate, 30);

        await prismadb.userSubscription1.create({
            data: {
                razorpaySubscriptionId: result.razorpay_subscription_id, userId: userId as string, razorpaySignature: result.razorpay_signature, razorpayPaymentId: result.razorpay_payment_id,
            },
        })
        // userSubscription.razorpayPaymentId=razorpay_payment_id
        // userSubscription.razorpaySignature=razorpay_signature
        console.log("payment successful");

        return NextResponse.redirect(settingsUrl)


    } catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 })
    }

}