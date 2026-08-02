import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: null,
        },

        price: {
            type: Number,
            required: true,
        },
        imageSize: {
            type: Number,
            required: true,
            min: 0,
        },
        image: {
            data: {
                type: Buffer,
                required: true,
                select: false,
            },

            contentType: {
                type: String,
                required: true,
            },
        },
        stockLeft: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Product ||
    mongoose.model("Product", ProductSchema);