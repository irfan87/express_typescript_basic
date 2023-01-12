import express, { urlencoded, Request, Response, NextFunction } from "express";
import helmet from "helmet";

const app = express();

const PORT = 3000 || process.env.PORT;

app.use(express.json());

app.use(urlencoded({ extended: true }));
app.use(helmet());

// custom middleware function
const middleware =
	({ name }: { name: string }) =>
	(req: Request, res: Response, next: NextFunction) => {
		res.locals.name = name;

		next();
	};

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

function handleGetBookOne(
	req: Request<{ bookID: string; authorID: string }, {}, { name: string }>,
	res: Response,
	next: NextFunction
) {
	const bookID = req.params.bookID;
	const authorID = req.params.authorID;

	req.body.name;

	console.log(`BookID: ${bookID}\nAuthorID: ${authorID}`);

	next();
}

function handleGetBookTwo(req: Request, res: Response, next: NextFunction) {
	// 	req.params.name;
	console.log("SECOND HANDLER");

	console.log(res.locals.name);

	console.log(req.params.name);

	return res.send(req.params);
}

app.use(middleware({ name: "lalisa" }));
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

// handle async errors
const throwError = async () => {
	throw new Error("ERROR!!!!");
};

app.get("/error", async (req: Request, res: Response) => {
	try {
		await throwError();

		res.sendStatus(200);
	} catch (error) {
		res.status(400).send("Something bad happened");
	}
});

app.listen(PORT, () => {
	console.log(`Express server is running on port ${PORT}`);
});
