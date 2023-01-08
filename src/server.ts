import express, { urlencoded } from "express";

const app = express();

const PORT = 3000 || process.env.PORT;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.status(200).json({ message: "hello world" });
});

app.post("/api/data", (req, res) => {
	console.log(req.body);

	return res.sendStatus(200);
});

app.listen(PORT, () => {
	console.log(`Express server is running on port ${PORT}`);
});
