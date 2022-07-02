import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Hero() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container
      bgImage={useColorModeValue("url('/bg.jpg')", "url('/bg-night.jpg')")}
      flexDir="column"
      align="center"
      color="white"
      overflow="hidden"
      maxW="100%"
    >
      <Box w={{ base: '100%', '2xl': '8xl' }}>
        <Flex justify="space-between" align="center" my="1rem">
          <Box
            p="0.5rem"
            border="3px solid"
            borderRadius="8px"
            borderColor="#005BBB #005BBB #FFD500 #FFD500"
          >
            <Text fontWeight="bold" fontSize={{ base: 'md', sm: 'lg' }}>
              Ukrainian avatar
            </Text>
          </Box>
          <Button onClick={toggleColorMode} bg="transparent">
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
        <Flex
          py={{ base: '8rem', md: '10rem' }}
          flexDirection="column"
          align="center"
        >
          <Flex flexDirection="row" alignItems="center">
            <Heading as="h1" size="2xl" pr="18px">
              Support Ukraine
            </Heading>
            <Image
              src="/Flag_of_Ukraine.png"
              h="35px"
              d={{ base: 'none', sm: 'block' }}
            />
          </Flex>
          <Text mt="10px" fontSize={{ base: 'md', sm: 'lg' }}>
            Change your avatars in social media to show your support
          </Text>
        </Flex>
      </Box>
    </Container>
  );
}
