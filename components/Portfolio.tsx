'use client';

import React, { useState, useEffect, useRef } from 'react'
import { useMotionTemplate, useMotionValue, motion, useInView, animate } from 'framer-motion'
import { Octokit } from 'octokit'

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

interface Repository {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    topics: string[];
    created_at: string;
    updated_at: string;
}

export const Portfolio = () => {
    const color = useMotionValue("rgb(255, 255, 255, 0)");
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false });

    useEffect(() => {
        animate(color, COLORS_TOP, {
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
        });

        const fetchRepositories = async () => {
            try {
                const octokit = new Octokit();
                const response = await octokit.request('GET /users/{username}/repos', {
                    username: 'abilify1',
                    per_page: 100,
                    sort: 'updated'
                });

                const sortedRepos = (response.data as Repository[])
                    .sort((a, b) => {
                        const starDiff = (b.stargazers_count || 0) - (a.stargazers_count || 0);
                        if (starDiff !== 0) return starDiff;
                        return (b.forks_count || 0) - (a.forks_count || 0);
                    })
                    .slice(0, 6);

                setRepositories(sortedRepos);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching repositories:', error);
                setLoading(false);
            }
        };

        fetchRepositories();
    }, []);

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`

    return (
        <motion.section 
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            id="portfolio" 
            className="py-36 text-white" 
            style={{backgroundImage}}
        >
            <div className="max-w-7xl mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold mb-4">My <span className="text-gray-400">Projects</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Here are my most popular GitHub repositories, sorted by stars and forks.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="text-center">Loading projects...</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repositories.map((repo, index) => (
                            <motion.a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-6 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                            >
                                <div className="flex flex-col h-full">
                                    <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
                                    <p className="text-gray-400 mb-4 flex-grow">
                                        {repo.description || 'No description available'}
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <span>{new Date(repo.created_at).getFullYear()}</span>
                                            {repo.language && <span>{repo.language}</span>}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 .25a.75.75 0 0 1 .673.418l3.058 6.197 6.839.994a.75.75 0 0 1 .415 1.279l-4.948 4.823 1.168 6.811a.75.75 0 0 1-1.088.791L12 18.347l-6.117 3.216a.75.75 0 0 1-1.088-.79l1.168-6.812-4.948-4.823a.75.75 0 0 1 .416-1.28l6.838-.993L11.327.668A.75.75 0 0 1 12 .25z"/>
                                                </svg>
                                                <span>{repo.stargazers_count}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8.75 19.25a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM15 4.75a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0Zm-13 0a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM12 8.75c-1.528 0-2.957.411-4.187 1.128a.75.75 0 0 1-.738-1.305A9.27 9.27 0 0 1 12 7.25a.75.75 0 0 1 0 1.5ZM5.75 4a1.75 1.75 0 1 0 .001 3.501A1.75 1.75 0 0 0 5.75 4Zm12.5 0a1.75 1.75 0 1 0 .001 3.501A1.75 1.75 0 0 0 18.25 4Zm-6.5 15.25a1.75 1.75 0 1 0-.001-3.501 1.75 1.75 0 0 0 .001 3.501Z"/>
                                                </svg>
                                                <span>{repo.forks_count}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}
            </div>
        </motion.section>
    );
};