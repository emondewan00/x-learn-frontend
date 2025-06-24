import { Button } from "@/components/ui/button";

import { Star, Clock, Users, BookOpen } from "lucide-react";
import {
  CardHeader,
  CardTitle,
  Card,
  CardContent,
  CardDescription,
} from "./ui/card";

export function PopularCourses() {
  const courses = [
    {
      id: 1,
      title: "Complete React Development",
      instructor: "Sarah Johnson",
      rating: 4.8,
      students: 12450,
      duration: "24 hours",
      price: "$89",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      category: "Web Development",
    },
    {
      id: 2,
      title: "Python for Data Science",
      instructor: "Dr. Michael Chen",
      rating: 4.9,
      students: 8930,
      duration: "32 hours",
      price: "$129",
      image:
        "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=300&h=200&fit=crop",
      category: "Data Science",
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Emma Rodriguez",
      rating: 4.7,
      students: 15670,
      duration: "18 hours",
      price: "$79",
      image:
        "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=300&h=200&fit=crop",
      category: "Design",
    },
    {
      id: 4,
      title: "Machine Learning Fundamentals",
      instructor: "Prof. David Kim",
      rating: 4.8,
      students: 6780,
      duration: "40 hours",
      price: "$159",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop",
      category: "AI & ML",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Most Popular Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of students in our top-rated courses and advance your
            career
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  by {course.instructor}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    {course.price}
                  </span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
