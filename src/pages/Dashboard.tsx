import MockBarChart from "../components/MockBarChart";
import Card from "../components/Card";
import { ReactElement, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

type DashboardTileProps = {
    title: string;
    titleClassName?: string;
    children: ReactElement;
    className?: string
    onClick?: () => void
}

const DashboardTile = ({ title, titleClassName, children, className, 
    onClick = () => {} }: DashboardTileProps) => {
    const standardClasses = "border-gray-800 border-2 flex flex-col p-4 mb-8 xl:mb-0";
    const standardTitleClasses = "pb-4 font-semibold text-xl";
    return (
        <Card className={`${standardClasses} ${className ?? ""}`} onClick={onClick}>
            <>
                <h3 className={`${standardTitleClasses} ${titleClassName ?? ""}`}>{ title} </h3>
                {/* <div className="flex justify-end items-end h-full">
                    { children }
                </div> */}
                { children }
            </>
        </Card>
    )
}

const Dashboard = () => {
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement | null>(null);

    function focusOnInput() {
        if (!inputRef?.current) {
            return;
        }
        inputRef?.current.focus();
    }

    return <div className="flex-grow px-16 py-8" >

        <div className="w-full mb-10 flex items-center justify-center">
            <div className="w-full text-center" >
                <input ref={inputRef} type="text" className="border-2 border-gray-600 bg-orange-200 h-[40px] w-4/5 rounded-lg px-2
                    sm:w-2/5 sm:rounded-r-none placeholder-gray-800" placeholder="Enter Amazon Product URL"/>
                <button className=" bg-orange-300 border-2 border-gray-600 text-gray-800 h-[40px] rounded-lg w-4/5 block mx-auto mt-2
                    sm:rounded-l-none sm:border-l-0 sm:inline-block sm:px-2 sm:w-auto
                    hover:bg-orange-400 transition-colors" >
                    Request Analysis
                </button>
            </div>
        </div>

        <div className="w-full lg:h-screen dashboardGrid:grid dashboardGrid:grid-cols-2 dashboardGrid:gap-10">
            <DashboardTile title="Discover Amazon Products" titleClassName="text-left xl:text-center" className="col-span-2">
                <>
                    <p className="text-lg font-medium mb-4">
                        Are you considering buying an amazon product but you feel overwhelmed by the amount of reviews you have to evaluate
                        before proceeding? We have the solution for you!
                    </p>
                    <p className="text-lg font-medium mb-1">
                        With <strong>Amazon Reviews Analysis Application</strong> you can request the sentiment analysis of the reviews of the product of your liking
                        and save the analysis for future reference!
                    </p>
                    <p className="text-lg font-medium">
                        Not sure if you already requested a sentiment analysis for a product? Don't worry about it, you can always browse the products you already 
                        requested an analysis for and view their report!
                    </p>
                    <div className="h-full flex items-end justify-end gap-2 pt-6 xl:pt-0">
                        <Link className="px-2 py-1 bg-orange-200 rounded-md border-2 border-gray-600 text-gray-800
                            hover:bg-orange-300 transition-colors" to="/products">
                                View Products' Analysis Report
                        </Link>
                        <button className="px-2 py-1 bg-orange-300 rounded-md border-2 border-gray-600 text-gray-800
                            hover:bg-orange-400 transition-colors" onClick={focusOnInput}>
                            Request Analysis Now
                        </button>
                    </div>
                </>
            </DashboardTile>

            <DashboardTile title="View Top-N Best Products" className="cursor-pointer"  onClick={() => navigate("/best")}>
                <div className="flex justify-end items-end h-full">
                    <MockBarChart height={260} width={336} fill="rgb(34 197 94 / var(--tw-bg-opacity))" />
                </div>
            </DashboardTile>
            <DashboardTile title="View Top-N Worst Products" className="cursor-pointer" onClick={() => navigate("/worst")}>
                <div className="flex justify-end items-end h-full">
                    <MockBarChart height={260} width={336} fill="rgb(239 68 68 / var(--tw-bg-opacity))" />
                </div>
            </DashboardTile>
        </div>
    </div>;
}

export default Dashboard;