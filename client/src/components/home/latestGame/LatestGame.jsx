import { Link } from "react-router-dom";

import { pathToUrl } from "../../../utils/pathUtil";
import Path from "../../../paths";

export default function LatestGame({
    _id,
    title,
    imageUrl
}) {

    return (
        <div className="game">
            <div className="image-wrap">
                <img src={imageUrl} />
            </div>
            <h3>{title}</h3>
            <div className="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
            </div>
            <div className="data-buttons">
                <Link to={pathToUrl(Path.Details, { gameId: _id })} className="btn details-btn">Details</Link>
                {/* <Link to={`/games/${_id}`} className="btn details-btn">Details</Link> */}
            </div>
        </div>
    );
};