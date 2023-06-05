import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OngoingReviewsAnalysis from "../components/OngoingReviewsAnalysis";
import FinalReviewsAnalysis from "../components/FinalReviewsAnalysis";

const SingleProduct = () => {
    const [isNew, setIsNew] = useState(false);
    const [isNewDone, setIsNewDone] = useState(false);
    
    const [searchParams] = useSearchParams();
    const { productName } = useParams() as { productName: string};

    useEffect(() => {
        const newParam = searchParams.get("new");
        if (!newParam) {
            setIsNew(false)
            return;
        }

        setIsNew(true);
        setIsNewDone(newParam === "done");
    }, [searchParams])

    return <div className="flex-grow px-16 py-8 relative" > 
        <h3 className="text-center text-2xl font-bold">{productName}</h3>

        {(!isNew || isNewDone) && <FinalReviewsAnalysis productName={productName} />}  

        {(isNew && !isNewDone) && <OngoingReviewsAnalysis productName={productName} />}
    </div>
}

export default SingleProduct;