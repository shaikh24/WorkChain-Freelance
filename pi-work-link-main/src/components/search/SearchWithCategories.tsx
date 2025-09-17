import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Code,
  Palette,
  PenTool,
  Megaphone,
  Globe,
  Camera,
  Music,
  BarChart,
  Shield,
  Wrench,
  BookOpen,
  Building,
  Heart,
  Gamepad2,
  Smartphone,
  X,
} from "lucide-react";

const freelancingCategories = [
  { name: "Web Development", icon: Code, count: 1247 },
  { name: "Graphic Design", icon: Palette, count: 892 },
  { name: "Content Writing", icon: PenTool, count: 756 },
  { name: "Digital Marketing", icon: Megaphone, count: 634 },
  { name: "Translation", icon: Globe, count: 523 },
  { name: "Video Editing", icon: Camera, count: 456 },
  { name: "Voice Over", icon: Music, count: 387 },
  { name: "Data Analysis", icon: BarChart, count: 321 },
  { name: "Cybersecurity", icon: Shield, count: 289 },
  { name: "DevOps", icon: Wrench, count: 234 },
  { name: "Technical Writing", icon: BookOpen, count: 198 },
  { name: "Architecture", icon: Building, count: 167 },
  { name: "Healthcare", icon: Heart, count: 145 },
  { name: "Game Development", icon: Gamepad2, count: 123 },
  { name: "Mobile Development", icon: Smartphone, count: 98 },
];

interface SearchWithCategoriesProps {
  onSearch?: (query: string, category?: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchWithCategories = ({ onSearch, placeholder = "Search for services...", className }: SearchWithCategoriesProps) => {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategories, setShowCategories] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState(freelancingCategories);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = freelancingCategories.filter(category =>
        category.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCategories(filtered);
      setShowCategories(true);
    } else {
      setFilteredCategories(freelancingCategories);
      setShowCategories(false);
    }
  }, [query]);

  const handleSearch = () => {
    onSearch?.(query, selectedCategories.join(","));
    setShowCategories(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(cat => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  const removeCategory = (categoryName: string) => {
    setSelectedCategories(prev => prev.filter(cat => cat !== categoryName));
  };

  const handleInputFocus = () => {
    setShowCategories(true);
  };

  return (
    <div ref={searchRef} className={`relative w-full ${className}`}>
      {/* Selected Categories */}
      {selectedCategories.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="default"
              className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
              onClick={() => removeCategory(category)}
            >
              {category}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={handleInputFocus}
          className="pl-10 pr-20"
        />
        <Button
          onClick={handleSearch}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3"
          size="sm"
        >
          Search
        </Button>
      </div>

      {/* Categories Dropdown */}
      {showCategories && (
        <Card className="absolute z-50 mt-2 w-full max-h-80 border shadow-lg">
          <CardContent className="p-0">
            <ScrollArea className="h-80">
              <div className="p-4">
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Categories</h4>
                </div>
                <div className="grid gap-2">
                  {filteredCategories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategories.includes(category.name);
                    
                    return (
                      <div
                        key={category.name}
                        onClick={() => toggleCategory(category.name)}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors hover:bg-secondary/50 ${
                          isSelected ? "bg-primary/10 border border-primary/20" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                          {isSelected && (
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchWithCategories;