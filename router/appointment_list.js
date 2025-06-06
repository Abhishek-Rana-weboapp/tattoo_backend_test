require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../db');
const userSchema = require('../models/user');
const very_token_admin = require('../middlewares/jwtMiddleware_admin')
const very_token_user = require('../middlewares/jwtMiddleware_user')
const very_token_s_admin = require('../middlewares/jwtMiddleware_s_admin')
const { authorize, createFolder,} = require('../services/upload_pdf');
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const drive = google.drive('v3')


router.post('/appointment_list', (req, res) => {
  const ArtistPiercerNames = req.query.ArtistPiercerNames;
  console.log("data=====", ArtistPiercerNames)
  // Check if ArtistPiercerNames is empty
  if (!ArtistPiercerNames) {
    // Fetch all records without an artist name
    db.all('SELECT * FROM servicecategory WHERE ArtistPiercerNames IS NULL OR ArtistPiercerNames = ""', (err, data) => {
      if (err) {
        console.error('Error fetching data:', err.message);
        return res.status(500).json({ error: 'An error occurred while fetching data.' });
      }

      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'No records found without an ArtistPiercerNames.' });
      }

      // Return the data
      return res.status(200).json({ message: 'Data fetched successfully.', data });
    });
  } else {
    // Use SQL query with LIKE for substring search
    const query = 'SELECT * FROM servicecategory WHERE ArtistPiercerNames LIKE ?';
    const params = [`%${ArtistPiercerNames}%`];

    // Fetch the data based on the provided substring
    db.all(query, params, (err, data) => {
      if (err) {
        console.error('Error fetching data:', err.message);
        return res.status(500).json({ error: 'An error occurred while fetching data.' });
      }

      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'Data not found for the given ArtistPiercerNames.' });
      }

      // Return the data
      return res.status(200).json({ message: 'Data fetched successfully.', data });
    });
  }



});
router.get('/username_appointment_list', (req, res) => {
  const username = req.query.username;
  console.log("data=====", username)
  // Check if ArtistPiercerNames is empty
  if (!username) {
    res.status(404).json(" pls provide username ")

  } else {
    // Use SQL query with LIKE for substring search
    const query = 'SELECT * FROM servicecategory WHERE username LIKE ?';
    const params = [`${username}`];

    // Fetch the data based on the provided substring
    db.all(query, params, (err, data) => {
      if (err) {
        console.error('Error fetching data:', err.message);
        return res.status(500).json({ error: 'An error occurred while fetching data.' });
      }

      if (!data || data.length === 0) {
        return res.status(200).json({ message: 'Data not found for the given ArtistPiercerNames.', data: [] });
      }

      var medicaldta = data[data.length - 1].medicalhistory
      const data1 = JSON.parse(medicaldta);

      const extractedData_medicalhistory = {
        "tattooedBefore": data1["tattooed before"],
        "pregnantOrNursing": data1["Pregnant or Nursing"],
        "hemophiliac": data1["hemophiliac"],
        "medicalCondition": data1["medical condition"],
        "communicableDiseases": data1["communicable diseases"],
        "alcohol": data1["alcohol"],
        "allergies": data1["allergies"],
        "heartCondition": data1["heart condition"]
      };

      const jsonData = JSON.stringify(extractedData_medicalhistory.pregnantOrNursing);

      console.log(jsonData);


      return res.status(200).json({ message: 'Data fetched successfully.', data: data, medicalhistory: extractedData_medicalhistory, emergencycontactnumber: data[data.length - 1].emergencycontactnumber, doctor_information: data[data.length - 1].doctor_information });

    });
  }



});


// router.get('/appointment_list',very_token_admin,(req, res) => {
router.get('/appointment_list', (req, res) => {

  const query = 'SELECT * FROM servicecategory WHERE username IS NOT NULL';


  db.all(query, (err, data) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }

    if (!data || data.length === 0) {
      return res.status(200).json({ message: 'Data not found for the given criteria.', data });
    }

    return res.status(200).json({ message: 'Data fetched successfully.', data });
  });
});

