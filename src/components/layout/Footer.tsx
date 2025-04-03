
import { Link } from "react-router-dom";
import { BookOpen, Mail, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-4">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <div className="flex items-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <span className="ml-2 text-lg font-bold text-foreground">LearnFlow</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                  Empowering learners worldwide with accessible, quality education for personal and professional growth.
                </p>
                <div className="flex space-x-4 mt-6">
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <Youtube className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Learn</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/courses" className="text-sm text-muted-foreground hover:text-primary">Courses</Link>
                  </li>
                  <li>
                    <Link to="/tutorials" className="text-sm text-muted-foreground hover:text-primary">Tutorials</Link>
                  </li>
                  <li>
                    <Link to="/workshops" className="text-sm text-muted-foreground hover:text-primary">Workshops</Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link>
                  </li>
                  <li>
                    <Link to="/team" className="text-sm text-muted-foreground hover:text-primary">Our Team</Link>
                  </li>
                  <li>
                    <Link to="/careers" className="text-sm text-muted-foreground hover:text-primary">Careers</Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
                  </li>
                  <li>
                    <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary">Cookie Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} LearnFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
