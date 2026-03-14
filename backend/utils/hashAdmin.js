const bcrypt = require("bcrypt");

async function hashAdminPassword() {
  const plainPassword = "vani123"; // your current admin password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  console.log("Hashed password:", hashedPassword);
}

hashAdminPassword();