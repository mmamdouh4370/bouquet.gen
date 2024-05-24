import Image from "next/image";

export default function Home() {
  return (
    
    <main className=" flex-col items-center md:px-0">

      <nav className="w-full p-7 bg-sage">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-offwhite text-2xl font-extrabold -ml-24">
            <a href="/" className="flex items-center">
              <img
                  src="/favicon.ico"
                  alt="logo"
                  className="mr-2 h-8 w8"
              /> 
              Bouquet.gen
            </a>
          </div>
          <div className="space-x-4 text-offwhite font-semibold text-xl -mr-20">
            <a href="/dashboard" className="hover:text-white">Home</a>
            <a href="/about" className="hover:text-white">About</a>
            <a href="/contact" className="hover:text-white">Contact</a>
            <a href="/signin" className="ml-2 bg-cream hover:bg-lightcream text-tahit text-xl font-bold py-3 px-6 rounded-md mt-4">
            Sign in →
            </a>
          </div>
        </div>
      </nav>

      <section className="relative flex-1 w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/flowbackg.jpeg')`, height: "calc(100vh - 70px)"}}>
      <div className="absolute inset-0 backdrop-blur bg-black/80"></div>
      <div className="absolute flex flex-row justify-start items-center left-32 top-1/2 space-x-96">
        <div className="-mt-96 space-y-64">
          <p className="text-6xl text-offwhite -mt-156 font-bold z-10 transform -translate-y-1/3">
          🌺Generate thousands <br/> of bouquets rich in both <br/>meaning and aesthetic <br/>with the power of AI.🌼
          </p>
          <a href="/dashboard" className="ml-2 bg-cream hover:bg-lightcream text-tahit text-2xl font-bold py-5 px-10 rounded-md mt-4">
            Get Started →
          </a>

        </div>

        <img
          src="/holdbouquet.jpg"
          className="object-cover h-80 w-96 transform scale-150 rounded-xl transform -translate-y-1/2 border-4 border-offwhite p-2"
        />

      </div>
    </section>
    
    </main>
  );
}
