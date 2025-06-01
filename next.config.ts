import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["jygqe5edc8.ufs.sh", "picsum.photos"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "jygqe5edc8.ufs.sh",
				port: "",
				search: "",
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
			},
		],
	},
};

export default nextConfig;
