import axios from "axios";

export default async function deleteHero(heroId: number) {
    try {
        const result = await axios.delete(`http://localhost:4040/delete/${heroId}`);
        return result.data;
    } catch (error) {
        return error;
    }
};