import React from "react";
import Hero from "../components/Hero";
import Boxes from "../components/Boxes";
import HomeProperty from "../components/HomeProperty";
import Footer from "../components/footer";

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
