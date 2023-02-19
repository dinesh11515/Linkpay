import ShareModal from "@/components/Modal/ShareModal";
import About from "@/components/UI/About";
import Hero from "@/components/UI/Hero";
import Navbar from "@/components/UI/Navbar";
import Pay from "./pay/[username]";

export default function Home() {
  return (
    <div className="w-[95%] mx-auto py-4">
      <Navbar />
      <Hero />
      <About />
      {/* <ShareModal /> */}
    </div>
  );
}
