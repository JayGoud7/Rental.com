import React from "react";
import Hero from "@/src/components/Hero";
import Boxes from "@/src/components/Boxes";
import HomeProperty from "@/src/components/HomeProperty";
import Footer from "@/src/components/footer";

const page = () => {
  return (
    <section>
      <Hero />
      <Boxes />
      <HomeProperty />
      <Footer />
    </section>
  );
};

export default page;
