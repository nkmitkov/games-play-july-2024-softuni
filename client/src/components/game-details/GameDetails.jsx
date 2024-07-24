import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as gameService from "../../services/gameService";
import * as commentService from "../../services/commentService";
import AuthContext from "../../contexts/authContext";

export default function GameDetails() {
    const { email } = useContext(AuthContext);
    const { gameId } = useParams();
    const [comments, setComments] = useState([]);
    const [game, setGame] = useState({});

    useEffect(() => {
        gameService.getOneById(gameId)
            .then(data => setGame(data))
            .catch(err => console.log(err));

        commentService.getAll(gameId)
            .then(setComments)
            .catch(err => console.log(err));
    }, [gameId]);

    const addCommentHandler = async (e) => {
        e.preventDefault();

        // i must use controlled form and clear the form after creating a comment
        const formData = new FormData(e.currentTarget);

        const createdComment = await commentService.create(
            gameId,
            formData.get("comment"),
        );

        setComments(state => [...state, { ...createdComment, owner: { email } }]);
    };

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} alt={game.title} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">
                    {game.summary}
                </p>

                {/* <!-- Bonus ( for Guests and Users ) --> */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>

                        {comments.map(({ _id, text, owner: { email } }) => (
                            <li className="comment" key={_id}>
                                <p>{email} : {text}</p>
                            </li>
                        ))}

                    </ul>

                    {comments.length === 0 && (<p className="no-comment">No comments.</p>)}

                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {/* <div className="buttons">
                    <a href="#" className="button">Edit</a>
                    <a href="#" className="button">Delete</a>
                </div> */}
            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    );
};