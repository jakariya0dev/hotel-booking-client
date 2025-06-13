export default function About() {
  return (
    <section className="bg-white text-gray-800 py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Section 1: Image Left, Text Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <img
            src="https://i.ibb.co/3yjKLDpM/banner1.jpg"
            alt="Sunset view"
            className="w-full h-full rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Welcome to SunsetBay Hotel
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 mb-4">
              Nestled along the pristine coastline, SunsetBay Hotel is your
              perfect getaway to peace, luxury, and breathtaking ocean views.
              Every moment here is designed to refresh your spirit and elevate
              your senses.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
              Whether you're on a romantic retreat, a solo escape, or a family
              vacation, our premium amenities and attentive hospitality ensure a
              truly unforgettable experience by the sea.
            </p>
          </div>
        </div>

        {/* Section 2: Text Left, Image Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div>
            <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-lg leading-relaxed text-gray-600 mb-4">
              Our guests enjoy beautifully designed rooms with ocean-facing
              balconies, an in-house gourmet restaurant serving local and
              international cuisine, and a wellness spa offering a range of
              treatments.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
              We pride ourselves on exceptional service, 24/7 concierge support,
              and a commitment to comfort and cleanliness — ensuring that every
              guest feels at home, away from home.
            </p>
          </div>
          <img
            src="https://i.ibb.co/mrQb6sZ2/banner2.jpg"
            alt="Hotel interior"
            className="w-full h-full rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
