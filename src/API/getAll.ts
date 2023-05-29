import axios from "axios";
import { PATH_BACKEND } from "../constants";

export default async function getAllHero(page: number) {
    try {
        const result = await axios.get(`${PATH_BACKEND}?page=${page}`, {
        headers: {
          "Content-Type": "image/jpeg",
        },
        })
        return result.data;
    } catch (error) {
        return error;
    }
}