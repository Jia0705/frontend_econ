import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import Header from "../../components/Header";
import TableList from "../../components/TableList"; 
import { getProducts, getCategories } from "../../utils/api";

export default function ProductPage() {
  const [category, setCategory] = useState(""); 
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    getProducts(category).then((data) => {
      setProducts(data);
    });
  }, [category]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "15px 0",
          }}
        >
          <FormControl variant="filled" style={{ minWidth: 220 }}>
            <InputLabel id="category-select-label">Filter By Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {categories.length > 0 ? (
                categories.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No categories available</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>

        {products.length > 0 ? (
          <TableList products={products} />
        ) : (
          <p>No products available for this category.</p>
        )}
      </Container>
    </div>
  );
}
