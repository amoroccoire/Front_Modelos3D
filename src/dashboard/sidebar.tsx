'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { Plus, Share2 } from 'lucide-react';
import { UploadDialog } from './upload-dialog';
import { ShareDialog } from './share-dialog';
import { ModelActionsDropdown } from './model-actions-dropdown';
import { cos } from 'three/tsl';

interface Model {
  name: string;
  url: string;
}

interface SidebarProps {
  onSelectModel: (url: string) => void;
}

export function Sidebar({ onSelectModel }: SidebarProps) {
  const [models, setModels] = useState<Model[]>([
    {name:'Figure of victory', url:'https://d1uf8ackqiyuzm.cloudfront.net/Figure_of_victory_2.glb'}
  ]); //lista que contiene los modelos
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedModelUrl, setSelectedModelUrl] = useState<string>('');

  /*useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("https://93b7-34-125-87-224.ngrok-free.app/todos", {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
          method: 'GET',
          mode: 'cors',
          redirect :'manual'
        });
        if (!response.ok) {
          throw new Error('Error al obtener la lista de modelos');
        }
        const data = await response.text();
        const jsonResponse = JSON.parse(data);

        // Filtra solo los archivos .glb y construye el estado
        const glbModels = jsonResponse.files
          .filter((file: { filename: string }) => file.filename.endsWith('.glb'))
          .map((file: { filename: string }) => ({
            name: file.filename,
            url: `https://93b7-34-125-87-224.ngrok-free.app/download/${file.filename}`,
          }));

        setModels(glbModels);
      } catch (error) {
        console.error('Error al cargar los modelos:', error);
      }
    };

    fetchModels();
  }, []);*/

  const handleShare = (url: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita seleccionar el modelo al hacer clic en "Share"
    setSelectedModelUrl(url);
    setIsShareOpen(true);
  };

  const handleDelete = (modelToDelete: Model) => {
    setModels(models.filter((model) => model !== modelToDelete));
  };

  return (
    <>
      <Box
        sx={{
          width: 256, // Ancho equivalente a Tailwind `w-64`
          bgcolor: 'white',
          p: 2,
          borderRight: '1px solid #e0e0e0',
        }}
      >
        {/* Encabezado */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight="medium">
            Modelos
          </Typography>
          <IconButton
            onClick={() => setIsUploadOpen(true)}
            sx={{
              bgcolor: 'transparent',
              '&:hover': { bgcolor: '#f5f5f5' },
            }}
          >
            <Plus size={20} />
          </IconButton>
        </Box>

        {/* Lista de Modelos */}
        <List>
          {models.map((model, index) => (
            <ListItem
              key={index}
              button
              onClick={() => onSelectModel(model.url)}
              sx={{
                p: 1,
                borderRadius: 1,
                '&:hover': {
                  bgcolor: '#f5f5f5',
                },
              }}
            >
              <ListItemText
                primary={model.name}
                primaryTypographyProps={{
                  variant: 'body2',
                  sx: { 
                    fontSize: 14,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                  },
                }}
              />
              <ListItemSecondaryAction
                sx={{
                  display: 'flex',
                  gap: 1,
                }}
              >
                <ModelActionsDropdown onDelete={() => handleDelete(model)} />
                <IconButton
                  size="small"
                  sx={{ p: 0.5 }}
                  onClick={(e) => handleShare(model.url, e)}
                >
                  <Share2 size={16} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Diálogos */}
      <UploadDialog open={isUploadOpen} onOpenChange={setIsUploadOpen} />
      <ShareDialog
        open={isShareOpen}
        onOpenChange={setIsShareOpen}
        modelUrl={selectedModelUrl}
      />
    </>
  );
}
