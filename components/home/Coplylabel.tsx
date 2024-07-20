"use client";
import React from "react";
import { Button } from "../ui/button";

const Coplylabel = ({ text }: { text: string }) => {
  const [label, setLabel] = React.useState<string>("copy");
  const copytoclipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setLabel("copied");
    } catch (error) {
      console.error("copy failed", error);
    }
  };
  const handleCLick = () => {
    copytoclipboard(text);
  };
  return (
    <Button
      onClick={handleCLick}
      variant={"outline"}
      className="text-sm text-muted-foreground bg-background my-0 h-auto rounded-none border border-primary/20 rounded-b-lg hover:bg-primary hover:text-primary-foreground pb-0.5 pt-0"
    >
      {label}
    </Button>
  );
};

export default Coplylabel;
