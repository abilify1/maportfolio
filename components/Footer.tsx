'use client';

import { AiFillGithub, AiOutlineTwitter, AiFillFacebook, AiFillInstagram } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const socialLinks = [
    { href: "https://github.com/abilify1", Icon: AiFillGithub, label: "GitHub" },
    { href: "https://twitter.com/abilify1", Icon: AiOutlineTwitter, label: "X (Twitter)" },
    { href: "https://facebook.com/abilify1", Icon: AiFillFacebook, label: "Facebook" },
    { href: "https://instagram.com/abilify1", Icon: AiFillInstagram, label: "Instagram" },
    { href: "https://t.me/abilify1", Icon: FaTelegramPlane, label: "Telegram" }
];

const quickLinks = [
    { href: "#portfolio", label: "Portfolio" },
    { href: "#stack", label: "Tech Stack" },
    { href: "#todo", label: "Roadmap" },
    { href: "#contact", label: "Contact" },
];

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false });

    return (
        <motion.footer 
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="relative mt-20"
        >
            {/* Gradient divider */}
            <motion.div 
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent" 
            />
            
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* About section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <motion.h3 
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                        >
                            Abilify
                        </motion.h3>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="text-gray-400 mb-4"
                        >
                            A passionate developer focused on creating beautiful and functional web experiences.
                        </motion.p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <motion.h3 
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="text-xl font-semibold mb-4 text-gray-200"
                        >
                            Quick Links
                        </motion.h3>
                        <ul className="space-y-2">
                            {quickLinks.map(({ href, label }, index) => (
                                <motion.li 
                                    key={label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                                >
                                    <a
                                        href={href}
                                        className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
                                    >
                                        {label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <motion.h3 
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="text-xl font-semibold mb-4 text-gray-200"
                        >
                            Connect
                        </motion.h3>
                        <div className="flex gap-4 flex-wrap">
                            {socialLinks.map(({ href, Icon, label }, index) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="text-gray-400 hover:text-gray-200 bg-gray-800/50 p-2 rounded-lg
                                             hover:bg-gray-700/50 transition-all duration-300"
                                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -180 }}
                                    transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon size={24} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="pt-8 mt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4"
                >
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 1.3 }}
                        className="text-gray-400 text-sm"
                    >
                        {currentYear} Abilify. All rights reserved.
                    </motion.p>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                        className="text-gray-500 text-sm"
                    >
                        Made with ❤️ using Next.js & Tailwind CSS
                    </motion.p>
                </motion.div>
            </div>
        </motion.footer>
    );
};