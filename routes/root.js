import Router from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(
    "index.html",
    {
      root: path.join(__dirname, "..", "views"),
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true,
      },
    },
    (err) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send("An error occurred while trying to send the file.");
      }
    }
  );
});

export default router;
