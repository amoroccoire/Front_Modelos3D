'use client';

import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Html } from '@react-three/drei';
import { Box, Typography } from '@mui/material';

interface ModelProps {
  url: string;
}

export function Model({ url }: ModelProps) {
  let gltf;
  try {
    gltf = useLoader(GLTFLoader, url);
  } catch (error) {
    console.error('Error loading model:', error);
    return (
      <Html center>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'transparent',
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography
            variant="h6"
            color="error"
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            Link Down
          </Typography>
        </Box>
      </Html>
    );
  }

  return <primitive object={gltf.scene} scale={[1, 1, 1]} />;
}
