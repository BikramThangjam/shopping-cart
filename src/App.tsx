import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { useEffect, useState } from "react";
import { Product } from "./model/model";

function App() {
  const [products, setProducts] = useState<Product[]>([])

  async function fetchProducts(url:string){
    const res = await fetch(url);
    const data = await res.json()
    const fetchedProducts: Product[] = data.products.map((p:Product) => {
      return {
        id: p.id || '',
        title: p.title || '',
        description: p.description || '',
        price: p.price || 0,
        brand: p.brand || '',
        category: p.category || '',
        images: p.images || '',
      }
    } )
    setProducts(fetchedProducts)
    if (products){
      console.log(products)
    }
  }

  useEffect(()=>{
    fetchProducts("https://dummyjson.com/products")
  },[])

  return (
    <ShoppingCartProvider products={products}>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store products={products} />} />
          <Route path="/about" element={< About/>} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App
