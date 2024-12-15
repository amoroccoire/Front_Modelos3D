'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { Viewer3D } from './viewer-3d';
import { UserMenu } from './user-menu';
import { Box } from '@mui/material';

const initialModelUrl = 'https://example.com/model1.glb';

export default function DashboardPage() {
  const [selectedModelUrl, setSelectedModelUrl] = useState(initialModelUrl);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh', // Pantalla completa
        bgcolor: '#fce8dd', // Fondo de la página
      }}
    >
      {/* Barra lateral */}
      <Sidebar onSelectModel={setSelectedModelUrl} />

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flex: 1, // Ocupa el espacio restante
          position: 'relative', // Para posicionar el UserMenu
        }}
      >
        {/* Menú de usuario */}
        <Box
          sx={{
            position: 'absolute',
            top: 16, // Espaciado desde la parte superior
            right: 16, // Espaciado desde la derecha
            zIndex: 10, // Por encima del visor
          }}
        >
          <UserMenu />
        </Box>

        {/* Visor 3D */}
        <Viewer3D modelUrl={selectedModelUrl} />
      </Box>
    </Box>
  );
}
