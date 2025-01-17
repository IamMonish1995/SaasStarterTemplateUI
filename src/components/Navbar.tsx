"use client";
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { buttonVariants } from "./ui/button";
import { LineChart, Menu, UserIcon } from "lucide-react";
import { LogoIcon } from "./Icons";
import { ModeToggle } from "./theme-toggle-btn";
import Link from "next/link";
import { SignInButton, SignedOut, useUser } from "@clerk/nextjs";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#pricing",
    label: "Pricing",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isSignedIn } = useUser();
  console.log({ 
    app_name: process.env.APP_NAME,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    });
  console.log({
    NEXT_PUBLIC_BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_API,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_JWT_SECRET_KEY: process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  });

  return (
    <div className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <Link href="/" className="ml-2 font-bold text-xl flex">
              <LogoIcon />
              {process.env.NEXT_PUBLIC_APP_NAME || process.env.APP_NAME}
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                ></Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Multi Instance SaaS
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}
                  {isSignedIn ? (
                    <>
                      <Link
                        href="/dashboard"
                        className={`w-[110px] border ${buttonVariants({
                          variant: "secondary",
                        })}`}
                      >
                        <LineChart className="mr-2 w-5 h-5" />
                        Go To Dashboard
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="sign-in"
                        className={`w-[110px] border ${buttonVariants({
                          variant: "secondary",
                        })}`}
                      >
                        <UserIcon className="mr-2 w-5 h-5" />
                        Login
                      </Link>
                      <SignedOut>
                        <SignInButton />
                      </SignedOut>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <Link
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            {isSignedIn ? (
              <Link
                href="/dashboard"
                className={`border ${buttonVariants({ variant: "secondary" })}`}
              >
                <LineChart className="mr-2 w-5 h-5" />
                Go To Dashboard
              </Link>
            ) : (
              <SignedOut>
                <Link
                  href="sign-in"
                  className={`border ${buttonVariants({
                    variant: "secondary",
                  })}`}
                >
                  <UserIcon className="mr-2 w-5 h-5" />
                  Login
                </Link>
              </SignedOut>
            )}

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
