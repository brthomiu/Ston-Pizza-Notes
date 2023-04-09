import jsonwebtoken from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { User } from "../models/userModel";

export const protect = expressAsyncHandler(async (req: any, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      console.log("token:", token);

      // Verify token

      const secret = (): string => {
        let newSecret = process.env.JWT_SECRET;
        if (typeof newSecret !== "string") {
          throw new Error("JWT Secret invalid");
        } else return newSecret;
      };

      const decoded: any = await jsonwebtoken.verify(token, secret, () => []);

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
});
