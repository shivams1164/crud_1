// Layout component: Navbar
"use client";
import React, { useState } from "react";
import { Search, Menu, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/FormElements";

interface NavbarProps {
  onMenuClick?: () => void;
  onSearch?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Mobile menu button */}
        <button onClick={onMenuClick} className="md:hidden text-gray-600 hover:text-gray-900">
          <Menu size={24} />
        </button>

        {/* Search bar */}
        <div className="flex-1 mx-4 md:mx-6 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 bg-gray-50 border-gray-300 focus:bg-white"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <button className="relative text-gray-600 hover:text-gray-900 transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
