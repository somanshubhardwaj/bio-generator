import Output from "@/components/home/Output";
import UserInput from "@/components/home/UserInput";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { BioProvider } from "@/context/BioContent";
import { ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  //TODO: make responsive
  //TODO: add meta data
  return (
    <main className="relative grid grid-cols-2 gap-2 md:gap-4 lg:gap-12 p-6 md:p-8 lg:p-24">
      <div className="flex w-full flex-col items-center justify-center space-y-4  text-center col-span-full">
        <Link
          href="https://github.com/somanshubhardwaj/bio-generator"
          className="mb-4 group "
          target="_blank"
        >
          <AnimatedGradientText className="px-6 py-2 rounded-full">
            <Star className="h-6 w-6 fill-yellow-300 text-yellow-400" />
            <hr className="mx-2 h-4 w-[0.25px] bg-gray-300" />
            Start on Github
            <ChevronRight className="size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5  ml-1 " />
          </AnimatedGradientText>
        </Link>
        <h1 className="md:font-extrabold lg:w-[90%] uppercase md:text-5xl lg:text-7xl text-center  w-full mx-auto pt-4 text-4xl font-semibold">
          GENERATE A PERFECT BIO FOR YOU
        </h1>
        <p className="lg:text-lg text-base text-slate-900 hidden md:inline">
          <span className="font-bold">Bio Gen</span> is a tool that generates a
          perfect bio for you based on your preferences. It is a simple tool
          that helps you generate a bio for your social media accounts.
        </p>
      </div>
      <BioProvider>
        <UserInput />
        <Output />
      </BioProvider>
    </main>
  );
}
