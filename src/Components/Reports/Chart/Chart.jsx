import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PieChart, Pie, Sector } from "recharts";
import s from './Chart.module.css'

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Всего: ${value} ₴`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
const Chart = ({ filteredTransactions, showModeIncome, setActiveCategory }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
      (_, index) => {
        setActiveIndex(index);
      },
      [setActiveIndex]
    );

    const data = []
    if(filteredTransactions.length){
      filteredTransactions.forEach(transaction => {
        const i = data.findIndex(has => has.name === transaction.category)
        if(i !== -1){
          data[i].value += +transaction.sum
        }else{
          data.push({
            name: transaction.category,
            value: +transaction.sum
          })
        }
      });
    }

    useEffect(() => {
      if(data.length){
        if(data[activeIndex]){
          setActiveCategory(data[activeIndex].name)
        }else{
          setActiveIndex(0)
        }
      }
    }, [activeIndex, data])

    const fill = showModeIncome ? '#31a626' : '#d40202'

    if(!data.length){
      return <div className={s.noRecords}>Записей пока нет. Выберите другой фильтр или <NavLink to='/add/income'>добавьте новую запись</NavLink>.</div>
    }

    return (
      <PieChart width={600} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={290}
          cy={170}
          innerRadius={80}
          outerRadius={100}
          fill={fill}
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    );
  }


export default Chart
