export type channelProperties = {
	mobile_number: string;
};

export type payment =
	| "ID_OVO"
	| "ID_LINKAJA"
	| "ID_DANA"
	| "ID_SHOPEEPAY"
	| null;

export type transaction = {
	id: string;
	amount: string;
	status: "PENDING" | "SUCCEEDED" | "FAILED";
	price: number;
	actions?: {
		desktop_web_checkout_url?: string;
	};
};

export const PAYMENT_METHOD: { label: string; name: payment | null }[] = [
	{
		label: "OVO",
		name: "ID_OVO",
	},
	{
		label: "DANA",
		name: "ID_DANA",
	},
	{
		label: "LINK AJA",
		name: "ID_LINKAJA",
	},
	{
		label: "SHOPEEPAY",
		name: "ID_SHOPEEPAY",
	},
];
