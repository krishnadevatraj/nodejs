import { Request, Response, NextFunction } from "express";
const user = new Map();
const windowTime = 60 * 1000;
const nowTime = Date.now();
const limit = 5;
export const rateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userIp = req.ip;
  const timestamp = Date.now();
  if (!user.get(userIp)) {
    user.set(userIp, [timestamp]);
  } else {
    let temp_array = user.get(userIp);
    console.log(temp_array);
    const timestamp = temp_array.filter(
      (time: any) => nowTime - time < windowTime
    );
    if (timestamp.length > limit && timestamp) {
      res.status(429).json({ status: false, message: "Too much Hit!!!" });
    }
    temp_array.push(nowTime);
    next();
  }
  //   console.log(user);
};
