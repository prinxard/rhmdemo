import { getColor } from '../../functions/colors'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart
} from 'recharts'
import { random } from '../../functions/numbers'
import Widget from '../widget'
import Pie from '../charts/pie'




const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    let { name, submitted, approved } = { ...payload[0].payload }
    return (
      <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white shadow-lg rounded-lg p-2 text-xs">
        <div className="font-bold">{name}</div>
        <div>
          <span className="font-bold">Submitted:</span>{' '}
          <span className="font-normal">{submitted}</span>
        </div>
        <div>
          <span className="font-bold">Approved:</span>{' '}
          <span className="font-normal">{approved}</span>
        </div>
      </div>
    )
  }
  return null
}

export const RechartsBar1 = () => {
  let colors = [
    { dataKey: 'approved', fill: getColor('bg-green-500') },
    { dataKey: 'submitted', fill: getColor('bg-blue-500') }
  ]
  const labels = [
    'Lokoja',
    'Okene',
    'Isanlu',
    'Kabba',
    'Idah',
    'Koto',
    'Ankpa',
    'Ajaokuta',
    'Ayingba',
    // 'Oct',
    // 'Nov',
    // 'Dec'
  ]
  const data = Array.from(Array(9).keys()).map(i => {
    return {
      name: labels[i],
      submitted: random(100, 200),
      approved: random(150, 250)
    }
  })

  return (
    <>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} width={30} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Legend verticalAlign="top" height={36} />
            {colors.map((color, i) => (
              <Bar
                key={i}
                legendType="circle"
                stackId="a"
                dataKey={color.dataKey}
                fill={color.fill}
                label
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ResponsiveContainer>
        <Widget
        // title="Doughnut chart"
        // description={
        //   <span>
        //     Use the <code>&lt;Doughnut /&gt;</code> component for doughnut charts
        //   </span>
        // }
        >
          <Pie height={250} />
        </Widget>
      </ResponsiveContainer>
      {/* <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-2/3" style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 10
              }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} width={30} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              <Legend verticalAlign="top" height={36} />
              {colors.map((color, i) => (
                <Bar
                  key={i}
                  legendType="circle"
                  stackId="a"
                  dataKey={color.dataKey}
                  fill={color.fill}
                  label
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="w-full lg:w-2/3" style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <Widget
                title="Doughnut chart"
                description={
                  <span>
                    Use the <code>&lt;Doughnut /&gt;</code> component for doughnut charts
                  </span>
                }>
                <Pie height={250} />
              </Widget>
            </ResponsiveContainer>
          </div>
        </div>

      </div> */}
    </>
  )
}

