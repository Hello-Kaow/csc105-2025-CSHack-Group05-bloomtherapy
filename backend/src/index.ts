import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";

import authRouter from "./routes/auth.js";
import bucketRoutes from "./routes/bucketRoutes.js";
import diaryRouter from "./routes/diary.js";
import quoteRouter from "./routes/quote.js";
import messageRouter from "./routes/message.js";

const app = express();
const PORT = process.env.PORT;

if (!PORT) throw new Error("PORT is missing in your env file");
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in your env file");
}

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

app.use("/auth", authRouter);

// Add this
app.use("/api/buckets", bucketRoutes);

// Optional, if your frontend uses these later
app.use("/api/diaries", diaryRouter);
app.use("/api/quotes", quoteRouter);
app.use("/api/messages", messageRouter);

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:%d", PORT);
});