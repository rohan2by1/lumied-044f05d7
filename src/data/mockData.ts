
import { Course, Comment, Quiz, User, Certificate, UserProgress } from "@/types";

// Mock Users
export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "student"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    role: "instructor"
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "admin"
  }
];

// Mock Courses
export const courses: Course[] = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript. This course is perfect for beginners who want to start their journey in web development.",
    thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    instructor: {
      id: "2",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    duration: "8 weeks",
    level: "beginner",
    category: "Web Development",
    tags: ["HTML", "CSS", "JavaScript"],
    rating: 4.7,
    enrolledStudents: 1452,
    price: 49.99,
    modules: [
      {
        id: "m1",
        title: "HTML Basics",
        description: "Learn the fundamentals of HTML",
        duration: "2 weeks",
        lessons: [
          {
            id: "l1",
            title: "Introduction to HTML",
            type: "video",
            duration: "15 min",
            content: "https://www.youtube.com/embed/UB1O30fR-EE"
          },
          {
            id: "l2",
            title: "HTML Elements and Attributes",
            type: "text",
            duration: "20 min",
            content: "HTML elements are represented by tags. Tags are enclosed in angle brackets. Most tags come in pairs: an opening tag and a closing tag."
          },
          {
            id: "l3",
            title: "HTML Quiz",
            type: "quiz",
            duration: "10 min",
            content: "q1"
          }
        ]
      },
      {
        id: "m2",
        title: "CSS Fundamentals",
        description: "Understand CSS and styling web pages",
        duration: "3 weeks",
        lessons: [
          {
            id: "l4",
            title: "CSS Introduction",
            type: "video",
            duration: "12 min",
            content: "https://www.youtube.com/embed/1PnVor36_40"
          },
          {
            id: "l5",
            title: "CSS Selectors and Properties",
            type: "text",
            duration: "25 min",
            content: "CSS selectors are used to target HTML elements that you want to style. There are different types of selectors in CSS."
          }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "Data Science Fundamentals",
    description: "Dive into the world of data science with Python, pandas, and machine learning basics. Learn to analyze and visualize data effectively.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    instructor: {
      id: "2",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    duration: "10 weeks",
    level: "intermediate",
    category: "Data Science",
    tags: ["Python", "Data Analysis", "Machine Learning"],
    rating: 4.8,
    enrolledStudents: 986,
    price: 79.99,
    modules: [
      {
        id: "m1",
        title: "Python for Data Science",
        description: "Learn Python basics for data science",
        duration: "3 weeks",
        lessons: [
          {
            id: "l1",
            title: "Introduction to Python",
            type: "video",
            duration: "20 min",
            content: "https://www.youtube.com/embed/kqtD5dpn9C8"
          }
        ]
      }
    ]
  },
  {
    id: "3",
    title: "UX/UI Design Principles",
    description: "Master the principles of user experience and interface design to create beautiful, functional digital products.",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    instructor: {
      id: "2",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    duration: "6 weeks",
    level: "beginner",
    category: "Design",
    tags: ["UX", "UI", "Design Thinking"],
    rating: 4.5,
    enrolledStudents: 753,
    price: 59.99,
    modules: [
      {
        id: "m1",
        title: "Design Thinking",
        description: "Introduction to design thinking methodology",
        duration: "1 week",
        lessons: [
          {
            id: "l1",
            title: "What is Design Thinking?",
            type: "video",
            duration: "15 min",
            content: "https://www.youtube.com/embed/gHGN6hs2gZY"
          }
        ]
      }
    ]
  },
  {
    id: "4",
    title: "Advanced React Development",
    description: "Take your React skills to the next level with advanced patterns, hooks, and state management.",
    thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    instructor: {
      id: "2",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    duration: "8 weeks",
    level: "advanced",
    category: "Web Development",
    tags: ["React", "JavaScript", "Redux"],
    rating: 4.9,
    enrolledStudents: 623,
    price: 89.99,
    modules: [
      {
        id: "m1",
        title: "React Hooks",
        description: "Master React Hooks for functional components",
        duration: "2 weeks",
        lessons: [
          {
            id: "l1",
            title: "Introduction to Hooks",
            type: "video",
            duration: "22 min",
            content: "https://www.youtube.com/embed/O6P86uwfdR0"
          }
        ]
      }
    ]
  },
  {
    id: "5",
    title: "Digital Marketing Essentials",
    description: "Learn essential digital marketing strategies including SEO, social media marketing, and content marketing.",
    thumbnail: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    instructor: {
      id: "2",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    duration: "5 weeks",
    level: "beginner",
    category: "Marketing",
    tags: ["SEO", "Social Media", "Content Marketing"],
    rating: 4.6,
    enrolledStudents: 1205,
    price: 49.99,
    modules: [
      {
        id: "m1",
        title: "SEO Fundamentals",
        description: "Learn the basics of search engine optimization",
        duration: "1 week",
        lessons: [
          {
            id: "l1",
            title: "Understanding Search Engines",
            type: "video",
            duration: "18 min",
            content: "https://www.youtube.com/embed/DvwS7cV9GmQ"
          }
        ]
      }
    ]
  },
  {
    id: "6",
    title: "iOS App Development with Swift",
    description: "Build iOS applications using Swift and the latest Apple development tools and frameworks.",
    thumbnail: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    instructor: {
      id: "2",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    duration: "12 weeks",
    level: "intermediate",
    category: "Mobile Development",
    tags: ["iOS", "Swift", "Xcode"],
    rating: 4.7,
    enrolledStudents: 521,
    price: 99.99,
    modules: [
      {
        id: "m1",
        title: "Swift Basics",
        description: "Introduction to Swift programming language",
        duration: "3 weeks",
        lessons: [
          {
            id: "l1",
            title: "Swift Syntax and Variables",
            type: "video",
            duration: "24 min",
            content: "https://www.youtube.com/embed/comQ1-x2a1Q"
          }
        ]
      }
    ]
  }
];

// Mock Quizzes
export const quizzes: Quiz[] = [
  {
    id: "q1",
    title: "HTML Basics Quiz",
    description: "Test your knowledge of basic HTML concepts",
    questions: [
      {
        id: "q1_1",
        text: "What does HTML stand for?",
        type: "multiple-choice",
        options: [
          "Hyper Text Markup Language",
          "High Tech Multi Language",
          "Hyper Transfer Markup Language",
          "Hyper Text Multiple Language"
        ],
        correctAnswer: "Hyper Text Markup Language"
      },
      {
        id: "q1_2",
        text: "Which tag is used to create a hyperlink?",
        type: "multiple-choice",
        options: ["<a>", "<h>", "<link>", "<href>"],
        correctAnswer: "<a>"
      },
      {
        id: "q1_3",
        text: "HTML documents are saved with the extension .html",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: "True"
      }
    ],
    passingScore: 60
  }
];

// Mock Comments
export const comments: Record<string, Comment[]> = {
  "l1": [
    {
      id: "c1",
      content: "This was a great introduction to HTML!",
      user: {
        id: "1",
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?img=1"
      },
      createdAt: new Date("2023-05-15T10:30:00Z"),
      replies: [
        {
          id: "c2",
          content: "I agree, very clear explanation.",
          user: {
            id: "3",
            name: "Admin User",
            avatar: "https://i.pravatar.cc/150?img=3"
          },
          createdAt: new Date("2023-05-15T11:45:00Z")
        }
      ]
    },
    {
      id: "c3",
      content: "Could you explain more about semantic HTML?",
      user: {
        id: "1",
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?img=1"
      },
      createdAt: new Date("2023-05-16T14:20:00Z")
    }
  ]
};

// Mock Certificates
export const certificates: Certificate[] = [
  {
    id: "cert1",
    userId: "1",
    courseId: "1",
    courseName: "Introduction to Web Development",
    userName: "John Doe",
    issueDate: new Date("2023-06-15"),
    certificateUrl: "/certificates/cert1.pdf"
  }
];

// Mock User Progress
export const userProgress: UserProgress[] = [
  {
    userId: "1",
    courseId: "1",
    completedLessons: ["l1", "l2"],
    quizScores: [{ quizId: "q1", score: 80, passed: true }],
    overallProgress: 60,
    lastAccessed: new Date("2023-06-01T15:30:00Z")
  }
];
