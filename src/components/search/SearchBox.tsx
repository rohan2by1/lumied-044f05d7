
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

type SearchBoxProps = {
  placeholder?: string;
};

export default function SearchBox({ placeholder = "Search courses..." }: SearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchQuery) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <input
        type="search"
        placeholder={placeholder}
        className="w-full rounded-md border border-input pl-8 pr-4 py-2 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
}
