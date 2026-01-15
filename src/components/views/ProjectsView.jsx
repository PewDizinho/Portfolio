import React, { useState, useEffect, useRef } from 'react';
import HUDCard from '../HUDCard';

const ProjectsView = ({ targetProjectId, onOpenProject }) => {
  const [simulatedClickId, setSimulatedClickId] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const timers = useRef([]);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const clearTimers = () => {
    timers.current.forEach(t => clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => {
    if (hasInteracted || !targetProjectId) return;
    const t1 = setTimeout(() => setSimulatedClickId(targetProjectId), 800);
    const t2 = setTimeout(() => onOpenProject(targetProjectId), 1200);
    timers.current.push(t1, t2);
    return () => clearTimers();
  }, [targetProjectId, onOpenProject, hasInteracted]);

  const handlePointerDown = (e) => {
    setHasInteracted(true);
    setSimulatedClickId(null);
    clearTimers();
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleCardClick = (id, e) => {
    const dx = Math.abs(e.clientX - dragStartPos.current.x);
    const dy = Math.abs(e.clientY - dragStartPos.current.y);
    if (dx > 10 || dy > 10) return;

    setHasInteracted(true);
    setSimulatedClickId(id);
    setTimeout(() => onOpenProject(id), 150);
  };

  const projects = [
    { id: 'elvira', title: 'ELVIRA LAUNCHER', desc: 'Android launcher for elderly accessibility.', tech: ['Flutter', 'Android'] },
    { id: 'lanchinho', title: 'LANCHINHO', desc: 'SaaS for restaurant management.', tech: ['React', 'Node.js'] },
    { id: 'celepar', title: 'CELEPAR SERVICES', desc: 'Market Intelligence Portal.', tech: ['Next.js', 'Java'] },
    { id: 'portfolio', title: 'PEW.OS V2', desc: 'System simulation in React.', tech: ['React', 'Tailwind'] },
  ];

  return (
    <div 
        className="h-full flex flex-col justify-center relative px-4 md:px-12 select-none"
        onPointerDown={handlePointerDown} 
    >
        <h2 className="text-2xl mb-8 font-bold tracking-tighter text-[#1793d1] mt-12 md:mt-0 text-center md:text-left">
            {'>>'} Workspace: PROJECTS_DIR
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((proj) => (
                <HUDCard 
                    key={proj.id} 
                    title={`PRJ_${proj.id.toUpperCase()}`} 
                    className="h-64 cursor-pointer"
                    isSelected={simulatedClickId === proj.id}
                    onClick={(e) => handleCardClick(proj.id, e)}
                >
                    <div className="flex flex-col h-full justify-between pointer-events-none">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">{proj.title}</h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">{proj.desc}</p>
                        </div>
                        <div className="flex gap-2 flex-wrap mt-4">
                            {proj.tech.map(t => (
                                <span key={t} className="text-[10px] border border-zinc-800 px-2 py-1 text-zinc-500">{t}</span>
                            ))}
                        </div>
                    </div>
                </HUDCard>
            ))}
        </div>
        <div className="mt-auto text-center text-[9px] text-zinc-600 pb-4 pointer-events-none">
            {'DRAG RIGHT TO RETURN >'}
        </div>
    </div>
  )
};

export default ProjectsView;