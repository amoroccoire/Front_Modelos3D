import { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { MoreVertical } from "lucide-react";

interface ModelActionsDropdownProps {
  onDelete: () => void;
}

export function ModelActionsDropdown({ onDelete }: ModelActionsDropdownProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          height: 32,
          width: 32,
          bgcolor: "transparent",
          "&:hover": { bgcolor: "#f5f5f5" },
        }}
      >
        <MoreVertical size={16} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            onDelete();
          }}
          sx={{
            color: "red",
            "&:hover": { bgcolor: "#ffe6e6" },
          }}
        >
          ELIMINAR
        </MenuItem>
      </Menu>
    </>
  );
}
