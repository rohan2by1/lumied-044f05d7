
// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "student" | "instructor" | "admin";
}

// Course types
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: {
    id: string;
    name: string;
    avatar?: string;
  };
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  tags: string[];
  rating: number;
  enrolledStudents: number;
  price: number;
  modules: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  duration: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: "video" | "text" | "pdf" | "quiz";
  duration: string;
  content: string;
  completed?: boolean;
}

// Quiz types
export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
}

export interface Question {
  id: string;
  text: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  options?: string[];
  correctAnswer: string | string[];
}

export interface QuizAttempt {
  quizId: string;
  userId: string;
  answers: { questionId: string; answer: string | string[] }[];
  score: number;
  passed: boolean;
  completedAt: Date;
}

// Discussion types
export interface Comment {
  id: string;
  content: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  replies?: Comment[];
}

// Certificate type
export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  userName: string;
  issueDate: Date;
  certificateUrl?: string;
}

// Progress tracking
export interface UserProgress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  quizScores: { quizId: string; score: number; passed: boolean }[];
  overallProgress: number;
  lastAccessed: Date;
}
