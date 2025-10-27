export default function ImpactStats() {
  const stats = [
    { label: "Funds Raised", value: "$500K+" },
    { label: "Members Helped", value: "5,000+" },
    { label: "Active Projects", value: "12" },
    { label: "Volunteer Hours", value: "10,000+" },
  ]

  return (
    <section className="bg-[#01579B] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#F7A81B] mb-2">{stat.value}</div>
              <p className="text-white/80 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
