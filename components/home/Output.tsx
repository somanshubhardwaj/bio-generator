"use client";
import React, { useContext } from "react";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "../magicui/border-beam";
import { BioContext } from "@/context/BioContent";
import { Skeleton } from "../ui/skeleton";
import Coplylabel from "./Coplylabel";

const Output = () => {
  const { output, loading } = useContext(BioContext);
  return (
    <div className="relative flex min-h-[50vh] mt-2 flex-col rounded-xl bg-muted/50 backdrop-blur-sm overflow-hidden border border-primary/5 col-span-full md:col-span-1">
      {loading && (
        <BorderBeam
          size={1200}
          borderWidth={1.5}
          duration={4}
          className="z-10"
        />
      )}
      <Badge className="absolute top-3 right-3 z-50" variant={"outline"}>
        Output
      </Badge>
      {loading ? (
        <Skeleton className="w-full h-full" />
      ) : (
        <ul className="flex flex-col items-center justify-start space-y-12 p-16">
          {output?.data.map((data, index) => {
            return (
              <li
                key={index}
                className="w-full text-base border-primary/20 rounded-md p-4 relative bg-background"
              >
                {data.bio || "No bio generated"}
                <span className="absolute top-[99%] right-0">
                  <Coplylabel text={data.bio} />
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Output;
