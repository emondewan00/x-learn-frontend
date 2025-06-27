"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, BookOpen } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = useSession();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Blog", href: "#blog" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex  justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">X-Learn</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 ml-4">
            {session ? (
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
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {session.user?.role === "admin" ? (
                    <Link href="/admin">
                      <DropdownMenuItem>Dashboard</DropdownMenuItem>
                    </Link>
                  ) : (
                    <>
                      <DropdownMenuItem>
                        <Link href={"/my-courses"}>My Courses</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem>
                    <Button
                      onClick={() => signOut()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Sign Up
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                {session ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <div className="size-10 bg-gray-300 rounded-full cursor-pointer" />
                      <div>
                        <p className="font-medium text-gray-800">
                          {session?.user?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {session?.user?.email}
                        </p>
                      </div>
                    </div>
                    {session.user?.role === "admin" ? (
                      <Link href="/admin/dashboard">
                        <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                          Dashboard
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link
                          href="/my-courses"
                          className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1"
                        >
                          My Courses
                        </Link>
                        <Link
                          href="/profile"
                          className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1"
                        >
                          Profile
                        </Link>
                      </>
                    )}

                    <Button
                      onClick={() => signOut()}
                      className="bg-blue-600 hover:bg-blue-700 w-full"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/register">
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                      Sign Up
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
