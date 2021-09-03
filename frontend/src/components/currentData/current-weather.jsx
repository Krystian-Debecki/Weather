import './current-weather.css'
import { useState, useEffect, forwardRef } from 'react'
const CurrentData = forwardRef(({ name, main, description, temp, icon, animation, up, down, none }) => {
    const [color, setColor] = useState()
    const [img, setImg] = useState()
    const [loading, setLoading] = useState(true)
    const [colorChosen, setColorChosen] = useState(false)

    


    const setProperColor = () => {
        if (!colorChosen) {
            if (temp > 50) setColor('temp_50')
            else if (temp > 40) setColor('temp_40')
            else if (temp > 30) setColor('temp_30')
            else if (temp > 20) setColor('temp_20')
            else if (temp > 10) setColor('temp_10')
            else if (temp > 0) setColor('temp_0')
            else if (temp > -10) setColor('temp_-10')
            else if (temp > -20) setColor('temp_-20')
            return setColorChosen(true)
        }
    }

   

    setProperColor()
    return (
        <div className={`
            current-weather-wrap 
            ${animation   && 'current-weather-wrap--active'}
            ${up   && 'current-weather-wrap--up'}
            ${down && 'current-weather-wrap--down'}
            ${none && 'none'}
        `}>

            <h2>{name}</h2>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} className="current-weather-wrap__img"/>
            <h3 className={`current-weather-wrap__deg ${color}`}>
                {temp.toFixed(0)}
                <sup className="current-weather-wrap__deg--sup">O</sup>
                C
            </h3>
            <h4>{description}</h4>
        </div>
    )
})

export default CurrentData