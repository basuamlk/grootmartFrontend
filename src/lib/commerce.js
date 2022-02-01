import Commerce from "@chec/commerce.js";

require("dotenv").config({ path: ".env" });

// let commerceKey;
// if (process.env.NODE_ENV !== "production") {
//   commerceKey = process.env.REACT_APP_CHEC_PUBLIC_KEY;
// } else {
//   commerceKey = process.env.REACT_APP_CHEC_PRIVATE_KEY;
// }
console.log(process.env);
console.log(process.env.REACT_APP_CHEC_PUBLIC_KEY);
export const commerce = new Commerce(
  "pk_test_3129346cb342888fb8d748704a6a0912be706d507566a"
);
