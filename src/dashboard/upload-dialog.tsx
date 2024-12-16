import { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { X } from "lucide-react";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadDialog({ open, onOpenChange }: UploadDialogProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
        });
      });

      Promise.all(newPreviews).then((previewUrls) => {
        setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
        setPreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
      });
    }
  };

  const handleRemove = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) return;
  
    setIsUploading(true);
  
    // Crear un FormData y agregar el primer archivo
    const formData = new FormData();
    formData.append("file", selectedFiles[0]);
  
    try {
      // Realizar la solicitud POST
      const response = await fetch("https://93b7-34-125-87-224.ngrok-free.app/upload", {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
        mode: 'cors',
        redirect :'manual',
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        setIsSuccess(true);
  
        // Resetear después de mostrar éxito
        setTimeout(() => {
          setIsSuccess(false);
          setSelectedFiles([]);
          setPreviews([]);
          onOpenChange(false);
        }, 1500);
      } else {
        console.error("Error al subir el archivo");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setIsUploading(false);
    }
  };
  

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newPreviews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
      });
    });

    Promise.all(newPreviews).then((previewUrls) => {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
      setPreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onClose={() => onOpenChange(false)}>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" py={5}>
            <Typography variant="h5" fontWeight="bold">
              HECHO
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={() => onOpenChange(false)}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" align="center">
            SUBE TUS IMÁGENES
          </Typography>
          <IconButton onClick={() => onOpenChange(false)}>
            <X size={20} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          sx={{
            mt: 2,
            border: "2px dashed #ccc",
            borderRadius: 2,
            p: 4,
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            multiple
            style={{ display: "none" }}
          />
          <Typography variant="body2" color="textSecondary">
            Arrastra y suelta tus archivos aquí, o haz clic para seleccionar
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mt: 2,
          }}
        >
          {previews.map((preview, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: 100,
                height: 100,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid #ccc",
              }}
            >
              <img
                src={preview}
                alt={`Preview ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <IconButton
                onClick={() => handleRemove(index)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
                }}
              >
                <X size={16} />
              </IconButton>
            </Box>
          ))}
        </Box>
        <Button
          fullWidth
          sx={{
            mt: 2,
            bgcolor: "black",
            color: "white",
            "&:hover": { bgcolor: "#333" },
          }}
          onClick={handleUpload}
          disabled={!selectedFiles.length || isUploading}
        >
          {isUploading ? (
            <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />
          ) : (
            ""
          )}
          {isUploading ? "SUBIENDO..." : "SUBIR"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
