import React from 'react';
import { motion } from 'framer-motion';

const LogEntry = ({ year, title, children, isLast = false }) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative pl-8 pb-8 border-l border-zinc-800"
    >
        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-[#1793d1] rounded-full border-2 border-black" />
        <div className="flex flex-col gap-1 mb-2">
            <span className="text-[#1793d1] font-mono text-xs font-bold tracking-widest">{year}</span>
            <h3 className="text-white font-bold text-lg">{title}</h3>
        </div>
        <div className="text-zinc-400 text-sm leading-relaxed max-w-2xl text-justify">
            {children}
        </div>
    </motion.div>
);

const HistoryView = ({ onBack }) => {
    return (
        <div className="h-full flex flex-col relative px-4 md:px-12 pt-4 md:pt-8 pb-12 overflow-y-auto">
             <div className="mb-6">
                <button onClick={onBack} className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white flex items-center gap-2 transition-colors">
                    <span>v</span> RETURN TO DASHBOARD
                </button>
             </div>

             <div className="flex justify-between items-end mb-12 border-b border-zinc-800 pb-2 shrink-0">
                <h2 className="text-2xl font-bold tracking-tighter text-[#1793d1]">
                    FILE: <span className="text-white">ORIGIN_STORY.LOG</span>
                </h2>
            </div>

            <div className="max-w-4xl mx-auto w-full">
                <LogEntry year="2018" title="THE INITIALIZATION">
                    <p>
                        Started developing software at age 15. Driven by curiosity and a problem-solving mindset, 
                        I founded <strong>Pew's Cavern</strong> to formalize my freelance work and personal projects.
                    </p>
                </LogEntry>
                <LogEntry year="2020 - 2021" title="MOBILE DEVELOPMENT ARC">
                    <p>
                        Focused heavily on Mobile Development. Started the <strong>Elvira Launcher</strong> an accessibility tool 
                        for the elderly project, born from a personal need to help my great-grandmother navigate technology.
                        This defined my focus on "User-Centric Architecture".
                    </p>
                </LogEntry>
                <LogEntry year="2022 - 2024" title="FULLSTACK EXPANSION">
                    <p>
                        Expanded Pew's Cavern operations. Developed <strong>Lanchinho</strong>, a SaaS for restaurant management, 
                        mastering the full lifecycle from database design (SQL) to frontend reactivity (React). 
                        Started automating business flows with n8n to optimize delivery times.
                    </p>
                </LogEntry>
                <LogEntry year="2024 - 2025" title="HACKATHON DOMINANCE & GOV">
                    <p>
                        Achieved back-to-back podium finishes at Hackatop ADVB/PR (2nd Place in '24, 3rd in '25).
                        Currently working at <strong>Celepar</strong> (State Gov), maintaining critical legacy systems and 
                        building new scalable modules with Java and Vue.js.
                    </p>
                </LogEntry>
                <div className="pl-8">
                     <div className="inline-block border border-dashed border-[#1793d1] text-[#1793d1] px-4 py-2 text-xs uppercase tracking-widest animate-pulse">
                        {'>>'} AWAITING NEXT ENTRY...
                     </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryView;