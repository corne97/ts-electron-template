import express from "express";
import bodyParser from "body-parser";

const HOST = "127.0.0.1";
const PORT = 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/users", function(_, res)
{
	res.send("Users :D");
});

app.listen(PORT, HOST, () => console.log(`server listening on http${env.isDev ? "" : "s"}://${HOST}:${PORT}`));
