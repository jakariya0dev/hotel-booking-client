import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const faqs = [
  {
    question: "What is the check-in and check-out time?",
    answer:
      "Check-in starts at 2:00 PM and check-out is at 12:00 PM. Early check-in or late check-out may be possible based on availability.",
  },
  {
    question: "Can I cancel my booking for free?",
    answer:
      "Yes, cancellations are free up to 48 hours before your check-in date. After that, a cancellation fee may apply as per our policy.",
  },
  {
    question: "Is breakfast included in the room price?",
    answer:
      "Most of our rooms come with complimentary breakfast. Please check the room details while booking to confirm.",
  },
  {
    question: "Do you offer airport shuttle service?",
    answer:
      "Yes, we offer a paid airport shuttle service. Please let us know your flight details at least 24 hours in advance.",
  },
  {
    question: "Are pets allowed in the hotel?",
    answer:
      "Unfortunately, pets are not allowed at SunsetBay Hotel to ensure the comfort of all our guests.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Frequently{" "}
          <span className="underline underline-offset-8 decoration-amber-400 decoration-4">
            Asked
          </span>{" "}
          Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-100"
            >
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full text-left px-5 py-4 flex justify-between items-center"
              >
                <span className="text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
                <span className="text-gray-500">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 text-gray-600">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
