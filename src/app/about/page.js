import Image from "next/image";
import Navbar from "@/components/Navbar"


export default function Page(){
  return (
    <main className="flex flex-col items-center md:px-0">
      <Navbar />
      <div className="flex flex-col items-center mt-[5rem] space-y-5 text-wrap max-w-4xl break-words -translate-x-[26rem] ">
        <h2 className="text-8xl text-lightrose transform -translate-x-96 block "> Hi! </h2>
        <div className="flex flex-row items-center ">
          <div>
            <p className="text-[2.7rem] text-offwhite/90 leading-snug rounded ">
              I&apos;m Mohammed, and this is my first major website project! I made this website to help coordinate flowers in a bouquet towards an occasion
              and their symbolism. Bouquet making goes so much further then aesthetic, as millions of flowers carry rich cultural and historical 
              significance that can make a bouquet that much more beautiful.
            </p>
          </div>
          <div>
            <img src="/2577139_e76e3.gif" className="translate-x-[31rem] scale-[10] -mt-16"/>
          </div>
        </div>
      </div>
    </main>


  );
}
