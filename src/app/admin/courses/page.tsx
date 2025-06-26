import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const AdminCoursePage = () => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pr-8">
      <Button className="absolute bottom-8 right-8 rounded-full bg-green-600 text-white hover:bg-green-700 size-14">
        <Link href="/admin/courses/new">
          <Plus className="size-10" />
        </Link>
      </Button>

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
              <Link href={`/admin/courses/${course.id}`}>{course.title}</Link>
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <CardDescription className="text-sm line-clamp-2 text-muted-foreground">
                <span>Total Modules : 20</span>
              </CardDescription>
              <CardDescription className="text-sm line-clamp-2 text-muted-foreground">
                <span>Duration : {course.duration}</span>
              </CardDescription>
              <CardDescription className="text-sm line-clamp-2 text-muted-foreground">
                <span>Modules :20 </span>
              </CardDescription>
              <CardDescription className="text-sm line-clamp-2 text-muted-foreground">
                <span>Published :False</span>
              </CardDescription>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600">
                {course.price}
              </span>
              <div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Edit
                </Button>
                <Button size="sm" className="bg-red-600 hover:bg-red-700 ml-2">
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminCoursePage;
