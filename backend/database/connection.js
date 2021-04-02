const mongoose = require('mongoose');
const url = process.env.MONGODB_URL;
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}).then((connect) => {
    try {
        console.log(`Server has successfully connected to ${connect.connection.host} mongoDB!`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
});