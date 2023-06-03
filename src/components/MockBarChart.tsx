import { Bar, BarChart as LibBarChart} from "recharts"

const data = [
    {
      value: 4000,
    },
    {
      value: 3000,
    },
    {
      value: 2000,
    },
    {
      value: 2780,
    },
    {
      value: 1890,
    },
    {
      value: 2390,
    },
    {
      value: 3490,
    },
  ];

const MockBarChart = ({ height = 40, width = 150, fill="red" }: { height?: number, width?: number, fill?: string}) => {
    return (
        <LibBarChart width={width} height={height} data={data} style={{ cursor: "pointer" }}>
            <Bar dataKey="value" fill={fill} />
        </LibBarChart>
    );
}

export default MockBarChart;