import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { PopularCourses } from "@/components/PopularCourses";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <PopularCourses />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
