require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI;

console.log("---------");
console.log("uri");
console.log(MONGODB_URI);
console.log("---------");
module.exports = { PORT, MONGODB_URI };
