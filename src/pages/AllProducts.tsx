import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Product } from "../types";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
    const [results, setResults] = useState<Product[]>([]);

    const navigate = useNavigate();

    function fetchAllProducts() {
        axios.get("http://localhost:5000/all_products")
        .then((res: AxiosResponse<Product[]>) => {
            setResults(res.data);
        })
    }

    useEffect(() => {
        fetchAllProducts()
    }, [])
    
    return <div className="flex-grow px-16 py-8 relative" > 
        <h3 className="text-center text-2xl font-bold">All Reviewed Products</h3>

        <Card className="mx-auto mt-16 relative overflow-x-scroll">
            <table className="w-full">
                <thead>
                    <tr className="border-b-2 border-gray-800">
                        <th className="text-left py-2 px-4">Product Name</th>
                        <th className="text-center py-2 px-4">Positive %</th>
                        <th className="text-center py-2 px-4">Negative %</th>
                        <th className="text-center py-2 px-4">Positive #</th>
                        <th className="text-center py-2 px-4">Negative #</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((res) => <tr className="hover:bg-orange-400 cursor-pointer" key={Math.floor(Math.random() * 1024)} onClick={() => navigate(`/products/${res.product_name}`)}>
                        <td className="text-left py-2 px-4">{res.product_name}</td>
                        <td className="text-center py-2 px-4">{(res.positive_percentage * 100).toFixed(2)}</td>
                        <td className="text-center py-2 px-4">{(res.negative_percentage * 100).toFixed(2)}</td>
                        <td className="text-center py-2 px-4">{res.positive}</td>
                        <td className="text-center py-2 px-4">{res.negative}</td>
                    </tr>)}
                </tbody>
            </table>

        </Card>
        <div className="mt-4 ml-2">Viewing 1-{results.length} of All Reviewed Products</div>
    </div>
}

export default AllProducts;