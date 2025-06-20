import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import UserContext from "@/context/user-context";
import { verifySession } from "@/lib/dal";

export const metadata: Metadata = {
	title: "Mythia - Baca novel",
	description:
		"Mythia adalah platform baca novel online yang menyediakan berbagai genre dan cerita menarik untuk dinikmati.",
	icons: {
		icon: "/mythia-logo.png",
		shortcut: "/mythia-logo.png",
		apple: "/mythia-logo.png",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user } = await verifySession();

	return (
		<html lang="id" suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<UserContext user={user!}>
						<main>{children}</main>
					</UserContext>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
