/* eslint-disable react/prop-types */
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { LANGUAGE_VERSIONS } from "@/constants/codeEditorConstants";

const languages = Object.entries(LANGUAGE_VERSIONS);

export const LanguageSelector = ({ language, onSelect }) => {
  return (
    <div className="flex ml-auto justify-center items-center gap-4">
      <Select value={language} onValueChange={(value) => onSelect(value)}>
        <SelectTrigger className="bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg text-white">
          <SelectValue>
            {language[0].toUpperCase() + language.slice(1)}{" "}
            <span className="ml-1 text-gray-400 text-xs">
              {languages.find(([lang]) => lang === language)[1]}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map(([language, version]) => (
            <SelectItem key={language} value={language}>
              {language[0].toUpperCase() + language.slice(1)}
              <span className="ml-1 text-gray-400 text-xs">{version}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
