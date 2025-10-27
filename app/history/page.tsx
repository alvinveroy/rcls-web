"use client"

import { useState } from "react"
import { ChevronDown, Award, Users, Heart, TrendingUp } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

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
  biography: string
  image: string
  projects: Project[]
}

const presidents: President[] = [
  {
    id: 1,
    name: "Dr. Juan Santos",
    year: "2022-2023",
    summary: "Focused on community health initiatives and youth education programs",
    biography:
      "Dr. Juan Santos brought his medical expertise and passion for community service to the presidency, launching several groundbreaking health initiatives. Under his leadership, the club expanded its reach to underserved communities, providing free medical consultations and health education. His vision of 'Health for All' became the cornerstone of the club's mission during his term. Dr. Santos also championed youth education, establishing partnerships with local schools to provide scholarships and mentorship programs. His dedication to service above self inspired members and volunteers alike, creating a lasting impact on the community.",
    image: "/rotary-club-president.jpg",
    projects: [
      {
        title: "Health Awareness Campaign",
        description:
          "Conducted comprehensive free medical checkups and health seminars in underserved communities across the region",
        image: "/health-awareness-campaign.png",
        impact: "Reached 500+ individuals, provided free consultations, distributed essential medicines",
      },
      {
        title: "Scholarship Program",
        description: "Provided full educational scholarships to 25 deserving students from low-income families",
        image: "/scholarship-program.jpg",
        impact: "25 students supported, 100% graduation rate, 20 students now employed in their fields",
      },
    ],
  },
  {
    id: 2,
    name: "Maria Reyes",
    year: "2021-2022",
    summary: "Pioneered environmental conservation and sustainable development projects",
    biography:
      "Maria Reyes led the club with a strong focus on environmental sustainability and climate action. Her 'Green Future' initiative transformed how the community approached environmental conservation. With her background in environmental science, she introduced innovative programs that engaged youth and adults alike in tree planting and coastal cleanup activities. Her leadership style emphasized collaboration with local government units and environmental organizations, creating a network of partners committed to protecting our natural resources. Maria's term saw the club receive national recognition for its environmental advocacy work.",
    image: "/rotary-club-president-woman.jpg",
    projects: [
      {
        title: "Tree Planting Initiative",
        description:
          "Massive reforestation project that planted 5,000 native trees across degraded forest areas in the municipality",
        image: "/community-tree-planting.png",
        impact: "5,000 trees planted, 50 hectares reforested, 200+ volunteers participated",
      },
      {
        title: "Coastal Cleanup Drive",
        description:
          "Organized monthly beach cleanups with strong community participation, raising awareness about marine pollution",
        image: "/coastal-cleanup.jpg",
        impact: "Removed 10 tons of plastic waste, engaged 500+ volunteers over 12 months",
      },
    ],
  },
  {
    id: 3,
    name: "Roberto Cruz",
    year: "2020-2021",
    summary: "Strengthened community partnerships and expanded club membership",
    biography:
      "Roberto Cruz's presidency was marked by his exceptional ability to build bridges between the club and various community stakeholders. He established strategic partnerships with local businesses, government agencies, and other civic organizations, multiplying the club's impact. His 'Together We Serve' campaign successfully increased club membership by 40%, bringing in diverse professionals who added new perspectives and resources. Roberto's focus on skills development and livelihood training empowered community members to achieve economic independence. His term also coincided with the pandemic, during which he led the club's disaster relief efforts with compassion and efficiency.",
    image: "/rotary-club-president-man.jpg",
    projects: [
      {
        title: "Livelihood Training",
        description:
          "Comprehensive skills training program offering courses in various trades including carpentry, sewing, and food service",
        image: "/livelihood-training.jpg",
        impact: "100+ trained, 60% employment rate, 30 started own businesses",
      },
      {
        title: "Disaster Relief",
        description:
          "Rapid response program providing emergency assistance to typhoon-affected families with relief goods and temporary shelter",
        image: "/disaster-relief.jpg",
        impact: "Assisted 200+ families, distributed ₱2M worth of relief goods",
      },
    ],
  },
  {
    id: 4,
    name: "Angela Fernandez",
    year: "2019-2020",
    summary: "Established women empowerment and microfinance programs",
    biography:
      "Angela Fernandez brought a powerful focus on women's economic empowerment and gender equality to her presidency. Her 'Women Rising' initiative created pathways for women to become entrepreneurs and community leaders. With her experience in microfinance, she established a sustainable lending program that provided capital to women-led small businesses. Angela's advocacy for women's rights and her mentorship of young female professionals left an indelible mark on the club and community. Her term saw the highest percentage of women in leadership positions within the club, setting a precedent for inclusive governance.",
    image: "/rotary-club-president.jpg",
    projects: [
      {
        title: "Women Entrepreneurs Program",
        description:
          "Holistic program supporting 50 women in starting and growing their own businesses with training, mentorship, and seed capital",
        image: "/diverse-women-entrepreneurs.png",
        impact: "50 women supported, average income increase of 150%, 40 businesses still operating",
      },
      {
        title: "Microfinance Initiative",
        description:
          "Established a revolving loan fund providing affordable microloans to small business owners, particularly women",
        image: "/microfinance.jpg",
        impact: "₱2M in loans distributed, 98% repayment rate, 75 businesses funded",
      },
    ],
  },
]

