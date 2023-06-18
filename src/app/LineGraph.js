import { LineChart } from 'components'
import React, { useEffect, useState } from 'react'
import { colorsList, fetchData } from './utils/common'


function LineGraph(props) {
    const { setLoading } = props
    const currentMax = sessionStorage.getItem("maxTime")
    const [ chartData, setChartData ] = useState(null)
    const [ start, setStart ] = useState(-0.1)
    const [ stop, setStop ] = useState(0)

    const dataHandler = data => setChartData(data)

    useEffect(() => {
        setLoading(true)
        if (stop > 0) return

        if (currentMax?.length) fetchData({"hours": { start, stop, currentMax }}, dataHandler)
        setLoading(false)
    }, [ currentMax, start, stop ])

    const handleChange = v => {
        setStart(start + v)
        setStop(stop + v)
    }

    return (
        <div className='widget shadow'>
            {
                chartData?.length ? (
                    <>
                        <div className='btns'>
                            <button onClick={() => handleChange(-0.1)} className='btn shadow'>-6 mins</button>
                            <button onClick={() => handleChange(0.1)} disabled={ stop >= 0 } className='btn shadow'>+6 mins</button>
                        </div>
                        <LineChart chartData={ chartData } colorSet={ colorsList } dimensions={{ height: 30, width: 150 }} />
                    </>
                ) : <></>
            }
        </div>
    )
}

export default LineGraph