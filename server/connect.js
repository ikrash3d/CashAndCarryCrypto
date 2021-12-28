const { MongoClient, Db } = require("mongodb");
const env = require("dotenv");
env.config();
const uri = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    const client = await MongoClient.connect(uri);
    const database = client.db("CashAndCarryCrypto");
    const collection = await database.collection("provinces").find().toArray();
    console.log(`Connected to the DB...`);
  } catch (error) {
    console.log(error);
  }
};

const insertUser = async (user) => {
  let response = { statusCode: "", data: "" };
  try {
    const client = await MongoClient.connect(uri);
    const database = client.db("CashAndCarryCrypto");
    const data = await database.collection("users").insertOne({
      email: user.email,
      password: user.password,
      address: user.address,
      city: user.city,
      province: user.province,
      zip: user.zip,
    });
    response = { statusCode: "201", data: data, msg: "Success" };
  } catch (error) {
    console.log(error);
    response = { statusCode: "400", data: data, msg: "User was not added" };
  }
  return response;
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

module.exports = { connectDb, getProvinces, insertUser };
