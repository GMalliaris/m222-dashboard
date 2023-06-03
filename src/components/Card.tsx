import { ReactElement } from "react"

type CardProps = {
    children: ReactElement;
    className?: string;
    onClick?: () => void
}

const Card = ({ children, className, onClick = () => {} }: CardProps) => {
    const standardClasses = "border-gray-800 border-2 rounded-lg"
    return (
        <div className={`${standardClasses} ${className ?? ""}`} onClick={onClick}>
            { children }
        </div>
    );
}

export default Card;


// type BlahProps<T> {
//     data: T[];
//     dataKey: keyof T;
//     nameKey: keyof T;
// }
// const GeneriicBlah<T> = (props)