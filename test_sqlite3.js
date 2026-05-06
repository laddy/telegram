try {
  const sqlite3 = require('sqlite3');
  console.log('sqlite3 success');
} catch (e) {
  console.log(e.message);
}
process.exit(0);
