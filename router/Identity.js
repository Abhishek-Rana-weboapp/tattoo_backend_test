const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
const db = require('../db');





function updateIdentityTable(userID, latestUserIdentityID = null, latestGuardianIdentityID = null, username, res) {
    // Fetch existing identity records
    db.get(`SELECT LatestUserIdentityID, LatestGuardianIdentityID, IdentityID FROM Identity WHERE UserID = ?`, [userID], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });

        let existingUserIdentityID = row ? row.LatestUserIdentityID : null;
        let existingGuardianIdentityID = row ? row.LatestGuardianIdentityID : null;

        // Update variables with new IDs if provided
        if (latestUserIdentityID !== null) {
            existingUserIdentityID = latestUserIdentityID;
        }
        if (latestGuardianIdentityID !== null) {
            existingGuardianIdentityID = latestGuardianIdentityID;
        }

        // Determine if we need to update or insert
        const updateIdentitySQL = row ?
            `UPDATE Identity SET LatestUserIdentityID = ?, LatestGuardianIdentityID = ?, username = ? WHERE UserID = ?` :
            `INSERT INTO Identity (UserID, LatestUserIdentityID, LatestGuardianIdentityID, username) VALUES (?, ?, ?, ?)`;

        // Update or insert into the Identity table
        db.run(updateIdentitySQL, [existingUserIdentityID, existingGuardianIdentityID, username, userID], function (err) {
            if (err) return res.status(500).json({ error: err.message });

            const identityID = this.lastID || row.IdentityID;

            // Fetch the actual UserIDCard and GuardianIDCard values
            db.get(`SELECT UserIDCard FROM UserIdentity WHERE UserIdentityID = ?`, [existingUserIdentityID], (err, userIdentityRow) => {
                if (err) return res.status(500).json({ error: err.message });

                const userIDCard = userIdentityRow ? userIdentityRow.UserIDCard : null;

                if (existingGuardianIdentityID !== null) {
                    db.get(`SELECT GuardianIDCard FROM GuardianIdentity WHERE GuardianIdentityID = ?`, [existingGuardianIdentityID], (err, guardianIdentityRow) => {
                        if (err) return res.status(500).json({ error: err.message });

                        const guardianIDCard = guardianIdentityRow ? guardianIdentityRow.GuardianIDCard : null;

                        // Update servicecategory with both userIDCard and guardianIDCard
                        db.run(`UPDATE servicecategory SET id_url = ?, gaurdian_id = ? WHERE username = ?`,
                            [userIDCard, guardianIDCard, username], function (err) {
                                if (err) return res.status(500).json({ error: err.message });

                                res.status(row ? 200 : 201).json({ message: row ? "Identity table updated" : "Identity table created", IdentityID: identityID });
                            });
                    });
                } else {
                    // Update servicecategory with only userIDCard
                    db.run(`UPDATE servicecategory SET id_url = ? WHERE username = ?`,
                        [userIDCard, username], function (err) {
                            if (err) return res.status(500).json({ error: err.message });

                            res.status(row ? 200 : 201).json({ message: row ? "Identity table updated" : "Identity table created", IdentityID: identityID });
                        });
                }
            });
        });
    });
}



// API to add or update UserIdentity
// router.post('/user_identity', (req, res) => {
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (!token) return res.status(401).json({ error: 'Token missing' });

//     const decoded = jwt.decode(token, { complete: true });
//     const payload = decoded.payload;

//     const user_id = payload.user_id;
//     const username = payload.username;
//     const { UserIDCard } = req.body;

//     db.run(`INSERT INTO UserIdentity (UserID, username, UserIDCard) VALUES (?, ?, ?)`,
//         [user_id, username, UserIDCard], function (err) {
//             if (err) return res.status(500).json({ error: err.message });

//             const newUserIdentityID = this.lastID;
//             // Update Identity table with the latest UserID
//             //updateIdentityTable(user_id, newUserIdentityID, null, username, res);
//         });
// });

