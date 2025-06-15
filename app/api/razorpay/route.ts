export const dynamic = "force-dynamic";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { razorpay } from "@/lib/razorpay";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings")


export async function GET() {
    const { userId } = auth();
    const user = await currentUser();
    try {

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const userSubscription=await prismadb.userSubscription1.findUnique({
            where: {
                userId
            }
        });
       
        const plan_id=process.env.PLAN_ID || 'plan_NkaWdpKFZG51Mv'

        const razorpaySession=await razorpay.subscriptions.create({
            plan_id,
            customer_notify: 1,
            total_count: 1,
            
           
          })
        //   console.log(userSubscription);
        //   console.log(razorpaySession);
         
          
        // userSubscription.razorpaySubscriptionId=razorpaySession.id
        return  NextResponse.json({success:true,subscriptionId:razorpaySession.id})

    } catch (error) {
        console.log("[STRIPE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}
        