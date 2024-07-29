import { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";

import * as gameService from "../../services/gameService";
import * as commentService from "../../services/commentService";
import AuthContext from "../../contexts/authContext";
import reducer from "./commentReducer";
import useForm from "../../hooks/useForm";

export default function GameDetails() {
    const { email, _id } = useContext(AuthContext);
    const { gameId } = useParams();
    // const [comments, setComments] = useState([]);
    const [comments, dispatch] = useReducer(reducer, []);
    const [game, setGame] = useState({});

    useEffect(() => {
        gameService.getOneById(gameId)
            .then(data => setGame(data))
            .catch(err => console.log(err));

        commentService.getAll(gameId)
            .then(result => {
                dispatch({
                    type: "GET_ALL_COMMENTS",
                    payload: result,
                });
            })
            .catch(err => console.log(err));
    }, []);

    const addCommentHandler = async (values) => {
        const createdComment = await commentService.create(
            gameId,
            values.comment,
        );

        // setComments(state => [...state, { ...createdComment, owner: { email } }]);

        createdComment.owner = { email };

        dispatch({
            type: "ADD_COMMENT",
            payload: createdComment,
        });
    };

    const { values, onChangeHandler, onSubmitHandler } = useForm(addCommentHandler, {
        comment: "",
    });

    const isOwner = _id === game._ownerId;

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

                {isOwner && (
                    <div className="buttons">
                        <a href="#" className="button">Edit</a>
                        <a href="#" className="button">Delete</a>
                    </div>
                )}
            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={onSubmitHandler}>
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        value={values.comment}
                        onChange={onChangeHandler}
                    ></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    );
};