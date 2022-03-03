import React, { useState } from 'react'
import {
  Flex,
  Box,
  Heading,
  Text,
  Image,
  Img,
  Button,
  IconButton,
  CloseButton,
  Spinner,
  Container,
  Stack,
  Divider,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaGithub } from 'react-icons/fa'
import Dropzone from "react-dropzone"
import { removeBackgroundFromImageBase64 } from "remove.bg"
import { triggerBase64Download } from 'react-base64-downloader'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
})

function App() {
  const [imageUpload, setImageUpload] = useState({ file: null, spinner: null })
  const { colorMode, toggleColorMode } = useColorMode()

  const onImageDrop = (acceptedFiles) => {
    let reader = new FileReader();

    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = function () {
      setImageUpload({ file: reader.result, spinner: true })

      removeBackgroundFromImageBase64({
        base64img: reader.result,
        apiKey: process.env.REACT_APP_API_KEY,
        size: "regular",
        type: "product",
        bg_image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/640px-Flag_of_Ukraine.svg.png"
      }).then((result) => {
        const base64img = result.base64img;
        setImageUpload({ file: reader.result.slice(0, reader.result.indexOf(",") + 1) + base64img, spinner: false })
      }).catch((errors) => {
        console.log(JSON.stringify(errors));
      });
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  const onImageDownload = () => {
    triggerBase64Download(imageUpload.file, 'ua-avatar')
  }

  const onImageUploadRestart = () => {
    setImageUpload({ file: null, spinner: null })
  }

  return (
    <>
      <Container
        bgImage={useColorModeValue("url('/bg.jpg')", "url('/bg-night.jpg')")}
        flexDir="column"
        align="center"
        color="white"
        overflow="hidden"
        maxW="100%"
      >
        <Box w={{ base: "100%", '2xl': "8xl" }}>
          <Flex
            justify="space-between"
            align="center"
            my="1rem"
          >
            <Box
              p="0.5rem"
              border="3px solid"
              borderRadius="8px"
              borderColor="#005BBB #005BBB #FFD500 #FFD500"
            >
              <Text
                fontWeight="bold"
                fontSize={{ base: "md", sm: "lg" }}
              >
                Ukraine avatar
              </Text>
            </Box>
            <Button onClick={toggleColorMode} bg="transparent">
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Flex>
          <Flex
            py={{ base: "8rem", md: "10rem" }}
            flexDirection="column"
            align="center"
          >
            <Flex
              flexDirection="row"
              alignItems="center"
            >
              <Heading
                as="h1"
                size="2xl"
                pr="18px"
              >
                Support Ukraine
              </Heading>
              <Image
                src="/Flag_of_Ukraine.png"
                h="35px"
                d={{ base: "none", sm: "block" }}
              />
            </Flex>
            <Text
              mt="10px"
              fontSize={{ base: "md", sm: "lg" }}
            >
              Change your avatars in social media to show your support
            </Text>
          </Flex>
        </Box>
      </Container>

      <Container
        as={Flex}
        maxW="8xl"
        justify="center"
        my="4rem">
        <Flex
          w="8xl"
          justify="space-between"
          flexDir={{ base: 'column', lg: 'row' }}
        >
          <Stack
            justify="center"
            flexDir="column"
            w={{ base: "100%", lg: "45%" }}
          >
            <Heading
              as="h1"
              bgGradient="linear(to-l, #FFD500, #005BBB)"
              bgClip="text"
              w="max-content"
            >
              It's eazy
            </Heading>
            <Text fontSize={{ base: "md", sm: "lg" }}>
              Upload your avatar and get a new one that will have the Ukrainian flag in the background!
            </Text>
            <Box
              w="90%"
              d={{ base: "none", lg: "block" }}
            >
              <ReactCompareSlider
                itemOne={<ReactCompareSliderImage src="/selfie.jpg" alt="Image one" />}
                itemTwo={<ReactCompareSliderImage src="/selfie-ua.jpeg" alt="Image two" />}
              />
            </Box>
          </Stack>
          <Box
            mt="2rem"
            w={{ base: "100%", lg: "50%" }}
          >
            {imageUpload.file ?
              <Flex
                justify="center"
                align="center"
                gap="1.5rem"
                border="3px solid #eeeeee"
                borderRadius="16px"
                p="2rem"
                minH="200px"
                position="relative"
                flexDir={{ base: "row", lg: "column", xl: "row" }}
                h="100%"
              >
                <CloseButton size="md" position="absolute" right="10px" top="10px" onClick={onImageUploadRestart} />
                <Box position="relative">
                  {imageUpload.spinner
                    ?
                    <Spinner
                      position="absolute"
                      transform="translate(-50%, 0)"
                      left="50%"
                      top="50%"
                      thickness='4px'
                      speed='0.65s'
                      emptyColor='gray.200'
                      color='blue.500'
                      size='xl'
                      zIndex="1000"
                    />
                    : null}
                  <Img src={imageUpload.file} maxW="360px" />
                </Box>
                <Box>
                  <Button onClick={onImageDownload}>
                    Download image
                  </Button>
                </Box>
              </Flex>
              :
              <Dropzone
                onDrop={onImageDrop}
                accept="image/*"
                minSize={1024}
                maxSize={3072000}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <Flex flexDir="column">
                      <Button>Upload image</Button>
                      or drop a file
                    </Flex>
                  </div>
                )}
              </Dropzone>
            }
          </Box>
        </Flex>
      </Container>

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
        <Stack align={{ base: "center", md: "flex-start" }}>
          <Box
            p="0.5rem"
            border="3px solid"
            borderRadius="8px"
            borderColor="#005BBB #005BBB #FFD500 #FFD500"
            width="max-content"
          >
            <Text fontWeight="bold" fontSize="md" >Ukraine avatar</Text>
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

export default App;
