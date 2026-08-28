'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: readonly FAQItem[];
  className?: string;
}

export default function FAQ({ items, className = '' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={index}
            className={`glass-accordion rounded-2xl overflow-hidden transition-all duration-300 ${
              isOpen ? 'border-l-4 border-l-primary bg-white/60' : 'hover:bg-white/50'
            }`}
            layout
          >
            <button
              className="w-full p-6 flex justify-between items-center text-left cursor-pointer"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <h3
                className={`font-[var(--font-heading)] text-lg md:text-xl font-medium pr-4 transition-colors duration-300 ${
                  isOpen ? 'text-primary' : 'text-on-surface'
                }`}
              >
                {item.question}
              </h3>
              <span className={`flex-shrink-0 transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-outline-variant'}`}>
                {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-on-surface-variant font-light leading-relaxed pl-4 border-l border-outline-variant/30">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
