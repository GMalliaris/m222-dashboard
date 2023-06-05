import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FinalReviewsAnalysis from "../components/FinalReviewsAnalysis";

const SingleProduct = () => {
    const [isNew, setIsNew] = useState(false);
    
    const [searchParams] = useSearchParams();
    const { productName } = useParams() as { productName: string};

    useEffect(() => {
        setIsNew(searchParams.get("new") !== null && searchParams.get("new") !== undefined);
    }, [])

    return <div className="flex-grow px-16 py-8 relative" > 
        <h3 className="text-center text-2xl font-bold">{productName}</h3>

        {!isNew && <FinalReviewsAnalysis productName={productName} />}  
    </div>
}

export default SingleProduct;