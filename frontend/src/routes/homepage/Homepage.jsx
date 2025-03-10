"use client"

import { useEffect, useState } from "react"

import { Link, useNavigate } from "react-router-dom"
import Navbar from '../../components/Navbar';
import Chatbot from '../../components/Chatbot';
import { LogIn } from "lucide-react";
import { motion } from "framer-motion";
import ContactForm from "../../components/ContactForm";

function Homepage() {
  const navigate = useNavigate();
  const [isContactShown, setContactShown] = useState(false);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("active")
          void entry.target.offsetWidth
          entry.target.classList.add("active")
        } else {
          entry.target.classList.remove("active")
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px",
    })

    document.querySelectorAll(".scroll-reveal").forEach((element, index) => {
      const animationClass = `scroll-reveal-${index % 4}`
      element.classList.add(animationClass)
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])


  return (
    <div className="relative min-h-screen mesh-gradient overflow-hidden page-transition">

      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-15">
        {Array.from({ length: 144 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-[12px] h-[12px] bg-purple-500/10 rounded-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: i * 0.005 }}
          />
        ))}
      </div>
      <div className="absolute top-16 left-16 w-40 h-40 bg-purple-600/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-16 right-16 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full animate-pulse"></div>

      <Navbar isContactShown={isContactShown} setContactShown={setContactShown} />
      {isContactShown && <ContactForm isContactShown={isContactShown} setContactShown={setContactShown} />}
      <div className="relative pt-16">
        {/* Hero Section */}
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:mt-28 lg:mb-12 ">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col text-left scroll-reveal">
              <div className="relative mb-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extralight tracking-tight text-white">
                Empowering the Future of <br />
                  <span className="relative mr-3">
                    <span className="relative z-10 font-normal bg-gradient-to-r from-purple-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                    3D Printing 
                    </span>
                    <span className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-purple-500/20 blur-lg opacity-50" />
                  </span>
                   Business
                </h1>
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10 blur-xl opacity-50" />
              </div>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 font-light leading-relaxed">
              We believe in transforming the 3D printing industry with the right knowledge, strategies, and tools which bridges the gap between innovation and business success.
              </p>
              <button onClick={()=>navigate("/login")} className="group relative w-[220px] py-4 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#6366f1] via-[#4f46e5] text-white font-medium border border-white/10 hover:from-[#4f46e5] hover:to-[#3b82f6] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.05] active:scale-[0.98]">
      <span className="relative z-10 flex items-center justify-center gap-2">
        <a className="flex items-center gap-2">
        Start Exploring <LogIn className="w-5 h-5 opacity-80 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </span>
      <div className="absolute inset-0 rounded-full bg-white/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
            </div>

            <div className="relative group scroll-reveal" style={{ transitionDelay: "0.2s" }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1705475025559-ad8efdedc74f?fm=jpg&q=60&w=2000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8M2QlMjBwcmludGVyfGVufDB8fDB8fHww"
                  alt="3D Printer in Action"
                  className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative py-32 features-bg">
  {/* ✨ Floating Animated Orbs for Depth */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="orb-1 animate-pulse opacity-30" />
    <div className="orb-2 animate-pulse opacity-30" />
    <div className="orb-3 animate-pulse opacity-30" />
  </div>

  <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
    {/* 🌟 Section Title */}
    <div className="text-center mb-20">
      <h2 className="text-5xl font-semibold text-white mb-4 tracking-tight leading-snug">
        <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
        How We Make an Impact
        </span>
      </h2>
    </div>

    {/* 🎨 Feature Cards Grid with Staggered Layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-12">
      {[
        {
          title: "AI-Powered Business Consulting",
          desc: "Get expert-driven guidance to optimize and scale your 3D printing business.",
        },
        {
          title: "Strategic Market Insights",
          desc: "Stay ahead with real-time trends, profitability analysis, and forecasts.",
        },
        {
          title: "Smart Equipment Recommendations",
          desc: "Find the best 3D printers, materials, and software tailored to your needs.",
        },
        {
          title: "Innovation & Hackathon Support",
          desc: "Encourage groundbreaking ideas and fund innovative projects in 3D printing.",
        },
        {
          title: "Affiliate Marketplace for Growth",
          desc: "One-stop platform for tools, resources, and vendor partnerships.",
        },
        {
          title: "Skill Development & Training",
          desc: "Empowering individuals and businesses with expert 3D printing training.",
        },
      ].map(({ title, desc }, i) => (
        <div
          key={i}
          className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 
          shadow-lg hover:shadow-purple-500/40 backdrop-blur-xl overflow-hidden 
          transition-all duration-500 hover:-translate-y-2 hover:border-purple-400/50 flex flex-col items-center text-center h-full"
        >
          {/* ✨ Subtle Glow on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-indigo-500/10 opacity-0 
          group-hover:opacity-20 transition-all duration-500"></div>

          {/* 🎭 Floating Glow Effect */}
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-purple-400 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-500" />
          <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-indigo-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-500" />

          {/* 📝 Card Content - Now Centered Properly */}
          <div className="relative z-10 flex flex-col flex-grow justify-center items-center space-y-4">
            <h3 className="text-2xl px-4 font-semibold text-white tracking-tight leading-snug">
              {title}
            </h3>
            <p className="text-gray-300 text-md leading-relaxed mt-3 text-left w-full ">{desc}</p>

          </div>

          {/* 🟣 Subtle Border Glow */}
          <div className="absolute inset-0 rounded-3xl bg-purple-500/10 opacity-0 
          group-hover:opacity-30 transition duration-300 blur-2xl" />
        </div>
      ))}
    </div>
  </div>
</div>

        {/* Footer */}
        <footer className="relative py-16 footer-gradient overflow-hidden  border-t border-white/10 ">
  {/* ✨ Glowing Effects */}
  <div className="footer-glow footer-glow-1" />
  <div className="footer-glow footer-glow-2" />

  <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
    <div className="grid md:grid-cols-4 gap-10">
      {/* 🚀 Brand Section */}
      <div className="scroll-reveal">
        <div className="flex items-center space-x-2 mb-4">
          <h3 className="text-4xl font-light text-white">
            3D
            <span className="font-semibold bg-gradient-to-r from-purple-300 to-indigo-400 bg-clip-text text-transparent">
              Root
            </span>
          </h3>
        </div>
        <p className="text-gray-400 font-light leading-relaxed">
          Your trusted partner in achieving sustainable growth & innovation in 3D printing.
        </p>
      </div>

      {/* 🔗 Quick Links */}
      <div className="scroll-reveal" style={{ transitionDelay: "0.4s" }}>
        <h4 className="text-xl text-white font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-3">
          <li>
            <a href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </a>
          </li>
          <li>
            <a onClick={() => setContactShown(true)} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Contact Us
            </a>
          </li>
        </ul>
      </div>

      {/* 📜 Legal Links */}
      <div className="scroll-reveal" style={{ transitionDelay: "0.6s" }}>
        <h4 className="text-xl text-white font-semibold mb-4">Legal</h4>
        <ul className="space-y-3">
          <li>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
          </li>
        </ul>
      </div>

      {/* 📩 Contact & Buttons */}
      <div className="scroll-reveal" style={{ transitionDelay: "0.8s" }}>
        <h4 className="text-xl text-white font-semibold mb-4">Get in Touch</h4>
        <p className="text-gray-400 leading-relaxed mb-4">
          Have questions? Reach out to us anytime.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            onClick={() => setContactShown(true)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>

  </div>
</footer>

      </div>
    </div>
  )
}

export default Homepage

