
import { Users, BookOpen, Award, Globe } from "lucide-react";

export function Stats() {
  const stats = [
    {
      icon: Users,
      value: "2M+",
      label: "Active Students",
      color: "text-blue-600"
    },
    {
      icon: BookOpen,
      value: "10K+",
      label: "Online Courses",
      color: "text-purple-600"
    },
    {
      icon: Award,
      value: "500+",
      label: "Expert Instructors",
      color: "text-indigo-600"
    },
    {
      icon: Globe,
      value: "150+",
      label: "Countries",
      color: "text-green-600"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300 mb-4`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