router.get('/appointment_list_id', very_token_admin, (req, res) => {
  const id = req.query.id

  const query = 'SELECT * FROM servicecategory WHERE id= ?';
  const params = [id]


  db.all(query, params, (err, data) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }

    if (!data || data.length === 0) {
      return res.status(200).json({ message: 'data not found for the given criteria.', data });
    }

    return res.status(200).json({ message: 'Data fetched successfully.', data });
  });
});
router.get('/appointment_list_id_user',very_token_user, (req, res) => {
  const id = req.query.id

  const query = 'SELECT * FROM servicecategory WHERE id= ?';
  const params = [id]


  db.all(query, params, (err, data) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }

    if (!data || data.length === 0) {
      return res.status(200).json({ message: 'data not found for the given criteria.', data });
    }

    return res.status(200).json({ message: 'Data fetched successfully.', data });
  });
});
router.get('/billing_list_id', very_token_admin, (req, res) => {
  const id = req.query.id;

  const query = id ? 'SELECT * FROM billingTable WHERE id= ?' : 'SELECT * FROM billingTable';
  const params = id ? [id] : [];

  db.all(query, params, (err, data) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }

    if (!data || data.length === 0) {
      return res.status(200).json({ message: 'Data not found for the given criteria.', data });
    }

    return res.status(200).json({ message: 'Data fetched successfully.', data });
  });

});
router.get('/appointment_list_admin', very_token_s_admin, (req, res) => {

  const query = 'SELECT * FROM servicecategory WHERE (username IS NOT NULL) AND (ArtistPiercerNames IS NULL OR ArtistPiercerNames = "")';

  db.all(query, (err, data) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }

    if (!data || data.length === 0) {
      return res.status(200).json({ message: 'Data not found for the given criteria.', data });
    }

    return res.status(200).json({ message: 'Data fetched successfully.', data });
  });
});



//router.post('/artist_assign',very_token_admin,(req, res) => {
router.post('/artist_assign', very_token_admin, (req, res) => {
  const username = req.body.username;
  const id = req.body.id
  const artistName = req.body.ArtistPiercerNames; // Assuming artistName is the name of the artist to be assigned

  if (!username || !artistName) {
    return res.status(400).json({ error: 'Both username and artistName are required.' });
  }

  // Use an SQL UPDATE statement to assign the artist to the user
  const sql = 'UPDATE servicecategory SET ArtistPiercerNames = ? WHERE username = ? AND id = ?';
  const params = [artistName, username, id];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Error assigning artist:', err.message);
      return res.status(500).json({ error: 'An error occurred while assigning the artist.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'User or artist not found.' });
    }

    return res.status(200).json({ message: 'Artist assigned successfully.' });
  });
});

// Inside the main route handling the billing logic
router.post('/calculate-billing', very_token_admin, (req, res) => {
  const { appointment_id, username, firstname, lastname, price, fix, before_image, after_image, start_time, end_time, break_time, bill_by, video_url } = req.body;

  if (!appointment_id) {
    return res.status(400).json({ error: 'Missing appointment_id in the payload.' });
  }

  // Check if necessary data is provided, otherwise fetch from servicecategory table
  if (!username || !firstname || !lastname || !price || !start_time || !end_time || !break_time || !bill_by || !video_url) {
    db.get('SELECT * FROM servicecategory WHERE id = ?', [appointment_id], (err, serviceData) => {
      if (err) {
        console.error('Error fetching data from servicecategory:', err.message);
        return res.status(500).json({ error: 'Database error' });
      }

      if (!serviceData) {
        return res.status(404).json({ error: 'Service data not found for the provided appointment_id.' });
      }

      // Use data from servicecategory table
      const { username: serviceUsername, firstname: serviceFirstname, lastname: serviceLastname, price: servicePrice, start_time: serviceStartTime, end_time: serviceEndTime, break_time: serviceBreakTime, bill_by: serviceBillBy, video_url: serviceVideoUrl, fix_price: serviceFixPrice } = serviceData;

      // Use service data for billing
      performBillingLogic(appointment_id, serviceUsername, serviceFirstname, serviceLastname, servicePrice, serviceFixPrice, before_image, after_image, serviceStartTime, serviceEndTime, serviceBreakTime, serviceBillBy, serviceVideoUrl, res);
    });
  } else {
    // Use provided data for billing
    performBillingLogic(appointment_id, username, firstname, lastname, price, fix, before_image, after_image, start_time, end_time, break_time, bill_by, video_url, res);
  }
});


