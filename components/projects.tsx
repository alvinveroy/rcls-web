import Image from 'next/image'
import { getImagePath } from '@/lib/image-path'

export default function Projects() {
  const projects = [
    {
      title: "Education Initiative",
      description: "Providing scholarships and educational resources to underprivileged students in our community.",
      image: "/students-learning.png",
    },
    {
      title: "Healthcare Program",
      description: "Free medical camps and health awareness programs for rural and underserved areas.",
      image: "/healthcare-medical-clinic.jpg",
    },
    {
      title: "Environmental Conservation",
      description: "Tree planting drives and environmental cleanup initiatives to protect our planet.",
      image: "/environmental-conservation-trees-nature.jpg",
    },
    {
      title: "Disaster Relief",
      description: "Rapid response and support for communities affected by natural disasters.",
      image: "/disaster-relief-humanitarian-aid.jpg",
    },
    {
      title: "Youth Development",
      description: "Mentorship programs and skill development workshops for young people.",
      image: "/youth-development-training-workshop.jpg",
    },
    {
      title: "Community Outreach",
      description: "Regular community engagement programs and social welfare initiatives.",
      image: "/community-outreach-social-welfare.jpg",
    },
  ]

  return (
    <section id="projects" className="py-16 sm:py-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#01579B] mb-4">Our Projects</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Making a real difference through impactful community initiatives
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full h-48">
                <Image 
                  src={getImagePath(project.image || "/placeholder.svg")} 
                  alt={project.title} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#01579B] mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <button className="text-[#F7A81B] font-bold hover:text-[#01579B] transition-colors">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
