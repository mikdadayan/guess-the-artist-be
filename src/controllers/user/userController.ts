import { Request, Response } from "express";
import User from "../../models/User";

export const getUser = async (req: Request, res: Response) => {
  try {
    const existingUser =
      req.user && (await User.findById(req.user.id).select("username score"));
    if (!existingUser) {
      return res.status(400).json({ message: "Something went wrong." });
    }
    return res.status(200).json({
      status: "success",
      message: "Retrieve the user.",
      data: {
        user: { username: existingUser.username, score: existingUser.score },
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};

export const getTopPlayers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({ score: { $gt: 0 } })
      .sort({ score: "desc" })
      .limit(3)
      .select({ _id: 1, username: 1, score: 1 });

    res.status(200).json({
      status: "success",
      message: "Get top 3 players.",
      data: { users },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
