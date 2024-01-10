require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = 8080;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on("error", (error) =>
  console.error.bind(error, "Error when connceting to database")
);
db.once("open", () => console.log(" Connected to Database"));

const categoryRoute = require("./routes/categoriesRoutes");
app.use("/category", categoryRoute);

const userRoute = require("./routes/UsersRoutes");
app.use("/user", userRoute);

const userInfoRoute = require("./routes/UserInformationoutes");
app.use("/userInformation", userInfoRoute);

const productRoute = require("./routes/UsersRoutes");
app.use("/product", productRoute);

const billRoute = require("./routes/BillRoutes");
app.use("/bill", billRoute);
