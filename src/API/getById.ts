import axios from "axios";

export default async function getHeroById(id: string) {
    try {
        const result = axios.get(`http://localhost:4040/${id}`);
        return result;
    } catch (error) {
        return error;
    }
};
