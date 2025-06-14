import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const callbackToken = req.headers.get("x-callback-token");
	console.log(callbackToken);

	if (callbackToken !== process.env.XENDIT_CALLBACK_TOKEN) {
		return new Response("Unauthorized", { status: 401 });
	}

	try {
		const body = await req.json();

		console.log("🔔 Xendit Webhook Received:", body);

		if (body.event === "ewallet.charge.success") {
			const data = body.data;
			// Handle successful charge (e.g., update DB)
			console.log(`✅ Payment succeeded: ${data.reference_id}`);
		}

		if (body.event === "ewallet.charge.failed") {
			console.log(`❌ Payment failed: ${body.data.reference_id}`);
		}

		return new Response(JSON.stringify({ received: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Webhook Error:", error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
