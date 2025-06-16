import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

export default function ContactUs() {
  const handleSubmitMessage = (event) => {
    event.preventDefault();
    event.target.reset();
    Swal.fire({
      title: "Thank You!",
      text: "Your message has been sent successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - SunsetBay Hotel</title>
        <meta
          name="description"
          content="Get in touch with SunsetBay Hotel for inquiries, bookings, or feedback."
        />
      </Helmet>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Contact Info */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              Contact <span className="text-amber-400">SunsetBay</span> Hotel
            </h2>
            <p className="text-gray-600">
              We'd love to hear from you. Whether you have a question, feedback,
              or a special request — feel free to reach out!
            </p>

            <div>
              <p className="font-semibold">📍 Address</p>
              <p className="text-gray-600">
                123 Beachside Road, Cox’s Bazar, Bangladesh
              </p>
            </div>

            <div>
              <p className="font-semibold">📞 Phone</p>
              <p className="text-gray-600">+880 1234 567 890</p>
            </div>

            <div>
              <p className="font-semibold">✉️ Email</p>
              <p className="text-gray-600">info@sunsetbayhotel.com</p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-gray-50 p-8 rounded border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">
              Send Us a{" "}
              <span className="underline underline-offset-8 decoration-amber-400 decoration-4">
                Message
              </span>
            </h3>
            <form className="space-y-5" onSubmit={handleSubmitMessage}>
              <div>
                <label className="block mb-1 font-medium">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Mr. Jack"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="abc@mail.com"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Message</label>
                <textarea
                  required
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
