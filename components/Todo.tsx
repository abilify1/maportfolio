'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const todos = [
    { 
        id: '01', 
        title: 'Add Blog Section', 
        description: 'Create a blog section to share my thoughts and experiences in tech.',
        status: 'planned'
    },
    { 
        id: '02', 
        title: 'Create Project Details Pages', 
        description: 'Add dedicated pages for each project with detailed information and live demos.',
        status: 'planned'
    },
    { 
        id: '03', 
        title: 'Add Search Functionality', 
        description: 'Implement search feature to easily find projects and blog posts.',
        status: 'planned'
    },
    { 
        id: '04', 
        title: 'Optimize Performance', 
        description: 'Improve website loading speed and optimize images.',
        status: 'planned'
    },
];

interface BackgroundCircle {
    width: number;
    height: number;
    left: string;
    top: string;
    xMove: number;
    yMove: number;
    scale: number;
    rotate: number;
    duration: number;
    opacity: number;
}

const Todo = () => {
    const [circles, setCircles] = useState<BackgroundCircle[]>([]);

    useEffect(() => {
        const generateCircles = () => {
            const gridCols = 4;
            const gridRows = 5;
            
            return [...Array(15)].map((_, index) => {
                const gridX = index % gridCols;
                const gridY = Math.floor(index / gridCols);
                
                const baseX = (gridX / gridCols) * 100;
                const baseY = (gridY / gridRows) * 100;
                const randomOffset = 15;
                
                const left = `${baseX + (Math.random() * randomOffset - randomOffset/2)}%`;
                const top = `${baseY + (Math.random() * randomOffset - randomOffset/2)}%`;
                
                return {
                    width: Math.random() * 200 + 100,
                    height: Math.random() * 200 + 100,
                    left,
                    top,
                    xMove: Math.random() * 20 - 10,
                    yMove: Math.random() * 20 - 10,
                    scale: Math.random() * 0.2 + 0.9,
                    rotate: Math.random() * 360,
                    duration: Math.random() * 5 + 10,
                    opacity: Math.random() * 0.07 + 0.03
                };
            });
        };

        setCircles(generateCircles());
    }, []);

    return (
        <section id="todo" className="relative py-36 overflow-hidden">
            {/* Background circles */}
            {circles.map((circle, index) => (
                <motion.div
                    key={index}
                    className="absolute rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10"
                    style={{
                        width: circle.width,
                        height: circle.height,
                        left: circle.left,
                        top: circle.top,
                        opacity: circle.opacity
                    }}
                    animate={{
                        x: [0, circle.xMove, 0],
                        y: [0, circle.yMove, 0],
                        scale: [1, circle.scale, 1],
                        rotate: [0, circle.rotate, 0]
                    }}
                    transition={{
                        duration: circle.duration,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-4">Upcoming <span className="text-gray-400">Features</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Here's what I'm planning to add and improve on this website. Stay tuned for these upcoming features!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {todos.map((todo) => (
                        <motion.div
                            key={todo.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: parseInt(todo.id) * 0.1 }}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-gray-400 font-mono">{todo.id}</span>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                        {todo.title}
                                        {todo.status === 'in-progress' && (
                                            <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                                                In Progress
                                            </span>
                                        )}
                                    </h3>
                                    <p className="text-gray-400">{todo.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Todo;
