import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import Card from "./Card";
import { useEffect, useState } from "react";

const MD_BREAKPOINT = 768;
const LG_BREAKPOINT = 1024;
const XL_BREAKPOINT = 1280;

const OngoingReviewsAnalysis = () => {
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

    const data = [
        {
            time: 0,
            positive: 0,
            negative: 0,
            neutral: 0,
        },
        {
            time: 3,
            positive: 13,
            negative: 6,
            neutral: 1,
        },
        {
            time: 6,
            positive: 13,
            negative: 6,
            neutral: 1,
        },
        {
            time: 9,
            positive: 33,
            negative: 6,
            neutral: 1,
        }
    ]

    function formattedLegendTooltipName(name: string) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    useEffect(() => {
        handlePieSizes();
        window.addEventListener("resize", handlePieSizes);

        return () => window.removeEventListener("resize", handlePieSizes);
    }, []);


    return <Card className="mt-16 p-8">
        <>
            <h4 className="text-left text-2xl font-semibold">Ongoing Reviews Analysis</h4>
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