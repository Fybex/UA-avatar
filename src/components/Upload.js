import React, { useState } from 'react';
import { Flex, Box, Img, Button, CloseButton, Spinner } from '@chakra-ui/react';
import Dropzone from 'react-dropzone';
import { removeBackgroundFromImageBase64 } from 'remove.bg';
import { triggerBase64Download } from 'react-base64-downloader';

import RemovebgAPIKey from '../RemovebgAPIKey';

export default function Upload() {
  const [imageUpload, setImageUpload] = useState({ file: null, spinner: null });

  const onImageDrop = acceptedFiles => {
    let reader = new FileReader();

    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = function () {
      setImageUpload({ file: reader.result, spinner: true });

      removeBackgroundFromImageBase64({
        base64img: reader.result,
        apiKey: RemovebgAPIKey,
        size: 'regular',
        type: 'product',
        bg_image_url:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/640px-Flag_of_Ukraine.svg.png',
      })
        .then(result => {
          const base64img = result.base64img;
          setImageUpload({
            file:
              reader.result.slice(0, reader.result.indexOf(',') + 1) +
              base64img,
            spinner: false,
          });
        })
        .catch(errors => {
          console.log(JSON.stringify(errors));
        });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  const onImageDownload = () => {
    triggerBase64Download(imageUpload.file, 'ua-avatar');
  };

  const onImageUploadRestart = () => {
    setImageUpload({ file: null, spinner: null });
  };

  return (
    <Box mt="2rem" w={{ base: '100%', lg: '50%' }}>
      {imageUpload.file ? (
        <Flex
          justify="center"
          align="center"
          gap="1.5rem"
          border="3px solid #eeeeee"
          borderRadius="16px"
          p="2rem"
          minH="200px"
          position="relative"
          flexDir={{ base: 'row', lg: 'column', xl: 'row' }}
          h="100%"
        >
          <CloseButton
            size="md"
            position="absolute"
            right="10px"
            top="10px"
            onClick={onImageUploadRestart}
          />
          <Box position="relative">
            {imageUpload.spinner ? (
              <Spinner
                position="absolute"
                transform="translate(-50%, 0)"
                left="50%"
                top="50%"
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                zIndex="1000"
              />
            ) : null}
            <Img src={imageUpload.file} maxW="360px" />
          </Box>
          <Box>
            <Button onClick={onImageDownload}>Download image</Button>
          </Box>
        </Flex>
      ) : (
        <Dropzone
          onDrop={onImageDrop}
          accept="image/*"
          minSize={1024}
          maxSize={3072000}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <Flex flexDir="column">
                <Button>Upload image</Button>
                or drop a file
              </Flex>
            </div>
          )}
        </Dropzone>
      )}
    </Box>
  );
}
