import axios from "axios";
import { PATH_BACKEND } from "../constants";

export default async function getHeroById(id: string) {
    try {
        const result = await axios.get(`${PATH_BACKEND}/${id}`);
        return result.data;
    } catch (error) {
        return error;
    }
};
