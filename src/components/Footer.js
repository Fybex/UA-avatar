import React from 'react';
import {
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <>
      <Divider />
      <Container
        as={Stack}
        maxW={'8xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align="center"
      >
        <Stack align={{ base: 'center', md: 'flex-start' }}>
          <Box
            p="0.5rem"
            border="3px solid"
            borderRadius="8px"
            borderColor="#005BBB #005BBB #FFD500 #FFD500"
            width="max-content"
          >
            <Text fontWeight="bold" fontSize="md">
              Ukrainian avatar
            </Text>
          </Box>
          <Text>© 2022 All rights reserved.</Text>
        </Stack>

        <Text>#StopWarInUkraine</Text>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>Site was made by Andrew Valenya</Text>
          <IconButton
            as="a"
            href="https://github.com/Fybex/UA-avatar"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
        </Stack>
      </Container>
    </>
  );
}
