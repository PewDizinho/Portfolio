import React from 'react';
import HUDCard from '../HUDCard';

const DetailView = ({ projectId, onBack }) => {
    return (
        <div className="h-full flex items-center justify-center relative bg-black/90 z-50 p-4 backdrop-blur-sm">
            {/* Botão de Voltar Flutuante no Topo (Segurança Extra) */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12 z-50">
                 <button 
                    onClick={onBack}
                    className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-widest font-bold"
                 >
                    <span>{'<'}</span> RETURN TO WORKSPACE
                 </button>
            </div>

            <HUDCard title="EXECUTION_WINDOW" className="w-full max-w-3xl bg-black border-zinc-700 shadow-2xl shadow-[#1793d1]/10 relative">
                {/* Botão X dentro do Card */}
                <button 
                    onClick={onBack}
                    className="absolute top-4 right-4 text-zinc-600 hover:text-red-500 transition-colors p-2"
                >
                    ✕
                </button>

                <div className="p-4 md:p-8 text-center">
                    <div className="inline-block px-3 py-1 border border-[#1793d1] text-[#1793d1] text-[10px] uppercase tracking-widest mb-6 animate-pulse">
                        Running Process: {projectId?.toUpperCase()}
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">PROJECT_{projectId?.toUpperCase()}</h1>
                    
                    <div className="text-zinc-400 mb-8 max-w-lg mx-auto text-xs md:text-sm leading-relaxed text-justify font-mono">
                        <p className="mb-4">{'>>'} Initializing documentation reader... [OK]</p>
                        <p>This project demonstrates high-level architecture. Detailed case study data would be loaded here, connecting to the repository and fetching live metrics.</p>
                    </div>
                    
                    <button 
                        onClick={onBack}
                        className="bg-zinc-800 text-white px-6 py-3 hover:bg-zinc-700 hover:text-red-400 transition-colors uppercase text-xs font-bold tracking-widest border border-zinc-700"
                    >
                        Terminate Process [ESC]
                    </button>
                </div>
            </HUDCard>
        </div>
    )
};

export default DetailView;