"use client";

import { MdEdit, MdHome, MdLogin, MdLogout } from "react-icons/md";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import NavbarButton from "./navbar-button";

const Navbar = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-20 flex h-12 w-full items-center justify-between bg-navbar-blue px-8">
      <div className="flex h-full">
        <NavbarButton
          isFocused={pathname === "/"}
          onClick={() => router.push("/")}
          tooltip="回到首頁"
        >
          <MdHome />
        </NavbarButton>
      </div>
      <div className="flex h-full">
        {session && (
          <NavbarButton
            isFocused={pathname === "/blog/create"}
            onClick={() => router.push("/blog/create")}
            tooltip="建立新文章"
          >
            <MdEdit />
          </NavbarButton>
        )}
        {session && (
          <NavbarButton
            isFocused={false}
            onClick={() => signOut({ callbackUrl: "/" })}
            tooltip="登出"
          >
            <MdLogout />
          </NavbarButton>
        )}
        {!session && (
          <NavbarButton
            isFocused={false}
            onClick={() => signIn("github", { callbackUrl: "/" })}
            tooltip="登入"
          >
            <MdLogin />
          </NavbarButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
