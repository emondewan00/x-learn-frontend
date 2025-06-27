"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export function TopNavbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="User"
              />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
                U
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Admin</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/admin">
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <Button
                type="submit"
                onClick={() => signOut()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
