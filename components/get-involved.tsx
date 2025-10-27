import { Users, Heart, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GetInvolved() {
  const options = [
    {
      icon: Users,
      title: "Become a Member",
      description: "Join our community of dedicated volunteers and make a lasting impact in our society.",
      cta: "Apply Now",
    },
    {
      icon: Heart,
      title: "Volunteer",
      description: "Contribute your time and skills to our various community service projects.",
      cta: "Get Involved",
    },
    {
      icon: Gift,
      title: "Donate",
      description: "Support our initiatives and help us reach more people in need.",
      cta: "Donate Now",
    },
  ]

  return (
    <section id="get-involved" className="py-16 sm:py-24 bg-[#01579B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Get Involved</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            There are many ways to be part of our mission to serve the community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {options.map((option, index) => {
            const Icon = option.icon
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-8 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-[#F7A81B] p-4 rounded-full">
                    <Icon className="w-8 h-8 text-[#01579B]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#01579B] mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>
                <Button className="bg-[#F7A81B] text-[#01579B] hover:bg-[#F7A81B]/90 font-bold">{option.cta}</Button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
