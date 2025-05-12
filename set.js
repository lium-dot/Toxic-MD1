const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0NCeW9YV29DVkZjcVBySmxRTUFodFk2bXZwZGlwNzdCOWcrK0pxRjFtRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicEFyckVzWWljbkJjOTVyWUJFUWFvY0QyTGZuSHNEeERzSnhlVWZIaDZqcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrT0I0R2ZHK2hWTjh1REdnbUFlVXFrdXFIc2dybUFtNlZIanFMUStGa204PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlQnA2ZVVlYVQyL2FxeGV0U2RaYnR1L0M1OGp6SUVyeGwwQnVZWE5SZkZrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNQYlRzSlEwVWNzUEg5MFVxakxJVjFHRkZWUlRrYXFYRTd3NmJmbEZySDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkE1bjA5ZGZ2eHVQOWJvdGpuZDZJSEd1QWJ1d0EwSUxZQmhuOUJzTFZpRVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkNuSnhoTWExVXcyZTVRNlBTWVlmL3NsQXh0eVI4M1dFQTNTblVYODBFMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWWV0STBWTVNDczRBSENRY3NueWlINkhIb0k1dHF5MUFPSmtTaVZHNXMwOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVsOW5GYXNyMnlXTWVLeDBsdng4ZHVwMWJ5SWdEcDUxYkdTNS9XZkljU0NqdFFGK2xFM2RvbjY0ME1JdmF0SjRLa01PMnpyQXYvWGdRbjRGcUtUNERBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI0LCJhZHZTZWNyZXRLZXkiOiI3dTVwRWx2NXRUekhDRkZBYnlhRzZINzAwdUw3eTNsOVBDODUyT0ZWRUNvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6NjIsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MiwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJTU2hVb3pJaVNYYTl4MXlEOU5jUFZ3IiwicGhvbmVJZCI6ImI1Yzk0NTlmLWNhMDQtNDAyYi1iMDk3LWU1MmE5MzY1ZWZmMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtdzdpL2Q2Y3BESVpTQlY5ejMwNk5Sd2FlUEE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU2dIUVhZdXVCeUYrWGcyRnNYOWhCOUhaWEhBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjNSSEtZQ0VKIiwibWUiOnsiaWQiOiIyNTQ3NTg0NDMxMTE6NzNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09QWXpzZ0VFT1NBaDhFR0dCUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IldHQTlYUEJxSGVzY2l3NDNHTnEyOXU4U2VYM1hDUTdqYWlwVkk2Tm9HWHM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlUwUGZvQ0dma3V3MzlDT2paMVJobUIwTEVuc2VXVDdEMVZnMEFOeFR5ZlBoYWFNM3NtdnFNeWNHaUdTRksvTUlxb2NHSWsxU2lnckNGaFF2SUFTY0RBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJIam9JOWc3cGdiWTRxVExuSWozNlNjYXZoQlo5ZDVMZk5xRTFLS20wYlc0d1IzcTgwbnJxQkQ4cDlXdW91L3VIU09NSUVtT0w0M0dHUEJTNmQrNFdBZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc1ODQ0MzExMTo3M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWaGdQVnp3YWgzckhJc09OeGphdHZidkVubDkxd2tPNDJvcVZTT2phQmw3In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ3MDQyNDE4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURoUSJ9',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254758443111",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '👻T̥ͦO̥ͦX̥ͦI̥ͦC̥ͦ M͎D͎ 👻',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/h0Sw13b/file-1285.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'typing',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
