import { useEffect, useState } from 'react'
import Card from './Card'
import Pokemon, { fetchRandomPokemons } from './data/pokemon'

interface CardsDisplayProps {
    onWin: () => void
    onLose: () => void
}

const shufflePokemons = (pokemons: Pokemon[], count: number): Pokemon[] => {
    const randomIndexes = [] as number[]
    const pokemonsList = [] as Pokemon[]

    for (let i = 0; i < count; i++) {
        let rndIndx = 0
        do {
            rndIndx = Math.floor(Math.random() * count) + 1 // 1 -> count
        } while (randomIndexes.includes(rndIndx))
        randomIndexes.push(rndIndx)
    }

    for (let i = 0; i < count; i++) {
        pokemonsList.push(pokemons[randomIndexes[i]])
    }

    return pokemonsList
}

const CardsDisplay = ({ onWin, onLose }: CardsDisplayProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [pokemons, setPokemons] = useState([] as Pokemon[])
    const [displayPokemons, setDisplayPokemons] = useState([] as Pokemon[])
    const [selectedPokemons, setSelectedPokemons] = useState([] as Pokemon[])

    useEffect(() => {
        const fetch = async () => {
            const data = await fetchRandomPokemons(20)
            setPokemons(data)
            setDisplayPokemons(shufflePokemons(data, 10))
            setIsLoading(false)
        }
        void fetch()
    }, [])

    const handleClick = (name: string) => {
        const selectedPokemon = displayPokemons.find(
            (pokemon) => pokemon.name === name
        )!

        if (selectedPokemons.includes(selectedPokemon)) {
            setSelectedPokemons([])
            onLose()
        } else {
            selectedPokemons.push(selectedPokemon)
            onWin()
        }

        setDisplayPokemons(shufflePokemons(pokemons, 10))
    }

    if (isLoading) {
        return <h1 className="text-center text-2xl font-bold">Loading...</h1>
    }

    return (
        <div className="grid grid-cols-1 place-items-center gap-x-4 gap-y-7 px-[70px] pb-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {displayPokemons.map((pokemon) => {
                return (
                    <Card
                        title={pokemon.name}
                        imageUrl={pokemon.spriteUrl}
                        key={pokemon.name}
                        onClick={() => {
                            handleClick(pokemon.name)
                        }}
                    />
                )
            })}
        </div>
    )
}

export default CardsDisplay
