require('dotenv').config()
const fetch = require('node-fetch')

const express = require('express');
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const getWeatherData = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city || 'Warszawa'}&appid=${process.env.API_KEY}&units=metric&lang=pl`)
    const data = await response.json()

    console.log(data)
    const { name, id } = data;
    const { main, description, icon } = data.weather[0];
    const { temp } = data.main
    return { name, main, description, temp, id, icon }
}


app.post('/', async (req, res) => {
    let data = []
    if (req.body) 
        for (let i = 0; i < req.body.length; i++) {
            const item = await getWeatherData(req.body[i]);
            data.push(item)
        }
 
    res.send(data)
})


app.listen(3100, () => {
    console.log('Listening')
})