import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getDesktopWebshot, getMobileWebshot } from "./lib/playwright.js";

dotenv.config();

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.json());
app.use(cors());

const router = express.Router();

router.get("/", getDesktopWebshot);
router.get("/mobile/", getMobileWebshot);

app.use("/", router);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
