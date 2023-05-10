import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticketify", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  const data = JSON.stringify({
    id: "123",
    title: "concert",
    price: 5959595,
  });

  stan.publish("ticket:created", data, () => {
    console.log("Event Published");
  });
});