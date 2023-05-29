import axios from "axios";
import { PATH_BACKEND } from "../constants";

export default async function deleteHero(heroId: number) {
    try {
        const result = await axios.delete(`${PATH_BACKEND}/delete/${heroId}`);
        return result.data;
    } catch (error) {
        return error;
    }
};