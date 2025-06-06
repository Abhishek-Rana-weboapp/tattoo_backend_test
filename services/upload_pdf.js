const fs = require('fs');
const { google } = require('googleapis');
const apikeys = require('../api.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];

async function authorize() {
    const jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );
    await jwtClient.authorize();
    return jwtClient;
}

async function createFolder(authClient, parentFolderId, folderName) {
    return new Promise((resolve, reject) => {
        const drive = google.drive({ version: 'v3', auth: authClient });
        const fileMetadata = {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [parentFolderId]
        };
        drive.files.create({
            resource: fileMetadata,
            fields: 'id'
        }, (error, file) => {
            if (error) {
                return reject(error);
            }
            resolve(file.data.id);
        });
    });
}

async function uploadFile(authClient, folderId, filePath, mimeType, fieldName) {
    return new Promise((resolve, reject) => {
        const drive = google.drive({ version: 'v3', auth: authClient });
        const fileMetaData = {
            name: fieldName, // Use the field name as the file name
            parents: [folderId]
        };
        drive.files.create({
            resource: fileMetaData,
            media: {
                body: fs.createReadStream(filePath),
                mimeType: mimeType
            },
            fields: 'id'
        }, (error, file) => {
            if (error) {
                return reject(error);
            }
            resolve(file);
        });
    });
}


module.exports = {
    authorize,
    createFolder,
    uploadFile
};
