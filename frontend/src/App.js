
import './App.css';
import { useEffect, useState } from 'react'

import { Server } from './config'

import CurrentWeatherRow from './components/currentWeatherRow/current-weather-row';


function App() {
  const [loading,setLoading] = useState(true)
  const [current,setCurrent] = useState()
  const [value,setValue] = useState()

  const polishCharacters = ['ó','ń','ą','ś','ż','ź','ę']

  const getCurrents = async (value="",names=[]) => {
    setLoading(true)

    const data = await fetch(`${Server}`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([value,...names])
    })

    const response = await data.json()

    if(response) {
      setCurrent(response)
      setLoading(false)
    }
  }

  useEffect(() => getCurrents() ,[])

  const handleClick = async value => {
    let cityDecleard = false;
    if(!value) return;

    for(let i=0; i<value.length; i++)
      for(let char of polishCharacters)
        if(value.charAt(i)===char){
          setValue('')
          return alert('Nie wolno używać polskich znaków, aby wybrać pogode z miasta, którego nazwa zaweria polskie znaki należy napisać nazwe tego miasta w języku angielskim')
        }

    const names = current.map(item => {
      if(item.name == value) cityDecleard = true;
      return item.name
    })
    if(cityDecleard) return alert('To miasto jest już zapisane!');
    
    getCurrents(value,names)
  }

  const handleChange = e => setValue(e.target.value)

  return (
    <div className="App">
      <main>
        {
          loading 
          ? "LOADING"
          : <CurrentWeatherRow data={current} />
        }

        <form className="form" onSubmit={e => e.preventDefault()}>
          <input 
            type="text" 
            value={value} 
            onChange={handleChange} 
            className="input"
            placeholder="Nazwa miasta"  
          />

          <button onClick={() =>handleClick(value)} className="btn">Dodaj</button>
        </form>
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
