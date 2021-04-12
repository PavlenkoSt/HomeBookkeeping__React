import React from "react";
import { NavLink } from "react-router-dom";
import { PieChart, Pie } from "recharts";
import s from './Chart.module.css'
import renderActiveShape from "./RenderActiveShape";

const Chart = ({ data, fill, onPieEnter, activeIndex }) => {
    
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
