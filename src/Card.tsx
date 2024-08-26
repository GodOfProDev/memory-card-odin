interface CardProps {
    title: string
    imageUrl: string
    onClick?: () => void
}

const Card = ({ title, imageUrl, onClick }: CardProps) => {
    return (
        <div
            onClick={onClick}
            className="w-max rounded-md bg-gray-200 shadow-lg transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
        >
            <h3 className="p-2 text-center">{title}</h3>
            <img className="h-[200px] w-[200px]" src={imageUrl} />
        </div>
    )
}

export default Card
