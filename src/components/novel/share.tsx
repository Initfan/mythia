"use client";
import { useEffect, useState } from "react";
import {
	FacebookIcon,
	FacebookShareButton,
	TelegramIcon,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappIcon,
	WhatsappShareButton,
	XIcon,
} from "react-share";

const Share = () => {
	const [location, setLocation] = useState("");

	useEffect(() => setLocation(window.location.href), []);

	return (
		<div className="space-x-2 flex items-center">
			<FacebookShareButton url={location}>
				<FacebookIcon size={25} className="rounded-full" />
			</FacebookShareButton>
			<TelegramShareButton url={location}>
				<TelegramIcon size={25} className="rounded-full" />
			</TelegramShareButton>
			<WhatsappShareButton url={location}>
				<WhatsappIcon size={25} className="rounded-full" />
			</WhatsappShareButton>
			<TwitterShareButton url={location}>
				<XIcon size={25} className="rounded-full" />
			</TwitterShareButton>
		</div>
	);
};

export default Share;
