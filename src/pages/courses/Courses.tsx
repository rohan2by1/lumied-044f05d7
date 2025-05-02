
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Star, Clock, Users, Search } from "lucide-react";
import { courses } from "@/data/mockData";
import { Course } from "@/types";

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [ratings, setRatings] = useState<string[]>([]);
  
  // Get unique categories
  const categories = Array.from(new Set(courses.map(course => course.category)));
  
  useEffect(() => {
    // Check for search query in URL
    const urlSearchQuery = searchParams.get('search');
    if (urlSearchQuery) {
      setSearchTerm(urlSearchQuery);
    }
  }, [searchParams]);
  
  useEffect(() => {
    let results = courses;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory && selectedCategory !== "all") {
      results = results.filter(course => course.category === selectedCategory);
    }
    
    // Apply level filter
    if (selectedLevel && selectedLevel !== "all") {
      results = results.filter(course => course.level === selectedLevel);
    }
    
    // Apply price filter
    results = results.filter(course => 
      course.price >= priceRange[0] && course.price <= priceRange[1]
    );
    
    // Apply ratings filter
    if (ratings.length > 0) {
      results = results.filter(course => {
        // Convert rating to floor value (e.g. 4.7 -> "4")
        const courseRating = Math.floor(course.rating).toString();
        return ratings.includes(courseRating);
      });
    }
    
    setFilteredCourses(results);
    
    // Update URL with search params
    if (searchTerm) {
      setSearchParams({ search: searchTerm });
    } else {
      setSearchParams({});
    }
  }, [searchTerm, selectedCategory, selectedLevel, priceRange, ratings, setSearchParams]);
  
  const handleRatingChange = (value: string) => {
    setRatings(
      ratings.includes(value)
        ? ratings.filter(r => r !== value)
        : [...ratings, value]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setPriceRange([0, 100]);
    setRatings([]);
    setSearchParams({});
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label>Search</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search courses..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Category Filter */}
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Level Filter */}
                <div className="space-y-2">
                  <Label>Level</Label>
                  <Select
                    value={selectedLevel}
                    onValueChange={setSelectedLevel}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Price Filter */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Price Range</Label>
                    <span className="text-xs text-muted-foreground">
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 100]}
                    min={0}
                    max={100}
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                
                {/* Rating Filter */}
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`rating-${rating}`} 
                          checked={ratings.includes(rating.toString())}
                          onCheckedChange={() => handleRatingChange(rating.toString())}
                        />
                        <Label htmlFor={`rating-${rating}`} className="text-sm font-normal flex items-center">
                          {Array(rating).fill(0).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                          ))}
                          {Array(5 - rating).fill(0).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-muted-foreground/30" />
                          ))}
                          <span className="ml-1">{rating}+ stars</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </aside>
          
          {/* Course Grid */}
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">
                {searchTerm ? `Search Results: "${searchTerm}"` : "All Courses"}
              </h1>
              <p className="text-muted-foreground">{filteredCourses.length} courses found</p>
            </div>
            
            {filteredCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge>{course.category}</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="mt-2">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{course.duration}</span>
                        <span className="mx-2">•</span>
                        <span className="capitalize">{course.level}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <img 
                          src={course.instructor.avatar} 
                          alt={course.instructor.name}
                          className="h-6 w-6 rounded-full mr-2"
                        />
                        <span>{course.instructor.name}</span>
                        <Users className="h-4 w-4 ml-auto mr-1" />
                        <span>{course.enrolledStudents} students</span>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <span className="font-bold">${course.price.toFixed(2)}</span>
                      <Button asChild>
                        <Link to={`/courses/${course.id}`}>View Course</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search term
                </p>
                <Button onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
