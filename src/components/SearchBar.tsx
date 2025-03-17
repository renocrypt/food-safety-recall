// src/components/SearchBar.tsx
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder="Search for recalls..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full md:w-80"
      />
      <Button variant="outline" onClick={handleSearch}>
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchBar;
