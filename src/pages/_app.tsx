import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "#public/globals.css";
import { AuthProvider } from "#srccontexts/auth-context.tsx";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Loader } from "#srccomponents/Loader.tsx";
export const metadata: Metadata = {
  title: "Template",
  description: "Template",
};

export default function App({ Component, pageProps }: any) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider appearance={{ baseTheme: dark }}>
        <div className={inter.className}>
          <Toaster />
          <AuthProvider>
            <Loader />
            {getLayout(<Component {...pageProps} />)}
          </AuthProvider>
        </div>
      </ClerkProvider>
    </ThemeProvider>
  );
}
