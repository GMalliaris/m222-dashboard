import { ReactElement } from "react"

type CardProps = {
    children: ReactElement;
    className?: string;
    onClick?: () => void
}

const Card = ({ children, className, onClick = () => {} }: CardProps) => {
    return (
        <div className={className} onClick={onClick}>
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