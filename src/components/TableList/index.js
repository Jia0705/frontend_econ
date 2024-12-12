import React from "react";
import  Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent  from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function TableList({ list }) {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Products
      </Typography>
      <Grid container spacing={3}>
        {list.length > 0 ? (
          list.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card variant="outlined" sx={{ borderRadius: "8px", boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography color="green" fontWeight="bold">
                    ${item.price}
                  </Typography>
                  <Typography
                    sx={{
                      display: "inline-block",
                      padding: "2px 8px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "12px",
                      fontSize: "0.9rem",
                      marginTop: "5px",
                      textTransform: "capitalize",
                    }}
                    color="textSecondary"
                  >
                    {item.category}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", padding: "16px" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#1976d2",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#115293" },
                    }}
                  >
                    Add to Cart
                  </Button>
                  <div>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{ textTransform: "none", marginRight: "8px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{ textTransform: "none" }}
                    >
                      Delete
                    </Button>
                  </div>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="textSecondary">
            No products found.
          </Typography>
        )}
      </Grid>
    </div>
  );
}

export default TableList;
