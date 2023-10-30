import users from "../models/users.json" assert { type: "json" };
import fspromises from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let usersDB = {
  users: users,
  setUsers: function (data) {
    this.users = data;
  },
};

export const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  //check for duplicate username in the db
  const duplicate = usersDB.users.find(
    (existingUser) => user === existingUser.username
  );

  if (duplicate) res.status(409).json({"Message":`user ${user} already exist try with different`}); // Conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //store the new user
    const newUser = { username: user, password: hashedPwd };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fspromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
