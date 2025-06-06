const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library
const db = require("../db");
const userSchema = require("../models/user");
const very_token = require("../middlewares/jwtMiddleware_admin");
const bcrypt = require("bcrypt");
const path = require("path");
const send_mail = require(path.join(
  __dirname,
  "..",
  "services",
  "mail_service"
));
const send_mail_ = require("../services/mail_service_");
const verifyToken_admin = require("../middlewares/jwtMiddleware_admin");
const verifyToken_s_admin = require("../middlewares/jwtMiddleware_s_admin");
const very_token_admin = require("../middlewares/jwtMiddleware_admin");
const very_token_user = require("../middlewares/jwtMiddleware_user");
// const uuid = require('uuid');
const { v4: uuidv4 } = require("uuid");
const s_admin_username = "weboappdiscovery";
var s_admin_psw = "webo@123";
const { uploadFile } = require("../services/upload_pdf");

const { google } = require("googleapis");
const apikeys = require("../api.json");
const SCOPE = ["https://www.googleapis.com/auth/drive"];

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
  const drive = google.drive({ version: "v3", auth: authClient });

  // Check if the folder already exists
  const folderSearch = await drive.files.list({
    q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and '${parentFolderId}' in parents`,
    fields: "files(id, name)",
  });

  console.log(folderSearch)

  // If the folder exists, return its ID
  if (folderSearch.data.files.length > 0) {
    console.log("Folder already exists:", folderSearch.data.files[0].id);
    return folderSearch.data.files[0].id; // Return the existing folder ID
  }

  return new Promise((resolve, reject) => {
    console.log("created Folder")
    const fileMetadata = {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentFolderId],
    };
    drive.files.create(
      {
        resource: fileMetadata,
        fields: "id",
      },
      (error, file) => {
        if (error) {
          return reject(error);
        }
        resolve(file.data.id);
      }
    );
  });
}

// router.post('/signup', async (req, res) => {
//   const { username, firstname, lastname, phone_number, dateofbirth, password, lang, usertype } = req.body;

//   if (usertype === 's_admin') {
//     return res.status(400).json({ error: 'Not allowed.' });
//   }

//   const token_ = "365e311dd38d3d225f3a6ce87afa73f0fc787b9c93b1dc24f2e5d492350a6824" + usertype;

//   if (!username || !password || !dateofbirth) {
//     return res.status(400).json({ error: 'Username, password, and date of birth are required.' });
//   }

//   const today = new Date();
//   const birthDate = new Date(dateofbirth);
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const monthDiff = today.getMonth() - birthDate.getMonth();

//   if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }

//   const minor = age < 18;
//   const hashedPassword = bcrypt.hashSync(password, 10);

//   const authClient = await authorize();
//   const parentFolderId = '1uomtQA-RL-WX1Kv8PC7e6YYGPgZydctP';
//   const newFolderId = await createFolder(authClient, parentFolderId, `${firstname}_${username}_${phone_number}`);

//   db.run('INSERT INTO users (username, firstname, lastname, phone_number, dateofbirth, password, minor, lang, usertype, folder_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//     [username, firstname, lastname, phone_number, dateofbirth, hashedPassword, minor.toString(), lang, usertype, newFolderId], (err) => {
//       if (err) {
//         if (err.message.includes('UNIQUE constraint failed: users.username')) {
//           return res.status(400).json({ error: 'Username already exists. Please choose a different one.' });
//         }
//         return res.status(500).json({ error: 'An error occurred while signing up.' });
//       }

//       db.get('SELECT * FROM users WHERE id = last_insert_rowid()', (err, user) => {
//         if (err) {
//           return res.status(500).json({ error: 'An error occurred while fetching user information.' });
//         }

//         const token = jwt.sign({ user_id: user.id, username: user.username, usertype: user.usertype }, token_, { expiresIn: '4h' });

//         return res.status(201).json({ message: 'Signup successful.', token, user });
//       });
//     });
// });



router.post("/signup", async (req, res) => {
  const {
    username,
    firstname,
    lastname,
    phone_number,
    dateofbirth,
    password,
    lang,
    usertype,
  } = req.body;

  if (usertype === "s_admin") {
    return res.status(400).json({ error: "Not allowed." });
  }

  if (!username || !password || !dateofbirth) {
    return res
      .status(400)
      .json({ error: "Username, password, and date of birth are required." });
  }

  // Check if the username already exists
  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "An error occurred while checking username." });
      }

      if (user) {
        // Username already exists, return the same response as before
        return res
          .status(400)
          .json({
            error: "Username already exists. Please choose a different one.",
          });
      }

      // If the username does not exist, proceed with folder creation
      const today = new Date();
      const birthDate = new Date(dateofbirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      const minor = age < 18;
      const hashedPassword = bcrypt.hashSync(password, 10);

      try {
        // Google Drive folder creation
        // const authClient = await authorize();
        const parentFolderId = "1uomtQA-RL-WX1Kv8PC7e6YYGPgZydctP";
        const newFolderId = null;

        // Insert the new user into the database
        db.run(
          "INSERT INTO users (username, firstname, lastname, phone_number, dateofbirth, password, minor, lang, usertype, folder_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            username,
            firstname,
            lastname,
            phone_number,
            dateofbirth,
            hashedPassword,
            minor.toString(),
            lang,
            usertype,
            newFolderId,
          ],
          (err) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "An error occurred while signing up." });
            }

            // Fetch the newly created user
            db.get(
              "SELECT * FROM users WHERE id = last_insert_rowid()",
              (err, user) => {
                if (err) {
                  return res
                    .status(500)
                    .json({
                      error:
                        "An error occurred while fetching user information.",
                    });
                }

                const token_ =
                  "365e311dd38d3d225f3a6ce87afa73f0fc787b9c93b1dc24f2e5d492350a6824" +
                  usertype;
                const token = jwt.sign(
                  {
                    user_id: user.id,
                    username: user.username,
                    usertype: user.usertype,
                  },
                  token_,
                  { expiresIn: "4h" }
                );

                // Same response as before
                return res
                  .status(201)
                  .json({ message: "Signup successful.", token, user });
              }
            );
          }
        );
      } catch (err) {
        console.log(err)
        return res
          .status(500)
          .json({
            error: "An error occurred while creating Google Drive folder.",
          });
      }
    }
  );
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === s_admin_username) {
    if (password === s_admin_psw) {
      const token = jwt.sign(
        { username: username },
        "365e311dd38d3d225f3a6ce87afa73f0fc787b9c93b1dc24f2e5350a6824" +
          "s_admin",
        { expiresIn: "5m" }
      );

      return res.status(200).json({ message: "Login successful.", token });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } else {
    const token_ =
      "365e311dd38d3d225f3a6ce87afa73f0fc787b9c93b1dc24f2e5d492350a6824";

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required." });
    }

    db.get(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, user) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "An error occurred while logging in." });
        }

        if (!user || !bcrypt.compareSync(password, user.password)) {
          return res
            .status(401)
            .json({ error: "Invalid username or password." });
        }

        const token = jwt.sign(
          {
            user_id: user.id,
            username: user.username,
            usertype: user.usertype,
          },
          token_ + user.usertype,
          { expiresIn: "4h" }
        );

        return res
          .status(200)
          .json({ message: "Login successful.", token, user });
      }
    );
  }
});


router.post("/forgot_password", (req, res) => {
  const username = req.body.username;
  console.log("Username:", username);

  if (!username) {
    return res.status(400).json({ error: "Username is required." });
  }

  const getUserSQL = "SELECT * FROM users WHERE username = ?";
  db.get(getUserSQL, [username], (err, user) => {
    if (err) {
      console.error("Error fetching user:", err.message);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching user." });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const resetToken = uuidv4();

    const updateUUIDSQL = "UPDATE users SET uuid = ? WHERE username = ?";
    db.run(updateUUIDSQL, [resetToken, username], (err) => {
      if (err) {
        console.error("Error updating UUID:", err.message);
        return res
          .status(500)
          .json({ error: "An error occurred while updating UUID." });
      }

      const resetLink = `http://122.160.153.204:9000/reset_password?uuid=${resetToken}`;

      send_mail(req, resetLink);

      // Respond with a success message
      res.status(200).json({ message: "Email sent successfully." });
    });
  });
});

