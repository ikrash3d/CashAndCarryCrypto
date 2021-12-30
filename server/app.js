const express = require("express");
const { connectDb, getProvinces, insertUser } = require("./connect.js");
const cors = require("cors");
let { people } = require("./data.js");
const app = express();
const port = 5000;
const corsOption = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200,
  preflightContinue: false,
};

app.use(express.json());
app.options("/api/provinces", cors(corsOption));
app.options("/api/users", cors(corsOption));

app.get("/api/provinces", cors(corsOption), async (req, res) => {
  let response = await getProvinces();

  if (response.statusCode === 404) {
    return res.status(404).send({ success: false, msg: "An error has occured, nothing was found" });
  }

  return res.status(200).json({ success: true, data: response });
});

app.post("/api/users", cors(corsOption), async (req, res) => {
  let user = {
    email: req.body.userEmail,
    password: req.body.userPassword,
    address: req.body.userAddress,
    city: req.body.userCity,
    province: req.body.userProvince,
    zip: req.body.userZip,
  };
  const response = await insertUser(user);
  statusCode = Number(response.statusCode);
  if (statusCode !== 201) {
    return res.status(401).send("A connection error has occured please try again later");
  }
  console.log(` The "${req.method}" request was successful!\n Request status code: ${statusCode} `);
  return res.status(201).json({ success: true, data: user, msg: "Request succesful" });
});

const start = async () => {
  app.listen(port, () => {
    console.log(`The server is now listening on port ${port}...`);
  });
  await connectDb();
};

start();
