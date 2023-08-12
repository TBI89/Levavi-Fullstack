import path from "path";
import fs from "fs";

// Error log files:
const errorLogFile = path.join(__dirname, "../1-assets/logs/errors.log");
const activityLogFile = path.join(__dirname, "../1-assets/logs/activities.log");

// Log error:
function logError(message: string, err?: any): void {
    const now = new Date();
    let msgToLog = now.toUTCString() + "\n";
    msgToLog += message + "\n";
    if(err === "string") msgToLog += err + "\n";
    msgToLog += "---------------------------------";
    fs.appendFile(errorLogFile, msgToLog, () => {});
}

// Log activities:
function logActivity(message: string): void {
    const now = new Date();
    let msgToLog = now.toUTCString() + "\n";
    msgToLog += message + "\n";
    msgToLog += "---------------------------------";
    fs.appendFile(activityLogFile, msgToLog, () => {});
}

export default {
    logError,
    logActivity
};