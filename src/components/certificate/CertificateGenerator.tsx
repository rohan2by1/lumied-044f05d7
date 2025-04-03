
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { Course, User } from "@/types";

interface CertificateGeneratorProps {
  course: Course;
  user: User;
  completionDate: Date;
}

export default function CertificateGenerator({
  course,
  user,
  completionDate,
}: CertificateGeneratorProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  
  const handleDownload = () => {
    if (!certificateRef.current) return;
    
    setDownloading(true);
    
    // In a real app, would use html2canvas or similar to generate PDF
    setTimeout(() => {
      setDownloading(false);
      // Mock download functionality
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${user.name}-${course.title}-certificate.pdf`;
      link.click();
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardContent className="p-8">
          <div ref={certificateRef} className="certificate relative border-8 border-double border-primary/20 p-8 flex flex-col items-center text-center">
            {/* Certificate background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_75%)]"></div>
              <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              <div className="absolute bottom-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
              <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
            </div>
            
            {/* Certificate content */}
            <div className="mb-6">
              <div className="flex items-center justify-center">
                <h2 className="font-bold text-2xl text-primary">LearnFlow</h2>
              </div>
            </div>
            
            <h1 className="font-serif text-3xl font-bold mb-2">Certificate of Completion</h1>
            
            <p className="text-muted-foreground mb-8">This is to certify that</p>
            
            <h2 className="font-serif text-4xl font-bold text-primary mb-2">{user.name}</h2>
            
            <p className="text-muted-foreground mb-6">has successfully completed the course</p>
            
            <h3 className="font-serif text-2xl font-bold mb-8">{course.title}</h3>
            
            <div className="mb-8">
              <p className="text-muted-foreground">with duration of {course.duration}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-16 w-full max-w-lg">
              <div className="text-center border-t border-muted pt-4">
                <p className="font-medium">{course.instructor.name}</p>
                <p className="text-sm text-muted-foreground">Instructor</p>
              </div>
              <div className="text-center border-t border-muted pt-4">
                <p className="font-medium">{completionDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-sm text-muted-foreground">Date of Completion</p>
              </div>
            </div>
            
            <div className="mt-6 text-sm text-muted-foreground">
              <p>Certificate ID: LEARN-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex-1" size="lg" onClick={handleDownload} disabled={downloading}>
          <Download className="mr-2 h-4 w-4" />
          {downloading ? "Generating PDF..." : "Download Certificate"}
        </Button>
        <Button variant="outline" className="flex-1" size="lg">
          <Share2 className="mr-2 h-4 w-4" />
          Share Certificate
        </Button>
      </div>
    </div>
  );
}
