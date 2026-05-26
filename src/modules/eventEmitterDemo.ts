import EventEmitter from "events";

class EventEmitterDemo extends EventEmitter {}

const obj = new EventEmitterDemo();

obj.on("trigger1", (message: string) => {
  console.log(message);
});

export default obj;
