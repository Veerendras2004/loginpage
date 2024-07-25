const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connecting to MongoDB
mongoose.connect('mongodb+srv://veerendrasvikky:YG6DtlLuNHfnR9BD@cluster0.blgtefy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((e) => {
    console.error('Failed to connect to MongoDB', e);
});

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Pre-save middleware to hash the password
LoginSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next(); // Call next to proceed
    } catch (error) {
        console.error('Error while hashing password:', error);
        next(error); // Pass the error to the next middleware or error handler
    }
});

// Defining the collection using .model() method
const User = mongoose.model('users', LoginSchema);

// Exporting the collection
module.exports = User;
