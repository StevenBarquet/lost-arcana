import { motion, TargetAndTransition, Transition } from 'framer-motion';

export const MOTION_STAGGER = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
export const MOTION_FADE_IN = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const MOTION_FADE_IN_DOWN = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const BIG_SMALL_ANIMATION: {
  animate: TargetAndTransition;
  transition: Transition;
} = {
  animate: {
    // rotate: [0, 0, 0, 180, 360],
    scale: [1, 1.1, 1, 1.1, 1],
    // opacity: [0.85, 1, 0.85],
    boxShadow: [
      '0 0 5px rgba(255, 255, 255, 0.076)',
      '0 0 5px rgba(255, 255, 255, 0.5)',
      '0 0 15px rgba(255, 255, 255, 0.7)',
      '0 0 5px rgba(255, 255, 255, 0.5)',
      'none',
    ],
  },
  transition: {
    duration: 2,
    ease: 'easeInOut',
    times: [0, 0.2, 0.5, 0.8, 1],
    repeat: Infinity,
    repeatDelay: 1,
  },
};

export const motionComps = {
  Div: motion.div,
  H1: motion.h1,
  H2: motion.h2,
  H3: motion.h3,
  H4: motion.h4,
  H5: motion.h5,
  H6: motion.h6,
  P: motion.p,
  Span: motion.span,
  Ul: motion.ul,
  Li: motion.li,
  Button: motion.button,
  Img: motion.img,
  Input: motion.input,
  A: motion.a,
  Label: motion.label,
};