router.post("/reset_password", (req, res) => {
  const resetToken = req.body.token;
  const newPassword = req.body.newPassword;
  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  if (!resetToken || !newPassword) {
    return res
      .status(400)
      .json({ error: "Reset token and new password are required." });
  }

  const getUserSQL = "SELECT * FROM users WHERE uuid = ?";
  db.get(getUserSQL, [resetToken], (err, user) => {
    if (err) {
      console.error("Error fetching user:", err.message);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching user." });
    }

    if (!user) {
      return res.status(404).json({ error: "Invalid reset token." });
    }

    // Update the user's password
    const updatePasswordSQL = "UPDATE users SET password = ? WHERE uuid = ?";
    db.run(updatePasswordSQL, [hashedPassword, resetToken], (err) => {
      if (err) {
        console.error("Error updating password:", err.message);
        return res
          .status(500)
          .json({ error: "An error occurred while updating password." });
      }

      // Clear the reset token
      const clearTokenSQL = "UPDATE users SET uuid = NULL WHERE uuid = ?";
      db.run(clearTokenSQL, [resetToken], (err) => {
        if (err) {
          console.error("Error clearing token:", err.message);
          return res
            .status(500)
            .json({ error: "An error occurred while clearing token." });
        }

        res.status(200).json({ message: "Password reset successfully." });
      });
    });
  });
});

