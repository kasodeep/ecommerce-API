const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide product name'],
        maxlength: [100, 'Name cannot be more than 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price'],
        default: 0
    },
    description: {
        type: String,
        required: [true, 'Please provide product description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/deepkcloud/image/upload/v1658654728/E_Commerce/qna91fyomvawdxn9o7gt.jpg'
    },
    category: {
        type: String,
        required: [true, 'Please provide product category'],
        enum: ['office', 'kitchen', 'bedroom', 'general']
    },
    company: {
        type: String,
        required: [true, 'Please provide product company'],
        enum: {
            values: ['ikea', 'liddy', 'marcos', 'oneplus', 'realme', 'other'],
            message: '{VALUE} is not supported'
        }
    },
    colors: {
        type: [String],
        default: ['#222'],
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
    inventory: {
        type: Number,
        required: true,
        default: 15
    },
    averageRating: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    versionKey: false, timestamps: true,
    toJSON: { virtuals: true }, toObject: { virtuals: true }
})

ProductSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
    justOne: false
    // match: { rating: 5 }
})

ProductSchema.pre('remove', async function () {

    // deleting the reviews for deleted product
    await this.model('Review').deleteMany({
        product: this._id
    })
})

module.exports = mongoose.model('Product', ProductSchema)