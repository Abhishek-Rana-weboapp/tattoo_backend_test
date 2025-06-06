const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('your-database-file.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the database.');
    checkAndCreateUsersTable();
    checkAndCreateUsersinformationTable();
   
    artistNameTable();
    google_drive_upload_filed()
    userIdentityTable();
    guardianIdentityTable();
    identityTable();
    filesTable();
    userAddressTable();
    fileRelationTable();
    guardiandetails();
    billingTable()
  }
});
let artistNameFlag = false;
let UsersinformationTable = false;
let usersTableCreated = false;
let billingTablecreate = false; // Flag to track if the users table has been created
let userIdentityFlag = false;
let guardianIdentityFlag = false;
let identityFlag = false;
let google_drive_upload = false;
function checkAndCreateUsersTable() {
  if (!usersTableCreated) {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(255) NOT NULL UNIQUE,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255),
            phone_number VARCHAR(15),
            dateofbirth VARCHAR(10) NOT NULL,
            password VARCHAR(64) NOT NULL,
            minor BOOLEAN NOT NULL,
            lang VARCHAR(255) NOT NULL,
            usertype VARCHAR(255) NOT NULL,
            gaurdian_info VARCHAR(255) DEFAULT NULL,
            active BOOLEAN DEFAULT true,
            address VARCHAR(255) DEFAULT NULL,
            city VARCHAR(100) DEFAULT NULL,
            state VARCHAR(100) DEFAULT NULL,
            zip VARCHAR(10) DEFAULT NULL,
            gender VARCHAR(50) DEFAULT NULL,
            race VARCHAR(50) DEFAULT NULL,
            uuid VARCHAR(36) DEFAULT NULL,
            folder_id VARCHAR(255) DEFAULT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table "users" created successfully.');
        usersTableCreated = true; // Set the flag to true after successful creation
      }
    });
  } else {
    console.log('Table "users" already exists.');
  }
}
function checkAndCreateUsersinformationTable() {
  if (!UsersinformationTable) {
    db.run(`
        CREATE TABLE IF NOT EXISTS servicecategory (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          minor TEXT NOT NULL,
          typeofservice TEXT NOT NULL,
          body_location TEXT NOT NULL,
          medicalhistory TEXT NOT NULL,
          emergencycontactnumber INTEGER NOT NULL,
          doctor_information TEXT NOT NULL,
          WaiverRelease_url TEXT NOT NULL,
          HoldHarmlessAgreement_url TEXT ,
          firstname TEXT NOT NULL,
          lastname  TEXT,
          before_image TEXT ,
          after_image TEXT ,
          id_url TEXT ,
          skin_conditions TEXT,
          frontDeskEmployee TEXT,
          ArtistPiercerNames TEXT ,
          Consent_guard TEXT ,
          Shop_location TEXT,
          ArtistAcknowledgement TEXT,
          Date DATE  NOT NULL,
          process_step INTEGER DEFAULT 1,
          complication TEXT,
          Sign_completion TEXT,
          price INTEGER DEFAULT null,
          start_time TEXT DEFAULT null,
          end_time TEXT DEFAULT null,
          totalWorkingTime INTEGER DEFAULT null,
          break_time INTEGER DEFAULT null,
          bill_by TEXT DEFAULT null,
          video_url TEXT DEFAULT null,
          final_price INTEGER DEFAULT null,
          fix_price TEXT DEFAULT null,
          guardian_info TEXT DEFAULT null,
          guardian_signature TEXT DEFAULT null,
          brief_description TEXT DEFAULT null,
          gaurdian_initials TEXT DEFAULT null,
          Consent_form TEXT DEFAULT null,
          gaurdian_id TEXT DEFAULT null,
          before_video TEXT DEFAULT null,
          count INTEGER DEFAULT null,
          fl_form DEFAULT null,
          folder_id TEXT DEFAULT null, 
          tattoo_type TEXT DEFAULT null,
          tattoo_style TEXT DEFAULT null,
          color_style TEXT DEFAULT null,
          google_drive_folder_id null
          
      );
      
          )
        `, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table "UsersinformationTable" created successfully.');
        UsersinformationTable = true; // Set the flag to true after successful creation
      }
    });
  } else {
    console.log('Table "UsersinformationTable" already exists.');
  }
}

//billing table 
function billingTable() {
  if (!billingTablecreate) {
    db.run(`
    CREATE TABLE IF NOT EXISTS billingTable (
      appointment_id INTEGER,
      username TEXT,
      firstname TEXT,
      lastname TEXT,
      id INTEGER PRIMARY KEY,
      price INTEGER NOT NULL,
      before_image TEXT,
      after_image TEXT,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      totalWorkingTime INTEGER ,
      break_time INTEGER NOT NULL,
      bill_by TEXT,
      video_url TEXT,
      final_price INTEGER
  );
  
  
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table "billingTable" created successfully.');
        billingTablecreate = true; // Set the flag to true after successful creation
      }
    });
  } else {
    console.log('Table "billingTable" already exists.');
  }
}

function artistNameTable() {
  if (!artistNameFlag) {
    db.run(`
      CREATE TABLE IF NOT EXISTS artistName (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table "artistName" created successfully.');
        artistNameFlag = true;
      }
    });
  } else {
    console.log('Table "artistName" already exists.');
  }
}

