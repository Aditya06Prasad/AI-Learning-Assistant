import Subject from "../models/Subject.js";

export const createSubject = async (req, res) => {
  try {
    const subject = await Subject.create({
      name: req.body.name,
      user: req.user._id,
    });

    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({
      user: req.user._id,
    });

    res.json(subjects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};