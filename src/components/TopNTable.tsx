import { ChangeEvent, useEffect, useState } from "react";
import { Product } from "../types";
import axios, { AxiosResponse } from "axios";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

type TopNTableProps = {
    type: "Best" | "Worst";
}

const TopNTable = (props: TopNTableProps) => {
    const [results, setResults] = useState<Product[]>([]);
    const [topN, setTopN] = useState(10);


    const navigate = useNavigate();

    function onChangeHandler(ev: ChangeEvent) {
        setTopN(+(ev?.target as HTMLSelectElement).value);
    }

    function fetchTopN() {
        const url = props.type === "Best" ? "http://localhost:5000/top_N_positive" : "http://localhost:5000/top_N_negative"
        axios.get(`${url}/${topN}`)
        .then((res: AxiosResponse<Product[]>) => {
            // setResults([...res.data, ...res.data, ...res.data, ...res.data, ...res.data]);
            setResults(res.data);
        })
    }

    useEffect(() => {
        fetchTopN();
    }, [topN])

    return <div className="max-h-full lg:flex-grow px-16 py-8">
        <div className="lg:grid lg:grid-cols-3">
            <h3 className="text-center text-2xl font-bold lg:col-start-2">{props.type} Reviewed Products</h3>
            <div className="text-center mt-2 lg:mt-0">
                <select className="bg-orange-200 py-2 px-3 rounded-lg"
                    value={topN} onChange={onChangeHandler}>
                    <option value="" disabled >Please select number of top products</option>
                    <option value={5} >Top 5 products</option>
                    <option value={10} >Top 10 products</option>
                    <option value={20} >Top 20 products</option>
                    <option value={50} >Top 50 products</option>
                </select>
            </div>
        </div>
        <Card className="mx-auto mt-16 relative overflow-x-scroll">
            <table className="w-full">
                <thead>
                    <tr className="border-b-2 border-gray-800">
                        <th className="text-center py-2 px-4">Rank #</th>
                        <th className="text-left py-2 px-4">Product Name</th>
                        { props.type === "Best" 
                            ? <>
                                <th className="text-center py-2 px-4">Positive %</th>
                                <th className="text-center py-2 px-4">Negative %</th>
                                <th className="text-center py-2 px-4">Positive #</th>
                                <th className="text-center py-2 px-4">Negative #</th>
                            </>
                            : <>
                                <th className="text-center py-2 px-4">Negative %</th>
                                <th className="text-center py-2 px-4">Positive %</th>
                                <th className="text-center py-2 px-4">Negative #</th>
                                <th className="text-center py-2 px-4">Positive #</th>
                            </>
                        }
                    </tr>
                </thead>
                <tbody>
                    {results.map((res, index) => <tr className="hover:bg-orange-400 cursor-pointer" key={Math.floor(Math.random() * 1024)} onClick={() => navigate(`/products/${res.product_name}`)}>
                        <td className="text-center py-2 px-4">{index + 1}</td>
                        <td className="text-left py-2 px-4">{res.product_name}</td>
                        { props.type === "Best"
                            ? <>
                                <td className="text-center py-2 px-4">{(res.positive_percentage * 100).toFixed(2)}</td>
                                <td className="text-center py-2 px-4">{(res.negative_percentage * 100).toFixed(2)}</td>
                                <td className="text-center py-2 px-4">{res.positive}</td>
                                <td className="text-center py-2 px-4">{res.negative}</td>
                            </>
                            : <>
                            <td className="text-center py-2 px-4">{(res.negative_percentage * 100).toFixed(2)}</td>
                            <td className="text-center py-2 px-4">{(res.positive_percentage * 100).toFixed(2)}</td>
                            <td className="text-center py-2 px-4">{res.negative}</td>
                            <td className="text-center py-2 px-4">{res.positive}</td>
                        </>
                        }
                    </tr>)}
                </tbody>
            </table>

        </Card>
        <div className="mt-4 ml-2">Viewing 1-{results.length} of {props.type} Products</div>
    </div>
}

export default TopNTable;