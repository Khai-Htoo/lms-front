"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import axios from "axios";
import { useEffect } from "react";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_SOCKET_SERVER_URL || "http://localhost:4000";
const socketId = socketIO(ENDPOINT!, { transports: ["websocket"] });
const inter = Inter({ subsets: ["latin"] });
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
axios.defaults.withCredentials = true;
// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    console.log(socketId);
  }, []);
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased  ",
          fontSans.variable
        )}
      >
        <Provider store={store}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
