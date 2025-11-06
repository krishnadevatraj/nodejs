import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import auth_routes from "./modules/auth/auth.routes";

const app: Application = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", auth_routes);

export default app;
