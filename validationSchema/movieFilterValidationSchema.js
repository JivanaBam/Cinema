import * as yup from "yup";
import { movieGenreList } from "../constants/general.constants";

export const movieFilterValidationSchema = yup.object({
  genre: yup.array().required("Genre is required.").oneOf(movieGenreList),
});
