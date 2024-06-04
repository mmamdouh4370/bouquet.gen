"use client"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";

export default function Navbar() {
  const { sessionId } = useAuth();
  
  // Make this a conditional maybe
  if (!sessionId){
    return (
      <nav className="w-full p-7 bg-sage">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-offwhite text-3xl font-extrabold -ml-24">
            <a href="/" className="flex items-center">
              <img src="/favicon.ico" alt="logo" className="mr-2 h-8 w8" />
              Bouquet-gen
            </a>
          </div>
          <div className="space-x-4 text-offwhite font-semibold text-[22px] -mr-20">
            <a href="/create" className="hover:text-white">
              Create
            </a>
            <a href="/about" className="hover:text-white">
              About
            </a>
            <a href="/sign-in"
              className="ml-2 bg-cream hover:bg-lightcream text-tahit text-xl font-bold py-3 px-6 rounded-md mt-4"
            >
              Sign in
            </a>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full p-7 bg-sage">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-offwhite text-3xl font-extrabold -ml-24">
          <a href="/" className="flex items-center">
            <img src="/favicon.ico" alt="logo" className="mr-2 h-8 w8" />
            Bouquet-gen
          </a>
        </div>
        <div className="space-x-4 text-offwhite font-semibold text-[22px] -mr-20">
          <a href="/create" className="hover:text-white">
            Create
          </a>
          <a href="/about" className="hover:text-white">
            About
          </a>
          
          

            <SignOutButton>
              <a href="."
              className="ml-2 bg-cream hover:bg-lightcream text-tahit text-xl font-bold py-3 px-6 rounded-md mt-4">Sign out</a>
            </SignOutButton>
          
        </div>
      </div>
    </nav>
  );
  
}
