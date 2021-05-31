import React, { FC, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveCategory, TransactionType } from "../../../Redux/chartReducer"
import { filteredItemsSelector, showModeIncomeSelector } from "../../../Redux/selectors/chartSelectors"
import Chart from './Chart'

export type ChartDataType = {
    name: string
    value: number
}

const ChartContainer: FC = () => {
    const dispatch = useDispatch()
    const filteredTransactions = useSelector(filteredItemsSelector)
    const showModeIncome = useSelector(showModeIncomeSelector)

    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index)
        },
        [setActiveIndex]
    );

    const fill = showModeIncome ? '#31a626' : '#d40202'

    const data: Array<ChartDataType> = []
    if(filteredTransactions.length){
        filteredTransactions.forEach((transaction: TransactionType) => {
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
                dispatch(setActiveCategory(data[activeIndex].name))
            }else{
                dispatch(setActiveIndex(0))
            }
        }
      }, [activeIndex, data])

    return <Chart data={data} fill={fill} onPieEnter={onPieEnter} activeIndex={activeIndex} />
}

export default ChartContainer