router.post("/forgot_password_admin", (req, res) => {
  console.log("data=====", req.body.username);
  const username = req.body.username;

  // Validate input (add more validation as needed)
  if (!username) {
    return res.status(400).json({ error: "Username are required." });
  }
  if (username === s_admin_username) {
    const token = jwt.sign(
      { username },
      "365e311dd38d3d225f3a6ce87afa73f0fc787b9c93b1dc24f2e5d492350a6824" +
        "s_admin",
      { expiresIn: "5m" }
    );
    const link = `http://localhost:3001/reset_password?username=${username}&token=${token}`;
    send_mail(req, link);
    // Fetch the user from the database based on the username
    res.status(200).json({ message: "meil send successful." });
  } else {
    return res.status(400).json({ error: "Username is wrong" });
  }
});

router.post("/reset_password_admin", (req, res) => {
  console.log("---=-=-=-=-=-=-");
  const username = req.query.username;
  const token = req.query.token;
  const jwtSecret =
    "365e311dd38d3d225f3a6ce87afa73f0fc787b9c93b1dc24f2e5d492350a6824" +
    "s_admin";
  const password = req.body.password;

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      console.log("hiiiiiii");
      return res
        .status(403)
        .json({ message: "Token verification failed_____" });
    }
    s_admin_psw = password;
    console.log("psw_update ", s_admin_psw);
    return res.status(200).json({ message: " psw updated   " });
  });
});

router.post("/add_admin", verifyToken_s_admin, (req, res) => {
  const username = req.body.username;

  // Validate input (add more validation as needed)
  if (!username) {
    return res.status(400).json({ error: "Username are required." });
  }

  const token = jwt.sign(
    { username },
    "365e311dd38d3d225f3a6ce87afa73f0fc787b9c93b1dc24f2e5350a6824",
    { expiresIn: "5m" }
  );
  const link = `http://103.190.242.92/invite_artist
  ?username=${username}&token=${token}`;
  send_mail_(req, link);
  // Fetch the user from the database based on the username
  res.status(200).json({ message: "meil send successful." });
});

router.post("/add_admin_", (req, res) => {
  const username = req.query.username;
  const token = req.query.token;
  const jwtSecret =
    "365e311dd38d3d225f3a6ce87afa73f0fc787b9c93b1dc24f2e5350a6824";
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const dateofbirth = req.body.dateofbirth;
  const lang = req.body.lang;
  const minor = "false";
  const usertype = "admin";

  const hashedPassword = bcrypt.hashSync(password, 10);

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token verification failed" });
    }

    // Check if the username exists
    db.run(
      "INSERT INTO users (username, firstname, lastname, dateofbirth, password, minor, lang, usertype) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        username,
        firstname,
        lastname,
        dateofbirth,
        hashedPassword,
        minor.toString(),
        lang,
        usertype,
      ],
      (err) => {
        if (err) {
          // Handle the UNIQUE constraint violation error
          if (
            err.message.includes("UNIQUE constraint failed: users.username")
          ) {
            return res
              .status(400)
              .json({
                error:
                  "Username already exists. Please choose a different one.",
              });
          }
          console.error("Error creating user:", err.message);
          return res
            .status(500)
            .json({ error: "An error occurred while signing up." });
        }
        return res.status(201).json({ massge: "done" });
      }
    );
  });
});

router.post("/updateGuardianInitials/", (req, res) => {
  const userId = req.query.userId;
  const newGuardianInitials = req.body.gaurdian_info;
  console.log("datatatatatattatat====", userId, newGuardianInitials);
  // Update only 'gaurdian_initials'
  db.run(
    "UPDATE users SET gaurdian_info = ? WHERE id = ?",
    [newGuardianInitials, userId],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Guardian initials updated successfully" });
    }
  );
});

router.post("/logout", (req, res) => {
  // Add the JWT token to a list of revoked tokens (you need to implement this)
  // This step is used to invalidate the token so that it can't be used for further requests

  // Respond with a success message indicating that the user is logged out
  res.status(200).json({ message: "Logout successful." });
});

module.exports = router;