function performBillingLogic(appointment_id, username, firstname, lastname, price, fix, before_image, after_image, start_time, end_time, break_time, bill_by, video_url, res) {
  let finalPrice = 0;
  let totalWorkingTime = 0;

  if (fix === 'yes') {
    finalPrice = price;
  } else {
    const startTime = new Date(start_time);
    const endTime = new Date(end_time);
    const breakTimeInMinutes = parseInt(break_time) || 0;

    // Calculate total working time excluding break time
    totalWorkingTime = (((endTime - startTime) / 1000) - breakTimeInMinutes * 60) / 3600; // Convert seconds to hours
    const hourlyRate = price || 0; // Replace with your rate per hour; provide a default value if price is undefined

    finalPrice = hourlyRate * totalWorkingTime; // Total price is the hourly rate multiplied by total working time in hours
  }

  // Update the servicecategory table with the calculated values
  db.run(`UPDATE servicecategory SET final_price = ?, totalWorkingTime = ? WHERE id = ?`,
    [finalPrice, totalWorkingTime, appointment_id],
    function (err) {
      if (err) {
        console.error('Error updating servicecategory:', err.message);
        return res.status(500).json({ error: 'Database error' });
      }

      // Insert or update the billingTable with the calculated values
      db.run(`INSERT OR REPLACE INTO billingTable (appointment_id, username, firstname, lastname, price, before_image, after_image, start_time, end_time, totalWorkingTime, break_time, bill_by, video_url, final_price)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [appointment_id, username, firstname, lastname, price, before_image, after_image, start_time, end_time, totalWorkingTime, break_time, bill_by, video_url, finalPrice],
        function (err) {
          if (err) {
            console.error('Error updating billingTable:', err.message);
            return res.status(500).json({ error: 'Database error' });
          }

          const lastInsertedId = this.lastID;

          db.get('SELECT * FROM billingTable WHERE id = ?', [lastInsertedId], (err, updatedBillingData) => {
            if (err) {
              console.error('Error fetching updated billingTable data:', err.message);
              return res.status(500).json({ error: 'Database error' });
            }

            res.json({ finalPrice, updatedBillingData });
          });
        });
    });
}

async function updateDB(fieldName, fieldValue, usernameid, userName) {
  return new Promise((resolve, reject) => {
      const updateQuery = `
          UPDATE google_drive_upload_filed
          SET ${fieldName} = ?
          WHERE appoinment_id = ?
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


async function uploadFile(authClient, folderId, filePath, fileName, mimeType) {
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

async function postUploadFunction(filesToUpload, folderId, authClient, id) {
  const uploadPromises = filesToUpload.flatMap(file => {
      const urls = file.updateValue.split('||'); // Split multiple URLs
      return urls.map(async (url) => {
          const fileName = path.basename(url);
          const filePath = path.join(__dirname, `../upload/images/${fileName}`);
          const mimeType = file.updateField === 'video_url' ? 'video/mp4' : 'image/png';

          if (fs.existsSync(filePath)) {
              const result = await uploadFile(authClient, folderId, filePath, file.updateField, mimeType);
              console.log("authClient, folderId, filePath, file.updateField, mimeType==", file.updateField);
              if (result) {
                  await updateDB(file.updateField, true, id);
              } else {
                  await updateDB(file.updateField, false, id);
              }
              file.updateValue = `https://drive.google.com/uc?id=${result}`;
          } else {
              console.error(`File not found: ${filePath}`);
              throw new Error(`File not found: ${filePath}`);
          }
          await updateDB("stage", 2, id);
      });
  });

  try {
      await Promise.all(uploadPromises);
  } catch (uploadError) {
      throw new Error(uploadError.message);
  }
}


router.post('/post_new', async (req, res) => {
  const updates = req.body.updates;

  if (!updates || !Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ error: 'Invalid or missing updates array.' });
  }

  const updateFields = updates.map(update => update.updateField);
  const updateValues = updates.map(update => update.updateValue);
  const id = updates[0].id; // Assuming all updates have the same id

  const fileFields = ['before_image', 'after_image', 'video_url', 'fl_form', 'before_video', 'id_url', 'gaurdian_id'];
  const filesToUpdate = updates.filter(update => fileFields.includes(update.updateField));

  try {
      // Fetch the folder_id from the servicecategory table
      db.get('SELECT folder_id FROM servicecategory WHERE id = ?', [id], async (err, row) => {
          if (err) {
              console.error('Error fetching folder_id:', err.message);
              return res.status(500).json({ error: 'An error occurred while fetching folder_id.' });
          }

          if (!row) {
              return res.status(404).json({ error: 'No matching record found.' });
          }

          const folderId = row.folder_id;
          const authClient = await authorize();
          await postUploadFunction(filesToUpdate, folderId, authClient, id);

          // Update servicecategory table
          const sqlServiceCategory = `UPDATE servicecategory SET ${updateFields.map(field => `${field} = ?`).join(', ')} WHERE id = ?`;
          const paramsServiceCategory = [...updateValues, id];
          console.log(paramsServiceCategory)

          db.run(sqlServiceCategory, paramsServiceCategory, function (err) {
              if (err) {
                  console.error('Error updating servicecategory fields:', err.message);
                  return res.status(500).json({ error: 'An error occurred while updating the servicecategory fields.' });
              }

              if (this.changes === 0) {
                  return res.status(404).json({ error: 'No matching record found for servicecategory.' });
              }

              console.log("servicecategory fields updated successfully");

              // Only update Files table if file fields are present
              if (filesToUpdate.length > 0) {
                  const fileUpdates = filesToUpdate.map(fileUpdate => {
                      const fileField = fileUpdate.updateField;
                      const fileValue = fileUpdate.updateValue;
                      // Adjust the following line based on how you determine the file_path and extension
                      const filePath = `path/to/${fileField}`; // Define your logic for file_path
                      const fileName = fileValue; // Assuming file_value is the file name
                      const fileExtension = fileField.split('_').pop(); // Assuming the extension is derived from field name

                      return { fileName, fileField, filePath, fileExtension };
                  });

                  const sqlFilesUpdates = fileUpdates.map(update => `(${id}, '${update.fileName}', '${update.fileExtension}', '${update.filePath}')`).join(', ');

                  const sqlFiles = `INSERT INTO Files (id, file_name, extension, file_path) VALUES ${sqlFilesUpdates}
                                    ON CONFLICT(id) DO UPDATE SET file_name=excluded.file_name, extension=excluded.extension, file_path=excluded.file_path`;

                  db.run(sqlFiles, function (err) {
                      if (err) {
                          console.error('Error updating Files table:', err.message);
                          // Log the error but do not return a response that affects existing functionality
                      } else {
                          console.log('Files table updated successfully.');
                      }
                  });
              }

              // Fetch the updated record from the database
              db.get('SELECT * FROM servicecategory WHERE id = ?', [id], (err, updatedRow) => {
                  if (err) {
                      console.error('Error fetching updated record:', err.message);
                      return res.status(500).json({ error: 'An error occurred while fetching the updated record.' });
                  }

                  // Send the original message and the updated table in the response
                  return res.status(201).json({
                      message: 'Fields updated successfully.',
                      updatedtable: updatedRow
                  });
              });
          });
      });
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'An error occurred while processing the updates.' });
  }
});



router.get('/google_drive_upload_filed', (req, res) => {
  const query = 'SELECT * FROM google_drive_upload_filed';

  db.all(query, [], (err, rows) => {
      if (err) {
          console.error('Error fetching data:', err.message);
          return res.status(500).json({ error: 'An error occurred while fetching data.' });
      }

      return res.status(200).json({ data: rows });
  });
});


router.post('/addArtist', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required.' });
  }

  db.run(`INSERT INTO artistName (username) VALUES (?)`, [username], (err) => {
    if (err) {
      console.error('Error adding artist name:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'Artist name added successfully.' });
  });
});

// Delete Artist Name
router.delete('/deleteArtist', (req, res) => {
  const id = req.query.id;

  db.run(`DELETE FROM artistName WHERE id = ?`, [id], (err) => {
    if (err) {
      console.error('Error deleting artist name:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Artist name deleted successfully.' });
  });
});

// Get All Artist Names
router.get('/getAllArtists', (req, res) => {
  db.all(`SELECT firstname,lastname FROM users WHERE usertype != 'user' AND Active == 1`, (err, rows) => {
    if (err) {
      console.error('Error fetching artist names:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
});
router.get('/user_history', very_token_user, (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const response = {
    medical_history: { tattoo: {}, piercing: {}, 'tooth-gems': {}, 'permanent-makeup': {}, smp: {}, removal: {} },
    emergencycontactnumber: {},
    doctor_information: {},
  };

  db.all(`SELECT * FROM servicecategory WHERE username='${username}'`, (err, rows) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (rows && rows.length !== 0) {
      rows.forEach((item) => {
        const { typeofservice, medicalhistory } = item;
        if (typeofservice in response.medical_history) {
          response.medical_history[typeofservice] = medicalhistory;
        }
      });

      const lastIndex = rows.length - 1;
      response.emergencycontactnumber = rows[lastIndex].emergencycontactnumber;
      response.doctor_information = rows[lastIndex].doctor_information;

      res.json(response);
    } else {
      res.json(response);
    }
  });
});



router.patch('/user_update', (req, res) => {
  const username = req.query.username;
  if (!username) {
      return res.status(400).json({ error: 'Username is required' });
  }

  const { address, city, state, zip, gender, race } = req.body;

  db.run(`UPDATE users SET address = ?, city = ?, state = ?, zip = ?, gender = ?, race = ? WHERE username = ?`,
      [address, city, state, zip, gender, race, username],
      (err) => {
          if (err) {
              return res.status(500).json({ message: 'Internal server error' });
          }

          // First, try to update the UserAddress record
          db.run(`UPDATE UserAddress SET street = ?, city = ?, state = ?, zip = ? WHERE username = ?`,
              [address, city, state, zip, username],
              (err) => {
                  if (err) {
                      return res.status(500).json({ message: 'Internal server error while updating UserAddress' });
                  }

                  // If no rows were updated, insert a new record
                  db.run(`INSERT INTO UserAddress (username, street, city, state, zip) 
                          SELECT ?, ?, ?, ?, ?
                          WHERE NOT EXISTS (SELECT 1 FROM UserAddress WHERE username = ?)`,
                      [username, address, city, state, zip, username],
                      (err) => {
                          if (err) {
                              return res.status(500).json({ message: 'Internal server error while inserting into UserAddress' });
                          }

                          db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
                              if (err) {
                                  return res.status(500).json({ message: 'Internal server error' });
                              }
                              res.status(200).json({ message: 'User details updated successfully.', user: row });
                          });
                      }
                  );
              }
          );
      }
  );
});

module.exports = router;