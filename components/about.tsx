import Image from 'next/image'
import { getImagePath } from '@/lib/image-path'

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#01579B] mb-6">Who We Are</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              The Rotary Club of Lucena South is a dedicated organization of community leaders and volunteers committed
              to making a positive impact in our local area.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              For over 50 years, we have been serving our community through various initiatives, from education and
              healthcare to environmental conservation and disaster relief.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our members believe in the power of collective action and the importance of giving back to society.
            </p>
            <button className="text-[#01579B] font-bold hover:text-[#F7A81B] transition-colors flex items-center gap-2">
              Learn More →
            </button>
          </div>

          {/* Right Column - Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative w-full h-64">
              <Image
                src={getImagePath("/rotary-club-members-meeting.jpg")}
                alt="Club members"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="relative w-full h-64">
              <Image
                src={getImagePath("/community-service-event.jpg")}
                alt="Service event"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="relative w-full h-64">
              <Image
                src={getImagePath("/community-volunteers.png")}
                alt="Volunteers"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="relative w-full h-64">
              <Image
                src={getImagePath("/rotary-club-charity-event.jpg")}
                alt="Charity event"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
