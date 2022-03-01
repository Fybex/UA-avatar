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
  Divider 
} from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import Dropzone from "react-dropzone"
import { removeBackgroundFromImageBase64 } from "remove.bg"
import { triggerBase64Download } from 'react-base64-downloader'


function App() {
  const [imageUpload, setImageUpload] = useState({ file: null, spinner: null });

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
      <Flex
        bgImage="url('/bg.jpg')"
        justify="center"
        w="100%"
      >
        <Flex color="white" w="8xl" py="184px" flexDirection="column" align="center">
          <Flex flexDirection="row" alignItems="center">
            <Heading as="h1" size="2xl" pr="18px">Support Ukraine</Heading>
            <Image src="/Flag_of_Ukraine.png" h="40px" />
          </Flex>
          <Text mt="10px" fontSize="lg">
            Change your avatars in social media to show your support
          </Text>
        </Flex>
      </Flex>

      <Flex justify="center" my="4rem" px="1rem">
        <Box w="8xl">
          <Flex justify="center" flexDir="column">
            <Heading
              as="h1"
              bgGradient="linear(to-l, #FFD500, #005BBB)"
              bgClip="text"
              w="max-content"
            >
              It's eazy
            </Heading>
            <Text mt="10px" fontSize="lg">
              Upload your avatar and get a new one that will show your support for the situation in Ukraine!
            </Text>
          </Flex>
          <Box mt="2rem">
            {imageUpload.file ?
              <Flex justify="center" align="center" gap="1.5rem" border="3px solid #eeeeee" borderRadius="16px" p="2rem" minH="200px" position="relative">
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
                  <Img src={imageUpload.file} maxH="360px" maxW="720px" />
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
                    <Button>Drag'n'drop images, or click to select files</Button>
                  </div>
                )}
              </Dropzone>
            }
          </Box>
        </Box>
      </Flex>

      <Divider />

      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text>© 2022 UA avatar. All rights reserved</Text>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>Site was made by Andrew Valenya</Text>
          <IconButton as="a" href="https://github.com/Fybex" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
        </Stack>
      </Container>
    </>
  );
}

export default App;
