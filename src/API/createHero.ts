import axios from "axios";
import { IItems } from "../types/Items";

export default async function createHero(heroForm: IItems) {
  const formData = new FormData();
  if (heroForm.images.length === 0) {
    formData.append("description", JSON.stringify(heroForm));
      try {
            const res = await axios.post("http://localhost:4040/create/item", formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
            })
            return res.data;
        } catch (error) {
            return error;
        }
  }
    if (Object.values(heroForm.images).length > 1) {
      Object.values(heroForm.images).forEach((el) =>
        formData.append("hero", el)
      );
        formData.append("description", JSON.stringify(heroForm));
        try {
            const res = await axios.post("http://localhost:4040/create/list", formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
            })
            return res.data;
        } catch (error) {
            return error;
        }
    } else {
      formData.append("hero", heroForm.images[0]);
        formData.append("description", JSON.stringify(heroForm));
        try {
            const res = await axios
        .post("http://localhost:4040/create/item", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
            return res.data;
        } catch (error) {
            return error;
        }
    }
};