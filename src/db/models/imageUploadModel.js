var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    file_name: {
        type: String,
        required: true,
    },
    uploaded_time: {
        type: Date,
        required: true,
    },
});
const db = mongoose.connection.useDb(process.env.DB_NAME);
module.exports = db.model('images', imageSchema);
