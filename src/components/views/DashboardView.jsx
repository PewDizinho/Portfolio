import React from 'react';
import { motion } from 'framer-motion';
import HUDCard from '../HUDCard';
import WireframeGlobe from '../WireframeGlobe';
import pfp from '../../assets/pfp.jpg'; 

const DashboardView = ({ onNavigate, onChangeView }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 h-full p-1 pb-12">
        
        <div className="lg:col-span-3 flex flex-col gap-4 h-full overflow-hidden">
          
          <HUDCard 
            title="OPERATOR_PROFILE" 
            delay={0.2} 
            className="shrink-0 cursor-pointer hover:border-zinc-500"
            onClick={() => onChangeView('history')}
          >
            <div className="flex flex-col gap-4">
              <div 
                className="w-24 h-24 border border-zinc-800 self-center bg-cover bg-center grayscale opacity-80 hover:opacity-100 transition-opacity"
                style={{ backgroundImage: `url(${pfp})` }}
              />
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span>ID:</span> <span className="text-white">PAULO KONOPKA</span></div>
                <div className="flex justify-between"><span>CLASS:</span> <span className="text-white">SOFTWARE ARCHITECT</span></div>
                <div className="flex justify-between"><span>ORG:</span> <span className="text-white">PEW'S CAVERN</span></div>
                <div className="flex justify-between"><span>STATUS:</span> <span className="text-green-500 blink">AVAILABLE</span></div>
              </div>
            </div>
          </HUDCard>

           <HUDCard title="PROJECTS" className="flex-1 min-h-0 flex flex-col" delay={0.3}>
             <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                 <div className="space-y-6">
                   {[
                     { id: 'elvira', name: 'ELVIRA LAUNCHER', status: 'BETA' },
                     { id: 'lanchinho', name: 'LANCHINHO', status: 'LIVE' },
                     { id: 'celepar', name: 'CELEPAR SERVICES', status: 'CORP' },
                     { id: 'portfolio', name: 'PEW.OS V2', status: 'DEV' }
                   ].map((proj) => (
                     <div 
                        key={proj.id} 
                        onClick={(e) => { e.stopPropagation(); onNavigate(proj.id); }} 
                        className="border-l border-zinc-800 pl-4 hover:border-[#1793d1] transition-colors cursor-pointer group/proj py-1"
                     >
                        <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
                          <span>PRJ-{proj.id.toUpperCase().substring(0,3)}</span>
                          <span className={proj.status === 'LIVE' ? 'text-green-500' : 'text-yellow-500'}>{proj.status}</span>
                        </div>
                        <h4 className="text-sm font-bold group-hover/proj:text-[#1793d1] transition-colors">{proj.name}</h4>
                     </div>
                   ))}
                 </div>
             </div>
             <div 
                className="mt-auto pt-4 text-[9px] text-zinc-600 text-center border-t border-zinc-900/50 shrink-0 cursor-pointer hover:text-white"
                onClick={() => onChangeView('workspace')}
            >
                {'<< OPEN WORKSPACE (DRAG LEFT)'}
             </div>
           </HUDCard>
        </div>

        <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[300px] h-full pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-[500px] h-[1px] bg-zinc-900 absolute top-1/2 -translate-y-1/2" />
             <div className="h-[500px] w-[1px] bg-zinc-900 absolute left-1/2 -translate-x-1/2" />
          </div>
          <WireframeGlobe />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-10 text-center pointer-events-none">
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] animate-pulse">Monitoring "Pew's Cavern" Uplink...</p>
            <div className="flex justify-center gap-8 mt-4 text-[9px] text-zinc-600 font-bold">
                <span>{'< WORKSPACE'}</span>
                <span>{'CAREER >'}</span>
            </div>
            <div className="flex justify-center gap-8 mt-2 text-[9px] text-zinc-600 font-bold">
                <span>{'^ HISTORY'}</span>
                <span>{'SKILLS v'}</span>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-4 h-full overflow-hidden">
          
          <HUDCard 
            title="SKILL_TREE" 
            delay={0.4} 
            className="shrink-0 cursor-pointer hover:border-zinc-500"
            onClick={() => onChangeView('skills')}
          >
             <ul className="space-y-3 text-xs pointer-events-none">
                {['FLUTTER / DART', 'REACT / TAILWIND', 'N8N / AUTOMATION', 'DEVOPS / DOCKER', 'SYSTEM ARCH'].map((tech, i) => (
                  <li key={i} className="flex items-center gap-2 group/item">
                    <span className="text-zinc-600 group-hover/item:text-[#1793d1]">{`>`}</span>
                    <span className="group-hover/item:translate-x-1 transition-transform">{tech}</span>
                  </li>
                ))}
             </ul>
          </HUDCard>

          <HUDCard 
            title="CAREER_HIGHLIGHTS" 
            className="flex-1 min-h-0 flex flex-col cursor-pointer hover:border-zinc-500" 
            delay={0.5}
            onClick={() => onChangeView('experiences')}
          >
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent pointer-events-none">
                <div className="space-y-4">
                    <div className="group/item">
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="text-[#1793d1] font-bold text-xs">CELEPAR</span>
                            <span className="text-[9px] text-zinc-500">CURRENT</span>
                        </div>
                        <p className="text-[10px] text-zinc-300 leading-tight">
                            Developing scalable management systems (Java/Vue.js).
                        </p>
                    </div>

                    <div className="group/item pt-3 border-t border-zinc-900">
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="text-yellow-500 font-bold text-xs">3RD PLACE</span>
                            <span className="text-[9px] text-zinc-500">2025</span>
                        </div>
                        <p className="text-[10px] text-zinc-300 leading-tight">
                            Hackatop ADVB/PR: AR Urban Planning System (Flutter).
                        </p>
                    </div>

                    <div className="group/item pt-3 border-t border-zinc-900">
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="text-zinc-400 font-bold text-xs">2ND PLACE</span>
                            <span className="text-[9px] text-zinc-500">2024</span>
                        </div>
                        <p className="text-[10px] text-zinc-300 leading-tight">
                            Hackatop ADVB/PR: Real-time Flooring Simulator (React).
                        </p>
                    </div>
                </div>
            </div>
             
             <div className="mt-auto pt-4 text-[9px] text-zinc-600 text-center border-t border-zinc-900/50 shrink-0">
                {'OPEN CAREER LOGS (DRAG RIGHT) >>'}
             </div>
          </HUDCard>
        </div>
    </div>
  )
};

export default DashboardView;