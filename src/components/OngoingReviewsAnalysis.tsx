import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import Card from "./Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

type ResultForTimestamp = {
    time: number;
    positive: number;
    negative: number;
    neutral: number;
}

const INITIAL_ZERO_RESULT = {
    time: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
};

const MD_BREAKPOINT = 768;
const LG_BREAKPOINT = 1024;
const XL_BREAKPOINT = 1280;


type OngoingReviewsAnalysisProps = {
    productName: string;
};

const INTERVAL = 3;
const MAX_SAME_RESULTS = 4;

const OngoingReviewsAnalysis = (props: OngoingReviewsAnalysisProps) => {
    const [searchParams,setSearchParams] = useSearchParams();
    const [data, setData] = useState<ResultForTimestamp[]>([]);
    const [x, setX] = useState(0);
    
    function handlePieSizes() {
        const screenWidth = window.innerWidth;
        if (screenWidth < MD_BREAKPOINT) {
            if (x !== 260) {
                setX(260);
            }
        } else if (screenWidth < LG_BREAKPOINT) {
            if (x != 560) {
                setX(560)
            }
        } else if (screenWidth < XL_BREAKPOINT) {
            if (x != 810) {
                setX(810)
            }
        } else {
            if (x != 710) {
                setX(710)
            }
        }
    }

    function fetchResultsUntilThreeSameInARow() {
        let time = 0;
        let lastTotal = 0;
        let lastTotalNotChanged = 1;
        const intervalId = setInterval(async () => {
            time += INTERVAL;
            try {
                const res = await axios.post("http://localhost:5000/product_with_all_reviews", { product_name: props.productName });
                const { negative, positive, neutral } = res.data;
                        
                const newTotal = negative + positive + neutral;
                if (lastTotal === newTotal) {
                    lastTotalNotChanged++;
                } else {
                    lastTotalNotChanged = 1;
                    lastTotal = newTotal;
                }

                if (lastTotalNotChanged >= MAX_SAME_RESULTS) {
                    clearInterval(intervalId);
                    setSearchParams({ new: "done" })
                } else {
                    setData((prevData) => [...prevData, { negative, positive, neutral, time }]);
                }
            } catch(e: any) {
                setData((prevData) => {
                    const lastResult = prevData[prevData.length - 1];
                    return [...prevData, { negative: lastResult.negative, positive: lastResult.positive, neutral: lastResult.neutral, time }]
                });
            }

        }, INTERVAL * 1000);
    }
    

    function formattedLegendTooltipName(name: string) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    useEffect(() => {
        handlePieSizes();
        window.addEventListener("resize", handlePieSizes);

        setData(() => [INITIAL_ZERO_RESULT])
        setTimeout(() => fetchResultsUntilThreeSameInARow(), INTERVAL * 1000);
        return () => window.removeEventListener("resize", handlePieSizes);
    }, []);

    return <Card className="mt-16 p-8">
        <>
            <h4 className="text-left text-2xl font-semibold">{searchParams.get("new") === "start" ? "Ongoing" : "Completed"} Reviews Analysis</h4>
            <div className="flex items-center justify-center mt-4 md:mt-0">
                <LineChart width={x} height={500} data={data}>
                    <Tooltip animationDuration={300} cursor={{ color: 'red' }} formatter={(value, name) => [value, formattedLegendTooltipName(name as string)]}/>
                    <Legend verticalAlign="top" height={36} formatter={(name) => formattedLegendTooltipName(name)}/>
                    <XAxis dataKey="time" hide />
                    <YAxis />
                    <Line animationBegin={100} animationDuration={400} type="monotone" dataKey="neutral" stroke="gray" strokeWidth={2}/>
                    <Line animationBegin={100} animationDuration={400} type="monotone" dataKey="negative" stroke="red" strokeWidth={2}/>
                    <Line animationBegin={100} animationDuration={400} type="monotone" dataKey="positive" stroke="green" strokeWidth={2}/>
                </LineChart>
            </div>
        </>
    </Card>
}

export default OngoingReviewsAnalysis;