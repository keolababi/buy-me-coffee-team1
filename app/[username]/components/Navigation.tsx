import React, { useState } from "react";
import { Avatar } from "./Avatar";
import { CoffeeIcon } from "@/app/Icons/CoffeeIcon";
import { ChevronDownIcon } from "@/app/Icons/Chevrondown";
import { MOCK_CREATOR } from "../../supporter/data";

export const Navigation = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const creator = MOCK_CREATOR;

  return (
    <header className="flex h-[72px] items-center justify-between px-[7.2%]">
      <div className="flex items-center gap-2.5 text-[#09090B]">
        <CoffeeIcon />
        <span className="text-base font-bold tracking-[-0.01em]">
          Buy Me Coffee
        </span>
      </div>

      <div className="relative">
        <button
          onClick={() => setProfileMenuOpen((open) => !open)}
          className="flex items-center gap-2.5 rounded-full px-2 py-1 text-sm font-medium text-[#09090B]"
          aria-expanded={profileMenuOpen}
          aria-haspopup="menu"
        >
          <Avatar name={creator.name} url={creator.avatarUrl} size={52} />
          <span>Jake</span>
          <ChevronDownIcon />
        </button>

        {profileMenuOpen && (
          <div
            role="menu"
            className="absolute right-0 top-[calc(100%+8px)] z-20 w-36 rounded-md border border-[#E4E4E7] bg-white p-1 shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
          >
            <a
              href="/login"
              role="menuitem"
              className="block rounded-md px-3 py-2 text-sm font-medium leading-5 text-[#09090B] hover:bg-[#F4F4F5]"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
