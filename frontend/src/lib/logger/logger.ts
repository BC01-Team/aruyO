import { createLogger, transports, format } from "winston";

const timezoned = () => {
  return new Date().toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
  });
};

const Logger = createLogger({
  format: format.combine(
    format.timestamp({ format: timezoned }),
    format.cli(),
    format.printf((info) => `[${info.timestamp}] ${info.level} ${info.message}`)
  ),
  transports: [new transports.Console()],
});

export default Logger;
