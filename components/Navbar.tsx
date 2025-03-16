"use client";

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { title: "About", path: "#about" },
  { title: "Portfolio", path: "#portfolio" },
  { title: "Stack", path: "#stack" },
  { title: "Tools", path: "/tools" },
  { title: "Contact", path: "#contact" },
];

export const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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

    return (
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
    )
}