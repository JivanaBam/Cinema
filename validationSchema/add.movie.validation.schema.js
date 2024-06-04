import * as yup from "yup";
import {
  movieCountryList,
  movieGenreList,
} from "../constants/general.constants";

const addMovieValidationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required.")
    .trim()
    .max(60, "Name must be at max 60 characters."),
  leadActor: yup
    .string()
    .required("Lead actor name is required.")
    .trim()
    .max(30, "Lead actor name must be at max 30 characters."),
  supportingActor: yup
    .string()
    .required("Supporting actor name is required.")
    .trim()
    .max(30, "Supporting actor name must be at max 30 characters."),
  country: yup
    .string()
    .required("Country is required.")
    .trim()
    .oneOf(movieCountryList),
  genre: yup
    .array()
    .of(yup.string().oneOf(movieGenreList))
    .required("Genre is required.")
    .min(1, "Must contain at least one genre."),
  description: yup
    .string()
    .trim()
    .required("Description is required.")
    .min(100, "Description must be at least 100 characters.")
    .max(1000, "Description must be at max 1000 characters."),
  releasedYear: yup.date().required("Released year is required."),
  duration: yup
    .string()
    .required("Duration is required.")
    .min(1, "Duration must be at least 1 minute."),
  // .integer("Duration must be an integer."),

  image: yup.string().nullable(),
});

export default addMovieValidationSchema;
