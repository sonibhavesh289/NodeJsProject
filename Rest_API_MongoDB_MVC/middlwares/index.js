const fs = require("fs");
const logRequest = (filename) => {
    return (req, res, next) => {
        const log = `${Date.now()} : ${req.url}\n`;
        fs.appendFile(filename, log, (err) => {
            if (err)
                console.error(`Error writing log: ${err}`);
            else
                console.log(`Log added - ${log}`);
        });
        next();
    }
}
module.exports = logRequest;
