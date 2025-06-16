import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "jygqe5edc8.ufs.sh",
			},
		],
	},
	eslint: {
		// Warning: this will allow builds even if ESLint errors are present
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
