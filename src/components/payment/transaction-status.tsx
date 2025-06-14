"use client";
import { Banknote, CircleAlert, Coins } from "lucide-react";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { transaction } from "./type";
import { addUserBalance, checkPaymentStatus } from "@/actions/payment-action";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Link from "next/link";

const TransactionStatus = ({
	id,
	amount,
	status,
	price,
	actions,
}: transaction) => {
	const [counter, setCounter] = useState<number>(60);
	const [currentStatus, setStatus] = useState<transaction["status"]>(status);

	useEffect(() => {
		if (counter <= 0 || currentStatus !== "PENDING") return;

		const timeout = setTimeout(() => {
			setCounter((prev) => prev - 1);
		}, 1000);

		return () => clearTimeout(timeout);
	}, [counter, currentStatus]);

	useEffect(() => {
		const pollPaymentStatus = async () => {
			if (currentStatus === "SUCCEEDED") {
				toast("Berhasil membeli koin");
				await addUserBalance(Number(amount));
			}

			if (currentStatus === "PENDING" && counter % 4 === 0) {
				const res = await checkPaymentStatus(id);
				setStatus(res);
			}
		};

		pollPaymentStatus();
	}, [counter, currentStatus, amount, id]);

	return (
		<div className="h-full flex flex-col items-center justify-center space-y-2">
			<h1 className="text-4xl font-bold">
				Pembelian Koin {currentStatus == "SUCCEEDED" && "Berhasil"}
			</h1>
			<div className="flex space-x-2 items-center">
				<Coins className="text-primary" />
				<h1 className="text-4xl font-bold">{amount}</h1>
				<Separator className="w-2" orientation="vertical" />
				<p>Rp,{Number(price).toLocaleString("id-ID")}</p>
			</div>
			{currentStatus == "PENDING" && (
				<>
					<div className="relative">
						<Banknote size={100} className="text-green-500" />
					</div>
					<div className="flex space-x-3">
						<h2 className="text-2xl font-semibold animate-pulse text-yellow-500">
							{currentStatus}
						</h2>
					</div>
					<h1 className="text-6xl">{counter}</h1>
					<div className="text-muted-foreground text-sm items-center flex space-x-2">
						<CircleAlert />
						<p>Segera Selesaikan Pembayaran</p>
					</div>
					{actions?.desktop_web_checkout_url && (
						<Button>
							<Link
								href={actions.desktop_web_checkout_url}
								target="_blank"
							>
								Bayar
							</Link>
						</Button>
					)}
				</>
			)}
		</div>
	);
};

export default TransactionStatus;
