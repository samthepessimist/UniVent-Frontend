import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User as UserIcon, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

// Role -> home route + role-specific nav links.
// Matches the routes documented in the project README.
const ROLE_CONFIG = {
  STUDENT: {
    homeHref: "/student",
    profileHref: "/student/profile",
    links: [{ label: "My Bookings", href: "/student/bookings" }],
  },
  ORGANIZER: {
    homeHref: "/organizer/events",
    profileHref: "/organizer/events",
    links: [{ label: "Create Event", href: "/organizer/events/create" }],
  },
  ADMIN: {
    homeHref: "/admin",
    profileHref: "/admin",
    links: [
      { label: "All Events", href: "/admin/events" },
      { label: "Manage Users", href: "/admin/users" },
    ],
  },
};

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const config = ROLE_CONFIG[user?.role] ?? { homeHref: "/", profileHref: "/", links: [] };

  const handleNavigate = (href) => {
    setMobileOpen(false);
    navigate(href);
  };

  const handleLogout = () => {
    setMobileOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => handleNavigate(config.homeHref)}
          aria-label="Go to home"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-sm font-bold text-white">
            U
          </span>
          UniVent
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {config.links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavigate(link.href)}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-slate-100">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigate(config.profileHref)}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <button
            onClick={() => setMobileOpen((open) => !open)}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 md:hidden">
          <div className="flex items-center gap-3 border-b border-slate-100 py-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium text-slate-900">{user?.name}</p>
          </div>

          <div className="flex flex-col py-2">
            {config.links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigate(link.href)}
                className="rounded-md px-3 py-2 text-left text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavigate(config.profileHref)}
              className="rounded-md px-3 py-2 text-left text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
