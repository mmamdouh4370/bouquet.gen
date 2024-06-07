"use client"
import { useState } from 'react';
import { SignInButton, SignOutButton, UserButton, useAuth } from "@clerk/nextjs";

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  )
}

export default function Navbar() {
  const { sessionId } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
    
  return (
    <nav className=" flex flex-row w-full p-8 bg-sage">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-offwhite text-3xl font-extrabold -ml-24">
          <a href="/" className="flex items-center">
            <img src="/favicon.ico" alt="logo" className="mr-2 h-8 w8" />
            Bouquet-gen
          </a>
        </div>
        <div className="flex flex-row space-x-5 text-offwhite font-semibold text-[24px] -mr-20 mt-2.5">
          <a href="/create" className="hover:text-white">
            Create
          </a>
          <a href="/about" className="hover:text-white">
            About
          </a>

          {!sessionId ? (
            <a href="/sign-in"
            className="ml-2 bg-cream hover:bg-lightcream text-tahit text-xl font-bold py-3 px-6 rounded-md -mt-2"
            >
              Sign in
            </a>
          ) : (
            <div className="scale-150 mt-2"> 
              <UserButton afterSignOutUrl="."> 
                <UserButton.UserProfileLink
                  label="Saved Bouquets"
                  url="/saved"
                  labelIcon={<DotIcon />}
                />
              </UserButton>
            </div>
          )}
          
        </div>
      </div>
    </nav>
  );

}
