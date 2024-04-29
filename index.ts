import { Logger } from "./Logger";

export const logger = new Logger();

logger.log("Hello world");
logger.log(666);
logger.log(true);
logger.log(undefined);
logger.log(null);
logger.log([1, 2, 3]);
logger.log({
  id: 124,
  name: "Вася",
});

logger.group("Group name").log("Hello world 1").log("Hello world 2").groupEnd();

logger.withDate().log("Hello world");
logger.warn("Warning text");
logger.error(new Error("Error text"));
