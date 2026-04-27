import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface Node {
    id: number;
    x: number;
    y: number;
    label: string;
}

interface NeuralLogicGraphProps {
    isActive: boolean;
    className?: string;
}

export const NeuralLogicGraph: React.FC<NeuralLogicGraphProps> = ({ isActive, className }) => {
    const nodes: Node[] = useMemo(() => [
        { id: 1, x: 20, y: 30, label: 'Legal Gazette' },
        { id: 2, x: 50, y: 15, label: 'Electoral Roll' },
        { id: 3, x: 80, y: 35, label: 'User Persona' },
        { id: 4, x: 35, y: 65, label: 'SIR 2026 Protocol' },
        { id: 5, x: 65, y: 75, label: 'Polling Intelligence' },
        { id: 6, x: 50, y: 45, label: 'VoterFlow Core' },
    ], []);

    const connections = [
        [1, 6], [2, 6], [3, 6], [4, 6], [5, 6],
        [1, 4], [2, 5], [3, 2]
    ];

    return (
        <div className={cn("relative w-full h-48 overflow-hidden bg-civic-navy/5 rounded-3xl border border-civic-navy/10 p-4", className)}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {connections.map(([fromId, toId], i) => {
                    const from = nodes.find(n => n.id === fromId)!;
                    const to = nodes.find(n => n.id === toId)!;
                    return (
                        <motion.line
                            key={i}
                            x1={`${from.x}%`}
                            y1={`${from.y}%`}
                            x2={`${to.x}%`}
                            y2={`${to.y}%`}
                            stroke="currentColor"
                            className="text-civic-navy/20"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ 
                                pathLength: isActive ? 1 : 0, 
                                opacity: isActive ? 1 : 0,
                                strokeWidth: isActive ? [1, 2, 1] : 1
                            }}
                            transition={{ duration: 1.5, delay: i * 0.1 }}
                        />
                    );
                })}
            </svg>

            {nodes.map((node) => (
                <motion.div
                    key={node.id}
                    className="absolute group"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                        scale: isActive ? 1 : 0, 
                        opacity: isActive ? 1 : 0,
                        y: isActive ? [0, -5, 0] : 0
                    }}
                    transition={{ 
                        duration: 0.5, 
                        delay: node.id * 0.1,
                        y: { repeat: Infinity, duration: 3 + node.id, ease: "easeInOut" }
                    }}
                >
                    <div className={cn(
                        "w-3 h-3 rounded-full border-2 border-white shadow-lg transition-colors duration-500",
                        isActive ? "bg-civic-saffron animate-pulse" : "bg-gray-300"
                    )} />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
                        <span className="text-[7px] font-black text-civic-navy uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-civic-navy/10">
                            {node.label}
                        </span>
                    </div>
                </motion.div>
            ))}

            {isActive && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <div className="flex gap-1">
                        {[1, 2, 3].map(i => (
                            <motion.div 
                                key={i}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                className="w-1 h-1 bg-civic-saffron rounded-full"
                            />
                        ))}
                    </div>
                    <span className="text-[8px] font-black text-civic-navy uppercase tracking-widest italic animate-pulse">
                        Mapping Agentic Intelligence...
                    </span>
                </div>
            )}
        </div>
    );
};
