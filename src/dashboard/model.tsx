'use client';
import { Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Box, Typography } from '@mui/material';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useEffect, useState } from 'react';

interface ModelProps {
  url: string;
}

export function Model({ url }: ModelProps) {
  const [gltf, setGltf] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    let isMounted = true;

    const loadModel = async () => {
      try {
        url = url.toString();
        let loadedGltf = await useLoader(GLTFLoader, url);
        if (isMounted) {
          setGltf(loadedGltf);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error loading model:", err);
          setError("Error al cargar el modelo");
        }
      }
    };

    loadModel();

    return () => {
      isMounted = false; // Cancela si el componente se desmonta
    };
  }, [url]);

  if (!url) {
    return (
      <Html center>
        <Typography>Esperando modelo...</Typography>
      </Html>
    );
  }

  if (error) {
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
            {error}
          </Typography>
        </Box>
      </Html>
    );
  }

  if (!gltf) {
    return (
      <Html center>
        <Typography>Cargando modelo...</Typography>
      </Html>
    );
  }

  return  (
    <Suspense fallback={<div>Cargando...</div>}>
    <primitive object={gltf.scene} scale={[1, 1, 1]} />
  </Suspense>
  );
  
}