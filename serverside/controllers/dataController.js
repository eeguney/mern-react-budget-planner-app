import jwtDecode from "jwt-decode";
import dotenv from "dotenv";
// model imports
import RecordModel from "../models/record.js";

// -> controllers

dotenv.config();

const { ACCESS_TOKEN } = process.env;

export const newRecord = async (req, res) => {
  // req seperation
  const { user } = req.body;
  try {
    // check if req is empty
    if (!user)
      return res.status(400).json({ msg: "Please fill in all fields." });
    const newRecord = new RecordModel({
      user: user,
    });
    await newRecord.save();
    return res.json({
      msg: "Record table successfully added!",
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const addToRecord = async (req, res) => {
  const userID = req.params.userID;
  // req seperation
  const { expenses, funds, persons, categories, sources } = req.body;
  try {
    // check if req is empty
    if (!userID)
      return res.status(400).json({ msg: "Please fill in all fields." });
    // check if record exist
    const record = await RecordModel.findOne({ user: userID });
    if (record) {
      await RecordModel.findOneAndUpdate(
        { user: userID },
        {
          $push: {
            expenses,
            funds,
            persons,
            categories,
            sources,
          },
        },
        { new: true }
      );
      return res.json({ msg: "Update successfully." });
    } else {
      return res.status(400).json({ msg: "This record does not exist." });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const deleteFund = async (req, res) => {
  const fundID = req.params.ID;
  const userToken = req.headers.token;
  const token = userToken.split(" ")[1];
  const { id } = jwtDecode(token, ACCESS_TOKEN);

  try {
    // check if req is empty
    if (!fundID && id)
      return res.status(400).json({ msg: "Please fill in all fields." });
    // check if record exist
    const record = await RecordModel.findOne({ user: id });
    if (record) {
      // delete a fund and return new funds array
      await RecordModel.findOneAndUpdate(
        { user: id },
        {
          funds: record.funds.filter((filter) => filter.id !== fundID),
        },
        { new: true }
      );
      return res.json({ msg: true, array: record.funds.filter((filter) => filter.id !== fundID) });
    } else {
      return res.status(400).json({ msg: false });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const deleteExpense = async (req, res) => {
  const expenseID = req.params.ID;
  const userToken = req.headers.token;
  const token = userToken.split(" ")[1];
  const { id } = jwtDecode(token, ACCESS_TOKEN);

  try {
    // check if req is empty
    if (!expenseID && id)
      return res.status(400).json({ msg: "Please fill in all fields." });
    // check if record exist
    const record = await RecordModel.findOne({ user: id });
    if (record) {
      // delete a fund and return new funds array
      await RecordModel.findOneAndUpdate(
        { user: id },
        {
          expenses: record.expenses.filter((filter) => filter.id !== expenseID),
        },
        { new: true }
      );
      return res.json({ msg: true, array: record.expenses.filter((filter) => filter.id !== expenseID) });
    } else {
      return res.status(400).json({ msg: false });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const fetchData = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const data = await RecordModel.findOne({ user: id });
      if (data) {
        return res.status(200).json({ msg: data });
      } else {
        return res.status(400).json({ msg: "This doesnt exist!" });
      }
    }
  } catch (err) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
