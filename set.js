const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEtmQWNSd2w3eVEzaWRFcGVMeWE1WnRCanoybmhNMGEwS0xLU2wyVW1Xdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUJHRG1aTmY5ekJZK21BRHFvb3l4RTJMNjlsZDZmNHBjdXF5NFU3M1VHUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwUHhKMVdGcWlFcnpJbVZkNExEYy9Bbmk2ZG16MjhNcXd6UmZaVEZzRG5RPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhenhDTTZlU1FiUjh1RzAzcGdUL253Q090cEdyWUhReUJpOXNMWVZ5UVFJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtMU3JLZ3pWMDB2WFdzMkFVUUh3blNabzR1bEZFOU12M2VVTjJMSjRsR289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBHM1UyNWhxaTk2WlRXT3BHanBKcngvTDY1enJldmNsUnlweVlwczFoVXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0ZjeGFGQVdwMklaSVJhZytONURWeUE3MzZnK3VqS3NUbytiNkNoNTAxRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiamhkampjTE9TbjZEYU56WFByTEZKcjIwdVV6MUFieHdJSUFkTmZ4ajhuYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IithM0FPMnRBaXlUTm9SSXh4OGJxbU0zRWxieldrTERWc3p0UFdqOFZzZGZCSkczcFQ5VG05dlhKWFF6cWNZL3U1dlJIK3Y0SzdjdE8wUllFeWc5V0N3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAyLCJhZHZTZWNyZXRLZXkiOiJ0SThva0pVWVZHK2ZiemlQTDlyMXYxSmUvYUY2YXNFVlM0dXA4dkQxY2VrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzIsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMiwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJZRVMwTnB4ZVFJVzVQcVlVNHhwVFRRIiwicGhvbmVJZCI6ImU5YTliOTM2LTlmOWYtNDM5MC1iY2JjLTE2M2RlYzg5NWQ3ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFNVNBNjh6M1poVkZTaHh6V0M4eUJLNDJ3QTg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTXhqQXRuOHlIRENsekdPUXVHUjNINW1ObHdrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjRKTDhIUVNOIiwibWUiOnsiaWQiOiIyNTQ3NTg0NDMxMTE6NTBAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lHbW9NOENFSmVJeWNBR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ikd5RVlodVpNYUhtbnJPUVJEL1NIOEwwWVFmM2RoVzRJNFNya3AyTlRQa009IiwiYWNjb3VudFNpZ25hdHVyZSI6InhCcnZDWUxvTHBZbkFUdFlIM1hsVlFCR1BtZU56QkZmYkR0a3RQUUlKN3BmSmRoeE1NN203NWthNnhNQVNDeVVJQjl1RFN2UjNaNmNBbGVEVS9BeUJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI2NXlLQjd5MlRsRzlURjc2anhTaDh4OFdGR3BzS3d3Y3ZVRHRZdFU5SG1wTVZjZ3ZIY3IrMkJKNFlIcGhJQlNzYXpLZGpNNnZIRC9wSWZtUFEvR0JEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc1ODQ0MzExMTo1MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSc2hHSWJtVEdoNXA2emtFUS8waC9DOUdFSDkzWVZ1Q09FcTVLZGpVejVEIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ2MDI3NTU2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUFXeCJ9',
    PREFIXE: process.env.PREFIX || ".",
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
