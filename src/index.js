import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getDesktopWebshot, getMobileWebshot } from "./lib/playwright.js";
import rateLimit from "express-rate-limit";

dotenv.config();

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.json());
app.use(cors());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 30,
	standardHeaders: "draft-8",
	legacyHeaders: false,
	ipv6Subnet: 56,
});

const router = express.Router();

router.get("/", getDesktopWebshot);
router.get("/mobile/", getMobileWebshot);

app.use(limiter);
app.use("/", router);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
