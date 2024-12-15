import { Button, TextField, Card, CardContent, Typography, Box } from "@mui/material";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onLoginSuccess: () => void;
}

export default function LoginForm({ onSwitchToRegister, onLoginSuccess }: LoginFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{ width: "100%", maxWidth: 400, borderRadius: 2, boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" align="center" fontWeight="medium" gutterBottom>
            INICIAR SESIÓN
          </Typography>
          <Box component="form" onSubmit={handleSubmit} autoComplete="off" sx={{ mt: 2 }}>
            <TextField
              id="login-email"
              label="Correo"
              type="email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              id="login-password"
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, py: 1.5, backgroundColor: 'black' }}
            >
              INICIA SESIÓN
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="body2">
          ¿No tienes una cuenta?{" "}
          <Button
            onClick={onSwitchToRegister}
            color="secondary"
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: "#ff6b00",
              "&:hover": {
                color: "#ff6b00cc",
              },
            }}
          >
            CREAR CUENTA
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}
