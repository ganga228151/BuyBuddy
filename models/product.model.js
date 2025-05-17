import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url: {
            type: String,
        },
        public_id: {
            type: String
        }
    },
    Qty: {
        type: Number,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
    },
    cartUsers:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
}, { timestamps: true });

export const Product = mongoose.model("product", productSchema);