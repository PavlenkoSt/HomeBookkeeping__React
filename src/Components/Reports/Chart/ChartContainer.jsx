import React, { useCallback, useEffect, useState } from "react";
import Chart from './Chart'

const ChartContainer = ({ filteredTransactions, showModeIncome, setActiveCategory }) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
      (_, index) => {
        setActiveIndex(index);
      },
      [setActiveIndex]
    );

    const fill = showModeIncome ? '#31a626' : '#d40202'

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

    return <Chart data={data} fill={fill} onPieEnter={onPieEnter} activeIndex={activeIndex} />
}

export default ChartContainer