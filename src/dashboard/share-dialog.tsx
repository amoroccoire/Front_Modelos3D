import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Copy, X } from "lucide-react";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modelUrl: string;
}

export function ShareDialog({ open, onOpenChange, modelUrl }: ShareDialogProps) {
  const [copying, setCopying] = useState(false);

  const handleCopy = async () => {
    try {
      setCopying(true);
      await navigator.clipboard.writeText(modelUrl);
      // Muestra un toast nativo de Material-UI o simplemente un alert
      alert("¡Enlace copiado al portapapeles!");
    } catch (err) {
      alert("Error al copiar el enlace.");
    } finally {
      setCopying(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => onOpenChange(false)}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" align="center">
            COMPARTIR
          </Typography>
          <IconButton onClick={() => onOpenChange(false)}>
            <X size={20} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          mt={2}
          sx={{ bgcolor: "#f9f9f9", p: 2, borderRadius: 2 }}
        >
          <TextField
            value={modelUrl}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
              sx: { bgcolor: "#f9f9f9", borderRadius: 1 },
            }}
          />
          <Button
            onClick={handleCopy}
            disabled={copying}
            sx={{
              minWidth: "40px",
              bgcolor: "black",
              color: "white",
              "&:hover": { bgcolor: "#333" },
            }}
          >
            {copying ? (
              <CircularProgress size={16} sx={{ color: "white" }} />
            ) : (
              <Copy size={16} />
            )}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}