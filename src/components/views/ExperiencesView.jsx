import React, { useState } from 'react';
import HUDCard from '../HUDCard';

const ExperiencesView = ({ onBack }) => {
    const [filter, setFilter] = useState('ALL'); 

    const db = [
        { type: 'WORK', role: "SOFTWARE DEV INTERN", company: "CELEPAR", period: "DEC 2025 - PRESENT", stack: ["JAVA", "VUE.JS", "LEGACY"], desc: "Developing scalable management systems using Java (Backend) and Vue.js (Frontend). Maintaining and optimizing legacy web interfaces for state government." },
        { type: 'WORK', role: "FOUNDER & FULL STACK", company: "PEW'S CAVERN", period: "AUG 2019 - PRESENT", stack: ["NODE.JS", "N8N", "LINUX"], desc: "Leadership of technical teams and API architecture engineering. Integrated n8n automation for business processes and managed CI/CD pipelines." },
        { type: 'AWARD', role: "3RD PLACE OVERALL", company: "HACKATOP ADVB/PR", period: "2025", stack: ["FLUTTER", "DART", "AR"], desc: "Created an Augmented Reality urban planning system using Flutter and Three.js." },
        { type: 'WORK', role: "IT ADMIN ASSISTANT", company: "DEPPEN (STATE PENITENTIARY)", period: "OCT 2024 - AUG 2025", stack: ["WEB TECH", "SUPPORT"], desc: "Managed the official DEPPEN-PR website and provided technical solutions for internal systems." },
        { type: 'AWARD', role: "2ND PLACE OVERALL", company: "HACKATOP ADVB/PR", period: "2024", stack: ["REACT", "JS", "WEB APP"], desc: "Developed a real-time flooring simulation Web App for Kapazi." },
        { type: 'EDU', role: "B.S. SYSTEMS ANALYSIS", company: "UNIV. TUIUTI DO PARANÁ", period: "EXPECTED 2026", stack: ["ACADEMIC"], desc: "Bachelor's degree in Systems Analysis and Development." }
    ];

    const filteredData = filter === 'ALL' ? db : db.filter(item => item.type === filter);

    return (
        <div className="h-full flex flex-col relative px-4 md:px-12 pt-4 md:pt-8">
             <div className="mb-2">
                <button onClick={onBack} className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white flex items-center gap-2 transition-colors">
                    <span>{'<'}</span> RETURN TO DASHBOARD
                </button>
             </div>

            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-zinc-800 pb-2 mt-4 md:mt-0 shrink-0">
                <h2 className="text-2xl font-bold tracking-tighter text-[#1793d1]">
                    DATABASE: <span className="text-white">CAREER_LOGS</span>
                </h2>
                <div className="flex gap-4 text-[10px] md:text-xs font-bold tracking-widest mt-4 md:mt-0">
                    {['ALL', 'WORK', 'AWARD', 'EDU'].map((f) => (
                        <button key={f} onClick={() => setFilter(f)} className={`px-2 py-1 transition-colors ${filter === f ? 'bg-[#1793d1] text-black' : 'text-zinc-500 hover:text-white'}`}>
                            [{f}]
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 pb-12 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                {filteredData.map((exp, i) => (
                    <HUDCard key={i} title={`${exp.type}_LOG_0${i+1}`} className="w-full shrink-0">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-2">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-white leading-none">{exp.role}</h3>
                                <p className="text-[#1793d1] text-xs font-bold mt-1">{exp.company}</p>
                            </div>
                            <div className="text-left md:text-right">
                                <p className="text-zinc-500 text-[10px] md:text-xs border border-zinc-800 px-2 py-1 inline-block bg-zinc-900/50">
                                    {exp.period}
                                </p>
                            </div>
                        </div>
                        <p className="mt-3 text-zinc-400 text-xs md:text-sm leading-relaxed max-w-3xl">{exp.desc}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {exp.stack.map((tech) => (
                                <span key={tech} className="text-[9px] uppercase tracking-wider text-zinc-500 bg-zinc-900 px-1.5 py-0.5 border border-zinc-800">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </HUDCard>
                ))}
            </div>
        </div>
    )
};

export default ExperiencesView;