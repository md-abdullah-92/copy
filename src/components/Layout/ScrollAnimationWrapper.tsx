import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  [x: string]: any; // For other props like 'style', 'id', etc.
}

export default function ScrollAnimationWrapper({
  children,
  className,
  ...props
}: ScrollAnimationWrapperProps) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.7 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
