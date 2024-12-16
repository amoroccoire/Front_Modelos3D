import { Suspense } from 'react';
import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Box, Typography } from '@mui/material';
import { Model } from './model';

interface Viewer3DProps {
  modelUrl: string;
}

export function Viewer3D({ modelUrl }: Viewer3DProps) {
  console.log("modelo clickeado: ", modelUrl);

  if (!modelUrl) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography variant="body1" color="textSecondary">
          Selecciona un modelo para visualizarlo
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        bgcolor: 'transparent',
      }}
    >
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }} style={{ position: 'absolute', zIndex: 0 }}>
        <Suspense
          fallback={
            <Html center>
              <Typography variant="body1" color="textSecondary">
                Cargando modelo 3D...
              </Typography>
            </Html>
          }
        >
          <Stage environment="studio" intensity={0.5}>
            <Model url={modelUrl} />
          </Stage>
        </Suspense>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom
          enablePan
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </Box>
  );
}
