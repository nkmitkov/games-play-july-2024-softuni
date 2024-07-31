import { useContext, useEffect, useMemo, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as gameService from "../../services/gameService";
import * as commentService from "../../services/commentService";
import AuthContext from "../../contexts/authContext";
import reducer from "./commentReducer";
import useForm from "../../hooks/useForm";
import { pathToUrl } from "../../utils/pathUtil";
import Path from "../../paths";

export default function GameDetails() {
    const { email, _id } = useContext(AuthContext);
    const { gameId } = useParams();
    const navigate = useNavigate();
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

    //TODO: temp solution for form reinitialization
    const initialValues = useMemo(() => ({
        comment: "",
    }), []);

    const { values, onChangeHandler, onSubmitHandler } = useForm(addCommentHandler, initialValues);

    const isOwner = _id === game._ownerId;

    const onDeleteHandler = (e) => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${game.name}?`);

        if (hasConfirmed) {
            gameService.remove(gameId);

            navigate("/games");
        }
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

                {isOwner && (
                    <div className="buttons">
                        <Link to={pathToUrl(Path.GameEdit, { gameId })} className="button">Edit</Link>
                        <button className="button" onClick={onDeleteHandler}>Delete</button>
                        {/* <Link to={pathToUrl(Path.GameDelete, { gameId })} className="button">Delete</Link> */}
                        {/* <Link to={`/games/${gameId}/delete`} className="button">Delete</Link> */}
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