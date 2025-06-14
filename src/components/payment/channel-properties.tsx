import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { channelProperties, payment } from "./type";

const ChannelProperties = ({
	payment,
	setChannel,
}: {
	payment: payment;
	setChannel: (data: channelProperties) => void;
}) => {
	const handleSetChannel = (data: channelProperties) => {
		setChannel({ mobile_number: `+62${data.mobile_number}` });
	};

	if (payment == "ID_OVO")
		return (
			<div className="space-y-3">
				<h1 className="text-xl">Nomor Telepon</h1>
				<div className="flex space-x-2 items-center">
					<Button variant="outline" disabled>
						<Image
							src="/flag-indo.svg"
							alt="flag"
							height={20}
							width={20}
						/>
						+62
					</Button>
					<Input
						placeholder="8"
						onChange={(e) =>
							handleSetChannel({
								mobile_number: e.currentTarget.value,
							})
						}
					/>
				</div>
			</div>
		);

	return <></>;
};

export default ChannelProperties;
