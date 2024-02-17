// import storeItems from "../data/items.json";
import { Row, Col } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { Product } from "../model/model";

import "../style.css"
import { useTheme } from "../context/ThemeContext";
type ProductProps = {
  products: Product[]
}

export function Store({products}:ProductProps) {
 const darkTheme = useTheme()

  return (
    <div className={`px-4 `}>
      <h1 className={`${darkTheme && "text-light"}`}>Products</h1>
      <Row md={2} xs={1} lg={4} className="g-3">
        {
          products.map(p => (
            <Col key={p.id}><StoreItem  {...p}/></Col>
          ))
        }
      </Row>
    </div>
  )
}

