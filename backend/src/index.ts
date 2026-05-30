import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/auth.js";
import quizRouter from "./routes/quiz";
import messagesRouter from "./routes/messages";


const app = express();
const PORT = process.env.PORT;

if (!PORT) throw new Error("PORT is missing in your env file");
if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is missing in your env file');

app.use(
    cors({
        origin: "http://localhost:5173", // Vite dev server (frontend)
        credentials: true,
    })
);

// Parse JSON bodies before route handlers are mounted
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/quiz", quizRouter);
app.use("/api/messages", messagesRouter);

app.get("/", (req, res) => {
res.send("Server is running 🚀");
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:%d", PORT);
});
