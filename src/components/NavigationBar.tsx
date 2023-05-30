import { useState } from "react"
import logo from "../assets/Amazon-Logo.png"
import { HiChevronUp, HiChevronDown } from "react-icons/hi";
import { Link } from "react-router-dom";

type ApplicationLogoProps = {
    isToggleOn: boolean,
    setToggle: () => void
}

const ApplicationLogo = ({ isToggleOn, setToggle }: ApplicationLogoProps) => {
    return (
        <div className={`flex sm:block ${isToggleOn ? "mb-10" : ""} sm:mb-20`}>
            <h1 className="text-4xl font-bold align-middle">
                <p>
                    Amazon
                    <img className="inline-block ml-4" src={logo} height={32} width={128} alt="amazon logo" />
                </p>
                <p>Reviews Analysis</p>
            </h1>
            <div className="flex sm:hidden flex-grow justify-end items-center text-4xl" onClick={setToggle}>
                { isToggleOn ?  <HiChevronUp className="cursor-pointer" /> : <HiChevronDown className="cursor-pointer" />}
            </div>
        </div>
    );
}

const NavigationBar = () => {

    const [optionsVisible, setOptionsVisible] = useState(false);
    const [highscoresVisible, setHighscoresVisible] = useState(false);


    return <div className="bg-orange-300 py-8 px-12">
        <ApplicationLogo isToggleOn={optionsVisible} setToggle={() => setOptionsVisible((prevState) => !prevState)}/>

        <div>
            <h3 className="hidden text-3xl font-semibold cursor-pointer justify-between items-center sm:flex" onClick={() => setOptionsVisible((prevState) => !prevState)}>
                Options
                { optionsVisible ? <HiChevronUp /> : <HiChevronDown />}
            </h3>
            {optionsVisible && <ul className="text-2xl font-medium my-4 ml-4">
                <li className="mb-1">
                    <Link className="block pl-2 transition-colors hover:bg-orange-400 hover:rounded-md" to="/">Dashboard</Link>
                </li>
                <li className="mb-1">
                    <Link className="block pl-2 transition-colors hover:bg-orange-400 hover:rounded-md" to="/products">Products History</Link>
                </li>
                <li className="pl-2 mb-1 flex justify-between items-center cursor-pointer" onClick={() => setHighscoresVisible((prevState) => !prevState)} >
                    Highscores
                    { highscoresVisible ? <HiChevronUp /> : <HiChevronDown />}
                </li>
                { highscoresVisible && <ul className="text-lg my-2 ml-3">
                    <li>
                        <Link className="block pl-2 transition-colors hover:bg-orange-400 hover:rounded-md" to="/best"> Best Reviews</Link>
                    </li>
                    <li>
                        <Link className="block pl-2 transition-colors hover:bg-orange-400 hover:rounded-md" to="/worst"> Worst Reviews</Link>
                    </li>
                </ul> }
            </ul>}
        </div>
    </div>
}

export default NavigationBar