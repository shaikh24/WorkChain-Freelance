import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Search,
  Filter,
  Star,
  Clock,
  MapPin,
  Code,
  Palette,
  PenTool,
  Megaphone,
  Video,
  Music,
  ChevronDown,
  Grid3X3,
  List,
} from "lucide-react";

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: "all", name: "All Categories", icon: null },
    { id: "development", name: "Development", icon: Code },
    { id: "design", name: "Design", icon: Palette },
    { id: "writing", name: "Writing", icon: PenTool },
    { id: "marketing", name: "Marketing", icon: Megaphone },
    { id: "video", name: "Video & Animation", icon: Video },
    { id: "music", name: "Music & Audio", icon: Music },
  ];

  const gigs = [
    {
      id: 1,
      title: "I will develop a responsive React web application",
      description: "Professional React development with modern hooks, TypeScript, and responsive design. Includes testing and deployment.",
      price: 125.50,
      freelancer: {
        name: "Sarah Chen",
        avatar: "",
        rating: 4.9,
        reviewCount: 127,
        level: "Level 2",
        location: "United States",
      },
      image: "/api/placeholder/300/200",
      tags: ["React", "TypeScript", "Node.js"],
      deliveryTime: 5,
      category: "development",
      featured: true,
    },
    {
      id: 2,
      title: "I will create stunning UI/UX designs for mobile apps",
      description: "Modern, user-friendly mobile app designs using Figma. Includes wireframes, prototypes, and style guides.",
      price: 89.99,
      freelancer: {
        name: "Mike Rodriguez",
        avatar: "",
        rating: 5.0,
        reviewCount: 89,
        level: "Top Rated",
        location: "Spain",
      },
      image: "/api/placeholder/300/200",
      tags: ["UI/UX", "Figma", "Mobile"],
      deliveryTime: 3,
      category: "design",
      featured: true,
    },
    {
      id: 3,
      title: "I will write engaging SEO blog content",
      description: "High-quality blog posts and articles optimized for search engines. Research-backed content that drives traffic.",
      price: 45.75,
      freelancer: {
        name: "Emily Johnson",
        avatar: "",
        rating: 4.8,
        reviewCount: 234,
        level: "Level 1",
        location: "Canada",
      },
      image: "/api/placeholder/300/200",
      tags: ["Content Writing", "SEO", "Blog"],
      deliveryTime: 2,
      category: "writing",
      featured: false,
    },
    {
      id: 4,
      title: "I will create professional video content and editing",
      description: "High-quality video editing, motion graphics, and promotional videos for your brand or business.",
      price: 199.99,
      freelancer: {
        name: "David Kim",
        avatar: "",
        rating: 4.9,
        reviewCount: 67,
        level: "Level 2",
        location: "South Korea",
      },
      image: "/api/placeholder/300/200",
      tags: ["Video Editing", "Motion Graphics", "Brand"],
      deliveryTime: 7,
      category: "video",
      featured: false,
    },
    {
      id: 5,
      title: "I will design your brand identity and logo",
      description: "Complete brand identity package including logo design, color palette, typography, and brand guidelines.",
      price: 175.00,
      freelancer: {
        name: "Sofia Garcia",
        avatar: "",
        rating: 4.9,
        reviewCount: 156,
        level: "Top Rated",
        location: "Mexico",
      },
      image: "/api/placeholder/300/200",
      tags: ["Logo Design", "Branding", "Identity"],
      deliveryTime: 5,
      category: "design",
      featured: true,
    },
    {
      id: 6,
      title: "I will run targeted social media marketing campaigns",
      description: "Strategic social media marketing across all platforms. Includes content creation, audience targeting, and analytics.",
      price: 250.00,
      freelancer: {
        name: "James Wilson",
        avatar: "",
        rating: 4.7,
        reviewCount: 98,
        level: "Level 2",
        location: "United Kingdom",
      },
      image: "/api/placeholder/300/200",
      tags: ["Social Media", "Marketing", "Analytics"],
      deliveryTime: 10,
      category: "marketing",
      featured: false,
    },
  ];

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gig.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || gig.category === selectedCategory;
    const matchesPrice = gig.price >= priceRange[0] && gig.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedGigs = [...filteredGigs].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.freelancer.rating - a.freelancer.rating;
      case "delivery": return a.deliveryTime - b.deliveryTime;
      default: return b.featured ? 1 : -1;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Gigs</h1>
          <p className="text-muted-foreground">
            Discover talented freelancers and their services
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-12 pr-4 bg-card"
            />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      {category.icon && <category.icon className="h-4 w-4" />}
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Most Relevant</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="delivery">Fastest Delivery</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>

            <div className="ml-auto flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price Range (π)</label>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={500}
                      step={5}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{priceRange[0]} π</span>
                      <span>{priceRange[1]} π</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Delivery Time</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any delivery time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">24 hours</SelectItem>
                      <SelectItem value="3">Up to 3 days</SelectItem>
                      <SelectItem value="7">Up to 1 week</SelectItem>
                      <SelectItem value="30">Up to 1 month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Freelancer Level</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New Seller</SelectItem>
                      <SelectItem value="level1">Level 1</SelectItem>
                      <SelectItem value="level2">Level 2</SelectItem>
                      <SelectItem value="top">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results Header */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            {sortedGigs.length} services found
          </p>
        </div>

        {/* Gigs Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {sortedGigs.map((gig) => (
            <Link key={gig.id} to={`/gig/${gig.id}`}>
              <Card className={`card-interactive h-full overflow-hidden ${
                viewMode === "list" ? "flex" : ""
              }`}>
                <div className={`${viewMode === "list" ? "w-64 flex-shrink-0" : "aspect-video"} bg-muted`}>
                  <img
                    src={gig.image}
                    alt={gig.title}
                    className="h-full w-full object-cover"
                  />
                  {gig.featured && (
                    <Badge className="absolute top-2 left-2 bg-accent">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="mb-3 flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={gig.freelancer.avatar} />
                      <AvatarFallback className="text-xs bg-gradient-primary text-white">
                        {gig.freelancer.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {gig.freelancer.name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {gig.freelancer.level}
                    </Badge>
                  </div>
                  
                  <h3 className="mb-2 font-semibold line-clamp-2">{gig.title}</h3>
                  <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                    {gig.description}
                  </p>
                  
                  <div className="mb-3 flex flex-wrap gap-1">
                    {gig.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{gig.freelancer.rating}</span>
                        <span>({gig.freelancer.reviewCount})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{gig.freelancer.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between border-t pt-3">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {gig.deliveryTime} days delivery
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-accent">
                        {gig.price.toFixed(2)} π
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Load More */}
        {sortedGigs.length > 0 && (
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Gigs
            </Button>
          </div>
        )}

        {/* No Results */}
        {sortedGigs.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No gigs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setPriceRange([0, 500]);
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;