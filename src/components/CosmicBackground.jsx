import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CosmicBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const starArray = [];
    for (let i = 0; i < 200; i++) {
      starArray.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
      });
    }
    setStars(starArray);
  }, []);

  return (
    <>
      <div className="cosmic-bg" />
      <div className="stars">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Floating cosmic objects */}
      <motion.div
        className="floating-object"
        style={{
          left: '10%',
          top: '20%',
          fontSize: '60px',
        }}
        animate={{
          y: [0, -30, 30, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        🪐
      </motion.div>

      <motion.div
        className="floating-object"
        style={{
          right: '15%',
          top: '15%',
          fontSize: '50px',
        }}
        animate={{
          y: [0, 40, -20, 0],
          rotate: [0, -15, 15, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        🚀
      </motion.div>

      <motion.div
        className="floating-object"
        style={{
          left: '70%',
          bottom: '20%',
          fontSize: '45px',
        }}
        animate={{
          y: [0, -40, 20, 0],
          rotate: [0, 20, -10, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        🛸
      </motion.div>

      <motion.div
        className="floating-object"
        style={{
          left: '20%',
          bottom: '30%',
          fontSize: '55px',
        }}
        animate={{
          y: [0, 35, -25, 0],
          rotate: [0, -12, 12, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        👨‍🚀
      </motion.div>

      <motion.div
        className="floating-object"
        style={{
          right: '25%',
          bottom: '15%',
          fontSize: '40px',
        }}
        animate={{
          y: [0, -25, 35, 0],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          duration: 23,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        🛰️
      </motion.div>
    </>
  );
};

export default CosmicBackground;
