import { Filter, RotateCcw, Settings2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";

/* eslint-disable react/prop-types */
export const DataTableTools = ({
  columnFilters,
  data,
  table,
  filterCols,
  resetFilters,
}) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-4 w-full">
      <div className="flex items-center gap-4 w-full md:w-8/12">
        <Input
          placeholder="Search ..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            table.setGlobalFilter(e.target.value);
          }}
          className="w-full md:w-4/6"
        />

        {/* Filters */}
        {filterCols.map((col) => (
          <Select
            key={col}
            value={table.getColumn(col)?.getFilterValue() || ""}
            onValueChange={(value) => {
              table.getColumn(col)?.setFilterValue(value);
            }}
          >
            <SelectTrigger id={col} className="w-1/3 hidden md:flex">
              <SelectValue
                placeholder={
                  columnFilters.find((filter) => filter.id === col)?.value ||
                  col.charAt(0).toUpperCase() + col.slice(1)
                }
              />
            </SelectTrigger>
            <SelectContent>
              {data &&
                [...new Set(data.map((row) => row[col]))].map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        ))}

        <Button
          variant="outline"
          onClick={resetFilters}
          className="w-1/6 hidden md:flex"
        >
          <RotateCcw style={{ width: "1.25rem", height: "1.25rem" }} />
          Reset
        </Button>

        {/* Filter dropdown for mobile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="flex md:hidden">
            <Button variant="outline">
              <Filter style={{ width: "1.25rem", height: "1.25rem" }} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" className="w-72 flex flex-col gap-2 p-4">
            {filterCols.map((col) => (
              <Select
                key={col}
                value={table.getColumn(col)?.getFilterValue() || ""}
                onValueChange={(value) => {
                  table.getColumn(col)?.setFilterValue(value);
                }}
              >
                <SelectTrigger id={col}>
                  <SelectValue
                    placeholder={
                      columnFilters.find((filter) => filter.id === col)
                        ?.value || col.charAt(0).toUpperCase() + col.slice(1)
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {data &&
                    [...new Set(data.map((row) => row[col]))].map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            ))}
            <Button
              variant="outline"
              onClick={resetFilters}
              className="w-full"
            >
              <RotateCcw style={{ width: "1.25rem", height: "1.25rem" }} />
              Reset
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* View Settings */}
      <div className="flex justify-end items-center gap-2 w-full md:w-4/12 mt-4 md:mt-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-full md:w-auto">
            <Button variant="outline">
              <Settings2 style={{ width: "1.25rem", height: "1.25rem" }} />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
