import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className=" flex-col items-center md:px-0">
      <Navbar />
      <section
        className="relative flex-1 w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/flowbackg.jpeg')`,
          height: "calc(100vh - 70px)",
        }}
      >
        <div className="absolute inset-0 backdrop-blur bg-black/80"></div>
        <div className="absolute flex flex-row justify-start items-center left-[9.6rem] top-1/2 space-x-96">
          <div className="-mt-96 space-y-64">
            <p className="text-6xl text-offwhite font-bold z-10 transform -translate-y-[20%] leading-[4.5rem]">
              🌺Generate thousands <br />
              of bouquets rich in both <br />
              meaning and aesthetic <br />
              with the power of AI.🌼
            </p>
            <a
              href="/create"
              className="ml-2 bg-cream hover:bg-lightcream text-tahit text-2xl font-bold py-5 px-10 rounded-md mt-4"
            >
              Get Started →
            </a>
          </div>
          <img
            src="/holdbouquet.jpg"
            className="object-cover h-80 w-96  scale-150 rounded-xl transform -translate-y-1/2 border-4 border-offwhite p-2"
          />
        </div>
      </section>
    </main>
  );
}
