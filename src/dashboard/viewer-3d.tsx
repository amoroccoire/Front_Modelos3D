import { Suspense } from 'react';
import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Box } from '@mui/material';
import { Model } from './model';
import { TextGeometry } from 'three/examples/jsm/Addons.js';
interface Viewer3DProps {
  modelUrl: string;
}

export function Viewer3D({ modelUrl }: Viewer3DProps) {
  const isZipFile = modelUrl.endsWith(".zip");
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%', // Ocupa todo el espacio disponible
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        bgcolor: 'transparent', // Fondo blanco para el área del visor
      }}
    >
      {
        isZipFile ? (
          <Model zipUrl={modelUrl}/>
        ) : (
          <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }} style = {{position: 'absolute', zIndex: 0,}}>
            <Suspense fallback={null}>
              <Stage environment="studio" intensity={0.5}>
                <mesh>
                  
                </mesh>
              </Stage>
            </Suspense>
            <OrbitControls
              autoRotate
              autoRotateSpeed={0.5}
              enableZoom={true}
              enablePan={true}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>
        )
      }
    </Box>
  );
}