function userIdentityTable() {
  db.run(`
    CREATE TABLE IF NOT EXISTS UserIdentity (
      UserIdentityID INTEGER PRIMARY KEY AUTOINCREMENT,
      UserID INTEGER,
      username TEXT,
      UserIDCard TEXT NOT NULL,
      UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (UserID) REFERENCES users(id)

    )
  `, (err) => {
    if (err) {
      console.error('Error creating UserIdentity table:', err.message);
    } else {
      console.log('Table "UserIdentity" created successfully.');
    }
  });
}
function filesTable() {
  db.run(`
    CREATE TABLE IF NOT EXISTS Files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_name VARCHAR,
      extension VARCHAR,
      file_path TEXT,
      drive_path VARCHAR,
      FOREIGN KEY (id) REFERENCES users(id)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating Files table:', err.message);
    } else {
      console.log('Table "Files" created successfully.');
    }
  });
}

function userAddressTable() {
  db.run(`
    CREATE TABLE IF NOT EXISTS UserAddress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR,
    street VARCHAR,
    city VARCHAR,
    state VARCHAR,
    zip VARCHAR,
    phone TEXT,
    FOREIGN KEY (username) REFERENCES users(username)
);

    )
  `, (err) => {
    if (err) {
      console.error('Error creating UserAddress table:', err.message);
    } else {
      console.log('Table "UserAddress" created successfully.');
    }
  });
}
function guardiandetails() {
  db.run(`
    CREATE TABLE IF NOT EXISTS guardiandetails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR,
    firstName VARCHAR,
    lastName VARCHAR,
    dateOfBirth VARCHAR,
    email VARCHAR,
    phoneNumber VARCHAR,
    GuardianIDCard VARCHAR,
    UpdatedAt VARCHAR,
    FOREIGN KEY (username) REFERENCES users(username)
);

    )
  `, (err) => {
    if (err) {
      console.error('Error creating guardiandetails table:', err.message);
    } else {
      console.log('Table "guardiandetails" created successfully.');
    }
  });
}

// Create GuardianIdentity Table
function guardianIdentityTable() {
  db.run(`
    CREATE TABLE IF NOT EXISTS GuardianIdentity (
      GuardianIdentityID INTEGER PRIMARY KEY AUTOINCREMENT,
      UserID INTEGER,
      username TEXT,
      GuardianIDCard TEXT NOT NULL,
      UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (UserID) REFERENCES users(id)

    )
  `, (err) => {
    if (err) {
      console.error('Error creating GuardianIdentity table:', err.message);
    } else {
      console.log('Table "GuardianIdentity" created successfully.');
    }
  });
}

// Create Identity Table to link UserIdentity and GuardianIdentity
function identityTable() {
  db.run(`
    CREATE TABLE IF NOT EXISTS Identity (
      IdentityID INTEGER PRIMARY KEY AUTOINCREMENT,
      UserID INTEGER,
      LatestUserIdentityID INTEGER,
      LatestGuardianIdentityID INTEGER,
      username TEXT TEXT NOT NULL,
      FOREIGN KEY (UserID) REFERENCES users(id),
      FOREIGN KEY (LatestUserIdentityID) REFERENCES UserIdentity(UserIdentityID)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating Identity table:', err.message);
    } else {
      console.log('Table "Identity" created successfully.');
    }
  });
}
function fileRelationTable() {
  db.run(`
    CREATE TABLE IF NOT EXISTS FileRelation (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_id INTEGER,
      user_id INTEGER,
      guardian_id INTEGER,
      service_id INTEGER,
      file_type VARCHAR,
      FOREIGN KEY (file_id) REFERENCES Files(id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (guardian_id) REFERENCES GuardianIdentity(GuardianIdentityID),
      FOREIGN KEY (service_id) REFERENCES ServiceCategory(id)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating FileRelation table:', err.message);
    } else {
      console.log('Table "FileRelation" created successfully.');
    }
  });
}

function google_drive_upload_filed() {
  if (!google_drive_upload) {
    db.run(`CREATE TABLE IF NOT EXISTS google_drive_upload_filed(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        appoinment_id TEXT NOT NULL,
        minor TEXT NOT NULL,
        lang TEXT DEFAULT NULL,
        First_name TEXT DEFAULT NULL,
        last_name TEXT DEFAULT NULL,
        address TEXT DEFAULT NULL,
        city TEXT DEFAULT NULL,
        state TEXT DEFAULT NULL,
        zip TEXT DEFAULT NULL,
        gender TEXT DEFAULT NULL,
        race TEXT DEFAULT NULL,
        folder_id DEFAULT null,
        initialsImg TEXT DEFAULT null,
        signatureurl TEXT DEFAULT null,
        gaurdianSignature TEXT DEFAULT null,
        gaurdianInitialsImg TEXT DEFAULT null,
        before_image Text DEfAULT null,
        after_image Text DEfAULT null,
        video_url Text DEfAULT null,
        before_video TEXT DEFAULT null,
        fl_form Text DEfAULT null,
        pdf_file Text DEfAULT null,
        id_url Text DEfAULT null,
        gaurdian_id Text DEfAULT null,
        stage INTEGER DEFAULT 0
    )`, (err) => {
      if (err) {
        console.error('Error creating Table:', err.message)
      } else {
        console.log('Table "google_drive_upload_filed" created successfully.');
        google_drive_upload = true;
      }
    })
  }
}

module.exports = db;