const fs = require('fs');
const { google } = require('googleapis');
const apikeys = require('./api.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];

// Function to provide access to Google Drive API
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

// Function to create a folder inside a parent folder
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

// Function to upload the desired file to a Google Drive folder
async function uploadFile(authClient, folderId, filePath, mimeType) {
    return new Promise((resolve, reject) => {
        const drive = google.drive({ version: 'v3', auth: authClient });
        const fileMetaData = {
            name: './output.pdf',
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

async function main() {
    try {
        const authClient = await authorize();
        const parentFolderId = '1uomtQA-RL-WX1Kv8PC7e6YYGPgZydctP';
        const newFolderId = await createFolder(authClient, parentFolderId, 'New Folder');
        await uploadFile(authClient, newFolderId, './output.pdf', 'application/pdf');
        console.log('Folder created and file uploaded successfully');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
