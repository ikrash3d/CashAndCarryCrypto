const { MongoClient } = require("mongodb");
const env = require("dotenv");
env.config();
const uri = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    const client = await MongoClient.connect(uri);
    const database = client.db("CashAndCarryCrypto");
    console.log(`Connected to the DB...`);
  } catch (error) {
    console.log(`Unable to connect to the DB...`);
  }
};

const insertUser = async (user) => {
  let response = { statusCode: "", data: "" };
  try {
    const client = await MongoClient.connect(uri);
    const database = client.db("CashAndCarryCrypto");
    const data = await database.collection("users").insertOne({
      username: user.username,
      password: user.password,
      email: user.email,
      address: user.address,
      city: user.city,
      province: user.province,
      zip: user.zip,
    });
    response = { statusCode: "201", data: data, msg: "User was added the database" };
  } catch (error) {
    response = { statusCode: "400", data: data, msg: "User was not added to the database" };
  }
  return response;
};

const fetchDBData = async () => {
  let response = { statusCode: "", data: "" };
  try {
    const client = await MongoClient.connect(uri);
    const database = client.db("CashAndCarryCrypto");
    const collection = await database.collection("users").find().toArray();
    response = {
      statusCode: 201,
      data: collection,
    };
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getProvinces = async () => {
  let response = { statusCode: "", data: "" };
  try {
    const client = await MongoClient.connect(uri);
    const database = client.db("CashAndCarryCrypto");
    const data = await database.collection("provinces").find().toArray();
    if (data.length === 0) {
      throw "Nothing was found";
    }
    response = { statusCode: 200, data: data, msg: "Sucess" };
    await client.close();
  } catch (error) {
    console.log(error);
    response = { statusCode: 404, data: "", msg: "Failed to fetch the provinces" };
  }
  return response;
};

const findUser = async (username) => {
  let response = { statusCode: "", data: "", msg: "" };
  try {
    const client = await MongoClient.connect(uri);
    const database = client.db("CashAndCarryCrypto");
    const user = await database.collection("users").findOne({ username: username });
    if (user === null) throw "User not found";
    return (response = {
      statusCode: 200,
      data: user,
      msg: "User fetched successfully",
    });
  } catch (error) {
    return (response = {
      statusCode: 404,
      data: "",
      msg: "User not found",
    });
  }
};

const validateUser = (userPassword, reqPassword) => {
  let response = { statusCode: "", data: "", msg: "" };

  if (userPassword === reqPassword) {
    return (response = {
      statusCode: 202,
      data: "",
      msg: "Authorized",
    });
  }
  return (response = {
    statusCode: 401,
    data: "",
    msg: "Unauthorized",
  });
};

const verifyExistingUser = async (username) => {
  let response = { statusCode: "", data: "", msg: "" };
  try {
    const client = await MongoClient.connect(uri);
    const database = client.db("CashAndCarryCrypto");
    const existingUser = await database.collection("users").findOne({ username: username });
    if (existingUser !== null) {
      response = { statusCode: 409, data: "", msg: "User already exist" };
      return response;
    }
    response = { statusCode: 201, data: "", msg: "User doesn't exist" };
    return response;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { connectDb, getProvinces, insertUser, fetchDBData, findUser, validateUser, verifyExistingUser };
