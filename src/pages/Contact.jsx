import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email is invalid.";
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const mailtoLink = `mailto:ganga228151@gmail.com?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )}`;

    window.location.href = mailtoLink;

    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 p-6">
      <div className="w-full max-w-3xl bg-white p-8 shadow-lg rounded-2xl">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
          Get in Touch
        </h2>

        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-green-600 text-xl font-semibold mb-4 text-center"
          >
            ✅ Thank you! Your message has been sent.
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {["name", "email", "subject", "message"].map((field, index) => (
            <div key={index}>
              <label
                className="block text-lg font-semibold mb-2 text-gray-700"
                htmlFor={field}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field !== "message" ? (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  className={`w-full px-4 py-3 rounded-xl border shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                />
              ) : (
                <textarea
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write your message..."
                  className={`w-full px-4 py-3 rounded-xl border shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                ></textarea>
              )}
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <div className="text-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-all"
            >
              Send Message
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
