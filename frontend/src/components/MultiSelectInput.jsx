/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";

export const MultiSelectInput = ({
  options,
  selectedOptions,
  setSelectedOptions,
  title,
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch("");
  }, [selectedOptions]);

  const handleSelect = (option) => {
    if (selectedOptions.includes(option.value)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== option.value));
    } else {
      setSelectedOptions([...selectedOptions, option.value]);
    }
  };

  const convertHtmlToText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const colors = [
    "bg-green-700",
    "bg-blue-700",
    "bg-orange-700",
    "bg-violet-700",
  ];

  const filterOptions = (options, search) => {
    return options.filter((option) => {
      const searchText = search.toLowerCase();
      return (
        convertHtmlToText(option.label).toLowerCase().includes(searchText) ||
        Object.keys(option).some((key) =>
          option[key].toString().toLowerCase().includes(searchText)
        )
      );
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center md:start" side="bottom" className="w-96 p-0 overflow-hidden">
        <Command className="h-96 overflow-x-scroll md:overflow-hidden w-96">
          <CommandInput
            placeholder={
              title.toLowerCase().includes("question")
                ? "Search question"
                : "Search option"
            }
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandGroup>
              {filterOptions(options, search).map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option)}
                  className="flex items-center gap-2 my-2 md:overflow-hidden w-full"
                >
                  <Checkbox
                    checked={selectedOptions.includes(option.value)}
                  />
                  <div className="ml-2 flex flex-col flex-wrap">
                    <div className="font-medium text-sm text-slate-200 flex items-center flex-wrap">
                      {convertHtmlToText(option.label)}
                    </div>
                    <div className="flex gap-2 mt-1">
                      {Object.keys(option)
                        .filter((key) => !["value", "label"].includes(key))
                        .map((key, index) => (
                          <Badge
                            key={key}
                            className={`text-xs text-slate-200 ${
                              colors[index % colors.length]
                            } hover:bg-blue-600 flex flex-wrap items-center gap-1 cursor-default w-max`}
                          >
                            {option[key]}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
