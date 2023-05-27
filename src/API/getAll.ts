import axios from "axios";

export default async function getAllHero() {
    try {
        const result = await axios.get("http://localhost:8080/create", {
        headers: {
          "Content-Type": "image/jpeg",
        },
        })
        return JSON.parse(result.data.data);
    } catch (error) {
        return error;
    }
}