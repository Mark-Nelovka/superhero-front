import axios from "axios";

export default async function getAllHero(page: number) {
    try {
        const result = await axios.get(`http://localhost:4040?page=${page}`, {
        headers: {
          "Content-Type": "image/jpeg",
        },
        })
        return result.data;
    } catch (error) {
        return error;
    }
}