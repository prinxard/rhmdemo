
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";
import Section from "../../components/dashboard/section";

const data = [
  {
    name: "Lokoja",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Okene",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Isanlu",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Kabba",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Idah",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Koto",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Ankpa",
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: "Ajaokuta",
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: "Ayingba",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export const AssesmentCount = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
      <div className="w-full lg:w-2/3">
        <Section
          // title="Conversions"
          description={<span>Assessment count</span>}
          >
          <div className="flex flex-row w-full">
            {/* <Bar1 /> */}
            <BarChart
              width={600}
              height={300}
              data={data}
              stackOffset="sign"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke="#000" />
              <Bar dataKey="pv" fill="#8884d8" stackId="stack" />
              <Bar dataKey="uv" fill="#82ca9d" stackId="stack" />
            </BarChart>
          </div>
        </Section>
      </div>


    </div>
  );
}