router.post('/user_identity', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token missing' });

    const decoded = jwt.decode(token, { complete: true });
    const payload = decoded.payload;

    const user_id = payload.user_id;
    const username = payload.username;
    const {UserIDCard} = req.body;  // Assuming 'id_url' is part of the request body

    // Insert into UserIdentity table
    db.run(`INSERT INTO UserIdentity (UserID, username, UserIDCard) VALUES (?, ?, ?)`,
        [user_id, username, UserIDCard], function (err) {
            if (err) return res.status(500).json({ error: err.message });

            const newUserIdentityID = this.lastID;

            // Update Identity table with the latest UserID
            //updateIdentityTable(user_id, newUserIdentityID, null, username, res);

            // Update servicecategory table with id_url for the given username
            db.run(`UPDATE servicecategory SET id_url = ? WHERE username = ?`, [UserIDCard, username], function (err) {
                if (err) return res.status(500).json({ error: err.message });

                res.status(200).json({ message: 'UserIdentity and servicecategory updated successfully.' });
            });
        });
});


// API to add or update GuardianIdentity
// router.post('/guardian_identity', (req, res) => {
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (!token) return res.status(401).json({ error: 'Token missing' });

//     const decoded = jwt.decode(token, { complete: true });
//     const payload = decoded.payload;

//     const user_id = payload.user_id;
//     const username = payload.username;
//     const { GuardianIDCard } = req.body;

//     db.run(`INSERT INTO GuardianIdentity (UserID, username, GuardianIDCard) VALUES (?, ?, ?)`,
//         [user_id, username, GuardianIDCard], function (err) {
//             if (err) return res.status(500).json({ error: err.message });

//             const newGuardianIdentityID = this.lastID;
//             // Update Identity table with the latest GuardianID
//             //updateIdentityTable(user_id, null, newGuardianIdentityID, username, res);
//         });
// });

router.post('/guardian_identity', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token missing' });

    const decoded = jwt.decode(token, { complete: true });
    const payload = decoded.payload;

    const user_id = payload.user_id;
    const username = payload.username;
    const {GuardianIDCard} = req.body;  // Assuming 'id_url' is part of the request body

    // Insert into GuardianIdentity table
    db.run(`INSERT INTO GuardianIdentity (UserID, username, GuardianIDCard) VALUES (?, ?, ?)`,
        [user_id, username, GuardianIDCard], function (err) {
            if (err) return res.status(500).json({ error: err.message });

            const newGuardianIdentityID = this.lastID;

            // Update Identity table with the latest GuardianID
            //updateIdentityTable(user_id, null, newGuardianIdentityID, username, res);

            // Update servicecategory table with id_url for the given username
            db.run(`UPDATE servicecategory SET gaurdian_id = ? WHERE username = ?`, [GuardianIDCard, username], function (err) {
                if (err) return res.status(500).json({ error: err.message });

                res.status(200).json({ message: 'GuardianIdentity and servicecategory updated successfully.' });
            });
        });
});

// API to fetch the latest identity details
router.get('/latest_identity', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token missing' });

    const decoded = jwt.decode(token, { complete: true });
    const payload = decoded.payload;

    const user_id = payload.user_id;

    // Fetch latest UserIdentity
    db.get(`SELECT * FROM UserIdentity WHERE UserID = ? ORDER BY UpdatedAt DESC LIMIT 1`, [user_id], (err, userRow) => {
        if (err) return res.status(500).json({ error: err.message });

        // Fetch latest GuardianIdentity
        db.get(`SELECT * FROM GuardianIdentity WHERE UserID = ? ORDER BY UpdatedAt DESC LIMIT 1`, [user_id], (err, guardianRow) => {
            if (err) return res.status(500).json({ error: err.message });

            res.status(200).json({
                useridentity: userRow ? {
                    userid: userRow.UserID,
                    username: userRow.username,
                    useridcard: userRow.UserIDCard,
                    updatedat: userRow.UpdatedAt
                } : null,
                guardianidentity: guardianRow ? {
                    userid: guardianRow.UserID,
                    username: guardianRow.username,
                    guardianidcard: guardianRow.GuardianIDCard,
                    updatedat: guardianRow.UpdatedAt
                } : null
            });
        });
    });
});


router.get('/user-identities', (req, res) => {
    const sql = 'SELECT * FROM GuardianIdentity';
  
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('Error executing query:', err.message);
        res.status(500).json({ error: 'Failed to retrieve data' });
      } else {
        res.json(rows);
      }
    });
  });



module.exports = router;