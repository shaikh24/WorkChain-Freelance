import { useState } from "react";
import heroImage from "@/assets/hero-bg.jpg";
import webDevGig from "@/assets/gig-web-dev.jpg";
import designGig from "@/assets/gig-design.jpg";
import writingGig from "@/assets/gig-writing.jpg";
import videoGig from "@/assets/gig-video.jpg";
import avatarAlex from "@/assets/avatar-alex.jpg";
import avatarSarah from "@/assets/avatar-sarah.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Code,
  Palette,
  PenTool,
  Megaphone,
  Video,
  Music,
  Star,
  MapPin,
  Clock,
  TrendingUp,
  Users,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import SearchWithCategories from "@/components/search/SearchWithCategories";

const categories = [
  { icon: Code, name: "Development", count: 2451, color: "bg-blue-500" },
  { icon: Palette, name: "Design", count: 1876, color: "bg-purple-500" },
  { icon: PenTool, name: "Writing", count: 1243, color: "bg-green-500" },
  { icon: Megaphone, name: "Marketing", count: 987, color: "bg-orange-500" },
  { icon: Video, name: "Video", count: 654, color: "bg-red-500" },
  { icon: Music, name: "Audio", count: 432, color: "bg-yellow-500" },
];

const featuredGigs = [
  {
    id: 1,
    title: "I will develop a modern React web application",
    description: "Full-stack React development with Node.js backend and MongoDB database.",
    price: 125.50,
    freelancer: {
      name: "Sarah Chen",
      avatar: avatarSarah,
      rating: 4.9,
      reviewCount: 127,
      level: "Level 2 Seller",
    },
    image: webDevGig,
    tags: ["React", "Node.js", "MongoDB"],
    deliveryTime: 5,
  },
  {
    id: 2,
    title: "I will create stunning UI/UX designs",
    description: "Modern, responsive designs for web and mobile applications using Figma.",
    price: 89.99,
    freelancer: {
      name: "Mike Rodriguez",
      avatar: "",
      rating: 5.0,
      reviewCount: 89,
      level: "Top Rated Seller",
    },
    image: designGig,
    tags: ["UI/UX", "Figma", "Mobile"],
    deliveryTime: 3,
  },
  {
    id: 3,
    title: "I will write engaging content for your blog",
    description: "SEO-optimized blog posts and articles that drive traffic and engagement.",
    price: 45.75,
    freelancer: {
      name: "Emily Johnson",
      avatar: "",
      rating: 4.8,
      reviewCount: 234,
      level: "Level 1 Seller",
    },
    image: writingGig,
    tags: ["Content Writing", "SEO", "Blog"],
    deliveryTime: 2,
  },
  {
    id: 4,
    title: "I will create professional video content",
    description: "High-quality video editing and motion graphics for your brand.",
    price: 199.99,
    freelancer: {
      name: "David Kim",
      avatar: avatarAlex,
      rating: 4.9,
      reviewCount: 67,
      level: "Level 2 Seller",
    },
    image: videoGig,
    tags: ["Video Editing", "Motion Graphics", "Brand"],
    deliveryTime: 7,
  },
];

const topFreelancers = [
  {
    name: "Alex Thompson",
    title: "Full Stack Developer",
    rating: 5.0,
    completedJobs: 156,
    location: "San Francisco, CA",
    avatar: avatarAlex,
    skills: ["React", "Python", "AWS"],
    hourlyRate: 75.50,
  },
  {
    name: "Sofia Garcia",
    title: "Brand Designer",  
    rating: 4.9,
    completedJobs: 89,
    location: "Barcelona, Spain",
    avatar: avatarSarah,
    skills: ["Branding", "Logo Design", "Adobe CC"],
    hourlyRate: 45.25,
  },
  {
    name: "James Wilson",
    title: "Marketing Specialist",
    rating: 4.8,
    completedJobs: 234,
    location: "London, UK",
    avatar: "",
    skills: ["SEO", "Social Media", "Analytics"],
    hourlyRate: 55.00,
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        <div className="container relative py-20 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-6xl">
              Find the perfect{" "}
              <span className="text-gradient">freelancer</span>{" "}
              for your project
            </h1>
            <p className="mb-8 text-lg text-muted-foreground lg:text-xl">
              Connect with talented professionals worldwide and pay with Pi cryptocurrency.
              Get your work done faster, smarter, and more securely.
            </p>
            
            {/* Search Bar */}
            <div className="mx-auto mb-8 max-w-2xl">
              <SearchWithCategories 
                onSearch={(query, category) => {
                  console.log("Search:", query, "Category:", category);
                  // Navigate to browse page with search params
                }}
                placeholder="Search for any service..."
                className="w-full"
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="btn-hero" asChild>
                <Link to="/browse">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Browse Gigs
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="btn-glass" asChild>
                <Link to="/post-job">
                  Post a Job
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-secondary/20">
        <div className="container py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-gradient">2M+</div>
              <div className="text-muted-foreground">Active Freelancers</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-gradient">500K+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-gradient">150+</div>
              <div className="text-muted-foreground">Countries</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-gradient">98%</div>
              <div className="text-muted-foreground">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Popular Categories</h2>
            <p className="text-muted-foreground">
              Explore thousands of services in trending categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/browse?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <Card className="card-interactive h-full">
                  <CardContent className="flex flex-col items-center p-6">
                    <div className={`mb-4 rounded-lg p-3 ${category.color}`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-2 font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count.toLocaleString()} services
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gigs */}
      <section className="bg-secondary/20 py-20">
        <div className="container">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-4 text-3xl font-bold">Featured Gigs</h2>
              <p className="text-muted-foreground">
                Hand-picked services from top-rated freelancers
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/browse">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredGigs.map((gig) => (
              <Link key={gig.id} to={`/gig/${gig.id}`}>
                <Card className="card-interactive h-full overflow-hidden">
                  <div className="aspect-video bg-muted">
                    <img
                      src={gig.image}
                      alt={gig.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
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
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {gig.freelancer.rating}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ({gig.freelancer.reviewCount})
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-accent">
                          {gig.price.toFixed(2)} π
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {gig.deliveryTime} days
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Freelancers */}
      <section className="py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Top Freelancers</h2>
            <p className="text-muted-foreground">
              Connect with the most talented professionals on WorkChain Pi
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {topFreelancers.map((freelancer, index) => (
              <Link key={freelancer.name} to={`/freelancer/${freelancer.name.toLowerCase().replace(" ", "-")}`}>
                <Card className="card-interactive">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={freelancer.avatar} />
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {freelancer.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{freelancer.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {freelancer.title}
                          </p>
                        </div>
                      </div>
                      {index === 0 && (
                        <Badge className="bg-gradient-primary">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          Top Rated
                        </Badge>
                      )}
                    </div>

                    <div className="mb-4 flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{freelancer.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{freelancer.completedJobs} jobs</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{freelancer.location}</span>
                      </div>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-1">
                      {freelancer.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Starting at
                      </span>
                      <span className="text-lg font-bold text-accent">
                        {freelancer.hourlyRate.toFixed(2)} π/hr
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-20">
        <div className="container text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold text-white">
              Ready to get started?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Join millions of freelancers and clients who trust WorkChain Pi
              for their projects. Start earning or hiring today.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/signup">
                  Start as Freelancer
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/post-job">
                  Post a Job
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}