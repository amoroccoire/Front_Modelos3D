'use client';

import { useState } from 'react';
import { Box, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { Plus, Share2 } from 'lucide-react';
import { UploadDialog } from './upload-dialog';
import { ShareDialog } from './share-dialog';
import { ModelActionsDropdown } from './model-actions-dropdown';

interface Model {
  name: string;
  url: string;
}

interface SidebarProps {
  onSelectModel: (url: string) => void;
}

export function Sidebar({ onSelectModel }: SidebarProps) {
  const [models, setModels] = useState<Model[]>([
    { name: 'Test', url: 'https://277a-34-74-154-43.ngrok-free.app/download/Figure_of_Victory_1214181117_obj.zip' },
    { name: 'Model Name 2', url: 'https://example.com/model2.glb' },
    { name: 'Model Name 3', url: 'https://example.com/model3.glb' },
    { name: 'Model Name 4', url: 'https://example.com/model4.glb' },
    { name: 'Model Name 6', url: 'https://example.com/model6.glb' },
    { name: 'Model Name 7', url: 'https://example.com/model7.glb' },
    { name: 'Model Name 8', url: 'https://example.com/model8.glb' },
    { name: 'Model Name 9', url: 'https://example.com/model9.glb' },
  ]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedModelUrl, setSelectedModelUrl] = useState<string>('');

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
                  sx: { fontSize: 14 },
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
