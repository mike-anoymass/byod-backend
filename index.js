const express = require("express");
const cors = require("cors");
const models = require("./models");
const dotenv = require("dotenv");
const userRouter = require("./routes/UserRoutes");
const authRouter = require("./routes/AuthRoutes");
const facilityRouter = require("./routes/FacilityRoutes");
const distictRouter = require("./routes/DistrictsRoutes");
const ownerRouter = require("./routes/OwnerRoutes");
const PORT = 3001;

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/facility", facilityRouter);
app.use("/district", distictRouter);
app.use("/owner", ownerRouter);

models.sequelize
  .sync()
  .then(() =>
    app.listen(PORT, () => console.log(`server running or port ${PORT}`))
  )
  .catch((err) => console.log(err));
