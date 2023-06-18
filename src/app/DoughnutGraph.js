import React, { useEffect, useState } from 'react'
import { DateSelector, DoughnutChart } from 'components'
import { colorsList, fetchData, processData } from './utils/common'


function DoughnutGraph(props) {
    const { sessionSet, setLoading } = props
    const [ dateDelta, setDateDelta ] = useState(1)
    const [ data, setData ] = useState(null)
    const [ chartData, setChartData ] = useState(null)
    const dd = `${ dateDelta }`

    const dataHandler = _data => {
        setChartData(null)
        const tempData = data || {}
        tempData[dd] = _data
        sessionStorage.setItem("maxTime", _data[_data.length - 1]._time)
        sessionSet(true)
        setData(tempData)
        setChartData(processData(_data))
    }

    useEffect(() => {
        setLoading(true)
        if (dd === "0" || !data?.[dd]?.length) {
            fetchData({"days": dateDelta}, dataHandler)
        } else {
            dataHandler(data[dd])
        }
        setLoading(false)
    }, [ dateDelta ])

    return (
        <div className='shadow widget doughnut-w'>
            {
                data ? (
                    <>
                        <div className='dough-header'>
                            <h5>Sensor-wise Data</h5>
                            <DateSelector setDateDelta={ setDateDelta } dateDelta={ dateDelta } />
                        </div>
                        {
                            chartData ? (
                                <DoughnutChart chartData={ chartData } colorSet={ colorsList } dimensions={{ height: 100 }}/>
                            ) : <></>
                        }
                    </>
                ) : <></>
            }
        </div>
    )
}

export default DoughnutGraph