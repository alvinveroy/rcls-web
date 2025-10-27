// /app/about/page.tsx

import type { NextPage } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  HeartHandshake,
  Users,
  BookOpen,
  Stethoscope,
  Globe,
  Goal,
  Eye,
  CheckCircle2,
  Building,
  Award
} from "lucide-react";

// --- Component Imports ---
// Ensure you have these components created in your project
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const AboutPage: NextPage = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Navbar />

      <main>
        {/* 1. Hero Section */}
        <section className="relative bg-[#01579B] text-white py-24 md:py-32 text-center">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Rotary Club of Lucena South
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
              Service Above Self: Making a Difference in Our Community and Beyond
            </p>
          </div>
        </section>

        {/* 2. Mission & Vision Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-[#F7A81B] text-white rounded-full p-3 w-fit">
                    <Eye className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-[#01579B] mt-4">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">
                    To be a leading force for positive change, creating a community where people unite and take action to create lasting impact.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-[#F7A81B] text-white rounded-full p-3 w-fit">
                    <Goal className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-[#01579B] mt-4">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">
                    We provide service to others, promote integrity, and advance world understanding, goodwill, and peace through our fellowship of business, professional, and community leaders.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 3. Our History Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <Building className="h-12 w-12 mx-auto text-[#01579B]" />
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-[#01579B]">Our History</h2>
            <div className="max-w-3xl mx-auto">
              <p className="mt-6 text-lg text-gray-600">
                Founded with a passion for service, the Rotary Club of Lucena South has been a cornerstone of the community for decades. Our journey began with a small group of dedicated leaders committed to making a tangible difference. Through years of unwavering effort, we have grown into a diverse network of professionals who continue to uphold the values of Rotary in every project we undertake.
              </p>
            </div>
          </div>
        </section>

        {/* 4. What We Do Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#01579B]">Our Areas of Focus</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                We channel our commitment to service through five key areas to maximize our impact.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {focusAreas.map((area) => (
                <Card key={area.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="items-center text-center">
                    <div className="p-3 bg-[#01579B] text-white rounded-full">
                      <area.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="pt-4">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-600">{area.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Leadership Team Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#01579B]">Meet Our Leaders</h2>
              <p className="mt-4 text-lg text-gray-600">
                Guiding our club with dedication and vision for the Rotary year.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {leadershipTeam.map((member) => (
                <Card key={member.name} className="text-center">
                  <CardHeader>
                    <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-16 h-16 text-gray-500" />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge style={{ backgroundColor: '#01579B', color: 'white' }}>{member.role}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Membership Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <Card className="bg-[#01579B] text-white shadow-xl">
              <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 md:p-12">
                  <Award className="h-12 w-12 text-[#F7A81B] mb-4" />
                  <h2 className="text-3xl font-bold mb-4">Become a Member</h2>
                  <p className="mb-6 text-gray-200">
                    Joining Rotary means becoming part of a global network of leaders who are passionate about making a difference. Connect with like-minded individuals and take action on important issues in our community and worldwide.
                  </p>
                  <ul className="space-y-3">
                    {membershipBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle2 className="h-6 w-6 text-[#F7A81B] mr-3 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="hidden md:block h-full">
                  {/* Placeholder for an engaging image */}
                   <div className="bg-gray-700 h-full w-full min-h-[300px] flex items-center justify-center">
                     <p className="text-gray-400">Image Placeholder</p>
                   </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* 7. Call to Action Section */}
        <section className="py-20 text-center bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#01579B]">Ready to Make an Impact?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Join us in our mission to create positive change. Whether you want to become a member, partner with us, or support our projects, we'd love to hear from you.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" style={{ backgroundColor: '#F7A81B', color: '#01579B' }} className="font-bold hover:opacity-90">
                Join Our Mission
              </Button>
              <Button size="lg" variant="outline" className="font-bold border-2 border-[#01579B] text-[#01579B] hover:bg-[#01579B] hover:text-white">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// --- Data for Sections ---

const focusAreas = [
  {
    title: "Community Service",
    description: "Engaging in projects that address local needs and improve the quality of life in Lucena.",
    icon: HeartHandshake,
  },
  {
    title: "Youth Development",
    description: "Empowering the next generation through leadership training, scholarships, and mentorship programs.",
    icon: Users,
  },
  {
    title: "Education & Literacy",
    description: "Supporting schools and learning initiatives to ensure everyone has the opportunity to learn and grow.",
    icon: BookOpen,
  },
  {
    title: "Health & Wellness",
    description: "Promoting health, fighting diseases, and providing access to essential medical services.",
    icon: Stethoscope,
  },
];

const leadershipTeam = [
  { name: "Juan Dela Cruz", role: "President" },
  { name: "Maria Clara", role: "Vice President" },
  { name: "Jose Rizal", role: "Secretary" },
  { name: "Andres Bonifacio", role: "Treasurer" },
];

const membershipBenefits = [
  "Connect with a diverse group of professionals.",
  "Develop leadership skills and project management experience.",
  "Make a direct impact on community and international projects.",
  "Access a global network of 1.4 million Rotarians.",
];

export default AboutPage;
