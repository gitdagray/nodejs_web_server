import users from "../models/users.json" assert { type: "json" };
import bcrypt from "bcrypt";

let usersDB = {
  users: users,
  setUsers: function (data) {
    this.users = data;
  },
};

export const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  //check for username in the db
  const foundUser = usersDB.users.find(
    (existingUser) => user === existingUser.username
  );

  if (!foundUser) res.status(401).json({ Message: `user ${user} are exist.` }); //unauthorized
  //evaluate password

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    res.json({ success: `User ${user} is loged in!` });
  } else {
    res.status(401).json({ message: "worng password" });
  }
};
