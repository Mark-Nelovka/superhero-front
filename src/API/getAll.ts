import axios from "axios";

export default async function getAllHero() {
    try {
        const result = await axios.get("http://localhost:4040", {
        headers: {
          "Content-Type": "image/jpeg",
        },
        })
        return result.data;
    } catch (error) {
        return error;
    }
}