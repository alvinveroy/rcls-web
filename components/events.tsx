import { MapPin, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Events() {
  const events = [
    {
      title: "Weekly Club Meeting",
      date: "Every Tuesday",
      time: "6:30 PM - 8:00 PM",
      location: "Community Center, Lucena South",
      description: "Join us for our regular club meeting with updates and discussions.",
    },
    {
      title: "Community Cleanup Drive",
      date: "November 15, 2024",
      time: "8:00 AM - 12:00 PM",
      location: "Central Park, Lucena South",
      description: "Help us keep our community clean and green.",
    },
    {
      title: "Health Awareness Camp",
      date: "November 22, 2024",
      time: "9:00 AM - 3:00 PM",
      location: "Municipal Hospital",
      description: "Free health checkups and medical consultations.",
    },
    {
      title: "Youth Scholarship Awards",
      date: "December 1, 2024",
      time: "5:00 PM - 7:00 PM",
      location: "Grand Ballroom, Lucena South",
      description: "Celebrating and honoring our scholarship recipients.",
    },
    {
      title: "Annual Gala Dinner",
      date: "December 15, 2024",
      time: "7:00 PM - 10:00 PM",
      location: "Luxury Hotel, Lucena South",
      description: "Celebrating our achievements and community impact.",
    },
  ]

  return (
    <section id="events" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#01579B] mb-4">Upcoming Events</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join us at our upcoming events and be part of the change
          </p>
        </div>

        <div className="space-y-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="border-l-4 border-[#F7A81B] bg-[#F5F5F5] p-6 rounded-r-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#01579B] mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#F7A81B]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#F7A81B]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#F7A81B]" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                <Button className="bg-[#01579B] text-white hover:bg-[#01579B]/90 whitespace-nowrap">
                  Add to Calendar
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/events">
            <Button variant="outline" className="border-[#01579B] text-[#01579B] hover:bg-[#01579B]/5 bg-transparent">
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
