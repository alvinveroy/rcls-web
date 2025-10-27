"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

interface Project {
  title: string
  description: string
  image?: string
  impact: string
}

interface President {
  id: number
  name: string
  year: string
  summary: string
  image: string
  projects: Project[]
}

const presidents: President[] = [
  {
    id: 1,
    name: "Dr. Juan Santos",
    year: "2022-2023",
    summary: "Focused on community health initiatives and youth education programs",
    image: "/rotary-club-president.jpg",
    projects: [
      {
        title: "Health Awareness Campaign",
        description: "Conducted free medical checkups and health seminars in underserved communities",
        image: "/health-awareness-campaign.png",
        impact: "Reached 500+ individuals, provided free consultations",
      },
      {
        title: "Scholarship Program",
        description: "Provided educational scholarships to 25 deserving students",
        image: "/scholarship-program.jpg",
        impact: "25 students supported, 100% graduation rate",
      },
    ],
  },
  {
    id: 2,
    name: "Maria Reyes",
    year: "2021-2022",
    summary: "Pioneered environmental conservation and sustainable development projects",
    image: "/rotary-club-president-woman.jpg",
    projects: [
      {
        title: "Tree Planting Initiative",
        description: "Planted 5,000 trees across the municipality",
        image: "/community-tree-planting.png",
        impact: "5,000 trees planted, 50 hectares reforested",
      },
      {
        title: "Coastal Cleanup Drive",
        description: "Organized monthly beach cleanups with community participation",
        image: "/coastal-cleanup.jpg",
        impact: "Removed 10 tons of plastic waste",
      },
    ],
  },
  {
    id: 3,
    name: "Roberto Cruz",
    year: "2020-2021",
    summary: "Strengthened community partnerships and expanded club membership",
    image: "/rotary-club-president-man.jpg",
    projects: [
      {
        title: "Livelihood Training",
        description: "Conducted skills training for 100+ individuals in various trades",
        image: "/livelihood-training.jpg",
        impact: "100+ trained, 60% employment rate",
      },
      {
        title: "Disaster Relief",
        description: "Provided emergency assistance to typhoon-affected families",
        image: "/disaster-relief.jpg",
        impact: "Assisted 200+ families",
      },
    ],
  },
  {
    id: 4,
    name: "Angela Fernandez",
    year: "2019-2020",
    summary: "Established women empowerment and microfinance programs",
    image: "/rotary-club-president.jpg",
    projects: [
      {
        title: "Women Entrepreneurs Program",
        description: "Supported 50 women in starting their own businesses",
        image: "/diverse-women-entrepreneurs.png",
        impact: "50 women supported, average income increase of 150%",
      },
      {
        title: "Microfinance Initiative",
        description: "Provided microloans to small business owners",
        image: "/microfinance.jpg",
        impact: "₱2M in loans distributed",
      },
    ],
  },
]

export default function History() {
  const [selectedPresident, setSelectedPresident] = useState<President | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handlePresidentClick = (president: President) => {
    setSelectedPresident(president)
    setIsDialogOpen(true)
  }

  return (
    <section id="history" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#01579B] mb-4">Our Legacy</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating the visionary leaders and transformative projects that have shaped our club's journey
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#01579B] to-[#F7A81B]" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {presidents.map((president, index) => (
              <div key={president.id} className={`flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Content */}
                <div className="w-full md:w-1/2 md:px-8">
                  <div
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-[#F7A81B]"
                    onClick={() => handlePresidentClick(president)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={president.image || "/placeholder.svg"}
                          alt={president.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#01579B] mb-1">{president.name}</h3>
                        <p className="text-sm font-semibold text-[#F7A81B] mb-2">{president.year}</p>
                        <p className="text-gray-600 text-sm mb-3">{president.summary}</p>
                        <button className="inline-flex items-center gap-2 text-[#01579B] hover:text-[#F7A81B] transition-colors font-semibold text-sm">
                          View Accomplishments
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex w-full md:w-0 justify-center">
                  <div className="w-6 h-6 bg-[#F7A81B] rounded-full border-4 border-white shadow-lg" />
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* President Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={selectedPresident?.image || ""}
                  alt={selectedPresident?.name || ""}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <DialogTitle className="text-2xl text-[#01579B]">{selectedPresident?.name}</DialogTitle>
                <p className="text-[#F7A81B] font-semibold">{selectedPresident?.year}</p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <p className="text-gray-700 mb-4">{selectedPresident?.summary}</p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-[#01579B] mb-4">Key Projects & Accomplishments</h4>
              <div className="space-y-4">
                {selectedPresident?.projects.map((project, index) => (
                  <div key={index} className="border-l-4 border-[#F7A81B] pl-4">
                    <h5 className="font-bold text-gray-900 mb-2">{project.title}</h5>
                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    {project.image && (
                      <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="bg-[#01579B]/5 rounded p-3">
                      <p className="text-sm font-semibold text-[#01579B]">Impact: {project.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
