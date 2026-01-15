import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import DashboardView from '../components/views/DashboardView';
import ProjectsView from '../components/views/ProjectsView';
import ExperiencesView from '../components/views/ExperiencesView';
import DetailView from '../components/views/DetailView';
import SkillsView from '../components/views/SkillsView';
import HistoryView from '../components/views/HistoryView';

const MainPage = () => {
  const [time, setTime] = useState(new Date());
  const [viewState, setViewState] = useState('dashboard'); 
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Mapa de Posições (X, Y)
  const viewCoords = {
      'history':      { x: 0,  y: -1 }, // Topo
      'dashboard':    { x: 0,  y: 0 },  // Centro
      'skills':       { x: 0,  y: 1 },  // Fundo
      'workspace':    { x: -1, y: 0 },  // Esquerda
      'experiences':  { x: 1,  y: 0 },  // Direita
      'detail':       { x: 0,  y: 0 }   // Overlay
  };

  const [direction, setDirection] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            if (viewState === 'detail') setViewState('workspace');
            else if (viewState !== 'dashboard') changeView('dashboard');
        }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [viewState]);

  const changeView = (newState) => {
      if (viewState === newState) return;
      if (newState === 'dashboard') setSelectedProject(null);

      const current = viewCoords[viewState] || { x: 0, y: 0 };
      const next = viewCoords[newState] || { x: 0, y: 0 };

      setDirection({
          x: next.x - current.x,
          y: next.y - current.y
      });
      
      setViewState(newState);
  };

  const onDragEnd = (event, info) => {
      if (viewState === 'detail') return;

      const swipeThreshold = 50;
      const { offset, velocity } = info;
      
      if (Math.abs(offset.x) > Math.abs(offset.y)) {
          if (Math.abs(offset.x) > swipeThreshold) {
              if (offset.x > 0) { // Swipe Direita
                  if (viewState === 'experiences') changeView('dashboard');
                  else if (viewState === 'dashboard') changeView('workspace');
              } else { // Swipe Esquerda
                  if (viewState === 'workspace') changeView('dashboard');
                  else if (viewState === 'dashboard') changeView('experiences');
              }
          }
      } else {
          if (Math.abs(offset.y) > swipeThreshold) {
              if (offset.y > 0) { // Swipe Baixo
                  if (viewState === 'skills') changeView('dashboard');
                  else if (viewState === 'dashboard') changeView('history');
              } else { // Swipe Cima
                  if (viewState === 'history') changeView('dashboard');
                  else if (viewState === 'dashboard') changeView('skills');
              }
          }
      }
  };

  const handleProjectClick = (id) => {
      setSelectedProject(id);
      changeView('workspace');
  };

  const handleOpenDetail = (id) => {
      if(id) setSelectedProject(id);
      setViewState('detail');
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir.x * 100 + 'vw',
      y: dir.y * 100 + 'vh',
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: (dir) => ({
      x: dir.x * -100 + 'vw',
      y: dir.y * -100 + 'vh',
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 }
    })
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-mono selection:bg-white selection:text-black overflow-hidden relative flex flex-col">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <header className="flex justify-between items-end border-b border-zinc-800 pb-4 mb-8 relative z-20 shrink-0 select-none">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter">PEW<span className="text-zinc-600">.OS</span></h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">System Version 2.4 // Pew's Cavern Core</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-light">{time.toLocaleTimeString()}</div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest">LOC: CWB-PR-BR</div>
        </div>
      </header>

      <div className="relative z-10 flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
            
            {viewState !== 'detail' ? (
                <motion.div
                    key={viewState}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.2}
                    onDragEnd={onDragEnd}
                    className="h-full w-full absolute top-0 left-0 touch-none bg-black"
                >
                    {viewState === 'dashboard' && (
                        <DashboardView 
                            onNavigate={handleProjectClick} 
                            onChangeView={changeView} // Passamos a função de troca de tela aqui
                        />
                    )}
                    {viewState === 'workspace' && <ProjectsView targetProjectId={selectedProject} onOpenProject={handleOpenDetail} onBack={() => changeView('dashboard')} />}
                    {viewState === 'experiences' && <ExperiencesView onBack={() => changeView('dashboard')} />}
                    {viewState === 'skills' && <SkillsView onBack={() => changeView('dashboard')} />}
                    {viewState === 'history' && <HistoryView onBack={() => changeView('dashboard')} />}
                </motion.div>
            ) : (
                <motion.div
                    key="detail"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="h-full w-full absolute top-0 left-0 z-50"
                >
                    <DetailView 
                        projectId={selectedProject} 
                        onBack={() => setViewState('workspace')} 
                    />
                </motion.div>
            )}

        </AnimatePresence>
      </div>

      <footer className="fixed bottom-4 left-4 right-4 flex justify-between text-[9px] text-zinc-600 uppercase tracking-widest pointer-events-none z-20">
         <div>WS: {viewState.toUpperCase()}</div>
         <div>[ESC] BACK / GRAB & DRAG / CLICK</div>
         <div>Network: Secure</div>
      </footer>
    </div>
  );
};

export default MainPage;