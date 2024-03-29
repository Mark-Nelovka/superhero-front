import axios from "axios";
import { PATH_BACKEND } from "../constants";
import { IItems } from "../types/Items";

export default async function updateHero(updateHero: IItems) {
    const formData = new FormData();
    if (!updateHero.images) {
        formData.append("description", JSON.stringify(updateHero)); 
       try {
            const res = await axios.patch(`${PATH_BACKEND}/update/item/${updateHero.hero_id}`, formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
            })
            return res.data;
        } catch (error) {
            return error;
        } 
    }
    if (Object.values(updateHero.images).length > 1) {
      Object.values(updateHero.images).forEach((el) =>
        formData.append("hero", el)
      );
        formData.append("description", JSON.stringify(updateHero)); 
        try {
            const res = await axios.patch(`${PATH_BACKEND}/update/list/${updateHero.hero_id}`, formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
            })
            return res.data;
        } catch (error) {
            return error;
        }
    } else {
      formData.append("hero", updateHero.images[0]);
        formData.append("description", JSON.stringify(updateHero));
        try {
            const res = await axios
        .patch(`${PATH_BACKEND}/update/item/${updateHero.hero_id}`, formData, {
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