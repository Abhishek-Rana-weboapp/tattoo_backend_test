const db = require('./db'); // Import your SQLite database connection

//Delete the 'users' table
db.run('DROP TABLE IF EXISTS servicecategory', (err) => {
  if (err) {
    console.error('Error deleting table:', err.message);
  } else {
    console.log('Table servicecategory deleted successfully.');
  }
});

// db.run('DROP TABLE IF EXISTS billingTable', (err) => {
//   if (err) {
//     console.error('Error deleting table:', err.message);
//   } else {
//     console.log('Table billingTable deleted successfully.');
//   }
// });

// db.run('DROP TABLE IF EXISTS users', (err) => {
//   if (err) {
//     console.error('Error deleting table:', err.message);
//   } else {
//     console.log('Table users deleted successfully.');
//   }
// });
// db.run('DROP TABLE IF EXISTS identityTable', (err) => {
//   if (err) {
//     console.error('Error deleting table:', err.message);
//   } else {
//     console.log('Table identityTable deleted successfully.');
//   }
// });
// db.run('DROP TABLE IF EXISTS google_drive_upload_filed', (err) => {
//   if (err) {
//     console.error('Error deleting table:', err.message);
//   } else {
//     console.log('Table google_drive_upload_filed deleted successfully.');
//   }
// });
// db.run('DROP TABLE IF EXISTS UserIdentity', (err) => {
//   if (err) {
//     console.error('Error deleting table:', err.message);
//   } else {
//     console.log('Table UserIdentity deleted successfully.');
//   }
// });

// db.run('DROP TABLE IF EXISTS GuardianIdentity', (err) => {
//   if (err) {
//     console.error('Error deleting table:', err.message);
//   } else {
//     console.log('Table GuardianIdentity deleted successfully.');
//   }
// });

// db.run('DROP TABLE IF EXISTS Identity', (err) => {
//   if (err) {
//     console.error('Error deleting table:', err.message);
//   } else {
//     console.log('Table Identity deleted successfully.');
//   }
// });
// db.run('DROP TABLE IF EXISTS UserAddress', (err) => {
//   if (err) {
//     console.error('Error deleting table:', err.message);
//   } else {
//     console.log('Table UserAddress deleted successfully.');
//   }
// });
// db.run('DROP TABLE IF EXISTS Files', (err) => {
//   if (err) {
//     console.error('Error deleting table:', err.message);
//   } else {
//     console.log('Table Files deleted successfully.');
//   }
// });


