import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const words = ['Growth', 'Success', 'Progress', 'Innovation', 'Excellence'];

export function AnimatedText() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    
    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, 100);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText === word) {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(word.slice(0, displayText.length + 1));
        }, 150);
        return () => clearTimeout(timeout);
      }
    }
  }, [displayText, index, isDeleting]);

  return (
    <motion.span
      className="text-blue-500 font-bold inline-block min-w-[200px]"
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        |
      </motion.span>
    </motion.span>
  );
}