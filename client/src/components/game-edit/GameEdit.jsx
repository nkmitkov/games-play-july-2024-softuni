import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useForm from "../../hooks/useForm";
import * as gameService from "../../services/gameService";

export default function GameEdit() {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [game, setGame] = useState({
        title: "",
        category: "",
        maxLevel: "",
        imageUrl: "",
        summary: "",
    });

    useEffect(() => {
        gameService.getOneById(gameId)
            .then(result => setGame(result))
            .catch(err => console.log(err));
    }, [gameId]);

    const editSubmitHandler = (values) => {
        try {
            const updatedGame = gameService.edit(gameId, values);

            navigate(`/games/${gameId}`);
        } catch (error) {
            console.log(error);
        }
    };

    const {
        values,
        onChangeHandler,
        onSubmitHandler,
    } = useForm(editSubmitHandler, game);

    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={onSubmitHandler}>
                <div className="container">

                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value={values.title} onChange={onChangeHandler}/>

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value={values.category} onChange={onChangeHandler}/>

                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value={values.maxLevel} onChange={onChangeHandler}/>

                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={values.imageUrl} onChange={onChangeHandler}/>

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" value={values.summary} onChange={onChangeHandler}></textarea>
                    <input className="btn submit" type="submit" />

                </div>
            </form>
        </section>
    );
};