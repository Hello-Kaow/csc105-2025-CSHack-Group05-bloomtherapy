import express from "express";
import {
    getBuckets,
    createBucket,
    updateBucket,
    deleteBucket,
} from "../controllers/bucketController";

const router = express.Router();

router.get("/", getBuckets);
router.post("/", createBucket);
router.put("/:id", updateBucket);
router.delete("/:id", deleteBucket);

export default router;