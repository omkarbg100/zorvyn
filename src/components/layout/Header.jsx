import React, { useState } from "react";
import { useStore } from "../../store";
import { LayoutDashboard, Shield, User, Sun, Moon, Loader2, Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { UserProfileModal } from "./UserProfileModal";

export const Header = () => {
  const { role, setRole, theme, toggleTheme, isLoading, user } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border z-30 px-4 sm:px-6 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center gap-2">
        <div className="bg-primary-500 p-2 rounded-xl text-white flex items-center justify-center">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LayoutDashboard className="w-5 h-5" />}
        </div>
        <h1 className="text-xl font-bold text-text transition-colors duration-300">FinDash</h1>
      </div>

      <div className="flex items-center gap-3 sm:hidden">
        {/* Avatar Mobile */}
        <button
          onClick={() => setIsProfileOpen(true)}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-blue-500 border-2 border-white dark:border-gray-800 shadow-sm flex items-center justify-center text-xs font-bold text-white uppercase hover:scale-105 transition-transform"
        >
          {user?.name?.charAt(0) || "U"}
        </button>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-text-muted hover:text-text transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-text-muted hover:text-text transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
        </button>

        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 transition-colors duration-300">
          <button
            onClick={() => setRole("viewer")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all",
              role === "viewer"
                ? "bg-white dark:bg-gray-700 text-text shadow-sm"
                : "text-text-muted hover:text-text",
            )}
          >
            <User className="w-4 h-4" />
            <span className="hidden md:inline">Viewer</span>
          </button>
          <button
            onClick={() => setRole("admin")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all",
              role === "admin"
                ? "bg-white dark:bg-gray-700 text-text shadow-sm"
                : "text-text-muted hover:text-text",
            )}
          >
            <Shield className="w-4 h-4" />
            <span className="hidden md:inline">Admin</span>
          </button>
        </div>
        
        {/* Avatar Desktop */}
        <button
          onClick={() => setIsProfileOpen(true)}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-blue-500 border-2 border-white dark:border-gray-800 shadow-sm flex items-center justify-center text-xs font-bold text-white uppercase hover:scale-105 transition-transform"
        >
          {user?.name?.charAt(0) || "U"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-surface border-b border-border p-4 shadow-lg flex flex-col gap-4 sm:hidden animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text">Theme</span>
            <button
              onClick={toggleTheme}
              className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-text-muted transition-colors flex items-center justify-center"
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            </button>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-text">Account Role</span>
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => { setRole("viewer"); setIsMobileMenuOpen(false); }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all",
                  role === "viewer"
                    ? "bg-white dark:bg-gray-700 text-text shadow-sm"
                    : "text-text-muted",
                )}
              >
                <User className="w-4 h-4" />
                Viewer
              </button>
              <button
                onClick={() => { setRole("admin"); setIsMobileMenuOpen(false); }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all",
                  role === "admin"
                    ? "bg-white dark:bg-gray-700 text-text shadow-sm"
                    : "text-text-muted",
                )}
              >
                <Shield className="w-4 h-4" />
                Admin
              </button>
            </div>
          </div>
        </div>
      )}

      {isProfileOpen && <UserProfileModal onClose={() => setIsProfileOpen(false)} />}
    </header>
  );
};
