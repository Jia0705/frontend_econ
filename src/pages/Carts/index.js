import React, { useState, useEffect } from "react";
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
  const [totalPrice, setTotal] = useState(0);

  useEffect(() => {
    const carts = localStorage.getItem("cart");
    if (carts) {
      // Turn it into an array
      const items = JSON.parse(carts);
      setCart(items);
      let total = 0;
      for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
      }
      setTotal(total);
    }
  }, []);

  const handleDelete = (id) => {
    const newCart = cartItems.filter((item) => item._id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));

    let total = 0;
    for (let i = 0; i < newCart.length; i++) {
      total += newCart[i].price * newCart[i].quantity;
    }
    setTotal(total);
    toast.success("Item removed!");
  };

  return (
    <Container>
      <Header />
      <Typography variant="h4" align="center" gutterBottom>
        Cart
      </Typography>

      {cartItems.length > 0 ? (
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Product</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell align="left">{item.name}</TableCell>
                  <TableCell align="center">${item.price}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">
                    ${item.price * item.quantity}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(item._id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <TableCell align="center">
                  <b>${totalPrice}</b>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="success"
                    component={Link}
                    to="/"
                  >
                    Checkout
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" align="center" mt={4}>
          No Product Add Yet!
        </Typography>
      )}
    </Container>
  );
}

export default Cart;
