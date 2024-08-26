import { useEffect, useState } from 'react'
import CardsDisplay from './CardsDisplay'

const App = () => {
    const [currentScore, setCurrentScore] = useState(0)
    const [bestScore, setBestScore] = useState<number>(() => {
        const savedValue = localStorage.getItem('bestScore')
        return savedValue ? parseInt(savedValue) : 0
    })

    useEffect(() => {
        localStorage.setItem('bestScore', bestScore.toString())
    }, [bestScore])

    return (
        <div>
            <h1 className="p-4 text-center text-2xl font-semibold">
                Memory Game
            </h1>
            <div className="flex items-center justify-center gap-4 p-2 pb-6">
                <h2 className="text-xl">Current Score: {currentScore}</h2>
                <h2 className="text-xl">Best Score: {bestScore}</h2>
            </div>
            <CardsDisplay
                onWin={() => {
                    if (currentScore + 1 > bestScore) {
                        setBestScore(currentScore + 1)
                    }
                    setCurrentScore(currentScore + 1)
                }}
                onLose={() => {
                    setCurrentScore(0)
                }}
            />
        </div>
    )
}

export default App
