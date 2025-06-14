/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { eWallatetCharge } from "@/actions/payment-action";
import ChannelProperties from "@/components/payment/channel-properties";
import TransactionStatus from "@/components/payment/transaction-status";
import {
	channelProperties,
	payment,
	PAYMENT_METHOD,
	transaction,
} from "@/components/payment/type";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { userContext } from "@/context/user-context";
import { Coins, Loader2, Minus } from "lucide-react";
import { useContext, useState, useTransition } from "react";

const page = () => {
	const user = useContext(userContext);
	const [channelProperties, setChannelProperties] =
		useState<channelProperties>();
	const [pending, transition] = useTransition();
	const [payment, setPayment] = useState<{ label: string; name: payment }>({
		label: "",
		name: null,
	});
	const [charged, setCharged] = useState<transaction | null>();

	const [coin, setCoin] = useState({
		id: 0,
		value: 0,
		price: 0,
	});

	const generatePayment = () => {
		transition(async () => {
			const createdCharge = await eWallatetCharge({
				amount: coin.price,
				channel_code: payment.name!,
				currency: "IDR",
				checkout_method: "ONE_TIME_PAYMENT",
				reference_id: `topup_${user?.username}-${coin.value}`,
				channel_properties: channelProperties,
			});
			setCharged(createdCharge);
		});
	};

	const onSetChannel = (data: channelProperties) => {
		setChannelProperties(data);
	};

	return charged ? (
		<TransactionStatus {...charged} />
	) : (
		<div className="h-full relative">
			<h2 className="text-2xl font-semibold mb-4">Top Up Koin</h2>
			<div className="space-y-3">
				<div className="grid grid-cols-3 gap-3">
					{Array.from({ length: 5 }).map((v, i) => (
						<Card
							key={i}
							className={`${
								coin.id == i + 1
									? "bg-primary"
									: "bg-transparent"
							} cursor-pointer`}
							onClick={() =>
								setCoin({
									id: i + 1,
									value: 50 * (i + 1),
									price: 10000 * (i + 1),
								})
							}
						>
							<CardContent>
								<CardTitle className="flex justify-between items-center">
									<div className="flex items-center space-x-2">
										<Coins />
										<span>{50 * (i + 1)} Koin</span>
									</div>
									<span className="text-sm text-muted-foreground">
										{(10000 * (i + 1)).toLocaleString(
											"id-ID"
										)}
									</span>
								</CardTitle>
							</CardContent>
						</Card>
					))}
				</div>
				<Select
					onValueChange={(value: string) =>
						setPayment({ name: value as payment, label: "" })
					}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Pilih Pembayaran" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{PAYMENT_METHOD.map((v) => (
								<SelectItem value={v.name!} key={v.name}>
									{v.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				<ChannelProperties
					payment={payment.name}
					setChannel={onSetChannel}
				/>
			</div>
			<Card className="absolute py-4 inset-x-0 bottom-4 rounded bg-accent">
				<CardContent>
					<div className="flex justify-between">
						<div className="flex space-x-1 items-center">
							<h1 className="text-xl font-semibold ">
								Rp,{coin.price.toLocaleString("id-ID")}
							</h1>
							<Minus className="rotate-90" />
							<p className="flex space-x-2">
								<Coins size={20} />
								<span>{coin.value}</span>
							</p>
						</div>
						<Button disabled={pending} onClick={generatePayment}>
							{pending && <Loader2 className="animate-spin" />}
							Bayar {payment.label}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default page;
