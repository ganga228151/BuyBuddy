import { motion } from "framer-motion";

export const AboutUs = () => {
  const teamMembers = [
    { name: "Arjun Sharma", role: "CEO & Founder" },
    { name: "Ravi Verma", role: "CTO & Co-Founder" },
    { name: "Priya Sinha", role: "Marketing Head" },
    { name: "Ananya Gupta", role: "Product Designer" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white min-h-screen py-12 px-5"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Company Introduction */}
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-8"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl mb-8"
        >
          Welcome to <span className="font-semibold">BuyBuddy</span>, your one-stop solution for effortless online shopping. Our platform is designed to make your shopping experience smooth and enjoyable, offering a wide range of quality products at competitive prices.
        </motion.p>

        {/* Our Mission */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg">
            At <span className="font-semibold">BuyBuddy</span>, we aim to redefine shopping by providing an intuitive, user-friendly platform that connects buyers with products they love. Our mission is to ensure a seamless shopping experience while maintaining quality and affordability.
          </p>
        </motion.div>

        {/* Our Team */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="my-10"
        >
          <h2 className="text-3xl font-semibold mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white text-gray-800 rounded-xl p-5 shadow-lg"
              >
                <h3 className="text-2xl font-semibold">{member.name}</h3>
                <p className="text-md">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Us */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10"
        >
          <h2 className="text-3xl font-semibold mb-4">Connect With Us</h2>
          <p className="text-lg mb-4">
            Have questions or feedback? Feel free to reach out to us:
          </p>
          <a
            href="mailto:contact@buybuddy.com"
            className="text-blue-300 underline hover:text-blue-200"
          >
            contact@buybuddy.com
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};
