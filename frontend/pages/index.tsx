import About from "@/components/UI/About";
import Hero from "@/components/UI/Hero";
import Navbar from "@/components/UI/Navbar";
import { Auth, useAuth } from "@arcana/auth-react";
import Pay from "./pay";

export default function Home() {
  const auth = useAuth();
  const provider = auth.provider;
  console.log(provider, "provider");
  const onLogin = async () => {
    const provider = auth.provider;
    try {
      await auth.connect();
      console.log(provider, "provider");
    } catch (e) {
      console.log(e, "onLogin");
    }
  };
  return (
    <div className="w-[95%] mx-auto py-4">
      <Navbar />
      <Hero />
      <About />
    </div>
  );
}
