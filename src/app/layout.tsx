import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import UserContext from "@/context/user-context";
import { verifySession } from "@/lib/dal";

export const metadata: Metadata = {
	title: "Mythia | Discover and Share Original Novels, Myths & Fantasy Worlds",
	description:
		"Explore Mythia, the ultimate platform for writers and readers of original novels, myths, and fantasy stories. Create your world, publish your tales, and connect with a passionate storytelling community.",
	icons: {
		icon: "/mythia-logo.png",
		shortcut: "/mythia-logo.png",
		apple: "/mythia-logo.png",
	},
	openGraph: {
		url: "https://mythiavel.vercel.app",
		images: "/images/mythia-mascot.png",
		siteName: "Mythia Novel",
		title: "Mythia | Discover and Share Original Novels, Myths & Fantasy Worlds",
		description:
			"Explore Mythia, the ultimate platform for writers and readers of original novels, myths, and fantasy stories. Create your world, publish your tales, and connect with a passionate storytelling community.",
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
						<main className="mx-auto md:w-[80vw] w-[90vw]">
							{children}
						</main>
					</UserContext>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
