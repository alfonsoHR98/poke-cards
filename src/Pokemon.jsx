//Componentes
import Button from "./components/Button";
import { Card } from "./components/Card";
//Estilos
import './sass/pokemon.scss'
//Iconos
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";
//Hooks
import { useState, useEffect } from "react";

const Pokemon = () => {

  const [pokemonId, setPokemonId] = useState(1)
  const [evolutions, setEvolutions] = useState([])

  useEffect(() => {
    getEvolutions(pokemonId)
  }, [pokemonId])
  
  async function getEvolutions (id) {
    const response = (await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`))
    const data = await response.json()

    let arrayEvolutions = []

    let firstEvolution = data.chain.species.name
    let firstEvolutionImg = await getPokemonImg(firstEvolution)
    arrayEvolutions.push([firstEvolution, firstEvolutionImg])

    if (data.chain.evolves_to.length > 0) {
      let secondEvolution = data.chain.evolves_to[0].species.name
      let secondEvolutionImg = await getPokemonImg(secondEvolution)
      arrayEvolutions.push([secondEvolution, secondEvolutionImg])
    
      if (data.chain.evolves_to[0].evolves_to.length > 0) {
        let thirdEvolution = data.chain.evolves_to[0].evolves_to[0].species.name
        let thirdEvolutionImg = await getPokemonImg(thirdEvolution)
        arrayEvolutions.push([thirdEvolution, thirdEvolutionImg])
      }
    }
    setEvolutions(arrayEvolutions)

  }

  async function getPokemonImg (name) {
    const response = (await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`))
    const data = await response.json()
    return data.sprites.other['official-artwork'].front_default
  }

  function prevClick () {
    (pokemonId === 1) ? 
    setPokemonId(1):
    setPokemonId(pokemonId - 1)
  }

  function nextClick () {
    setPokemonId(pokemonId + 1)
  }

  return (
    <div className="app">
      <div className={`card-container card${evolutions.length}`}>
        {evolutions.map(pokemon => 
          <Card 
            key={pokemon[0]}
            name = {pokemon[0]} 
            img = {pokemon[1]} />
        )}
      </div>
      <div className="buttons-container">
        <Button 
          icon={<TiArrowLeftOutline />} 
          handleClick={prevClick} 
        />
        <Button 
          icon={<TiArrowRightOutline />} 
          handleClick={nextClick}
        />
      </div>
    </div>
  )
}

export {Pokemon}
