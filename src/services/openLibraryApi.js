import axios from "axios";

const BASE_URL = "https://openlibrary.org";

export const searchBooks = async (query) => {
    const response = await axios.get(`${BASE_URL}/search.json`, {
        params: {
            q: query,
            limit: 24
        }
    });

    return response.data.docs;
};