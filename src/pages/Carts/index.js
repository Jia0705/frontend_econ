import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function Cart() {
  const [cartItems, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const newCart = JSON.parse(storedCart);
    setCart(newCart);

    let total = 0;
    newCart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    let total = 0;
    updatedCart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
    toast.success("Item removed from cart.");
  };

  return (
    <Container>
      <Header />
      <Typography variant="h4" align="center" gutterBottom>
        Cart
      </Typography>

      {cartItems.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Product
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Price
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Quantity
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Total
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell align="left">{item.name}</TableCell>
                    <TableCell align="center">${item.price}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", verticalAlign: "middle" }}
                    >
                      ${item.price * item.quantity}
                    </TableCell>
                    <TableCell align="center" sx={{ verticalAlign: "middle" }}>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemove(item._id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} />
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    ${totalPrice}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="success"
                      size="large"
                      component={Link}
                      to="/"
                      sx={{ textTransform: "none" }}
                    >
                      Checkout
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography variant="body1" align="center" mt={4}>
          No Product Added Yet!
        </Typography>
      )}
    </Container>
  );
}

export default Cart;
