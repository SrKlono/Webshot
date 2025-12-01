import { chromium, devices } from "playwright";
import { isValidURL } from "../utils/utils.js";

export async function getDesktopWebshot(req, res) {
	try {
		getWebshot(devices["Desktop Chrome"], req, res);
	} catch (error) {
		console.log("Error in getDesktopWebshot", error);
	}
}

export async function getMobileWebshot(req, res) {
	try {
		getWebshot(devices["iPhone 14 Pro Max"], req, res);
	} catch (error) {
		console.log("Error in getMobileWebshot", error);
	}
}

async function getWebshot(device, req, res) {
	const url = req.query.url;

	if (!url) {
		res.status(400).json({ message: "No URL provided" });
		return;
	}

	if (!isValidURL(url)) {
		res.status(400).json({ message: "Invalid URL" });
		return;
	}

	const browser = await chromium.launch();
	const context = await browser.newContext(device);
	const page = await context.newPage();

	try {
		await page.goto(url, { waitUntil: "load", timeout: 60000 });
	} catch (error) {
		console.log("Error in getWebShot", error);
		if (error.name === "TimeoutError") {
			res.status(408).json({ message: "Timeout of 1 minute exceeded." });
			return;
		}
		res.status(400).json({ message: "Error loading website" });
		return;
	}

	const buffer = await page.screenshot({
		fullPage: true,
	});

	await context.close();
	await browser.close();

	res.set("Content-Type", "image/png");
	res.send(buffer);
}
