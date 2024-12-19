import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Box
      sx={{
        padding: "20px 0",
        marginBottom: "30px",
        borderBottom: "1px solid #000",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "36px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Welcome To My Store
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginRight: "10px",
            textTransform: "none",
          }}
          component={Link}
          to="/"
        >
          Home
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            textTransform: "none",
          }}
          component={Link}
          to="/carts"
        >
          Cart
        </Button>
      </Box>
    </Box>
  );
}

export default Header;
