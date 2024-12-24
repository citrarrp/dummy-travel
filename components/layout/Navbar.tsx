"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Wrapper from "../Wrapper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
// import SearchBar from "../SearchBar";
import { ModeToggle } from "../mode-toggle";
// import { NavMenu } from "./NavMenu";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const { userId } = useAuth();
  return (
    <div className="sticky top-0 border border-b-secondary/10 bg-primary z-10 text-white">
      <Wrapper>
        <div className="flex items-center justify-between">
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image src="/icons/Logo.png" alt="logo" width={250} height={150} />
          </div>

          <nav className="hidden space-x-6 md:flex">
            <Link
              className="font-medium text-sm transition-colors hover:text-[#FF6B6B]"
              href="/explore"
            >
              Explore
            </Link>
            <Link
              className="font-medium text-sm transition-colors hover:text-[#FF6B6B]"
              href="/destinations"
            >
              Destinations
            </Link>
            <Link
              className="font-medium text-sm transition-colors hover:text-[#FF6B6B]"
              href="#"
            >
              My Trips
            </Link>
            <Link
              className="font-medium text-sm transition-colors hover:text-[#FF6B6B]"
              href="#"
            >
              Community
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ModeToggle />
            {/* <NavMenu /> */}
            {userId ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => router.push("/sign-in")}
                  className="text-black"
                >
                  Sign in
                </Button>
                <Button onClick={() => router.push("/sign-up")}>Sign up</Button>
              </>
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Navbar;
