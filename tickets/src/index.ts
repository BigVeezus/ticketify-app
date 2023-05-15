import "express-async-errors";
import mongoose, { ConnectOptions } from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await natsWrapper.connect("ticketify", "laskjk", "http://nats-srv:4222");

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log("TICKETS db connected to DB");
  } catch (err) {
    console.error(err);
  }

  app.listen(2000, () => {
    console.log("Listening on port 2000 g");
  });
};

start();
