import React from 'react';
import { Flex, Box, Heading, Text, Container, Stack } from '@chakra-ui/react';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider';

import Upload from './Upload';

export default function UploadSection() {
  return (
    <Container as={Flex} maxW="8xl" justify="center" my="4rem">
      <Flex
        w="8xl"
        justify="space-between"
        flexDir={{ base: 'column', lg: 'row' }}
      >
        <Stack
          justify="center"
          flexDir="column"
          w={{ base: '100%', lg: '45%' }}
        >
          <Heading
            as="h1"
            bgGradient="linear(to-l, #FFD500, #005BBB)"
            bgClip="text"
            w="max-content"
          >
            It's eazy
          </Heading>
          <Text fontSize={{ base: 'md', sm: 'lg' }}>
            Upload your avatar and get a new one that will have the Ukrainian
            flag in the background!
          </Text>
          <Box w="90%" d={{ base: 'none', lg: 'block' }}>
            <ReactCompareSlider
              itemOne={
                <ReactCompareSliderImage src="/selfie.jpg" alt="Image one" />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src="/selfie-ua.jpeg"
                  alt="Image two"
                />
              }
            />
          </Box>
        </Stack>
        <Upload />
      </Flex>
    </Container>
  );
}
