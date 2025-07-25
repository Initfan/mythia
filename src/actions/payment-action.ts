"use server";

import { transaction } from "@/components/payment/type";
import { verifySession } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

const customerSchema = z.object({
	reference_id: z.string().max(255),
	currency: z.enum(["IDR"]),
	amount: z.number(),
	checkout_method: z.enum(["ONE_TIME_PAYMENT", "TOKENIZED_PAYMENT"]),
	channel_code: z.enum(["ID_OVO", "ID_LINKAJA", "ID_DANA", "ID_SHOPEEPAY"]),
	channel_properties: z
		.object({
			mobile_number: z.string().nullable(),
		})
		.optional(),
});

export const eWallatetCharge = async (
	data: z.infer<typeof customerSchema>
): Promise<transaction> => {
	const parsed = customerSchema.safeParse(data);

	if (!parsed.success) throw new Error("Invalid credentials");

	if (
		parsed.data.channel_code == "ID_OVO" &&
		!parsed.data.channel_properties?.mobile_number
	)
		throw new Error("OVO Number is Required");

	const charge = await fetch("https://api.xendit.co/ewallets/charges", {
		method: "POST",
		headers: {
			"content-type": "application/json",
			Authorization: `Basic ${Buffer.from(
				`${process.env.XENDIT_KEY}:`
			).toString("base64")}`,
		},
		body: JSON.stringify({
			...parsed.data,
			channel_properties: {
				...parsed.data.channel_properties,
				success_redirect_url: `${process.env.ENDPOINT}`,
			},
		}),
	});

	const res = await charge.json();

	return {
		id: res.id,
		status: res.status,
		amount: parsed.data.reference_id.split("-")[1],
		price: res.charge_amount,
		actions: res.actions,
	};
};

export const checkPaymentStatus = async (
	chargeId: string
): Promise<transaction["status"]> => {
	const checkPayment = await fetch(
		`https://api.xendit.co/ewallets/charges/${chargeId}`,
		{
			method: "GET",
			headers: {
				"content-type": "application/json",
				Authorization: `Basic ${Buffer.from(
					`${process.env.XENDIT_KEY}:`
				).toString("base64")}`,
			},
		}
	);

	const res = await checkPayment.json();

	return res.status;
};

export const addUserBalance = async (amount: number) => {
	const { user } = await verifySession();

	if (!user) return;

	await prisma.user.update({
		where: { id: user.id },
		data: { coin: { increment: amount } },
	});

	return redirect("/");
};
