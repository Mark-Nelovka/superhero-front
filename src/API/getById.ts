import axios from "axios";
import { PATH_BACKEND } from "../constants";

export default async function getHeroById(id: string) {
    try {
        const result = await axios.get(`${PATH_BACKEND}/${id}`);
        console.log(result)
        return result.data;
    } catch (error) {
        console.log(error)
        return error;
    }
};
