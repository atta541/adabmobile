const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/adabresturent', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected Successfully!');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error);
        process.exit(1); 
    }
};

module.exports = connectDB;



// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://atta:attaurrehman@adab.6ocmc.mongodb.net/adabbackend?retryWrites=true&w=majority', {

//             useNewUrlParser: true,
//             useUnifiedTopology: true 
//         });
//         console.log('MongoDB Connected Successfully!');
//     } catch (error) {
//         console.error('MongoDB Connection Failed:', error);
//         process.exit(1); 
//     }
// };

// module.exports = connectDB;
