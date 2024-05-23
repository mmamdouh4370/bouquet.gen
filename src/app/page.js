import Image from "next/image";

export default function Home() {
  return (
    <main className=" flex-col items-center text-white md:px-0">
      <nav className="w-full p-5 bg-fuchsia-950/70">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">
            <a href="/" className="flex items-center">
              <img
                  src="/favicon.ico"
                  alt="logo"
                  className="mr-2 h-8 w8"
              /> 
              Bouquet.gen
            </a>
          </div>
          <div className="space-x-4">
            <a href="/dashboard" className="text-white hover:text-gray-300">Home</a>
            <a href="/about" className="text-white hover:text-gray-300">About</a>
            <a href="/contact" className="text-white hover:text-gray-300">Contact</a>
          </div>
        </div>
      </nav>

      <section className="relative flex-1 w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/flowbackg.jpeg')`, height: "calc(100vh - 70px)"}}>
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <p className="text-4xl  font-bold z-10">
          Generate thousands of bouquets with flowers related <br />to your prompt in both meaning and aesthetic.
        </p>
        <div className="absolute inset-0  backdrop-blur bg-black/70"></div>
      </div>
    </section>
    
    </main>
  );
}
