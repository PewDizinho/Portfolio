import React from 'react';
import { motion } from 'framer-motion';
import HUDCard from '../HUDCard';

const SkillBar = ({ label, level, color = "#1793d1", delay = 0 }) => (
    <div className="mb-3 group">
        <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1">
            <span className="text-zinc-400 group-hover:text-white transition-colors">{label}</span>
            <span className="text-zinc-500">{level}%</span>
        </div>
        <div className="h-1 w-full bg-zinc-900 relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(90deg, transparent 2px, #000 2px)', backgroundSize: '4px 100%' }} />
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${level}%` }}
                transition={{ duration: 1.5, delay, ease: "easeOut" }}
                className="h-full relative"
                style={{ backgroundColor: color }}
            >
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </motion.div>
        </div>
    </div>
);

const RadarChart = () => {
    const stats = { 'FRONT': 80, 'BACK': 85, 'DEVOPS': 70, 'MOBILE': 70, 'LINUX': 80, 'UI/UX': 65 };
    const labels = Object.keys(stats);
    const values = Object.values(stats);
    const size = 180;
    const center = size / 2;
    const radius = size / 2 - 20;
    const getPoint = (value, index, total) => {
        const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
        const r = (value / 100) * radius;
        return [center + Math.cos(angle) * r, center + Math.sin(angle) * r];
    };
    const polyPoints = values.map((v, i) => getPoint(v, i, values.length).join(',')).join(' ');
    const bgPoints = values.map((_, i) => getPoint(100, i, values.length).join(',')).join(' ');
    const midPoints = values.map((_, i) => getPoint(50, i, values.length).join(',')).join(' ');

    return (
        <div className="relative flex flex-col items-center justify-center py-6">
            <svg width={size} height={size} className="overflow-visible">
                <polygon points={bgPoints} fill="none" stroke="#333" strokeWidth="1" />
                <polygon points={midPoints} fill="none" stroke="#222" strokeWidth="1" strokeDasharray="4 4" />
                {values.map((_, i) => {
                    const [x, y] = getPoint(100, i, values.length);
                    return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#222" strokeWidth="1" />;
                })}
                <motion.polygon initial={{ scale: 0, opacity: 0, transformOrigin: 'center' }} animate={{ scale: 1, opacity: 0.6 }} transition={{ duration: 1, delay: 0.5 }} points={polyPoints} fill="#1793d1" stroke="#1793d1" strokeWidth="2" fillOpacity="0.3" />
                {labels.map((label, i) => {
                    const [x, y] = getPoint(120, i, labels.length);
                    return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-[8px] fill-zinc-400 font-mono tracking-widest">{label}</text>;
                })}
            </svg>
            <div className="mt-4 text-[10px] text-[#1793d1] tracking-[0.3em] uppercase animate-pulse">Performance Analysis</div>
        </div>
    );
};

const SkillsView = ({ onBack }) => {
    return (
        <div className="h-full flex flex-col relative px-4 md:px-12 overflow-y-auto pt-4">
            
             <div className="mb-6">
                <button onClick={onBack} className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white flex items-center gap-2 transition-colors">
                    <span>^</span> RETURN TO DASHBOARD
                </button>
             </div>

            <div className="flex justify-between items-end mb-8 border-b border-zinc-800 pb-2 shrink-0">
                <h2 className="text-2xl font-bold tracking-tighter text-[#1793d1]">
                    MODULE: <span className="text-white">SKILL_TREE</span>
                </h2>
                <div className="text-[10px] text-zinc-500 hidden md:block">
                    LAST UPDATE: 2026-01-15
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto pb-12">
                <div className="flex flex-col gap-4">
                    <HUDCard title="OPERATOR_STATS" className="items-center">
                        <RadarChart />
                    </HUDCard>
                    <HUDCard title="CORE_CONCEPTS">
                         <div className="flex flex-wrap gap-2">
                            {['OFFLINE-FIRST', 'RESTful APIS', 'MVC / MVVM', 'CLEAN CODE', 'SYSTEM DESIGN', 'AUTOMATION'].map(tag => (
                                <span key={tag} className="border border-zinc-800 px-2 py-1 text-[9px] text-zinc-400 uppercase">
                                    {tag}
                                </span>
                            ))}
                         </div>
                    </HUDCard>
                </div>
                <HUDCard title="LANGUAGE_PROFICIENCY" className="flex-1">
                    <div className="space-y-6">
                        <div>
                            <p className="text-[10px] text-[#1793d1] mb-3 border-b border-zinc-800 pb-1">PRIMARY STACK</p>
                            <SkillBar label="Flutter / Dart" level={85} delay={0.2} />
                            <SkillBar label="JavaScript / TS" level={90} delay={0.3} />
                            <SkillBar label="React / Next.js" level={78} delay={0.4} />
                        </div>
                        <div>
                            <p className="text-[10px] text-[#1793d1] mb-3 border-b border-zinc-800 pb-1">BACKEND & OPS</p>
                            <SkillBar label="Node.js" level={85} delay={0.5} />
                            <SkillBar label="Java" level={55} color="#eab308" delay={0.6} />
                            <SkillBar label="SQL / Database" level={82} delay={0.7} />
                            <SkillBar label="Docker / CI/CD" level={70} color="#f472b6" delay={0.8} />
                        </div>
                         <div>
                            <p className="text-[10px] text-[#1793d1] mb-3 border-b border-zinc-800 pb-1">LANGUAGES</p>
                            <SkillBar label="Brazilian Portuguese" level={100} delay={0.5} />
                            <SkillBar label="English" level={95} color="#eab308" delay={0.6} />
                        </div>
                    </div>
                </HUDCard>
            </div>
        </div>
    );
};

export default SkillsView;