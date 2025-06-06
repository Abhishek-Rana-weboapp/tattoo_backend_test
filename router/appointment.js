const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); 
const db = require('../db');
const userSchema = require('../models/user');
const very_token_admin = require('../middlewares/jwtMiddleware_admin')
const very_token_user = require('../middlewares/jwtMiddleware_user')
const bcrypt = require('bcrypt');
const path = require('path');
const { Console } = require('console');
const send_mail = require(path.join(__dirname, '..', 'services', 'mail_service'));
const { authorize, createFolder } = require('../services/upload_pdf');
const { google } = require('googleapis');
const drive = google.drive('v3')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { file } = require('pdfkit');
const now = new Date();

const path_sig = path.join(__dirname, '../sig_image');

function saveBase64ToFile(base64Data, filePath) {
    const buffer = Buffer.from(base64Data.split(',')[1], 'base64');
    fs.writeFileSync(filePath, buffer);
}
async function uploadFile(authClient, folderId, filePath, mimeType) {

    let fileName = path.basename(filePath);
    fileName=fileName.split('_')[0]
    console.log('data-0------',fileName)
    const fileMetadata = {
        name: fileName,
        parents: [folderId]
    };
    const media = {
        mimeType: mimeType,
        body: fs.createReadStream(filePath)
    };

    try {
        const res = await drive.files.create({
            auth: authClient,
            resource: fileMetadata,
            media: media,
            fields: 'id'
        });

        console.log(`File ${fileName} uploaded successfully with id: ${res.data.id}`);
        return true;
    } catch (error) {
        console.error(`Failed to upload file ${fileName}: ${error.message}`);
        return false;
    }
}

async function updateDB(fieldName, fieldValue, usernameid, userName) {
    return new Promise((resolve, reject) => {
        const updateQuery = `
            UPDATE google_drive_upload_filed
            SET ${fieldName} = ?
            WHERE appoinment_id = ? AND username = ?
        `;
        const params = [fieldValue, usernameid, userName];

        db.run(updateQuery, params, function(err) {
            if (err) {
                console.error('Error updating google_drive_upload_filed:', err.message);
                reject('An error occurred while updating google_drive_upload_filed.');
            } else {
                console.log(`Field ${fieldName} updated to ${fieldValue} for usernameid ${usernameid} and userName ${userName}`);
                resolve('Update successful');
            }
        });
    });
}

