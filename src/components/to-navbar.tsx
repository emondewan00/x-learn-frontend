import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";

export function TopNavbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="flex items-center gap-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
            U
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
