/** @type {import('tailwindcss').Config} */
const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx}", // if you're using the App Router
		"./src/**/*.{js,ts,jsx,tsx}", // if you're using the App Router
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
export default config;
