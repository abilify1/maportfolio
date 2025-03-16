"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';


export default function Tools() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false });
    const [nav, setNav] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    const navLinks = [
        { title: "Home", path: "/" },
        { title: "About", path: "/#about" },
        { title: "Portfolio", path: "/#portfolio" },
        { title: "Stack", path: "/#stack" },
        { title: "Contact", path: "/#contact" },
    ];
    
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleNav = () => {
        setNav(!nav);
    }

    const closeNav = () => {
        setNav(false);
    }

    const navVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const menuItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.3,
            }
        },
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    const tools = [
        {
            id: "00",
            title: "Object Detection",
            description: "Detect and identify objects in images using AI-powered computer vision.",
            status: "active",
            path: "/tools/object-detection"
        },
        {
            id: "01",
            title: "Image Optimizer",
            description: "Optimize your images for web use with our advanced compression algorithm.",
            status: "coming-soon"
        },
        {
            id: "02",
            title: "Code Formatter",
            description: "Format your code with popular style guides like Prettier and ESLint.",
            status: "coming-soon"
        },
        {
            id: "03",
            title: "Color Palette Generator",
            description: "Generate beautiful color palettes for your next design project.",
            status: "coming-soon"
        },
        {
            id: "04",
            title: "Meta Tags Generator",
            description: "Generate SEO-friendly meta tags for your website.",
            status: "coming-soon"
        },
        {
            id: "05",
            title: "Responsive Image Generator",
            description: "Generate responsive images for different screen sizes.",
            status: "coming-soon"
        },
        {
            id: "06",
            title: "SVG Optimizer",
            description: "Optimize your SVG files for better performance.",
            status: "coming-soon"
        }
    ];

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white pt-20">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={navVariants}
                className="z-50 fixed flex justify-center w-full text-[#ededed] font-bold"
            >
                <div className={`
                    ${scrolled ? 'bg-[#0a0a0a]/80 shadow-lg' : 'bg-transparent'} 
                    border border-[#ededed]/10 mt-4 backdrop-blur-sm rounded-3xl 
                    hidden md:flex items-center justify-center p-2 max-w-[450px] mx-auto
                    transition-all duration-300 ease-in-out
                `}>
                    <ul className="flex flex-row p-2 space-x-10 justify-center w-full">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={index}
                                variants={menuItemVariants}
                                whileHover="hover"
                                className="relative"
                            >
                                <Link 
                                    href={link.path} 
                                    className="transform hover:text-[#4169e1] transition-all duration-300 ease-in-out"
                                >
                                    {link.title}
                                </Link>
                                <motion.div
                                    className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4169e1]"
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        ))}
                    </ul>
                </div>

                <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleNav} 
                    className={`
                        md:hidden absolute top-5 right-14 
                        border rounded-lg z-50 text-[#ededed]/70 border-[#ededed]/20 
                        p-2 backdrop-blur-sm
                        ${scrolled ? 'bg-[#0a0a0a]/80' : 'bg-transparent'}
                        transition-all duration-300
                    `}
                >
                    <AnimatePresence mode="wait">
                        {nav ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -180, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 180, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <AiOutlineClose size={30} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 180, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -180, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <AiOutlineMenu size={30} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <AnimatePresence>
                    {nav && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed left-0 top-0 w-full h-screen bg-[#0a0a0a]/95 backdrop-blur-md"
                        >
                            <motion.ul 
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.1
                                        }
                                    }
                                }}
                                className="flex flex-col items-center justify-center space-y-8 h-full"
                            >
                                {navLinks.map((link, index) => (
                                    <motion.li 
                                        key={index}
                                        variants={menuItemVariants}
                                        whileHover="hover"
                                        className="relative"
                                    >
                                        <Link 
                                            href={link.path} 
                                            onClick={closeNav} 
                                            className="text-5xl hover:text-[#4169e1] transition-all duration-300"
                                        >
                                            {link.title}
                                        </Link>
                                        <motion.div
                                            className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4169e1]"
                                            whileHover={{ width: "100%" }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            <motion.section 
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8 }}
                className="py-36" 
            >
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl font-bold mb-4">Developer <span className="text-gray-400">Tools</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            A collection of useful tools for developers to streamline their workflow.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tools.map((tool, index) => (
                            <motion.div
                                key={tool.id}
                                className="block p-6 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                            >
                                {tool.path ? (
                                    <Link href={tool.path} className="flex flex-col h-full">
                                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                            {tool.title}
                                        </h3>
                                        <p className="text-gray-400 mb-4 flex-grow">
                                            {tool.description}
                                        </p>
                                    </Link>
                                ) : (
                                    <div className="flex flex-col h-full">
                                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                            {tool.title}
                                            {tool.status === "coming-soon" && (
                                                <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                                                    Coming Soon
                                                </span>
                                            )}
                                        </h3>
                                        <p className="text-gray-400 mb-4 flex-grow">
                                            {tool.description}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </main>
    );
}