import axios from "axios";

export default async function getHeroById(id: string) {
    try {
        const result = axios.get(`http://localhost:8080/create/${id}`);
        return result;
    } catch (error) {
        return error;
    }
};
