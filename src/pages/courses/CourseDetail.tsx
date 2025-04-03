
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Star, Clock, CheckCircle, BookOpen, Activity, Award, BarChart2, Users, Play } from "lucide-react";
import { courses } from "@/data/mockData";
import { Course } from "@/types";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundCourse = courses.find(c => c.id === id) || null;
      setCourse(foundCourse);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleEnroll = () => {
    toast({
      title: "Enrolled Successfully!",
      description: `You've been enrolled in ${course?.title}`,
    });
    // In a real app, would update user's enrolled courses and redirect to learning interface
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-pulse space-y-4 w-full max-w-4xl">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-64 bg-muted rounded"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-20 bg-muted rounded"></div>
                <div className="h-20 bg-muted rounded"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
            <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/courses">Back to Courses</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="mb-6">
              <Link to="/courses" className="text-primary hover:underline flex items-center">
                <BookOpen className="mr-2 h-4 w-4" /> All Courses
              </Link>
            </div>

            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge>{course.category}</Badge>
              <Badge variant="outline" className="capitalize">{course.level}</Badge>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                <span className="text-sm font-medium ml-1">{course.rating}</span>
                <span className="text-sm text-muted-foreground ml-1">({course.enrolledStudents} students)</span>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <Tabs defaultValue="overview">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">About This Course</h2>
                  <p className="text-muted-foreground">{course.description}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Understand the core concepts of {course.category}</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Build real-world projects from scratch</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Learn industry best practices</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Receive a certificate upon completion</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Basic computer knowledge</li>
                    <li>No prior experience in {course.category} is required for beginner courses</li>
                    <li>Intermediate courses require fundamental understanding of the subject</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="curriculum">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Course Curriculum</h2>
                  <p className="text-muted-foreground mb-6">
                    {course.modules.length} modules • {course.modules.reduce((sum, module) => sum + module.lessons.length, 0)} lessons • Total {course.duration}
                  </p>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {course.modules.map((module, index) => (
                      <AccordionItem key={module.id} value={module.id}>
                        <AccordionTrigger className="hover:bg-muted/50 px-4 py-3 rounded-md">
                          <div className="flex items-center">
                            <span className="font-medium">
                              Module {index + 1}: {module.title}
                            </span>
                            <Badge variant="outline" className="ml-3">
                              {module.lessons.length} lessons
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4">
                          <ul className="space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <li key={lesson.id} className="border-b py-3 last:border-0">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    {lesson.type === "video" && <Play className="h-4 w-4 mr-3" />}
                                    {lesson.type === "text" && <BookOpen className="h-4 w-4 mr-3" />}
                                    {lesson.type === "quiz" && <BarChart2 className="h-4 w-4 mr-3" />}
                                    <span>{lessonIndex + 1}. {lesson.title}</span>
                                  </div>
                                  <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
              
              <TabsContent value="instructor">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">About the Instructor</h2>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                      <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-medium">{course.instructor.name}</h3>
                      <p className="text-muted-foreground mb-4">{course.category} Expert</p>
                      <p className="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper
                        consequat odio, a laoreet est. Nulla facilisi. Donec tempor, augue at
                        ultrices tempus, erat sem rutrum quam, eget consequat eros nibh non arcu.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-500 mr-1" />
                          <span>4.8 Instructor Rating</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-primary mr-1" />
                          <span>10,000+ Students</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-5 w-5 text-primary mr-1" />
                          <span>15 Courses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Student Reviews</h2>
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/3 p-6 bg-muted/30 rounded-lg text-center">
                      <div className="text-5xl font-bold mb-2">{course.rating}</div>
                      <div className="flex justify-center mb-2">
                        {Array(5).fill(0).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < Math.floor(course.rating) ? "fill-yellow-400 stroke-yellow-400" : "text-muted-foreground/30"}`} 
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{course.enrolledStudents} students</p>
                    </div>
                    <div className="lg:w-2/3">
                      <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="border-b pb-6 last:border-0">
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Avatar>
                                  <AvatarImage src={`https://i.pravatar.cc/150?img=${10 + i}`} />
                                  <AvatarFallback>U{i}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">Student {i}</h4>
                                  <p className="text-xs text-muted-foreground">2 months ago</p>
                                </div>
                              </div>
                              <div className="flex">
                                {Array(5).fill(0).map((_, j) => (
                                  <Star 
                                    key={j} 
                                    className={`h-4 w-4 ${j < 5 - i % 2 ? "fill-yellow-400 stroke-yellow-400" : "text-muted-foreground/30"}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper
                              consequat odio, a laoreet est. Nulla facilisi. Donec tempor, augue at
                              ultrices tempus, erat sem rutrum quam.
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <Card className="sticky top-24">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-3xl font-bold">${course.price.toFixed(2)}</span>
                      <Badge variant="outline">Limited Time</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Full lifetime access</p>
                  </div>
                  
                  <Button className="w-full mb-4" onClick={handleEnroll}>Enroll Now</Button>
                  <Button variant="outline" className="w-full">Add to Wishlist</Button>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-muted-foreground mr-3" />
                      <span>Duration: {course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-muted-foreground mr-3" />
                      <span>{course.modules.reduce((sum, module) => sum + module.lessons.length, 0)} lessons</span>
                    </div>
                    <div className="flex items-center">
                      <Activity className="h-5 w-5 text-muted-foreground mr-3" />
                      <span className="capitalize">Level: {course.level}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-muted-foreground mr-3" />
                      <span>Certificate of Completion</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="p-6">
                  <h3 className="font-semibold mb-3">This course includes:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span>On-demand video lectures</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span>Downloadable resources</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span>Practical exercises</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span>Lifetime access</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span>Access on mobile and TV</span>
                    </li>
                  </ul>
                </div>
                
                <Separator />
                
                <div className="p-6">
                  <p className="text-sm text-center">
                    30-Day Money-Back Guarantee
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
