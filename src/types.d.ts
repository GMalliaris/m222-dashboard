export type TooltipProperties = {
    animationDuration?: number;
};

export type LegendProperties = {
    verticalAlign: "top" | "bottom" | "middle";
    height?: number;
}

export type TopNProduct = {
    product_name: string;
    positive_percentage: number
    negative_percentage: number
    positive: number;
    negative: number;
}