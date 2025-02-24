"use client";
import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import obj from "@/assets/obj1.png";
import profilepic from "@/assets/profilepic.png";
import { FiArrowRight } from "react-icons/fi";

const COLORS_TOP =  ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"]

export const Hero = () => {
    const color = useMotionValue("rgb(255, 255, 255, 0)");

    useEffect(() => {
        animate(color, COLORS_TOP, {
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
        })
    }, [])

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`
    const border = useMotionTemplate`1px solid ${color}`
    const boxShadow = useMotionTemplate`0px 4px 24px ${color}`

    return (
        <motion.section 
            style={{backgroundImage}} 
            className="relative flex flex-col items-center justify-center min-h-screen px-4 py-24 overflow-hidden"
        >
            <div className="z-10 flex flex-col items-center">
                <span className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm">Available for work</span>
                <h1 className="text-white/40 text-5xl md:text-7xl font-black">Hi, I am</h1> 
                <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text font-black leading-tight text-transparent text-5xl md:text-7xl">Abilify</h1> 
                <Image 
                   src={profilepic}
                   alt="Profile Picture"
                   width={250}
                   height={250}
                   className="rounded-full mt-8" 
                   priority
                />
            </div>

            <div className="z-10 flex flex-col items-center mt-8">
                <div className="flex bg-white/10 shadow-xl p-3 rounded-3xl justify-center items-center space-x-2 mb-4">
                    <span>Developer</span>
                </div>
                <p className="my-6 max-w-xl text-center">Programming and cybersecurity enthusiast, with over 5 years of experience in software development</p>
                <div className="flex justify-center w-full">
                    <motion.button
                        style={{
                            border,
                            boxShadow
                        }}
                        whileHover={{
                            scale: 1.015
                        }}
                        whileTap={{
                            scale: 0.985
                        }}
                        className="flex w-fit items-center gap-2 rounded-full px-4 py-2"
                    >
                       View Projects
                        <FiArrowRight />
                    </motion.button> 
                </div>
            </div>

            <div className="bg-circle-container absolute inset-0 z-0">
                <div className="bg-circle-background"></div>
                <div className="bg-circle"></div>
            </div>
        </motion.section>
    );
}