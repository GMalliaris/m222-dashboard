import { useState } from "react"
import logo from "../assets/Amazon-Logo.png"
import { HiChevronUp, HiChevronDown } from "react-icons/hi";
import { NavLink } from "react-router-dom";

type ApplicationLogoProps = {
    isToggleOn: boolean,
    setToggle: () => void
}

const ApplicationLogo = ({ isToggleOn, setToggle }: ApplicationLogoProps) => {
    return (
        <div className={`flex xl:block ${isToggleOn ? "mb-10" : ""} xl:mb-20`}>
            <h1 className="text-4xl font-bold align-middle cursor-pointer">
                <NavLink to="/">
                    <p>
                        Amazon
                        <img className="inline-block ml-4" src={logo} height={32} width={128} alt="amazon logo" />
                    </p>
                    <p>Reviews Analysis</p>
                </NavLink>
            </h1>
            <div className="flex xl:hidden flex-grow justify-end items-center text-4xl" onClick={setToggle}>
                { isToggleOn ?  <HiChevronUp className="cursor-pointer" /> : <HiChevronDown className="cursor-pointer" />}
            </div>
        </div>
    );
}

type NavigationBarLinkProps = {
    location: string;
    label: string;
};

const NavigationBarLink = (props: NavigationBarLinkProps) => {
    return (
        <NavLink to={props.location} className={({isActive}) => {
            const standardClasses = "block pl-2 transition-colors hover:bg-orange-400 hover:rounded-md border-black hover:border-r-[6px]";
            const activeClass = isActive ? " border-r-[6px] bg-orange-400 rounded-md" : "";
            return standardClasses + activeClass;
            }}>
            { props.label }
        </NavLink>
    );
}

const NavigationBar = () => {

    const [optionsVisible, setOptionsVisible] = useState(false);
    const [highscoresVisible, setHighscoresVisible] = useState(false);

    return <div className="bg-orange-300 py-8 px-10 max-h-[100vh] xl:max-h-[100%] min-w-fit">
        <ApplicationLogo isToggleOn={optionsVisible} setToggle={() => setOptionsVisible((prevState) => !prevState)}/>

        <div>
            <h3 className="hidden text-3xl font-semibold cursor-pointer justify-between items-center xl:flex" onClick={() => setOptionsVisible((prevState) => !prevState)}>
                Options
                { optionsVisible ? <HiChevronUp /> : <HiChevronDown />}
            </h3>
            {optionsVisible && <ul className="text-2xl font-medium my-4 ml-4">
                <li className="mb-1">
                    <NavigationBarLink label="Dashboard" location="/"/>
                </li>
                <li className="mb-1">
                    <NavigationBarLink label="Products History" location="/products/all"/>
                </li>
                <li className="pl-2 mb-1 flex justify-between items-center cursor-pointer" onClick={() => setHighscoresVisible((prevState) => !prevState)} >
                    Highscores
                    { highscoresVisible ? <HiChevronUp /> : <HiChevronDown />}
                </li>
                { highscoresVisible && <ul className="text-lg my-2 ml-3">
                    <li className="mb-1">
                        <NavigationBarLink label="With Best Reviews" location="/best"/>
                    </li>
                    <li>
                        <NavigationBarLink label="With Worst Reviews" location="/worst"/>
                    </li>
                </ul> }
            </ul>}
        </div>
    </div>
}

export default NavigationBar