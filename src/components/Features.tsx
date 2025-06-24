
import { BookOpen, Users, Award, Clock, Shield, Zap } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Course Library",
      description: "Access thousands of courses across technology, business, design, and more. From beginner to advanced levels.",
      color: "bg-blue-500"
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals and certified experts who bring real-world experience to every lesson.",
      color: "bg-purple-500"
    },
    {
      icon: Award,
      title: "Verified Certificates",
      description: "Earn industry-recognized certificates upon course completion to boost your professional profile.",
      color: "bg-indigo-500"
    },
    {
      icon: Clock,
      title: "Learn at Your Pace",
      description: "Self-paced learning with lifetime access. Study when it's convenient for you, anywhere, anytime.",
      color: "bg-green-500"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "All courses are carefully curated and regularly updated to ensure the highest quality content.",
      color: "bg-orange-500"
    },
    {
      icon: Zap,
      title: "Interactive Learning",
      description: "Engage with quizzes, projects, and hands-on exercises to reinforce your learning and track progress.",
      color: "bg-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our LMS Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the features that make our learning management system the preferred choice 
            for millions of students and professionals worldwide.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
