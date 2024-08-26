import { useEffect, useState } from 'react'
import Card from './Card'
import Pokemon, { fetchRandomPokemons } from './data/pokemon'

const CardsDisplay = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [pokemons, setPokemons] = useState([] as Pokemon[])
    useEffect(() => {
        const fetch = async () => {
            const data = await fetchRandomPokemons(10)
            console.log(data)
            setPokemons(data)
            setIsLoading(false)
        }
        void fetch()
    }, [])

    if (isLoading) {
        return <h1 className="text-center text-2xl font-bold">Loading...</h1>
    }

    return (
        <div className="grid grid-cols-1 place-items-center gap-x-4 gap-y-7 px-[70px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {pokemons.map((pokemon) => {
                return (
                    <Card
                        title={pokemon.name}
                        imageUrl={pokemon.spriteUrl}
                        key={pokemon.name}
                    />
                )
            })}
        </div>
    )
}

export default CardsDisplay
