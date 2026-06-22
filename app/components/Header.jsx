'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default function Header() {

  const pathname = usePathname();

  const linkClass = (path) =>
    `relative pb-1 transition cursor-pointer
     ${
       pathname === path
         ? "text-purple-400 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-purple-400"
         : "text-gray-400 hover:text-purple-400"
     }`;

  return (

    <header className="sticky top-0 z-50 w-full h-20 border-b border-white/10 bg-black/70 backdrop-blur-xl text-white flex items-center px-6 md:px-10 justify-between">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-10">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="h-9 w-9" />
          <span className="text-xl font-semibold">AI Interview</span>
        </div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8 text-base">

          <Link href="/dashboard" className={linkClass("/dashboard")}>
            Dashboard
          </Link>

          <Link href="/questions" className={linkClass("/questions")}>
            Questions
          </Link>

          <Link href="/upgrade" className={linkClass("/upgrade")}>
            Upgrade
          </Link>

          <Link href="/how-it-works" className={linkClass("/how-it-works")}>
            How it Works?
          </Link>

        </nav>

      </div>

      {/* RIGHT SIDE USER */}
      <div className="flex items-center gap-4">

        <div className="relative group">

          <div className="p-[2px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 group-hover:scale-110 transition">

            <div className="bg-black rounded-full p-[2px]">

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9"
                  }
                }}
                afterSignOutUrl="/"
              />

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}