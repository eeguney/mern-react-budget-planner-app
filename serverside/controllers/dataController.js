// model imports
import RecordModel from "../models/record.js";

// -> controllers

export const newRecord = async (req, res) => {
  // req seperation
  const { user } = req.body;
  try {
    // check if req is empty
    if (!user) return res.status(400).json({ msg: "Please fill in all fields." });
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
    console.log(record)
    if (record) {
      await RecordModel.findOneAndUpdate(
        { user: userID },
        { $push: {
            expenses,
            funds,
            persons,
            categories,
            sources,
          } },
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
