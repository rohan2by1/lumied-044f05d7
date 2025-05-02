
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { courses } from "@/data/mockData";
import { Course } from "@/types";

type SearchBoxProps = {
  variant?: "simple" | "command";
  placeholder?: string;
};

export default function SearchBox({ variant = "simple", placeholder = "Search courses..." }: SearchBoxProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = courses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (term: string) => {
    if (term) {
      navigate(`/courses?search=${encodeURIComponent(term)}`);
      setOpen(false);
    }
  };

  const handleSelectCourse = (courseId: string) => {
    navigate(`/courses/${courseId}`);
    setOpen(false);
  };

  if (variant === "command") {
    return (
      <>
        <Button
          variant="outline"
          className="relative h-9 w-9 rounded-full p-0 sm:pr-12 sm:w-40 sm:justify-start sm:rounded-md text-sm text-muted-foreground"
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline-flex">Search...</span>
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 absolute right-1.5">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput 
              placeholder="Search courses..." 
              value={searchQuery}
              onValueChange={setSearchQuery} 
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Courses">
                {searchResults.slice(0, 5).map((course) => (
                  <CommandItem
                    key={course.id}
                    onSelect={() => handleSelectCourse(course.id)}
                    className="flex items-center gap-2"
                  >
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <div className="flex flex-col">
                      <span>{course.title}</span>
                      <span className="text-xs text-muted-foreground">{course.category}</span>
                    </div>
                  </CommandItem>
                ))}
                {searchQuery && (
                  <CommandItem 
                    onSelect={() => handleSearch(searchQuery)}
                    className="text-sm text-primary"
                  >
                    Search for "{searchQuery}"
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </>
    );
  }

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <input
        type="search"
        placeholder={placeholder}
        className="w-full rounded-md border border-input pl-8 pr-4 py-2 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(searchQuery);
          }
        }}
      />
    </div>
  );
}
