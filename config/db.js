const mongoose = require("mongoose");
const colors = require("colors");

module.exports = async (server) => {
  const port=process.env.PORT || 3030
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo connection successful..".green);
    server.listen(port, () =>
      console.log(
        `server running on ${process.env.NODE_ENV} mode, port ${port}..`
          .green
      )
    );
  } catch (error) {
    console.log("mongo connection failed..".red);
    process.exit(1);
  }
};
