const express = require("express");
const { connectDb, getProvinces, insertUser, findUser, validateUser, verifyExistingUser } = require("./connect.js");
const cors = require("cors");
const app = express();
const port = 5000;
const corsOption = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.options("*", cors(corsOption));

app.get("/api/provinces", cors(), async (req, res) => {
  let response = await getProvinces();

  if (response.statusCode === 404) {
    return res.status(404).send({ success: false, msg: "An error has occured, nothing was found" });
  }
  return res.status(200).json({ success: true, data: response });
});

app.post("/api/login", cors(), async (req, res) => {
  let user = { username: req.body.username, password: req.body.password };
  try {
    const userCredentials = await findUser(user.username);
    if (userCredentials.data.username === undefined) {
      return res.status(401).json({ success: false, msg: "User not found", data: "", statusCode: 401 });
    }

    const authorization = validateUser(userCredentials.data.username, user.password);
    if (authorization.statusCode !== 202) {
      return res.status(401).json({ success: false, msg: "Wrong password", data: "", statusCode: 401 });
    }

    return res.status(201).json({ success: true, msg: "Access granted", data: user, statusCode: 202 });
  } catch (error) {
    console.log(error);
    res.status(404).send("A connection error has occured please try again later");
  }
});

app.post("/api/users", cors(), async (req, res) => {
  let user = {
    username: req.body.userName,
    password: req.body.userPassword,
    email: req.body.userEmail,
    address: req.body.userAddress,
    city: req.body.userCity,
    province: req.body.userProvince,
    zip: req.body.userZip,
  };
  const verifyingExistingUser = await verifyExistingUser(user.username);
  if (verifyingExistingUser.statusCode === 409) {
    return res.status(409).json({ success: false, code: 409, data: "", msg: "User already exists" });
  } else {
    const response = await insertUser(user);
    console.log(`Response: ${response.statusCode}`);
    const statusCode = Number(response.statusCode);
    if (statusCode !== 201) {
      return res.status(401).send("A connection error has occured please try again later");
    }
    const date = new Date().toLocaleString();
    console.log(` The "${req.method}" request was successful!\n Request status code: ${statusCode}\n Time: ${date} `);
    return res.status(201).json({ success: true, data: user, msg: "Request succesful" });
  }
});

const start = async () => {
  app.listen(port, () => {
    console.log(`The server is now listening on port ${port}...`);
  });
  await connectDb();
};

start();
