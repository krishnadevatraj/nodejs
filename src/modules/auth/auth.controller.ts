import errorhandler from "../../utils/errorHandler";
export class authController {
  static async login(req: any, res: any, next: any) {
    try {
      console.log(req.body);
      res.send("Received Request");
    } catch (error) {
      next(new errorhandler(500, "Internal Server Error", error));
    }
  }
}
