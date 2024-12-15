'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para navegación
import { Menu, MenuItem, IconButton } from '@mui/material';
import { UserCircle2 } from 'lucide-react';

export function UserMenu() {
  const navigate = useNavigate(); // Reemplaza router.push con navigate
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    navigate('/'); // Redirige al inicio de sesión
  };

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        sx={{
          bgcolor: 'black',
          color: 'white',
          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.9)' },
        }}
      >
        <UserCircle2 size={20} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleLogout}>Salir</MenuItem>
      </Menu>
    </>
  );
}
