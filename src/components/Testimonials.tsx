import { Star, Quote } from "lucide-react";
import Image from "next/image";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Developer",
      company: "Tech Corp",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b977?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      content:
        "This platform transformed my career. The courses are incredibly well-structured and the instructors are top-notch. I landed my dream job within 3 months!",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Product Manager",
      company: "StartupXYZ",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      content:
        "The flexibility to learn at my own pace while working full-time was exactly what I needed. The certificate I earned here helped me get promoted.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "Design Studio",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      content:
        "Amazing learning experience! The interactive projects and real-world applications made complex topics easy to understand. Highly recommend!",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of successful learners who have transformed their
            careers through our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 relative hover:shadow-lg transition-shadow duration-300"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-200" />

              <div className="flex items-center mb-6">
                <Image
                  width={48}
                  height={48}
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed italic">
                &#34;{testimonial.content}&#34;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
