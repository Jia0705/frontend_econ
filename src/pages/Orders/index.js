import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { getOrders, updateOrder, deleteOrder } from "../../utils/api_orders";
import { toast } from "sonner";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const oOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };

    oOrders();
  }, []);

  const handleDelete = async (_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this order?");
    if (confirmed) {
      const deleted = await deleteOrder(_id);
      if (deleted) {
        const latestOrders = await getOrders();
        setOrders(latestOrders);
        toast.success("Order deleted successfully");
      } else {
        toast.error("Failed to delete order");
      }
    }
  };

  const handleStatus = async (_id, newStatus) => {
    const updatedOrder = await updateOrder(_id, { status: newStatus });
    if (updatedOrder) {
      const latestOrders = await getOrders();
      setOrders(latestOrders);
      toast.success("Order status updated successfully");
    } else {
      toast.error("Failed to update order status");
    }
  };

  return (
    <Container>
      <h2>Orders</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Customer Info</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    <strong>{order.customerName}</strong>
                    <br />
                    <small>{order.customerEmail}</small>
                  </TableCell>
                  <TableCell>
                    {order.products.map((product) => product.name).join(", ")}
                  </TableCell>
                  <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <Select
                        value={order.status}
                        onChange={(event) =>
                          handleStatus(order._id, event.target.value)
                        }
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="paid">Paid</MenuItem>
                        <MenuItem value="failed">Failed</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    {order.paid_at ? (order.paid_at) : "Not Paid"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      disabled={order.status !== "pending"}
                      onClick={() => handleDelete(order._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No orders found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Orders;
