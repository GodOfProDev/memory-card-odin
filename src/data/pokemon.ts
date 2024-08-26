class Pokemon {
    name: string
    spriteUrl: string

    constructor(name: string, spriteUrl: string) {
        this.name = name
        this.spriteUrl = spriteUrl
    }
}

interface PokemonData {
    name: string
    sprites: {
        other: {
            'official-artwork': {
                front_default: string
            }
        }
    }
}

async function fetchRandomPokemons(count: number): Promise<Pokemon[]> {
    const randomIndexes = [] as number[]
    const pokemonsList = [] as Pokemon[]

    for (let i = 0; i < count; i++) {
        let rndIndx = 0
        do {
            rndIndx = Math.floor(Math.random() * 100) + 1 // 1 -> 100
        } while (randomIndexes.includes(rndIndx))
        randomIndexes.push(rndIndx)
    }
    for (let i = 0; i < count; i++) {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${randomIndexes[i]}`
        )
        const data = (await response.json()) as PokemonData
        const name = `${data.name[0].toUpperCase()}${data.name.slice(1)}`
        pokemonsList.push(
            new Pokemon(
                name,
                data.sprites.other['official-artwork'].front_default
            )
        )
    }

    return pokemonsList
}

export default Pokemon
export { fetchRandomPokemons }
