// import storeItems from "../data/items.json";
import { Row, Col } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { Product } from "../model/model";

type ProductProps = {
  products: Product[]
}

export function Store({products}:ProductProps) {
  return (
    <>
      <h1>Products</h1>
      <Row md={2} xs={1} lg={4} className="g-3">
        {
          products.map(p => (
            <Col key={p.id}><StoreItem  {...p}/></Col>
          ))
        }
      </Row>
    </>
  )
}

