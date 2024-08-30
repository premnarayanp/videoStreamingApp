import server from "./index.js";
import connectDB from './src/config/mongoose.js';
const port = process.env.PORT || 8363;

server.listen(port, async function (error) {
    await connectDB();
    if (error) {
        console.log(`Error in running the server:${error}`);
    }
    console.log(`Server is running on port: ${port}`);
});