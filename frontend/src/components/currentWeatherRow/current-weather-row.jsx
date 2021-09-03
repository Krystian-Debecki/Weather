import './current-weather-row.css'
import CurrentData from "../currentData/current-weather"

import { useRef, useState, useEffect, createRef } from 'react'
const CurrentDataRow = ({ data, click }) => {
    const [active, setActive] = useState(0)
    const [down, setDown] = useState()
    const [up, setUp] = useState(0)
    const [none, setNone] = useState()
    const [isFirstAnimation, setIsFirstAnimation] = useState(true)

    const showWeather = data.map((item, i) =>
        <CurrentData
            name={item.name}
            description={item.description}
            temp={item.temp}
            main={item.main}
            key={item.id}
            icon={item.icon}
            animation={i == active ? true : false}
            down={i == down ? true : false}
            up={i == up ? true : false}
            none={i == none ? true : false}
        />
    )

    const handleClick = direction => {
        switch (direction) {

            case 'right':
                if (up + 1 === data.length) return;

                if (isFirstAnimation) {
                    setDown(0)
                    setUp(1)
                    setIsFirstAnimation(false)
                    return setActive(1)
                }

                setActive(active + 1)
                setDown(active)
                return setUp(up + 1)

            case 'left':
                if (up - 1 === -1) return;

                setUp(up - 1)
                setDown(active)
                return setActive(active - 1)
        }
    }

    return (
        <div className="current-data-row">


            <div className="current-data-row__hide-currents">
                <div className="current-data-row__show-currents">
                    <div 
                        onClick={() => handleClick('left')} 
                        className={`current-data-row__change-city 
                                    ${active === 0 && 'current-data-row__change-city--unactive'}
                        `}
                    > 
                        {'<'} 
                    </div>

                    {showWeather}

                    <div 
                        onClick={() => handleClick('right')} 
                        className={`current-data-row__change-city 
                                    ${active === data.length-1 && 'current-data-row__change-city--unactive'}
                        `}
                    > 
                        {'>'} 
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CurrentDataRow