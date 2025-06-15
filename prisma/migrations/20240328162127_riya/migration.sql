-- CreateTable
CREATE TABLE "UserApiLimit" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "count" INT4 NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserApiLimit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "stripe_customer_id" STRING,
    "stripe_subscription_id" STRING,
    "stripe_price_id" STRING,
    "stripe_current_period_end" TIMESTAMP(3),

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSubscription1" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "razorpay_payment_id" STRING,
    "razorpay_subscription_id" STRING,
    "razorpay_signature" STRING,
    "subEnd" TIMESTAMP(3) NOT NULL DEFAULT (NOW() + '30 days'::interval),

    CONSTRAINT "UserSubscription1_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserApiLimit_userId_key" ON "UserApiLimit"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_userId_key" ON "UserSubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_stripe_customer_id_key" ON "UserSubscription"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_stripe_subscription_id_key" ON "UserSubscription"("stripe_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription1_userId_key" ON "UserSubscription1"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription1_razorpay_payment_id_key" ON "UserSubscription1"("razorpay_payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription1_razorpay_subscription_id_key" ON "UserSubscription1"("razorpay_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription1_razorpay_signature_key" ON "UserSubscription1"("razorpay_signature");
