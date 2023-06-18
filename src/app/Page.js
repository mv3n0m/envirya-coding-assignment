import { useEffect, useState } from 'react'
import LineGraph from './LineGraph'
import DoughnutGraph from './DoughnutGraph'
import { Loader } from 'components'


function Page() {
    const [ session, sessionSet ] = useState(sessionStorage.getItem("maxTime"))
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        setLoading(true)
    }, [])

    return (
        <div className='page'>
            { session && <LineGraph setLoading={ setLoading } /> }
            <DoughnutGraph sessionSet={ sessionSet } setLoading={ setLoading } />
            { loading && <Loader /> }
        </div>
    )
}

export default Page