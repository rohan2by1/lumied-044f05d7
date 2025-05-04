
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, ChevronRight, BookOpen, Award, MessageSquare } from "lucide-react";
import { courses } from "@/data/mockData";
import { Course } from "@/types";

export default function Index() {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  
  useEffect(() => {
    // In a real app, we'd fetch these from an API
    setFeaturedCourses(courses.slice(0, 3));
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative">
        <div className="hero-gradient absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Unlock Your Potential with LumiED
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Discover courses taught by industry experts and transform your
              skills from the comfort of your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/courses">Explore Courses</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose LumiED?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform offers a comprehensive learning experience with
              features designed to help you succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Diverse Course Library
              </h3>
              <p className="text-muted-foreground">
                Access hundreds of courses across various domains, from tech to
                business and arts.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Certification</h3>
              <p className="text-muted-foreground">
                Earn recognized certificates to showcase your newly acquired
                skills to employers.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Support</h3>
              <p className="text-muted-foreground">
                Engage with instructors and peers through our vibrant discussion
                forums.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Courses</h2>
              <p className="text-muted-foreground">
                Handpicked courses to get you started on your learning journey
              </p>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link to="/courses">
                View All Courses
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
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
                      <span className="text-sm font-medium">
                        {course.rating}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="mt-2">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
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
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Browse By Category</h2>
            <p className="text-muted-foreground">
              Find the perfect course by exploring our categories
            </p>
          </div>

          <Tabs defaultValue="web" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <TabsTrigger value="web">Web Development</TabsTrigger>
                <TabsTrigger value="data">Data Science</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="web" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {courses
                  .filter((c) => c.category === "Web Development")
                  .map((course) => (
                    <div
                      key={course.id}
                      className="flex bg-card rounded-lg overflow-hidden shadow-sm"
                    >
                      <div className="w-1/3">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-4">
                        <Badge className="mb-2">{course.level}</Badge>
                        <h3 className="font-semibold mb-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {course.description}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-bold">
                            ${course.price.toFixed(2)}
                          </span>
                          <Button asChild variant="outline" size="sm">
                            <Link to={`/courses/${course.id}`}>Details</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="data" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {courses
                  .filter((c) => c.category === "Data Science")
                  .map((course) => (
                    <div
                      key={course.id}
                      className="flex bg-card rounded-lg overflow-hidden shadow-sm"
                    >
                      <div className="w-1/3">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-4">
                        <Badge className="mb-2">{course.level}</Badge>
                        <h3 className="font-semibold mb-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {course.description}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-bold">
                            ${course.price.toFixed(2)}
                          </span>
                          <Button asChild variant="outline" size="sm">
                            <Link to={`/courses/${course.id}`}>Details</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="design" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {courses
                  .filter((c) => c.category === "Design")
                  .map((course) => (
                    <div
                      key={course.id}
                      className="flex bg-card rounded-lg overflow-hidden shadow-sm"
                    >
                      <div className="w-1/3">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-4">
                        <Badge className="mb-2">{course.level}</Badge>
                        <h3 className="font-semibold mb-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {course.description}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-bold">
                            ${course.price.toFixed(2)}
                          </span>
                          <Button asChild variant="outline" size="sm">
                            <Link to={`/courses/${course.id}`}>Details</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="business" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {courses
                  .filter((c) => c.category === "Marketing")
                  .map((course) => (
                    <div
                      key={course.id}
                      className="flex bg-card rounded-lg overflow-hidden shadow-sm"
                    >
                      <div className="w-1/3">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-4">
                        <Badge className="mb-2">{course.level}</Badge>
                        <h3 className="font-semibold mb-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {course.description}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-bold">
                            ${course.price.toFixed(2)}
                          </span>
                          <Button asChild variant="outline" size="sm">
                            <Link to={`/courses/${course.id}`}>Details</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="hero-gradient absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students already learning on our platform. Get
              started today!
            </p>
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/signup">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
