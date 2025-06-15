import { auth } from "@clerk/nextjs";

import prismadb from "./prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription1 = async () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    const userSubscription = await prismadb.userSubscription1.findUnique({
        where: {
            userId: userId
        },
        select: {
            razorpayPaymentId: true,
            razorpaySubscriptionId: true,
            subEnd: true,
           
        },
    });

    if (!userSubscription) {
        return false;
    }

    const isValid = userSubscription.razorpayPaymentId && userSubscription.subEnd?.getTime()! + DAY_IN_MS > Date.now();

    return !!isValid
}
export const checkSubscription = async () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId: userId
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
        },
    });

    if (!userSubscription) {
        return false;
    }

    const isValid = userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    return !!isValid
}
