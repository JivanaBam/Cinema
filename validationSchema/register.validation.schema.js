import * as yup from "yup";

export const registerValidationSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required.")
    .trim()
    .max(50, "First name must be at max 50 characters.")
    .min(3, "First name must be atleast 3 characters."),

  lastName: yup
    .string()
    .required("Last name is required.")
    .trim()
    .max(50, "Last name must be at max 50 characters.")
    .min(2, "Last name must be atleast 2 characters."),

  email: yup
    .string()
    .email("Enter valid email.")
    .required("Email is required.")
    .trim()
    .max(50, "Email must be at max 50 characters.")
    .lowercase(),

  password: yup.string().required("Password is required.").trim(),

  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref("password"), null], "Password must match."),

  role: yup
    .string()
    .oneOf(["admin", "viewer", "user"])
    .required("Role is required."),

  // gender: yup
  //   .string()
  //   .oneOf(["male", "female", "preferNotToSay"])
  //   .required("Gender is required."),
});
