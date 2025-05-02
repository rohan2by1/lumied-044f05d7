
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/Profile";

// Course Pages
import Courses from "./pages/courses/Courses";
import CourseDetail from "./pages/courses/CourseDetail";
import CourseContent from "./pages/learning/CourseContent";

// Dashboard Pages
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

// New Pages
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Course Routes */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/learning/:courseId" element={<CourseContent />} />
            <Route path="/learning/:courseId/:lessonId" element={<CourseContent />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* New Routes */}
            <Route path="/community" element={<Community />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
