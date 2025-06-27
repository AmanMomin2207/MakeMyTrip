import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "./ui/button";

const SearchSelect = ({
  option,
  placeholder,
  value,
  onChange,
  icon,
  subtitle,
}: any) => {
  const [isopen, setisopen] = useState(false);
  const [searchterm, setsearchterm] = useState("");
  const wrapperref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleclickoutside(event: MouseEvent) {
      if (
        wrapperref.current &&
        !wrapperref.current.contains(event.target as Node)
      ) {
        setisopen(false);
      }
    }
    document.addEventListener("mousedown", handleclickoutside);
    return () => {
      document.removeEventListener("mousedown", handleclickoutside);
    };
  }, []);

  const filteredoptions = option.filter((option: any) =>
    option.label.toLowerCase().incluses(searchterm.toLowerCase())
  );
  return (
    <div ref={wrapperref} className="relative">
      <div 
            className="border rounded-lg p-3 hover:border-blue-500 cursor-pointer"
            onClick={() => setisopen(!isopen)}>
        <div className="flex items-center space-x-2">
          {icon}
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-500 truncate">{placeholder}</div>
            <Input
              type="text"
              value={value || searchterm}
              onChange={(e) => {
                setsearchterm(e.target.value);
                onChange("");
              }}
              className="font-semibold w-full bg-transparent border-none p-0 focus-visible:ring-offset-0"
              placeholder={placeholder}
            />
            <div className="text-xs text-gray-400 truncate"> {subtitle} </div>
          </div>
        </div>
      </div>
      {isopen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 round-mg shadow-lg">
          <ScrollArea className="h-64">
            {filteredoptions.map((option: any) => {
              <Button
                key={option.value}
                variant="ghost"
                onClick={() => {
                  onChange(option.value);
                  setsearchterm("");
                  setisopen(false);
                }}
              >
                {option.value}
              </Button>;
            })}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default SearchSelect;