async function postupload(images, authClient, newFolderId, usernameid, userName) {
    const uploadPromises = images?.map(async (image) => {
        const filePath = path.join(path_sig, image.name);
        saveBase64ToFile(image.data, filePath);
        res = await uploadFile(authClient, newFolderId, filePath, 'image/png');
        console.log('img data ---', res)
        console.log("file path--", image.name.split('_')[0])
        if (res) {
            await updateDB(image.name.split('_')[0], true, usernameid, userName);
        } else {
            await updateDB(image.name.split('_')[0], false, usernameid, userName);
        }


    });

    await Promise.all(uploadPromises);

}
router.post('/post', (req, res) => {
    const mainfolderid = "1uomtQA-RL-WX1Kv8PC7e6YYGPgZydctP";
    console.log("   add new value   ");
    const {
        username, minor, typeofservice, body_location, medicalhistory, emergencycontactnumber,
        doctor_information, WaiverRelease_url, HoldHarmlessAgreement_url, firstname, lastname,
        before_image, after_image, id_url, ArtistPiercerNames, consent_guard, guardian_info,
        guardian_signature, brief_description, gaurdian_initials, Consent_form, gaurdian_id, count
    } = req.body;

    let img = JSON.parse(HoldHarmlessAgreement_url);
    let initialsImg = img?.initialsImg;
    let signatureurl = img?.signatureurl;
    let gaurdianInitialsImg = img?.gaurdianInitialsImg;
    let gaurdianSignature = img?.gaurdianSignature;

    const now = new Date();
    const formattedDateTime = now.toLocaleDateString('en-US').replace(/\//g, '-');
    const appointmentDate = now.toLocaleDateString('en-US').replace(/\//g, '-');
    const currentDate = now.toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    var newFolderId = null;
    var parentFolderId = null;

    async function main() {
        try {
            // const authClient = await authorize();
            // const drive = google.drive({ version: 'v3', auth: authClient });

            // async function getOrCreateFolder(authClient, parentId, folderName) {
            //     const drive = google.drive({ version: 'v3', auth: authClient });
            //     const response = await drive.files.list({
            //         q: `'${parentId}' in parents and name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
            //         fields: 'files(id, name)',
            //         spaces: 'drive',
            //     });
            //     if (response.data.files.length > 0) {
            //         return response.data.files[0].id;
            //     } else {
            //         const fileMetadata = {
            //             name: folderName,
            //             mimeType: 'application/vnd.google-apps.folder',
            //             parents: [parentId],
            //         };
            //         const file = await drive.files.create({
            //             resource: fileMetadata,
            //             fields: 'id',
            //         });
            //         return file.data.id;
            //     }
            // }

            // async function getParentFolderId(authClient, username) {
            //     const now = new Date();
            //     const year = now.getFullYear().toString();
            //     const month = now.toLocaleString('default', { month: 'long' });
              

            //     const yearFolderId = await getOrCreateFolder(authClient, mainfolderid, year);
            //     const monthFolderId = await getOrCreateFolder(authClient, yearFolderId, month);
            //     const userFolderName = `${username}`;
            //     const userFolderId = await getOrCreateFolder(authClient, monthFolderId, userFolderName);

            //     return userFolderId;
            // }
            // async function createFolder(authClient, parentId, folderName) {
            //     const drive = google.drive({ version: 'v3', auth: authClient });
            //     const fileMetadata = {
            //         name: folderName,
            //         mimeType: 'application/vnd.google-apps.folder',
            //         parents: [parentId], 
            //     };
            
            //     try {
            //         const file = await drive.files.create({
            //             resource: fileMetadata,
            //             fields: 'id',  
            //         });
            //         return file.data.id; 
            //     } catch (error) {
            //         console.error('Error creating folder:', error);
            //         throw new Error('Failed to create folder.');
            //     }
            // }
            

            // parentFolderId = await getParentFolderId(authClient, username);

            // if (!parentFolderId) {
            //     return res.status(400).json({ error: 'Invalid username. Parent folder ID not found.' });
            // }

            // console.log("parent folder id ----", parentFolderId);

            // const cleanPhone = emergencycontactnumber.replace(/^\+/, '');


            // emergencycontactphone =JSON.parse(emergencycontactnumber);
            // phone=emergencycontactphone.phone;
            // console.log("phoneNumberphoneNumber---",phone);

            // let appointmentFolderName = `${firstname}_${phone}_${typeofservice}_${appointmentDate}`;
            // if (minor && minor.toLowerCase() === 'true') {
            //     appointmentFolderName += `_Minor`;
            // }

            // newFolderId = await createFolder(authClient, parentFolderId, appointmentFolderName);
            // console.log("newFolderId---",newFolderId);
            // const newFolderIdforGoooleDrive = "https://drive.google.com/drive/folders/" + newFolderId;

            // const images = [
            //     { data: initialsImg, name: `initialsImg_${uuidv4()}.png` },
            //     { data: signatureurl, name: `signatureurl_${uuidv4()}.png` },
            // ];
            // if (gaurdianInitialsImg) {
            //     images.push({ data: gaurdianInitialsImg, name: `gaurdianInitialsImg_${uuidv4()}.png` });
            //     images.push({ data: gaurdianSignature, name: `gaurdianSignature_${uuidv4()}.png` });
            // }

            db.run(
                'INSERT INTO servicecategory (username, minor, typeofservice, body_location, medicalhistory, emergencycontactnumber, doctor_information, WaiverRelease_url, HoldHarmlessAgreement_url, firstname, lastname, before_image, after_image, id_url, ArtistPiercerNames, Consent_guard, guardian_info, guardian_signature, brief_description, gaurdian_initials, Date, process_step, Consent_form, gaurdian_id, count, folder_id, google_drive_folder_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    username, minor, typeofservice, body_location, medicalhistory, emergencycontactnumber,
                    doctor_information, WaiverRelease_url, HoldHarmlessAgreement_url, firstname, lastname,
                    before_image, after_image, id_url, ArtistPiercerNames, consent_guard, guardian_info,
                    guardian_signature, brief_description, gaurdian_initials, currentDate, 1, Consent_form,
                    gaurdian_id, count, newFolderId, newFolderIdforGoooleDrive,
                ],
                (err) => {
                    if (err) {
                        console.error('Error creating user:', err.message);
                        return res.status(500).json({ error: 'All fields are required' });
                    }

                    // Guardian details saving logic same...
                    if (guardian_info) {
                        const guardianDetails = JSON.parse(guardian_info);

                        db.get('SELECT * FROM guardiandetails WHERE username = ?', [username], (err, row) => {
                            if (err) {
                                console.error('Error fetching guardiandetails:', err.message);
                                return res.status(500).json({ error: 'An error occurred while checking guardian details.' });
                            }
                            if (row) {
                                db.run(
                                    `UPDATE guardiandetails SET firstName=?, lastName=?, dateOfBirth=?, email=?, phoneNumber=?, GuardianIDCard=?, UpdatedAt=? WHERE username=?`,
                                    [
                                        guardianDetails.firstName, guardianDetails.lastName, guardianDetails.dateOfBirth,
                                        guardianDetails.email, guardianDetails.phoneNumber, gaurdian_id, currentDate, username
                                    ]
                                );
                            } else {
                                db.run(
                                    `INSERT INTO guardiandetails (username, firstName, lastName, dateOfBirth, email, phoneNumber, GuardianIDCard, UpdatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                                    [
                                        username, guardianDetails.firstName, guardianDetails.lastName,
                                        guardianDetails.dateOfBirth, guardianDetails.email, guardianDetails.phoneNumber,
                                        gaurdian_id, currentDate
                                    ]
                                );
                            }
                        });
                    }

                    db.get('SELECT * FROM servicecategory WHERE id = last_insert_rowid()', (err, user) => {
                        if (err) {
                            console.error('Error fetching user:', err.message);
                            return res.status(500).json({ error: 'An error occurred while fetching user information.' });
                        }

                        const userData = user;

                        const insertQuery = `
                            INSERT INTO google_drive_upload_filed (username, appoinment_id, minor, lang, First_name, last_name, stage)
                            VALUES (?, ?, ?, ?, ?, ?, ?)
                        `;
                        const params = [
                            userData.username,
                            userData.id,
                            userData.minor,
                            userData.lang,
                            userData.First_name,
                            userData.last_name,
                            1
                        ];

                        db.run(insertQuery, params, function(err) {
                            if (err) {
                                console.error('Error inserting into google_drive_upload_filed:', err.message);
                            }
                        });

                        postupload(images, authClient, newFolderId, userData.id, username);
                        return res.status(201).json({ message: 'successful.', userData });
                    });
                }
            );
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }

    main();
});

router.post("/identity", (req, res) => {
    const userName = req.query.username;
    console.log(userName);
    if (!userName) {
        return res.status(400).json({ message: "Username is required" });
    }

    const { image_url } = req.body;
    const currentDate = new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    // Check if the username already exists in the identityTable
    db.get('SELECT * FROM identityTable WHERE username = ?', [userName], (err, existingUser) => {
        if (err) {
            console.error('Error checking existing user:', err.message);
            return res.status(500).json({ error: 'An error occurred while checking existing user.' });
        }

        if (existingUser) {
            // If user exists, update the record
            db.run(`UPDATE identityTable SET image_url = ?, upload_date = ? WHERE username = ?`, [image_url, currentDate, userName], (err) => {
                if (err) {
                    console.error('Error updating user:', err.message);
                    return res.status(500).json({ error: 'An error occurred while updating user information.' });
                }
                return res.status(200).json({ message: 'Record updated successfully.', identity: existingUser });
            });
        } else {
            // If user doesn't exist, create a new record
            db.run(`INSERT INTO identityTable (image_url, upload_date, username) VALUES (?, ?, ?)`, [image_url, currentDate, userName], (err) => {
                if (err) {
                    console.error('Error creating user:', err.message);
                    return res.status(500).json({ error: 'An error occurred while creating user information.' });
                }

                // Fetch the newly created user information
                db.get(`SELECT * FROM identityTable WHERE username = ?`, [userName], (err, newUser) => {
                    if (err) {
                        console.error('Error fetching user:', err.message);
                        return res.status(500).json({ error: 'An error occurred while fetching user information.' });
                    }
                    return res.status(201).json({ message: 'Record created successfully.', identity: newUser });
                });
            });
        }
    });
});



router.post("/identity_guardian", (req, res) => {
    const userName = req.query.username;
    console.log(userName);
    if (!userName) {
        return res.status(400).json({ message: "Username is required" });
    }

    const { image_url } = req.body;
    const currentDate = new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    // Check if the username already exists in the guardianidentityTable
    db.get('SELECT * FROM guardianidentityTable WHERE username = ?', [userName], (err, existingUser) => {
        if (err) {
            console.error('Error checking existing user:', err.message);
            return res.status(500).json({ error: 'An error occurred while checking existing user.' });
        }

        if (existingUser) {
            // If user exists, update the record
            db.run(`UPDATE guardianidentityTable SET image_url = ?, upload_date = ? WHERE username = ?`, [image_url, currentDate, userName], (err) => {
                if (err) {
                    console.error('Error updating user:', err.message);
                    return res.status(500).json({ error: 'An error occurred while updating user information.' });
                }
                return res.status(200).json({ message: 'Record updated successfully.', identity: existingUser });
            });
        } else {
            // If user doesn't exist, create a new record
            db.run(`INSERT INTO guardianidentityTable (image_url, upload_date, username) VALUES (?, ?, ?)`, [image_url, currentDate, userName], (err) => {
                if (err) {
                    console.error('Error creating user:', err.message);
                    return res.status(500).json({ error: 'An error occurred while creating user information.' });
                }

                // Fetch the newly created user information
                db.get(`SELECT * FROM guardianidentityTable WHERE username = ?`, [userName], (err, newUser) => {
                    if (err) {
                        console.error('Error fetching user:', err.message);
                        return res.status(500).json({ error: 'An error occurred while fetching user information.' });
                    }
                    return res.status(201).json({ message: 'Record created successfully.', identity: newUser });
                });
            });
        }
    });
});

router.get("/identity", (req, res) => {
    const username = req.query.username;

    console.log("username----", username);

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) {
            console.error('Error fetching user:', err.message);
            return res.status(500).json({ error: 'An error occurred while fetching data' });
        }

        console.log("user---", user);

        if (user && user.minor === "true") {
            let m_true = {
                "useridentity": null,
                "guardianidentity": null
            };

            db.get(`SELECT * FROM guardianidentityTable WHERE username = ?`, [username], (err, row1) => {
                if (err) {
                    console.error('Error fetching guardian identity:', err.message);
                    return res.status(500).send({ error: 'An error occurred while fetching guardian identity' });
                }
                if (row1) {
                    m_true.guardianidentity = row1.image_url
                }
                db.get(`SELECT * FROM identityTable WHERE username = ?`, [username], (err, row2) => {
                    if (err) {
                        console.error('Error fetching user identity:', err.message);
                        return res.status(500).json({ error: 'An error occurred while fetching user identity' });
                    }
                    if (row2) {
                        m_true.useridentity = row2.image_url;
                    }
                    res.status(200).send({ identity: m_true });
                });
            });
        }

        else {
            let m_false = {
                "useridentity": null,
                "guardianidentity": null
            };

            db.get(`SELECT * FROM identityTable WHERE username = ?`, [username], (err, row) => {
                if (err) {
                    console.error('Error fetching identity:', err.message);
                    return res.status(500).json({ error: 'An error occurred while fetching identity' });
                }
                if (row) {
                    m_false.useridentity = row.image_url
                }

                res.status(200).send({ identity: m_false });
            });
        }
    });
});


router.get('/search', (req, res) => {
    const username = req.query.username;
    const id = req.query.id
    console.log("id====", id)
    if (!username || !id) {

        return res.status(400).json({ message: "Username and id is required" });
    }

    // Implement a database query to search for records based on the username
    db.all('SELECT * FROM servicecategory WHERE username = ? AND id = ?', [username, id], (err, rows) => {
        if (err) {
            console.error('Error searching for user:', err.message);
            return res.status(500).json({ error: 'An error occurred while searching for users.' });
        }

        // Return the found user data or an empty array if no match was found
        return res.status(200).json({ message: 'Search successful.', userData: rows });
    });

});

router.post('/', (req, res) => {

    const imagePath = `103.190.242.92:8054/profile/${req.file.filename}`;
    res.status(200).json({ massage: 'url.', imagePath })

})
module.exports = router;
