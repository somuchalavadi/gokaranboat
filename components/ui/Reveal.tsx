"use client";
import { motion, useReducedMotion } from "framer-motion";
export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) { const reduce = useReducedMotion(); return <motion.div className={className} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduce ? 0 : 0.45, delay }}>{children}</motion.div>; }
