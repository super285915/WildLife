import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import HighlightedAnimals from '../components/home/HighlightedAnimals';
import EventsSection from '../components/home/EventsSection';
import ConservationHighlight from '../components/home/ConservationHighlight';

const MotionBox = motion(Box);

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 6, md: 12 },
        overflow: 'hidden',
      }}
    >
      <MotionBox variants={itemVariants}>
      <HeroSection />
      </MotionBox>
      
      <MotionBox variants={itemVariants}>
      <HighlightedAnimals />
      </MotionBox>
      
      <MotionBox variants={itemVariants}>
      <EventsSection />
      </MotionBox>
      
      <MotionBox variants={itemVariants}>
      <ConservationHighlight />
      </MotionBox>
    </MotionBox>
  );
};

export default HomePage;