export default function GameListItem({
    category,
    imageUrl,
    maxLevel,
    summary,
    title,
    _id,
}) {
    return (
        <div className="allGames">
            <div className="allGames-info">
                <img src={imageUrl} />
                <h6>{category}</h6>
                <h2>{title}</h2>
                <a href={`/games/${_id}`} className="details-button">Details</a>
            </div>

        </div>
    );
};