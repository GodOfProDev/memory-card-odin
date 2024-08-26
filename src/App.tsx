import CardsDisplay from './CardsDisplay'

const App = () => {
    return (
        <div>
            <h1 className="p-4 text-center">Memory Game</h1>
            <div className="flex items-center justify-center gap-4 p-2 pb-6">
                <h2>Current Score: 0</h2>
                <h2>Best Score: 0</h2>
            </div>
            <CardsDisplay />
        </div>
    )
}

export default App
