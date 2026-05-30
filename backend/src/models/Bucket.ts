import mongoose, { Schema, Document } from "mongoose";

export interface IBucket extends Document {
    title: string;
    description?: string;
    completed: boolean;
    tag?: string;
    achievedDay?: number;
}

const bucketSchema = new Schema<IBucket>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
        },
        completed: {
            type: Boolean,
            default: false,
        },
        tag: {
            type: String,
            default: "",
        },
        achievedDay: {
            type: Number,
            default: undefined,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IBucket>("Bucket", bucketSchema);