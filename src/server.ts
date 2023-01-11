import express, { urlencoded, Request, Response, NextFunction } from "express";

const app = express();

const PORT = 3000 || process.env.PORT;

app.use(express.json());
app.use(urlencoded({ extended: true }));

// routes
app
	.route("/")
	.get((req: Request, res: Response) => {
		return res.send("You may get a GET request");
	})
	.post((req: Request, res: Response) => {
		return res.send("You may post something with POST request");
	})
	.put((req: Request, res: Response) => {
		return res.send("You may update something with PUT request");
	})
	.delete((req: Request, res: Response) => {
		return res.send("You may delete somethin with DELETE request");
	})
	.all((req: Request, res: Response) => {
		return res.send(`You may used ${req.method} request`);
	});

function handleGetBookOne(req: Request, res: Response, next: NextFunction) {
	const bookID = req.params.bookID;
	const authorID = req.params.authorID;

	console.log(`BookID: ${bookID}\nAuthorID: ${authorID}`);

	next();
}

function handleGetBookTwo(req: Request, res: Response, next: NextFunction) {
	console.log("SECOND HANDLER");

	return res.send(req.params);
}

app.get("/api/books/bookID=:bookID/authorID=:authorID", [
	handleGetBookOne,
	handleGetBookTwo,
]);

app.get("/", (req: Request, res: Response) => {
	res
		.status(200)
		.json({ message: "hello world from Express TS", succes: true });
});

app.get("/api/test", (req: Request, res: Response) => {
	return res.redirect("http://example.com");
});

app.post("/api/data", (req: Request, res: Response) => {
	console.log(req.body);

	return res.sendStatus(200);
});

app.all("/api/all", (req: Request, res: Response) => {
	console.log(req.body);

	return res.sendStatus(200);
});

app.listen(PORT, () => {
	console.log(`Express server is running on port ${PORT}`);
});
