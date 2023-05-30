import { useParams } from "react-router-dom";

const SingleProduct = () => {
    const { productName } = useParams();
    return <div>This is single product: {productName}</div>
}

export default SingleProduct;