import { getRandomAlbums, getRandomElementFromArray } from "../../utils/helper";
import { Request, Response } from "express";
import User, { IUser } from "../../models/User";

interface IRequestWithUser extends Request {
  user?: IUser;
}

const ARTISTS = [
  "The Beatles",
  "Jack Johnson",
  "Radiohead",
  "Coldplay",
  "U2",
  "Pink Floyd",
  "Led Zeppelin",
  "The Rolling Stones",
  "Bob Dylan",
  "Queen",
];

export const startGame = async (
  req: IRequestWithUser,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const chosenArtist = getRandomElementFromArray(ARTISTS);
    const albums = await getRandomAlbums(chosenArtist);
    res.status(200).json({
      status: "success",
      message: "Start the game.",
      albums,
      artists: ARTISTS,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const finishGame = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const scoreInc = 5;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const user = await User.findById(userId);
    if (user) {
      user.score += scoreInc;
      await user.save();
      res.status(200).json({ message: "success", score: user.score });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTopPlayers = async (req: Request, res: Response) => {
  try {
    // Get the top 3 players based on score
    const users = await User.find({ score: { $gt: 0 } })
      .sort({ score: "desc" })
      .limit(3)
      .select({ _id: 0, username: 1, score: 1 });

    // Send the users array in the response
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
