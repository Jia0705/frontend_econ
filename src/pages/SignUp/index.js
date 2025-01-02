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
import { signup } from "../../utils/api_auth";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submit, setSubmit] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      toast.error("Please fill in all fields");
      return; 
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setSubmit(true); 

    try {
      const user = await signup(name, email, password);
      console.log(user);
      toast.success("Signup Successful");
      navigate("/login"); 
    } catch (error) {
        toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <Container>
      <Header title="Create a New Account" />
      <Box maxWidth={400} mx="auto" mt={8} px={3}>
        <Card elevation={3}>
          <CardContent>
            <TextField
              label="Name"
              fullWidth
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              margin="normal"
            />
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
            <TextField
              label="Confirm Password"
              fullWidth
              required
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default SignUp;
