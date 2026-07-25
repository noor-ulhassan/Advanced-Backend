import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(
      `
        MongoDB connected! host: ${connect.connection.host}
      `,
    );
  } catch (error) {
    console.log(
      `
        MongoDB connection failed: ${error}
      `,
    );
    process.exit(1);
  }
};

export default connectDB;
