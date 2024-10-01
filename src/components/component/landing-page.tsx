"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleHelp } from "lucide-react"; // Importing the icon

export function LandingPage() {
  const [inputValue, setInputValue] = useState<string>(""); // Typing inputValue as string
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null); // Reference for the input field

  // Handle search function when button is clicked or Enter is pressed
  const handleSearch = () => {
    if (inputValue.trim()) {
      router.push(`/analysis/${encodeURIComponent(inputValue)}`);
    }
  };

  // Detect Enter key press in the input field
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle Ctrl + K to focus the input
  useEffect(() => {
    const handleCtrlK = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault(); // Prevent default browser behavior
        inputRef.current?.focus(); // Focus the input field
      }
    };

    window.addEventListener("keydown", handleCtrlK);
    return () => {
      window.removeEventListener("keydown", handleCtrlK);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-accent relative"> {/* Set relative positioning */}
      <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-muted-foreground">What's your next big idea?</h1>
          <p className="text-muted-foreground/70">
            Let us analyze it for you and help you turn it into a reality.
          </p>
        </div>
        <div className="relative w-full max-w-md flex items-center">
          <Input
            type="search"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)} // Typing the event
            onKeyDown={handleKeyDown}  // Detect Enter key press
            ref={inputRef} // Attach inputRef to the Input element
            placeholder="Tell us about it in detail..."
            className="w-full rounded-l-lg bg-muted/50 pl-8 text-primary focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button onClick={handleSearch} className="rounded-r-lg ml-2">
            Let's Go
          </Button>
        </div>
      </main>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-muted-foreground/70">
        <CircleHelp className="w-4 h-4" /> 
        <p className="text-sm">
          <span className="font-bold mr-1">
            Hint: {" "}
          </span>
          Press{" "}
          <span className="mx-1 px-2 py-0.5 border rounded-lg bg-muted/50 text-primary font-semibold text-xs">
            Ctrl
          </span>{" "}
          +{" "}
          <span className="mx-1 px-2 py-0.5 border rounded-lg bg-muted/50 text-primary font-semibold text-xs">
            K
          </span>{" "}
          to jump to the search
        </p>
      </div>
    </div>
  );
}
