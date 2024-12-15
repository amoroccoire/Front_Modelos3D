import { Button, TextField, Card, CardContent, Typography, Box } from "@mui/material";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
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
            REGISTRO
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              id="register-email"
              label="Correo"
              type="email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              id="username"
              label="Nombre de Usuario"
              type="text"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              id="register-password"
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              id="confirm-password"
              label="Confirmar Contraseña"
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
              REGISTRARSE
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="body2">
          ¿Ya tienes una cuenta?{" "}
          <Button
            onClick={onSwitchToLogin}
            color="secondary"
            size="small"
            sx={{ textTransform: "none", fontWeight: "bold", color: "#ff6b00" }}
          >
            INICIA SESIÓN
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}
