import { Calendar, Clock, MapPin, PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// --- TypeScript Type Definition ---
type EventCategory = "Weekly Meeting" | "Community Service" | "Fundraiser" | "Social Event" | "District Conference"

interface RotaryEvent {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  category: EventCategory
  isPast?: boolean
}

// --- Sample Event Data ---
const upcomingEvents: RotaryEvent[] = [
  {
    id: 1,
    title: "Annual Charity Gala & Fundraiser",
    date: "November 15, 2025",
    time: "6:00 PM - 10:00 PM",
    location: "Grand Ballroom, Downtown Hotel",
    description: "Join us for our biggest fundraising event of the year. All proceeds support local literacy programs.",
    category: "Fundraiser",
  },
  {
    id: 2,
    title: "Community Park Cleanup Day",
    date: "November 22, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Central City Park",
    description:
      "Help us beautify our local park. A great opportunity for service and fellowship. Families are welcome!",
    category: "Community Service",
  },
  {
    id: 3,
    title: "Weekly Club Meeting: Guest Speaker on AI",
    date: "November 27, 2025",
    time: "12:00 PM - 1:00 PM",
    location: "The City Club, 4th Floor",
    description:
      "Our weekly meeting features a fascinating talk from Dr. Eva Rostova on the future of artificial intelligence.",
    category: "Weekly Meeting",
  },
  {
    id: 4,
    title: "Rotary Holiday Social Mixer",
    date: "December 5, 2025",
    time: "7:00 PM onwards",
    location: "The Golden Oak Brewery",
    description: "A casual social event to celebrate the holiday season with fellow members and friends.",
    category: "Social Event",
  },
  {
    id: 5,
    title: "District 5020 Annual Conference",
    date: "December 12-14, 2025",
    time: "All Day Event",
    location: "Seaside Convention Center",
    description: "Connect with Rotarians from across the district, share ideas, and get inspired for the year ahead.",
    category: "District Conference",
  },
]

const pastEvents: RotaryEvent[] = [
  {
    id: 6,
    title: "Summer Food Bank Drive",
    date: "October 18, 2025",
    time: "10:00 AM - 2:00 PM",
    location: "Local Grocery Outlet",
    description: "Successfully collected over 2,000 lbs of non-perishable food items for families in need.",
    category: "Community Service",
    isPast: true,
  },
  {
    id: 7,
    title: "Weekly Club Meeting: City Mayor Update",
    date: "October 23, 2025",
    time: "12:00 PM - 1:00 PM",
    location: "The City Club, 4th Floor",
    description: "The Mayor provided an insightful update on city development projects.",
    category: "Weekly Meeting",
    isPast: true,
  },
]

// --- Helper Component for Icons ---
const InfoLine = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <div className="flex items-center text-sm text-muted-foreground">
    <Icon className="mr-2 h-4 w-4" />
    <span>{text}</span>
  </div>
)

// --- Main Page Component ---
export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* 1. Hero Section */}
        <section className="bg-gradient-to-r from-[#01579B] to-[#0277BD] py-20 text-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Upcoming Events</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-blue-100">
              Join us for service, fellowship, and learning. Our events are open to all who wish to make a difference.
            </p>
          </div>
        </section>

        {/* 2. Events List Section */}
        <section id="upcoming-events" className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <Card
                  key={event.id}
                  className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold text-primary pr-2">{event.title}</CardTitle>
                      <Badge variant="secondary" className="bg-[#F7A81B] text-primary-foreground whitespace-nowrap">
                        {event.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <InfoLine icon={Calendar} text={event.date} />
                    <InfoLine icon={Clock} text={event.time} />
                    <InfoLine icon={MapPin} text={event.location} />
                    <p className="text-muted-foreground pt-2">{event.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-[#01579B] hover:bg-[#014a81]">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add to Calendar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Past Events Section */}
        <section id="past-events" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Recent Past Events</h2>
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <Card key={event.id} className="opacity-75 bg-slate-100 border-l-4 border-slate-300">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-slate-600">{event.title}</p>
                        <p className="text-sm text-slate-500">{event.date}</p>
                      </div>
                      <Badge variant="outline">{event.category}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline">View More Past Events</Button>
            </div>
          </div>
        </section>

        {/* 4. Call-to-Action Section */}
        <section id="join-us" className="py-20 bg-[#F7A81B]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#01579B]">Ready to Make an Impact?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-blue-900">
              Become a part of a global network of volunteers working to make the world a better place.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Button asChild size="lg" className="bg-[#01579B] hover:bg-[#014a81]">
                <Link href="/membership">Become a Member</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#01579B] text-[#01579B] hover:bg-blue-50"
              >
                <Link href="#footer">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
