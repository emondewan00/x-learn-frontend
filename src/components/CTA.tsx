
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export function CTA() {
  const benefits = [
    "Access to 10,000+ premium courses",
    "Learn from industry experts",
    "Earn verified certificates",
    "30-day money-back guarantee"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join millions of learners worldwide and unlock your potential with our comprehensive courses. 
            Start today and see the difference quality education can make.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-white text-left">
                <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              View Pricing Plans
            </Button>
          </div>
          
          <p className="text-blue-200 text-sm mt-6">
            No credit card required • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
