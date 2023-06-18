import React, { useEffect, useState } from 'react'


function Loader(props) {
    const { text } = props
    const [ ellipses, setEllipses ] = useState(0)

    useEffect(() => {
        setTimeout(() => setEllipses(ellipses + 1), 500)
    }, [ellipses])

    return (
        <div className="loader" >
            <span className="loading-text">{ typeof text === "string" ? text : "Loading" }<span className="ellipses">{ [...Array(ellipses % 4).keys()].map(_ => ".") }</span></span>
        </div>
    )
}

export default Loader
