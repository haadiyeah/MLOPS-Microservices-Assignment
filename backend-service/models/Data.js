const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;