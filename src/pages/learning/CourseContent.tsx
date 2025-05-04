
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { 
  BookOpen, Video, FileText, Menu, Star, 
  CheckCircle, ChevronLeft, ChevronRight, MessageSquare, 
  Send, Award, BarChart2, Play, Home, RefreshCw 
} from "lucide-react";
import { courses, userProgress, comments } from "@/data/mockData";
import { Course, Lesson, Comment as CommentType } from "@/types";
import QuizComponent from "@/components/learning/Quiz";

export default function CourseContent() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId?: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [lessonComments, setLessonComments] = useState<CommentType[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundCourse = courses.find(c => c.id === courseId) || null;
      setCourse(foundCourse);
      
      // Get user progress
      if (foundCourse) {
        const userCourseProgress = userProgress.find(
          p => p.userId === "1" && p.courseId === courseId
        );
        
        if (userCourseProgress) {
          setProgress(userCourseProgress.overallProgress);
          setCompletedLessons(userCourseProgress.completedLessons);
        }
        
        // Determine the current lesson
        let selectedLesson: Lesson | null = null;
        let moduleIndex = 0;
        let lessonIndex = 0;
        
        if (lessonId) {
          // Find the specific lesson if lessonId is provided
          for (let i = 0; i < foundCourse.modules.length; i++) {
            const module = foundCourse.modules[i];
            for (let j = 0; j < module.lessons.length; j++) {
              if (module.lessons[j].id === lessonId) {
                selectedLesson = module.lessons[j];
                moduleIndex = i;
                lessonIndex = j;
                break;
              }
            }
            if (selectedLesson) break;
          }
        }
        
        if (!selectedLesson) {
          // Default to first lesson if no specific one is found
          selectedLesson = foundCourse.modules[0].lessons[0];
        }
        
        setCurrentLesson(selectedLesson);
        setCurrentModuleIndex(moduleIndex);
        setCurrentLessonIndex(lessonIndex);
        
        // Load comments for this lesson
        if (selectedLesson) {
          setLessonComments(comments[selectedLesson.id] || []);
        }
      }
      
      setLoading(false);
    }, 500);
  }, [courseId, lessonId]);

  const handleLessonSelect = (moduleIndex: number, lessonIndex: number) => {
    if (!course) return;
    
    const selectedLesson = course.modules[moduleIndex].lessons[lessonIndex];
    setCurrentLesson(selectedLesson);
    setCurrentModuleIndex(moduleIndex);
    setCurrentLessonIndex(lessonIndex);
    setLessonComments(comments[selectedLesson.id] || []);
  };

  const handlePreviousLesson = () => {
    if (!course) return;
    
    if (currentLessonIndex > 0) {
      // Previous lesson in the same module
      handleLessonSelect(currentModuleIndex, currentLessonIndex - 1);
    } else if (currentModuleIndex > 0) {
      // Last lesson of the previous module
      const prevModule = course.modules[currentModuleIndex - 1];
      handleLessonSelect(currentModuleIndex - 1, prevModule.lessons.length - 1);
    }
  };

  const handleNextLesson = () => {
    if (!course) return;
    
    const currentModule = course.modules[currentModuleIndex];
    
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      // Next lesson in the same module
      handleLessonSelect(currentModuleIndex, currentLessonIndex + 1);
    } else if (currentModuleIndex < course.modules.length - 1) {
      // First lesson of the next module
      handleLessonSelect(currentModuleIndex + 1, 0);
    } else {
      // Completed the course
      toast({
        title: "Congratulations!",
        description: "You've completed all lessons in this course!",
      });
    }
  };

  const handleMarkAsComplete = () => {
    if (!currentLesson) return;
    
    // In a real app, would update to server
    if (!completedLessons.includes(currentLesson.id)) {
      const newCompletedLessons = [...completedLessons, currentLesson.id];
      setCompletedLessons(newCompletedLessons);
      
      // Calculate new progress
      if (course) {
        const totalLessons = course.modules.reduce(
          (sum, module) => sum + module.lessons.length, 0
        );
        const newProgress = (newCompletedLessons.length / totalLessons) * 100;
        setProgress(newProgress);
      }
      
      toast({
        title: "Progress Updated",
        description: "This lesson has been marked as completed.",
      });
    }
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim() || !currentLesson) return;
    
    // In a real app, would send to server
    const newComment: CommentType = {
      id: `new-${Date.now()}`,
      content: commentText,
      user: {
        id: "1",
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?img=1"
      },
      createdAt: new Date()
    };
    
    setLessonComments([...lessonComments, newComment]);
    setCommentText("");
    
    toast({
      title: "Comment Added",
      description: "Your comment has been successfully added.",
    });
  };

  const renderLessonContent = () => {
    if (!currentLesson) return null;
    
    switch (currentLesson.type) {
      case "video":
        return (
          <div className="aspect-video w-full bg-black">
            <iframe
              className="w-full h-full"
              src={currentLesson.content}
              title={currentLesson.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        );
      
      case "text":
        return (
          <div className="prose max-w-none dark:prose-invert">
            <p>{currentLesson.content}</p>
          </div>
        );
      
      case "quiz":
        return (
          <QuizComponent quizId={currentLesson.content} />
        );
      
      default:
        return <p>Unsupported lesson type</p>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin">
          <RefreshCw className="h-10 w-10 text-primary" />
        </div>
      </div>
    );
  }

  if (!course || !currentLesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">Course or Lesson Not Found</h2>
        <p className="text-muted-foreground mb-6">The content you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/courses">Back to Courses</Link>
        </Button>
      </div>
    );
  }

  // Calculate flat array of all lessons for easier navigation
  const allLessons = course.modules.flatMap(module => module.lessons);
  const currentLessonFlatIndex = course.modules
    .slice(0, currentModuleIndex)
    .reduce((sum, module) => sum + module.lessons.length, 0) + currentLessonIndex;
  
  const hasPrevious = currentLessonFlatIndex > 0;
  const hasNext = currentLessonFlatIndex < allLessons.length - 1;
  const isCompleted = currentLesson && completedLessons.includes(currentLesson.id);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Course Sidebar */}
        <Sidebar className="border-r">
          <SidebarHeader className="px-4 py-3 border-b">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-lg">LumiED</span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <div className="p-4 border-b">
              <h3 className="font-semibold text-lg truncate">{course.title}</h3>
              <div className="flex items-center mt-2">
                <Progress value={progress} className="h-2 flex-1" />
                <span className="ml-2 text-sm text-muted-foreground">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            {/* Course Navigation */}
            <div className="py-4">
              <SidebarGroup>
                <SidebarGroupLabel>Course Contents</SidebarGroupLabel>
                <SidebarGroupContent>
                  {course.modules.map((module, modIndex) => (
                    <div key={module.id} className="mb-4">
                      <div className="px-4 py-2 font-medium text-sm">
                        Module {modIndex + 1}: {module.title}
                      </div>
                      <SidebarMenu>
                        {module.lessons.map((lesson, lesIndex) => (
                          <SidebarMenuItem key={lesson.id}>
                            <SidebarMenuButton
                              className={`w-full justify-start ${
                                modIndex === currentModuleIndex &&
                                lesIndex === currentLessonIndex
                                  ? "bg-accent"
                                  : ""
                              } ${
                                completedLessons.includes(lesson.id)
                                  ? "text-primary"
                                  : ""
                              }`}
                              onClick={() =>
                                handleLessonSelect(modIndex, lesIndex)
                              }
                            >
                              {lesson.type === "video" && (
                                <Play className="h-4 w-4 mr-2" />
                              )}
                              {lesson.type === "text" && (
                                <BookOpen className="h-4 w-4 mr-2" />
                              )}
                              {lesson.type === "quiz" && (
                                <BarChart2 className="h-4 w-4 mr-2" />
                              )}
                              <span className="truncate">{lesson.title}</span>
                              {completedLessons.includes(lesson.id) && (
                                <CheckCircle className="h-4 w-4 ml-auto text-primary" />
                              )}
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </div>
                  ))}
                </SidebarGroupContent>
              </SidebarGroup>
            </div>

            <div className="px-4 py-4 mt-auto border-t">
              <Button asChild variant="secondary" className="w-full">
                <Link to={`/courses/${course.id}`}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Course Page
                </Link>
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <SidebarTrigger>
                  <Menu className="h-5 w-5" />
                </SidebarTrigger>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold truncate">
                    {currentLesson.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center"
                >
                  <Home className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
                <Button
                  variant={isCompleted ? "secondary" : "default"}
                  size="sm"
                  onClick={handleMarkAsComplete}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    "Mark as Complete"
                  )}
                </Button>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="max-w-4xl mx-auto py-8 px-4">
              <div className="mb-8">{renderLessonContent()}</div>

              <Tabs defaultValue="discussion">
                <TabsList>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="discussion" className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Discussion</h3>

                  <div className="flex mb-6">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Add your comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="mb-2"
                      />
                      <Button onClick={handleCommentSubmit}>
                        <Send className="h-4 w-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-6">
                    {lessonComments.length > 0 ? (
                      lessonComments.map((comment) => (
                        <div key={comment.id} className="flex">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={comment.user.avatar} />
                            <AvatarFallback>
                              {comment.user.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center mb-1">
                              <h4 className="font-medium">
                                {comment.user.name}
                              </h4>
                              <span className="text-xs text-muted-foreground ml-2">
                                {new Date(
                                  comment.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-muted-foreground">
                              {comment.content}
                            </p>
                            <div className="flex items-center mt-2 space-x-4">
                              <button className="text-xs text-muted-foreground flex items-center hover:text-foreground">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                Reply
                              </button>
                              <button className="text-xs text-muted-foreground flex items-center hover:text-foreground">
                                <Star className="h-3 w-3 mr-1" />
                                Helpful
                              </button>
                            </div>

                            {comment.replies && comment.replies.length > 0 && (
                              <div className="ml-6 mt-4 space-y-4">
                                {comment.replies.map((reply) => (
                                  <div key={reply.id} className="flex">
                                    <Avatar className="h-8 w-8 mr-3">
                                      <AvatarImage src={reply.user.avatar} />
                                      <AvatarFallback>
                                        {reply.user.name[0]}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="flex items-center mb-1">
                                        <h4 className="text-sm font-medium">
                                          {reply.user.name}
                                        </h4>
                                        <span className="text-xs text-muted-foreground ml-2">
                                          {new Date(
                                            reply.createdAt
                                          ).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        {reply.content}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                        <p className="mt-2 text-muted-foreground">
                          No comments yet. Be the first to start the discussion!
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Your Notes</h3>
                  <Textarea
                    placeholder="Take notes for this lesson..."
                    className="min-h-[200px]"
                  />
                  <Button className="mt-4">Save Notes</Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Navigation Footer */}
          <footer className="border-t py-4 px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky bottom-0 z-10">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePreviousLesson}
                disabled={!hasPrevious}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous Lesson
              </Button>

              <div className="text-sm text-muted-foreground">
                {currentLessonFlatIndex + 1} of {allLessons.length} lessons
              </div>

              <Button onClick={handleNextLesson} disabled={!hasNext}>
                {currentLesson.type === "quiz"
                  ? "Complete Quiz"
                  : "Next Lesson"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
