export const staggerContainer = (staggerChildren, delayChildren) => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  });
  
  export const textVariant = (delay) => ({
    hidden: { y: 50, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 1.5,
        delay,
      },
    },
});

export const floatAnimation = {
    y: ['0%', '-20%', '0%'],
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Infinity
    }
  };
  
  export const staggerItems = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };