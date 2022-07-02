import React from 'react';
import { extendTheme } from '@chakra-ui/react';

import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import Footer from './components/Footer';

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
};

// eslint-disable-next-line no-unused-vars
const theme = extendTheme({ breakpoints });

function App() {
  return (
    <>
      <Hero />
      <UploadSection />
      <Footer />
    </>
  );
}

export default App;
