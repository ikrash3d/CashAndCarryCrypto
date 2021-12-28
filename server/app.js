const express = require("express");
const { connectDb, getProvinces, insertUser } = require("./connect.js");
const cors = require("cors");
let { people } = require("./data.js");
const app = express();
const port = 5000;
const corsOption = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.options("/api/provinces", cors());
app.options("/api/users", cors());

app.get("/api/provinces", cors(corsOption), async (req, res) => {
  let response = await getProvinces();

  if (response.statusCode === 404) {
    return res.status(404).send({ success: false, msg: "An error has occured, nothing was found" });
  }

  return res.status(200).json({ success: true, data: response });
});

app.post("/api/users", cors(corsOption), async (req, res) => {
  console.log(req.body);
  let user = {
    email: req.body.userEmail,
    password: req.body.userPassword,
    address: req.body.userAddress,
    city: req.body.userCity,
    province: req.body.userProvince,
    zip: req.body.userZip,
  };
  const response = await insertUser(user);
  if (!req.body) {
    return res.status(401).send("Please provide a username and a password");
  }
  return res.status(201).json({ success: true, data: user });
});

const start = async () => {
  app.listen(port, () => {
    console.log(`The server is now listening on port ${port}...`);
  });
  await connectDb();
};

start();
