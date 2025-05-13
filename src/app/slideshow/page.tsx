import Carousel from "@/components/Carousel";

function page() {
  const slides = [
    { id: 1, color: "#f87171" }, // red
    { id: 2, color: "#60a5fa" }, // blue
    { id: 3, color: "#4ade80" }, // green
    { id: 4, color: "#facc15" }, // yellow
    { id: 5, color: "#c084fc" }, // purple
  ];

  return (
    <main className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-black">Slide Show</h2>
      <div className="w-full max-w-4xl">
        <Carousel slides={slides} />
      </div>
    </main>
  );
}

export default page;
