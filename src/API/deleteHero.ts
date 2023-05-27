import axios from "axios";

export default async function deleteHero(heroId: number) {
    try {
        const result = await axios.delete(`http://localhost:8080/create/delete/${heroId}`);
        return result;
    } catch (error) {
        return error;
    }
};