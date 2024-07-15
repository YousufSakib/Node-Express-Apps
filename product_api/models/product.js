const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "product name must be provided"],
    },
    price: {
        type: Number,
        required: [true, "Price must be provided"],
    },
    rating: {
        type: Number,
        min: [1, "Rating must be greater than or equal to 1"],
        max: [5, "Rating must be smaller than or equal to 5"],
        default: 4.5,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
        type: String,
        enum: {
            values: [
                "Furniture World",
                "Tech Innovators",
                "Apple Inc.",
                "Sports Unlimited",
                "Audio Bliss",
                "Kitchen Delights",
                "Game Masters",
                "Audio Apple",
                "Tech Galaxy",
                "Camera World",
            ],
            message: "{VALUE} is not supported",
        },
    },
});
module.exports = mongoose.model("Product", productSchema);
