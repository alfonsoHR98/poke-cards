import { useState, useEffect } from "react"

const App = () => {

  let [pokemonNumber, setPokemonNumber] = useState(1)
  let [pokemonName, setPokemonName] = useState('')

  function increaseNumber() {
    setPokemonNumber(pokemonNumber + 1)
    console.log('Valor antes del nuevo render: ' + pokemonNumber)
  }
  
  useEffect(() => {
    console.log('valor al actualizar el estado: ' + pokemonNumber)
    
    // Aquí se debe llamar a las API
    //fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`)
    //.then(result => result.json())
    //.then(data => setPokemonName(data.name))
    
    searchPokemon(pokemonNumber)

  },[pokemonNumber])

  let searchPokemon = async pokemonNumber => { 
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`)
    const data = await response.json()
    setPokemonName(data.name)
  }

  return(
    <>
      <button onClick={increaseNumber}>NEXT</button>
      <div>{pokemonNumber} - {pokemonName}</div>
    </>
  )
}

export {App}