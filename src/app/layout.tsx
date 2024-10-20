import type { Metadata } from "next";
import localFont from "next/font/local";
import "./app.css";
import "./globals.css";
import "@coinbase/onchainkit/styles.css";

import Providers from "@/components/providers";
import { ThemeProvider } from "@/components/providers/themeProvider";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Futureproof",
	description: "Secure your future, one goal at a time",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} font-sans bg-gray-900`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem>
					<Providers>{children}</Providers>
				</ThemeProvider>
			</body>
		</html>
	);
}