const milestones = [
  {
    year: "1974",
    title: "Club Founding",
    description: "Rotary Club of Lucena South was chartered, becoming part of the global Rotary family",
    icon: Award,
  },
  {
    year: "1985",
    title: "First Major Project",
    description: "Completed the construction of a community center, serving as a hub for local activities",
    icon: Users,
  },
  {
    year: "2000",
    title: "Scholarship Program Launch",
    description: "Established our signature scholarship program, supporting over 500 students to date",
    icon: Heart,
  },
  {
    year: "2015",
    title: "National Recognition",
    description: "Received the Presidential Award for Outstanding Community Service",
    icon: Award,
  },
  {
    year: "2023",
    title: "50 Years of Service",
    description: "Celebrated five decades of transforming lives and building communities",
    icon: TrendingUp,
  },
]

const impactStats = [
  { number: "50+", label: "Years of Service" },
  { number: "10,000+", label: "Lives Impacted" },
  { number: "500+", label: "Students Supported" },
  { number: "₱50M+", label: "Total Community Investment" },
]

export default function HistoryPage() {
  const [selectedPresident, setSelectedPresident] = useState<President | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handlePresidentClick = (president: President) => {
    setSelectedPresident(president)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#01579B] to-[#0277BD] py-32 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Legacy</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Five decades of service, compassion, and transformative impact in Lucena South and beyond
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#01579B] mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Club Milestones */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#01579B] mb-4">Club Milestones</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key moments that shaped our journey of service and excellence
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              return (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-xl transition-shadow border-l-4 border-[#F7A81B]"
                >
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-[#F7A81B] rounded-full flex items-center justify-center">
                          <Icon className="w-8 h-8 text-[#01579B]" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-[#F7A81B] mb-2">{milestone.year}</div>
                        <h3 className="text-2xl font-bold text-[#01579B] mb-3">{milestone.title}</h3>
                        <p className="text-gray-600 text-lg">{milestone.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Presidential Timeline */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#01579B] mb-4">Our Visionary Leaders</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the presidents who have guided our club through years of impactful service
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#01579B] to-[#F7A81B]" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {presidents.map((president, index) => (
                <div
                  key={president.id}
                  className={`flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Content */}
                  <div className="w-full md:w-1/2 md:px-8">
                    <Card
                      className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-[#F7A81B]"
                      onClick={() => handlePresidentClick(president)}
                    >
                      <div className="flex items-start gap-6">
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <Image
                            src={president.image || "/placeholder.svg"}
                            alt={president.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-[#01579B] mb-1">{president.name}</h3>
                          <p className="text-lg font-semibold text-[#F7A81B] mb-3">{president.year}</p>
                          <p className="text-gray-600 mb-4">{president.summary}</p>
                          <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                            {president.biography}
                          </p>
                          <button className="inline-flex items-center gap-2 text-[#01579B] hover:text-[#F7A81B] transition-colors font-semibold">
                            View Full Biography & Accomplishments
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:flex w-full md:w-0 justify-center">
                    <div className="w-8 h-8 bg-[#F7A81B] rounded-full border-4 border-white shadow-lg" />
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* President Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-6 mb-6">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={selectedPresident?.image || ""}
                  alt={selectedPresident?.name || ""}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <DialogTitle className="text-3xl text-[#01579B]">{selectedPresident?.name}</DialogTitle>
                <p className="text-xl text-[#F7A81B] font-semibold">{selectedPresident?.year}</p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold text-[#01579B] mb-4">Biography</h4>
              <p className="text-gray-700 leading-relaxed">{selectedPresident?.biography}</p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#01579B] mb-6">Key Projects & Accomplishments</h4>
              <div className="space-y-6">
                {selectedPresident?.projects.map((project, index) => (
                  <Card key={index} className="border-l-4 border-[#F7A81B]">
                    <CardContent className="p-6">
                      <h5 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h5>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      {project.image && (
                        <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="bg-[#01579B]/5 rounded-lg p-4">
                        <p className="text-sm font-semibold text-[#01579B]">
                          <span className="font-bold">Impact:</span> {project.impact}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
