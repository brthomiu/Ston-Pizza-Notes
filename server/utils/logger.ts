import logger, { P } from "pino";
import dayjs from "dayjs";

const level: string = "info";

const log = logger({
  transport: {
    target: "pino-pretty",
  },
  level,
  base: {
    pid: false,
  },
  timestamp: () => `,"Time":"${dayjs().format()}"`
});

export default log