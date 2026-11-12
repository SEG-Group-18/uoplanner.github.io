import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuestionAssistant } from "@/components/QuestionAssistant";
import { SiteProvider } from "@/components/SiteProvider";
import { WelcomeExperience } from "@/components/WelcomeExperience";
import "./globals.css";

export const metadata: Metadata = {
  title: "UOPlanner — Plan your Ottawa semester",
  description:
    "Compare uOttawa course schedules, avoid timetable conflicts, and find a week that fits.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col">
        <SiteProvider>
          <WelcomeExperience>
            <Header />
            {children}
            <Footer />
            <QuestionAssistant />
          </WelcomeExperience>
        </SiteProvider>
      </body>
    </html>
  );
}
