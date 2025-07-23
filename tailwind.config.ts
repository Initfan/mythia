import { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}", // if you're using the App Router
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
export default config;
