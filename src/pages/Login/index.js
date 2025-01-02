import { useState } from "react";
import {
  Container,
  TextField,
  Box,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import Header from "../../components/Header";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/api_auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (email === "" || password === "") {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmit(true);

    try {
      const user = await login(email, password);

      if (user) {
        console.log(user);
        toast.success("Login Successful");
        navigate("/"); 
      }
    } catch (error) {
        toast.error("Login failed.");
    }
  };

  return (
    <Container>
      <Header title="Login to Your Account" />
      <Box maxWidth={400} mx="auto" mt={8}>
        <Card elevation={3}>
          <CardContent>
            <TextField
              label="Email"
              fullWidth
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              margin="normal"
            />
            <TextField
              label="Password"
              fullWidth
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Login;
