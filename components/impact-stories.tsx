import { Quote } from "lucide-react"

export default function ImpactStories() {
  const stories = [
    {
      quote:
        "The Rotary Club changed my life by providing me with a scholarship. I was able to complete my education and now I am giving back to the community.",
      author: "Maria Santos",
      role: "Scholarship Recipient",
      image: "/young-professional-woman.png",
    },
    {
      quote:
        "Being part of this club has taught me the true meaning of service. Every project we undertake brings joy and hope to countless families.",
      author: "Juan Dela Cruz",
      role: "Club Member",
      image: "/man-volunteer-community.jpg",
    },
    {
      quote:
        "The healthcare programs organized by Rotary have reached our remote village. Many lives have been saved thanks to their dedication.",
      author: "Dr. Rosa Garcia",
      role: "Healthcare Partner",
      image: "/doctor-healthcare-professional.jpg",
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#01579B] mb-4">Impact Stories</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real stories from real people whose lives have been transformed
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-6">
                <Quote className="w-8 h-8 text-[#F7A81B]" />
              </div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">"{story.quote}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-[#01579B]">{story.author}</p>
                  <p className="text-gray-600 text-sm">{story.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
