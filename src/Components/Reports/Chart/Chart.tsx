import React, { FC, MouseEvent, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { PieChart, Pie} from "recharts"
import s from './Chart.module.css'
import renderActiveShape from "./RenderActiveShape"
import { ChartDataType } from './ChartContainer'

type ChartPropsType = {
    data: Array<ChartDataType>
    fill: string
    activeIndex: number
    onPieEnter:  any
}

const Chart: FC<ChartPropsType> = ({ data, fill, onPieEnter, activeIndex }) => {
    const [innerRadius, setinnerRadius] = useState(80)
    const [outerRadius, setOuterRadius] = useState(100)

    const resizeHandler = () => {
        if(window.innerWidth < 600 && innerRadius === 80 && outerRadius === 100 ){
            setinnerRadius(100)
            setOuterRadius(130)
        }else{
            setinnerRadius(80)
            setOuterRadius(100)
        }
    }

    useEffect(() => {
        resizeHandler()
        window.addEventListener('resize', resizeHandler)
        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

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
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              fill={fill}
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
        </PieChart>
    );
  }


export default Chart
