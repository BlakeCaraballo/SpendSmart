import Dexie from 'dexie';

// Define the structure of your database
const db = new Dexie('budgetApp');
db.version(1).stores({
  charts: '++id, month, data' // Define the 'charts' table with auto-incrementing IDs
});

// Export the database for use in other components
export default db;