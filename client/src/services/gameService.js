import * as request from "../lib/request";

const baseUrl = "http://localhost:3030/data/games";

export const getAll = async () => {
    const result = await request.get(baseUrl);

    return result;
};

export const getOneById = async (id) => {
    const result = await request.get(`${baseUrl}/${id}`);

    return result;
};

export const getLatest = async () => {
    // because of the interval between createdOn and desc doesn't work
    const query = new URLSearchParams({
        sortBy: "_createdOn desc",
        pageSize: 3,
    });

    const querystring = "sortBy=_createdOn%20desc&pageSize=3";

    const result = await request.get(`${baseUrl}?${querystring}`);

    return result;
};

export const create = async (gameData) => {
    const result = await request.post(baseUrl, gameData);

    return result;
};

export const edit = async (gameId, gameData) => {
    const result = await request.put(`${baseUrl}/${gameId}`, gameData);

    return result;
};

export const remove = async (gameId) => await request.remove(`${baseUrl}/${gameId}`);