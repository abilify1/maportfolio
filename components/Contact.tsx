"use client";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

export const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data before sending
    if (!formData.name || formData.name.length < 2) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: "Name must be at least 2 characters"
      });
      return;
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: "Please enter a valid email address"
      });
      return;
    }

    if (!formData.message || formData.message.length < 10) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: "Message must be at least 10 characters"
      });
      return;
    }

    setFormState({
      isSubmitting: true,
      isSuccess: false,
      error: null,
    });

    try {
      console.log('Sending form data:', formData); // Debug log
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Server response:', data); // Debug log

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setFormState({
        isSubmitting: false,
        isSuccess: true,
        error: null,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormState(prev => ({ ...prev, isSuccess: false }));
      }, 5000);

    } catch (error) {
      console.error('Form submission error:', error); // Debug log
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: error instanceof Error ? error.message : 'Failed to send message',
      });
    }
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

  return (
    <section id="contact" className="relative py-16 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#ededed] mb-4">Get In Touch</h2>
          <p className="text-[#ededed]/80 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0a0a0a]/50 backdrop-blur-sm p-8 rounded-lg border border-[#ededed]/10 shadow-xl"
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
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
                  disabled={formState.isSubmitting}
                />
              </div>
              <div className="mb-6">
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
                  disabled={formState.isSubmitting}
                />
              </div>
              <div className="mb-6">
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
                  disabled={formState.isSubmitting}
                ></textarea>
              </div>

              {formState.error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500"
                >
                  {formState.error}
                </motion.div>
              )}

              {formState.isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={formState.isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full bg-[#4169e1]/80 text-[#ededed] py-3 px-6 rounded-lg 
                         hover:bg-[#4169e1] transition-all duration-300
                         backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed
                         ${formState.isSubmitting ? 'animate-pulse' : ''}`}
              >
                {formState.isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0a0a0a]/50 backdrop-blur-sm p-8 rounded-lg border border-[#ededed]/10 shadow-xl"
          >
            <h3 className="text-2xl font-semibold text-[#ededed] mb-6">
              Connect With Me
            </h3>
            <div className="space-y-6">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 group"
              >
                <FaEnvelope className="text-2xl text-[#4169e1] group-hover:text-[#ededed] transition-colors duration-300" />
                <a
                  href="mailto:abilify1@proton.me"
                  className="text-[#ededed]/80 hover:text-[#ededed] transition-all duration-300"
                >
                  abilify1@proton.me
                </a>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
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
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 group"
              >
                <FaLinkedin className="text-2xl text-[#4169e1] group-hover:text-[#ededed] transition-colors duration-300" />
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ededed]/80 hover:text-[#ededed] transition-all duration-300"
                >
                  LinkedIn
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};