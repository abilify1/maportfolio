"use client";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="contact" className="relative py-16 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#ededed] mb-4">Get In Touch</h2>
          <p className="text-[#ededed]/80 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#0a0a0a]/50 backdrop-blur-sm p-8 rounded-lg border border-[#ededed]/10 shadow-xl"
          >
            <form onSubmit={handleSubmit}>
              <motion.div variants={itemVariants} className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-[#ededed] text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#0a0a0a]/30 border border-[#ededed]/20 rounded-lg 
                           text-[#ededed] placeholder-[#ededed]/50
                           focus:ring-2 focus:ring-[#4169e1]/50 focus:border-transparent
                           backdrop-blur-sm transition-all duration-300"
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants} className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-[#ededed] text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#0a0a0a]/30 border border-[#ededed]/20 rounded-lg 
                           text-[#ededed] placeholder-[#ededed]/50
                           focus:ring-2 focus:ring-[#4169e1]/50 focus:border-transparent
                           backdrop-blur-sm transition-all duration-300"
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants} className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-[#ededed] text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-[#0a0a0a]/30 border border-[#ededed]/20 rounded-lg 
                           text-[#ededed] placeholder-[#ededed]/50
                           focus:ring-2 focus:ring-[#4169e1]/50 focus:border-transparent
                           backdrop-blur-sm transition-all duration-300"
                  required
                ></textarea>
              </motion.div>
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#4169e1]/80 text-[#ededed] py-3 px-6 rounded-lg 
                         hover:bg-[#4169e1] transition-all duration-300
                         backdrop-blur-sm"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#0a0a0a]/50 backdrop-blur-sm p-8 rounded-lg border border-[#ededed]/10 shadow-xl"
          >
            <h3 className="text-2xl font-semibold text-[#ededed] mb-6">
              Connect With Me
            </h3>
            <div className="space-y-6">
              <motion.div 
                variants={itemVariants}
                className="flex items-center space-x-4 group"
              >
                <FaEnvelope className="text-2xl text-[#4169e1] group-hover:text-[#ededed] transition-colors duration-300" />
                <a
                  href="mailto:abilify1@proton.me"
                  className="text-[#ededed]/80 hover:text-[#ededed] transition-all duration-300"
                >
                  abilify@proton.me
                </a>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                className="flex items-center space-x-4 group"
              >
                <FaGithub className="text-2xl text-[#4169e1] group-hover:text-[#ededed] transition-colors duration-300" />
                <a
                  href="https://github.com/abilify1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ededed]/80 hover:text-[#ededed] transition-all duration-300"
                >
                  GitHub
                </a>
              </motion.div>
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};