
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CertificateGenerator from "@/components/certificate/CertificateGenerator";
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  BarChart2, 
  Calendar, 
  Award, 
  BookMarked,
  Bell,
  MessageSquare,
  Star
} from "lucide-react";
import { courses, userProgress, certificates, users } from "@/data/mockData";
import { Course, UserProgress } from "@/types";

export default function StudentDashboard() {
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [inProgressCourses, setInProgressCourses] = useState<(Course & { progress: number })[]>([]);
  const [completedCourses, setCompletedCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(users[0]); // Default to first user
  
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    
    setTimeout(() => {
      // Get user enrollments from progress data
      const enrollments = userProgress.filter(
        progress => progress.userId === currentUser.id
      );
      
      const userCourses = courses.filter(course => 
        enrollments.some(enrollment => enrollment.courseId === course.id)
      );
      
      // Separate in-progress and completed courses
      const inProgress: (Course & { progress: number })[] = [];
      const completed: Course[] = [];
      
      userCourses.forEach(course => {
        const progress = enrollments.find(e => e.courseId === course.id);
        if (progress) {
          if (progress.overallProgress === 100) {
            completed.push(course);
          } else {
            inProgress.push({
              ...course,
              progress: progress.overallProgress,
            });
          }
        }
      });
      
      setMyCourses(userCourses);
      setInProgressCourses(inProgress);
      setCompletedCourses(completed);
      setIsLoading(false);
    }, 1000);
  }, [currentUser.id]);
  
  // For demo purposes, we'll use the first course as a completed course
  const completedCourse = courses[0];
  
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {currentUser.name}</p>
              </div>
              <Button asChild>
                <Link to="/courses">Browse Courses</Link>
              </Button>
            </div>
            
            <Tabs defaultValue="my-courses">
              <TabsList className="mb-6">
                <TabsTrigger value="my-courses">My Courses</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              </TabsList>
              
              <TabsContent value="my-courses" className="space-y-8">
                {/* In Progress */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">In Progress</h2>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/courses">View All</Link>
                    </Button>
                  </div>
                  
                  {inProgressCourses.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {inProgressCourses.map(course => (
                        <Card key={course.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <Badge variant="outline" className="mb-2">{course.category}</Badge>
                              <div className="text-sm text-muted-foreground">
                                {Math.round(course.progress)}% completed
                              </div>
                            </div>
                            <CardTitle>{course.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Progress value={course.progress} className="h-2 mb-4" />
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                                <span className="text-sm text-muted-foreground">{course.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <BarChart2 className="h-4 w-4 text-muted-foreground mr-1" />
                                <span className="text-sm text-muted-foreground capitalize">{course.level}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button asChild className="w-full">
                              <Link to={`/learning/${course.id}`}>Continue Learning</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-10">
                        <BookOpen className="h-10 w-10 text-muted-foreground opacity-50" />
                        <p className="mt-2 text-muted-foreground">You don't have any courses in progress.</p>
                        <Button className="mt-4" asChild>
                          <Link to="/courses">Browse Courses</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                {/* Completed Courses */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Completed</h2>
                  </div>
                  
                  {completedCourses.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-6">
                      {completedCourses.map(course => (
                        <Card key={course.id}>
                          <div className="aspect-video w-full overflow-hidden relative">
                            <img 
                              src={course.thumbnail} 
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <div className="text-white text-center">
                                <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                                <span className="font-medium">Completed</span>
                              </div>
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{course.title}</CardTitle>
                          </CardHeader>
                          <CardFooter>
                            <div className="flex space-x-2 w-full">
                              <Button variant="outline" className="flex-1" asChild>
                                <Link to={`/learning/${course.id}`}>Review</Link>
                              </Button>
                              <Button className="flex-1" asChild>
                                <Link to={`/certificates/${course.id}`}>
                                  <Award className="mr-2 h-4 w-4" />
                                  Certificate
                                </Link>
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                      
                      {/* For demo purposes, we'll add some mock completed courses */}
                      {completedCourses.length < 3 && (
                        <Card>
                          <div className="aspect-video w-full overflow-hidden relative">
                            <img 
                              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                              alt="Data Science Fundamentals"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <div className="text-white text-center">
                                <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                                <span className="font-medium">Completed</span>
                              </div>
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Data Science Fundamentals</CardTitle>
                          </CardHeader>
                          <CardFooter>
                            <div className="flex space-x-2 w-full">
                              <Button variant="outline" className="flex-1">Review</Button>
                              <Button className="flex-1">
                                <Award className="mr-2 h-4 w-4" />
                                Certificate
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      )}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-10">
                        <Award className="h-10 w-10 text-muted-foreground opacity-50" />
                        <p className="mt-2 text-muted-foreground">
                          You haven't completed any courses yet.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="certificates" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Your Certificates</h2>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Web Development Certificate</CardTitle>
                        <CardDescription>Issued on June 15, 2023</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>This certificate verifies that you have successfully completed the Introduction to Web Development course.</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">View Certificate</Button>
                      </CardFooter>
                    </Card>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Achievements</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                          <Award className="h-8 w-8 text-yellow-500 mb-2" />
                          <span className="text-sm text-center">First Course Completed</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                          <Star className="h-8 w-8 text-purple-500 mb-2" />
                          <span className="text-sm text-center">5-Day Streak</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg opacity-50">
                          <BookMarked className="h-8 w-8 text-primary mb-2" />
                          <span className="text-sm text-center">Complete 5 Courses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Certificate Preview</h2>
                    <CertificateGenerator 
                      course={completedCourse}
                      user={currentUser}
                      completionDate={new Date()}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="wishlist">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Wishlist</CardTitle>
                    <CardDescription>Courses you've saved for later</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {courses.slice(3, 6).map(course => (
                        <div key={course.id} className="flex gap-4 p-4 border rounded-lg">
                          <div className="w-32 h-20 flex-shrink-0 overflow-hidden rounded-md">
                            <img 
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{course.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground my-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{course.duration}</span>
                              <span className="mx-2">•</span>
                              <span className="capitalize">{course.level}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-bold">${course.price.toFixed(2)}</span>
                              <Button size="sm">Enroll Now</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            {/* User Profile Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">Your Progress</p>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span>Courses in Progress</span>
                    <span>{inProgressCourses.length}</span>
                  </div>
                  <Progress value={70} className="h-1.5" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span>Courses Completed</span>
                    <span>{completedCourses.length}</span>
                  </div>
                  <Progress value={30} className="h-1.5" />
                </div>
                <Separator className="my-2" />
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/profile">View Profile</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[180px] pr-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium">HTML Quiz</h3>
                        <Badge variant="outline">1 day left</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Introduction to Web Development</p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium">CSS Assignment</h3>
                        <Badge variant="outline">3 days left</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Introduction to Web Development</p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium">Final Project</h3>
                        <Badge variant="outline">1 week left</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Introduction to Web Development</p>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Notifications</CardTitle>
                  <Button variant="ghost" size="sm">Mark all as read</Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[180px] pr-4">
                  <div className="space-y-3">
                    <div className="flex gap-3 p-2 rounded-md hover:bg-accent">
                      <div className="rounded-full bg-primary/10 h-9 w-9 flex items-center justify-center flex-shrink-0">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">New Quiz Available</span>
                        </p>
                        <p className="text-xs text-muted-foreground">A new quiz has been added to your Web Development course</p>
                        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-2 rounded-md hover:bg-accent">
                      <div className="rounded-full bg-primary/10 h-9 w-9 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">New Comment</span>
                        </p>
                        <p className="text-xs text-muted-foreground">Jane commented on your question</p>
                        <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-2 rounded-md hover:bg-accent">
                      <div className="rounded-full bg-primary/10 h-9 w-9 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Course Updated</span>
                        </p>
                        <p className="text-xs text-muted-foreground">New material added to your Data Science course</p>
                        <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
