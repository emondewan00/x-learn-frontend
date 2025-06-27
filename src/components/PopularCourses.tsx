import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Course from "@/types/course";
import CourseCard from "./CourseCard";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function PopularCourses() {
  const response = await fetch(`${base_url}/courses?popular=true&limit=4`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

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
          {data?.data?.length > 0 &&
            data.data.map((course: Course) => (
              <CourseCard key={course._id} course={course} />
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
