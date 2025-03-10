import { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = ({ isContactShown, setContactShown }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "3D Root",
          from_email: form.email,
          to_email: "3drootai@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsLoading(false);
        setIsSent(true); // Show success message instead of form
        setTimeout(() => {
          setForm({ name: "", email: "", message: "" });
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage("Something went wrong. Please try again.");
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (isSent) setIsSent(false); // Reset button if user edits form
    setErrorMessage(""); // Clear error message on input change
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-[0.1] backdrop-blur-lg z-[1000]">
      {/* Popup Container (Fixed Size) */}
      <div className="bg-[#121212] w-[90vw] max-w-md p-6 rounded-2xl shadow-lg border border-gray-700 text-white text-center relative min-h-[350px] flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-light text-white">
            3D<span className="font-normal bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">Root</span>
          </h1>
          <img
            className="cursor-pointer w-6 hover:opacity-80 transition"
            onClick={() => setContactShown(false)}
            src="https://cdn.prod.website-files.com/6643307d563d3d1613330141/669fa0524c7bba71213bbe57_close-in.svg.svg"
            alt="Close"
          />
        </div>

        {/* Form or Success Message */}
        <div className="flex-grow flex flex-col justify-center">
          {!isSent ? (
            <>
              <h2 className="text-xl font-semibold text-gray-300 mb-2">Let's Connect!</h2>
              <p className="text-gray-400 text-sm mb-4">
                Have a question or need assistance? Send us a message, and we’ll get back to you soon.
              </p>

              {/* Form */}
              <form className="flex flex-col gap-4 text-left" onSubmit={handleSubmit}>
                {/* Name Field */}
                <label className="text-gray-400 text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border border-gray-600 rounded-lg bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="James"
                  required
                  value={form.name}
                  onChange={handleChange}
                />

                {/* Email Field */}
                <label className="text-gray-400 text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 border border-gray-600 rounded-lg bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="james@gmail.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                />

                {/* Message Field */}
                <label className="text-gray-400 text-sm font-medium">Your Message</label>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full p-2 border border-gray-600 rounded-lg bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Hello, I have a question about..."
                  required
                  value={form.message}
                  onChange={handleChange}
                />

                {/* Error Message */}
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full py-2 rounded-lg transition duration-300 shadow-md ${
                    isLoading
                      ? "bg-purple-500 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 hover:shadow-purple-500/40 cursor-pointer"
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center fade-in">
              <img
                src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif"
                alt="Success Animation"
                className="w-24 h-24 mb-4"
              />
              <h3 className="text-xl font-semibold text-green-400">Message Sent!</h3>
              <p className="text-gray-400 text-sm mt-2">
                Thank you for reaching out. We'll get back to you soon. 🚀
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
