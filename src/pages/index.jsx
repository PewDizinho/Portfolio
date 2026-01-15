import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainPage from './main';

// --- CONFIG ---
const _debug = false; // <--- Mude para false para ver o terminal

const Neofetch = () => {
  const info = [
    { label: "OS", value: "Arch Linux x86_64" },
    { label: "Kernel", value: "6.16.7-arch1-1" },
    { label: "Uptime", value: "54 mins" },
    { label: "Packages", value: "1057 (pacman), 7 (flatpak)" },
    { label: "Shell", value: "bash 5.3.3" },
    { label: "Resolution", value: "2560x1440" },
    { label: "DE", value: "Hyprland" },
    { label: "Theme", value: "Adwaita-dark [GTK3]" },
    { label: "Icons", value: "Adwaita [GTK3]" },
    { label: "Terminal", value: "kitty" },
    { label: "CPU", value: "AMD Ryzen 7 9800X3D (16) @ 5.271G" },
    { label: "GPU", value: "NVIDIA GeForce RTX 3060 Lite Hash" },
    { label: "GPU", value: "AMD ATI Radeon Graphics" },
    { label: "Memory", value: "9141MiB / 15135MiB" },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '40px', alignItems: 'start', paddingLeft: '3px' }} className="font-mono text-[13px] leading-[1.2] mb-6">
      <pre style={{ color: '#1793d1', margin: 0 }} className="font-bold">
        {`                   -\`
                  .o+\`
                 \`ooo/
                \`+oooo:
               \`+oooooo:
               -+oooooo+:
             \`/:-:++oooo+:
            \`/++++/+++++++:
           \`/++++++++++++++:
          \`/+++ooooooooooooo/\`
         ./ooosssso++osssssso+\`
        .ooosssso-\`\`\`\`/ossssss+\`
       -osssssso.      :ssssssso.
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   \`/osssssso+/:-        -:/+osssso+-
  \`+sso+:-\`                \`.-/+oso:
 \`++:.                           \`-/+/
 .\`                                 \`/`}
      </pre>

      <div className="flex flex-col">
        <div className="mb-2">
          <span style={{ color: '#1793d1' }} className="font-bold">pewdizinho</span>
          <span className="text-white">@</span>
          <span style={{ color: '#1793d1' }} className="font-bold">archie</span>
          <div className="text-white">-----------------</div>
        </div>
        <div className="space-y-[1px]">
          {info.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '8px' }}>
              <span style={{ color: '#1793d1', minWidth: '85px' }} className="font-bold">{item.label}:</span>
              <span className="text-white whitespace-nowrap">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-0 mt-6">
          {[ '#444444', '#ff5555', '#50fa7b', '#f1fa8c', '#bd93f9', '#ff79c6', '#8be9fd', '#f8f8f2' ].map((color, i) => (
            <div key={i} style={{ width: '24px', height: '12px', backgroundColor: color }} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TerminalBoot = ({ onComplete }) => {
  const [inputValue, setInputValue] = useState('./start.sh');
  const [history, setHistory] = useState([ { type: 'component', value: <Neofetch /> } ]);
  const [isLaunching, setIsLaunching] = useState(false);
  const inputRef = useRef(null);
  const endRef = useRef(null);

  const bootSequence = [
    { text: "   OK   Found device /dev/pew-brain.", delay: 200 },
    { text: "  INFO  Mounting sarcasm filesystem...", delay: 400 },
    { text: "  INFO  Enjoys complexity. Complains about it later.", delay: 450 },
    { text: " FAILED Failed to load module 'social_life.service'.", delay: 300 },
    { text: "  INFO  Patience module loaded (low capacity).", delay: 300 },
    { text: "  WARN  Interactive shell might be unstable without coffee.", delay: 500 },
    { text: "   OK   Bypass initialized. Ignoring errors.", delay: 200 },
    { text: "   OK   Started Portfolio Daemon (v2.0).", delay: 150 },
    { text: "  WARN  Small talk dependency missing. Ignored.", delay: 400 },
    { text: "  INFO  Productivity tied to interest, not deadlines.", delay: 400 },
    { text: "  WARN  Too many ideas, not enough time.", delay: 400 },
    { text: "   OK   Reaching peak performance.", delay: 300 },
    { text: "Welcome to PewOS v1.0. Starting session...", delay: 800 }
  ];

  useEffect(() => {
    if (!isLaunching) {
      inputRef.current?.focus();
    }
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isLaunching]);

  const runBootSequence = async () => {
    setIsLaunching(true);
    setHistory(prev => [...prev, { type: 'command', value: './start.sh' }]);

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (const log of bootSequence) {
      await wait(log.delay);
      setHistory(prev => [...prev, { type: 'log', value: log.text }]);
    }

    await wait(500);
    onComplete();
  };

  const handleCommand = (e) => {
    e.preventDefault();
    if (isLaunching) return;

    const fullCommand = inputValue.trim();
    
    if (!fullCommand) {
        setHistory([...history, { type: 'command', value: '' }]);
        setInputValue('');
        return;
    }

    const [cmd, ...args] = fullCommand.split(' ');
    const argText = args.join(' ');
    let response = null;

    switch (cmd.toLowerCase()) {
      case './start.sh':
      case 'start':
        runBootSequence();
        return;
      case 'echo':
        response = { type: 'text', value: argText };
        break;
      case 'neofetch':
        response = { type: 'component', value: <Neofetch /> };
        break;
      case 'clear':
        setHistory([]);
        setInputValue('');
        return;
      case '-help':
      case 'help':
        response = { type: 'text', value: 'Comandos: ./start.sh, echo [arg], neofetch, clear' };
        break;
      default:
        response = { 
          type: 'text', 
          value: `bash: ${cmd}: comando não encontrado. use -help` 
        };
    }

    setHistory([...history, { type: 'command', value: inputValue }, response]);
    setInputValue('');
  };

  const renderLog = (text) => {
    const status = text.substring(0, 8);
    const message = text.substring(8);

    if (status === "   OK   ") {
      return <span>[<span style={{ color: '#50fa7b' }}>{status}</span>]{message}</span>;
    }
    if (status === " FAILED ") {
      return <span>[<span style={{ color: '#ff5555' }}>{status}</span>]{message}</span>;
    }
    if (status === "  WARN  ") {
      return <span>[<span style={{ color: '#f1fa8c' }}>{status}</span>]{message}</span>;
    }
    if (status === "  INFO  ") {
      return <span>[<span style={{ color: '#8be9fd' }}>{status}</span>]{message}</span>;
    }
    return <span>{text}</span>;
  };

  return (
    <div 
      className="fixed inset-0 bg-black flex flex-col p-8 font-mono text-white overflow-y-auto select-none"
      onClick={() => !isLaunching && inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 mb-6 text-zinc-600 text-xs border-b border-zinc-900 pb-2 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
        </div>
        <span className="ml-2 italic opacity-50 text-[10px]">terminal — kitty</span>
      </div>

      <div className="flex flex-col gap-2">
        {history.map((entry, i) => (
          <div key={i}>
            {entry.type === 'command' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', paddingLeft: '3px' }}>
                 <span style={{ color: '#1793d1' }} className="font-bold whitespace-nowrap">[pew@archlinux ~]$</span>
                 <span className="text-white">{entry.value}</span>
              </div>
            ) : entry.type === 'log' ? (
              <div className="pl-[3px] text-zinc-400 whitespace-pre">
                {renderLog(entry.value)}
              </div>
            ) : entry.type === 'component' ? (
              entry.value
            ) : (
              <div className="pl-[3px] text-zinc-300 whitespace-pre-wrap">{entry.value}</div>
            )}
          </div>
        ))}
      </div>

      {!isLaunching && (
        <form onSubmit={handleCommand} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', marginTop: '10px', paddingLeft: '3px' }} className="shrink-0">
          <span style={{ color: '#1793d1' }} className="font-bold whitespace-nowrap">[pew@archlinux ~]$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            spellCheck="false"
            autoComplete="off"
            style={{ 
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'white',
              padding: 0,
              margin: 0,
              width: '100%',
              caretColor: '#1793d1',
              appearance: 'none',
              WebkitAppearance: 'none',
              boxShadow: 'none'
            }}
            className="font-mono text-[14px]"
          />
        </form>
      )}
      <div ref={endRef} />
    </div>
  );
};

export default function PortfolioPage() {
  // Se _debug for true, isBooted começa como true, pulando o terminal
  const [isBooted, setIsBooted] = useState(_debug);

  return (
    <main className="bg-black min-h-screen">
      <AnimatePresence mode="wait">
        {!isBooted ? (
          <motion.div key="boot" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <TerminalBoot onComplete={() => setIsBooted(true)} />
          </motion.div>
        ) : (
          <MainPage />
        )}
      </AnimatePresence>
    </main>
  );
}