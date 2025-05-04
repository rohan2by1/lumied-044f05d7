
import { useState } from "react";
import { Link } from "react-router-dom";
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
  SidebarFooter,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Users, 
  BarChart2, 
  Settings, 
  User, 
  LogOut,
  PlusCircle,
  Search,
  FileText,
  Edit,
  Trash2,
  MoreHorizontal,
  Check,
  PieChart,
  TrendingUp,
  School,
  Star,
  HelpCircle,
  Mail,
  Bell,
} from "lucide-react";
import { courses, users } from "@/data/mockData";
import { Course } from "@/types";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Admin Sidebar */}
        <Sidebar className="border-r">
          <SidebarHeader className="px-6 py-4 border-b">
            <div className="flex items-center">
              <BookOpen className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-lg">LumiED Admin</span>
            </div>
          </SidebarHeader>

          <SidebarContent className="py-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={activeTab === "overview" ? "bg-accent" : ""}
                  onClick={() => setActiveTab("overview")}
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={activeTab === "courses" ? "bg-accent" : ""}
                  onClick={() => setActiveTab("courses")}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Courses
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={activeTab === "users" ? "bg-accent" : ""}
                  onClick={() => setActiveTab("users")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={activeTab === "reports" ? "bg-accent" : ""}
                  onClick={() => setActiveTab("reports")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Reports
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={activeTab === "settings" ? "bg-accent" : ""}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="px-4 py-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">
                    admin@example.com
                  </p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/login">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Link>
            </Button>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="border-b bg-background">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <SidebarTrigger>
                  <Button variant="outline" size="sm" className="mr-2">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </SidebarTrigger>
                <h1 className="text-xl font-semibold">
                  {activeTab === "overview" && "Dashboard Overview"}
                  {activeTab === "courses" && "Courses Management"}
                  {activeTab === "users" && "User Management"}
                  {activeTab === "reports" && "Reports"}
                  {activeTab === "settings" && "System Settings"}
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-[200px] pl-8"
                  />
                </div>
                <Button size="icon" variant="ghost">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="flex-1 overflow-auto p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-muted-foreground">Total Users</p>
                          <h3 className="text-3xl font-bold mt-1">1,248</h3>
                          <p className="text-sm text-green-600 mt-1">
                            +12% this month
                          </p>
                        </div>
                        <div className="rounded-full bg-primary/10 p-3">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-muted-foreground">
                            Active Courses
                          </p>
                          <h3 className="text-3xl font-bold mt-1">48</h3>
                          <p className="text-sm text-green-600 mt-1">
                            +3 new this week
                          </p>
                        </div>
                        <div className="rounded-full bg-primary/10 p-3">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-muted-foreground">Enrollments</p>
                          <h3 className="text-3xl font-bold mt-1">6,842</h3>
                          <p className="text-sm text-green-600 mt-1">
                            +24% this month
                          </p>
                        </div>
                        <div className="rounded-full bg-primary/10 p-3">
                          <School className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-muted-foreground">Revenue</p>
                          <h3 className="text-3xl font-bold mt-1">$24,980</h3>
                          <p className="text-sm text-green-600 mt-1">
                            +8% this month
                          </p>
                        </div>
                        <div className="rounded-full bg-primary/10 p-3">
                          <TrendingUp className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Enrollment Statistics</CardTitle>
                      <CardDescription>
                        Monthly enrollment trends
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="text-muted-foreground flex flex-col items-center">
                          <BarChart2 className="h-16 w-16 opacity-50" />
                          <p className="mt-2">
                            Enrollment statistics chart would render here
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Course Categories</CardTitle>
                      <CardDescription>
                        Distribution by category
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="text-muted-foreground flex flex-col items-center">
                          <PieChart className="h-16 w-16 opacity-50" />
                          <p className="mt-2">
                            Category distribution chart would render here
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                                <AvatarFallback>JD</AvatarFallback>
                              </Avatar>
                              <span>John Doe</span>
                            </div>
                          </TableCell>
                          <TableCell>Enrolled in "Web Development"</TableCell>
                          <TableCell>Today, 10:30 AM</TableCell>
                          <TableCell>
                            <Badge>Completed</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="https://i.pravatar.cc/150?img=2" />
                                <AvatarFallback>JS</AvatarFallback>
                              </Avatar>
                              <span>Jane Smith</span>
                            </div>
                          </TableCell>
                          <TableCell>Added new course "Data Science"</TableCell>
                          <TableCell>Today, 9:15 AM</TableCell>
                          <TableCell>
                            <Badge>Published</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="https://i.pravatar.cc/150?img=4" />
                                <AvatarFallback>RJ</AvatarFallback>
                              </Avatar>
                              <span>Robert Johnson</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            Completed "UX Design Principles"
                          </TableCell>
                          <TableCell>Yesterday, 4:23 PM</TableCell>
                          <TableCell>
                            <Badge variant="outline">Awarded Certificate</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Courses</h2>
                    <p className="text-muted-foreground">
                      Manage your course catalog
                    </p>
                  </div>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New Course
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search courses..."
                      className="w-[300px]"
                    />
                    <Button variant="outline">Filter</Button>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {courses.length} courses total
                    </p>
                  </div>
                </div>

                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-16 rounded overflow-hidden">
                                <img
                                  src={course.thumbnail}
                                  alt={course.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <span className="font-medium">
                                {course.title}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={course.instructor.avatar} />
                                <AvatarFallback>
                                  {course.instructor.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span>{course.instructor.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{course.category}</TableCell>
                          <TableCell>{course.enrolledStudents}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400 mr-1" />
                              <span>{course.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Published</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="ghost">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Users</h2>
                    <p className="text-muted-foreground">
                      Manage users and permissions
                    </p>
                  </div>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New User
                  </Button>
                </div>

                <Tabs defaultValue="students">
                  <TabsList>
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="instructors">Instructors</TabsTrigger>
                    <TabsTrigger value="admins">Admins</TabsTrigger>
                  </TabsList>

                  <TabsContent value="students" className="mt-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Enrolled Courses</TableHead>
                          <TableHead>Joined Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users
                          .filter((user) => user.role === "student")
                          .map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>
                                      {user.name[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">
                                    {user.name}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>3</TableCell>
                              <TableCell>Jan 15, 2023</TableCell>
                              <TableCell>
                                <Badge variant="outline">Active</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button size="sm" variant="ghost">
                                    <User className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Mail className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="https://i.pravatar.cc/150?img=4" />
                                <AvatarFallback>RJ</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">
                                Robert Johnson
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>robert@example.com</TableCell>
                          <TableCell>5</TableCell>
                          <TableCell>Feb 22, 2023</TableCell>
                          <TableCell>
                            <Badge variant="outline">Active</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="ghost">
                                <User className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="instructors" className="mt-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Courses Created</TableHead>
                          <TableHead>Students</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users
                          .filter((user) => user.role === "instructor")
                          .map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>
                                      {user.name[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">
                                    {user.name}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>6</TableCell>
                              <TableCell>2,486</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400 mr-1" />
                                  <span>4.8</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button size="sm" variant="ghost">
                                    <User className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Mail className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="admins" className="mt-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Last Active</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users
                          .filter((user) => user.role === "admin")
                          .map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>
                                      {user.name[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">
                                    {user.name}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>Super Admin</TableCell>
                              <TableCell>Just now</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button size="sm" variant="ghost">
                                    <Settings className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeTab === "reports" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Reports & Analytics</h2>
                <Tabs defaultValue="enrollment">
                  <TabsList>
                    <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="user">User Activity</TabsTrigger>
                    <TabsTrigger value="course">Course Performance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="enrollment" className="mt-6 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Enrollment Overview</CardTitle>
                        <CardDescription>
                          Student enrollment statistics across all courses
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="h-[400px] flex items-center justify-center">
                        <div className="text-muted-foreground flex flex-col items-center">
                          <BarChart2 className="h-16 w-16 opacity-50" />
                          <p className="mt-2">
                            Enrollment statistics chart would render here
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Top Performing Courses</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Course</TableHead>
                                <TableHead>Enrollments</TableHead>
                                <TableHead>Growth</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {courses.slice(0, 5).map((course) => (
                                <TableRow key={course.id}>
                                  <TableCell>{course.title}</TableCell>
                                  <TableCell>
                                    {course.enrolledStudents}
                                  </TableCell>
                                  <TableCell className="text-green-600">
                                    +{Math.floor(Math.random() * 20) + 5}%
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Enrollment by Category</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px] flex items-center justify-center">
                          <div className="text-muted-foreground flex flex-col items-center">
                            <PieChart className="h-16 w-16 opacity-50" />
                            <p className="mt-2">
                              Category distribution chart would render here
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="revenue">
                    <div className="py-6">
                      <h3 className="text-xl font-semibold mb-6">
                        Revenue Analytics
                      </h3>
                      <p className="text-muted-foreground">
                        Revenue reporting interface would be displayed here.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">System Settings</h2>
                <Tabs defaultValue="general">
                  <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="notifications">
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Platform Settings</CardTitle>
                        <CardDescription>
                          Configure basic settings for your learning platform
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <label className="font-medium">Platform Name</label>
                          <Input defaultValue="LearnFlow" />
                        </div>
                        <div className="space-y-2">
                          <label className="font-medium">Admin Email</label>
                          <Input defaultValue="admin@learnflow.com" />
                        </div>
                        <div className="space-y-2">
                          <label className="font-medium">Support Contact</label>
                          <Input defaultValue="support@learnflow.com" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
