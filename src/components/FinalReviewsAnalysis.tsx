import { ReactText, useEffect, useState } from "react";
import Card from "./Card";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import axios, { AxiosResponse } from "axios";
import { Product } from "../types";

const LG_BREAKPOINT = 1024;

type FinalReviewsAnalysisProps = {
    productName: string;
}

type SentimentAnalysisResult = {
    sentiment: string;
    fill: string;
    count: number;
}

const FinalReviewsAnalysis = (props: FinalReviewsAnalysisProps) => {
    const [dimension, setDimension] = useState(0);
    const [radius, setRadius] = useState(0);

    const [data, setData] = useState<SentimentAnalysisResult[]>([]);
    const [total, setTotal] = useState(0);



    function handlePieSizes() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= LG_BREAKPOINT) {
            if (dimension !== 710) {
                setDimension(710);
                setRadius(200);
            }
        }
        else {
            if (dimension !== 500) {
                setDimension(500);
                setRadius(160);
            }
        }
    }
    
    function formattedLegendTooltipName(name: string) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    function formattedTooltipValue(value: number) {
        const percentage = (value/total * 100).toFixed(2);
        return `${value} out of ${total} (${percentage}%)`
    }
 
    function mapResultToCell(result: SentimentAnalysisResult) {
        return <Cell key={result.sentiment}/>;
    }

    function fetchResults() {
        axios.post("http://localhost:5000/product_with_all_reviews", { product_name: props.productName })
        .then((res: AxiosResponse<Product>) => {
            const product = res.data;
            const usableData = [
                {
                    sentiment: "positive",
                    fill: "rgb(21 128 61 / var(--tw-bg-opacity))",
                    count: product.positive,
                },
                {
                    sentiment: "negative",
                    fill: "rgb(185 28 28 / var(--tw-bg-opacity))",
                    count: product.negative,
                },
                {
                    sentiment: "neutral",
                    fill: "gray",
                    count: product.neutral,
                }
            ];
            setData(usableData);
            setTotal(product.negative + product.positive + product.neutral);
        })
    }

    useEffect(() => {
        handlePieSizes();
        fetchResults();
        window.addEventListener("resize", handlePieSizes);

        return () => window.removeEventListener("resize", handlePieSizes);
    }, []);


    return <Card className="mt-16 p-8">
            <>
                <h4 className="text-left text-2xl font-semibold">Reviews Analysis</h4>
                <div className="flex items-center justify-center mt-4 md:mt-0">
                    <PieChart width={dimension} height={dimension}>
                        <Legend verticalAlign="top" height={36} 
                            formatter={(name, entry) => `${formattedLegendTooltipName(name)}: ${(entry.payload as { strokeDasharray: ReactText } & SentimentAnalysisResult).count}`}/>
                        <Tooltip animationDuration={300} cursor={{ color: 'red' }} 
                            formatter={(value, name) => [formattedTooltipValue(value as number), `${formattedLegendTooltipName(name as string)}`]} />
                        <Pie data={data} dataKey="count" nameKey="sentiment" cx="50%" cy="50%" outerRadius={radius} fill="#8884d8" style={{cursor: "pointer"}}
                            animationBegin={100} animationDuration={400}>
                            { data.map(result => mapResultToCell(result)) }
                        </Pie>
                    </PieChart>
                </div>
            </>
        </Card>
}

export default FinalReviewsAnalysis;