const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}!`);
});

const router = express.Router();

app.get("*", (req, res) => {
  res.json({ message: "Working!" });
});

app.use("/", router);

router.post("/login", (req, res) => {
  const { id, password } = req.body;
  if (id === "guna@gmail.com" && password === "abcdef") {
    const token = generateToken(req.body.id);
    res.status(200).json({ token, message: "Login successful!" });
  } else {
    res.status(401).json({ message: "Invalid password!" });
  }
});

const generateToken = (id) => {
  return jwt.sign(
    {
      id,
      exp: (Date.now() + 24 * 3600 * 1000) / 1000, //24 hours
    },
    process.env.JWT_SECRET
  );
};

//ACCESSING PROTECTED ROUTES
// router.post("/protected1", (req, res) => {
//   try {
//     const token = req.headers.authorization;
//     if (!token) throw { message: "Token missing!" };

//     const verify = jwt.verify(token, process.env.JWT_SECRET);

//     res.json({ message: "Authorized User!" });
//   } catch (err) {
//     res.status(401).json(err);
//   }
// });

// router.post("/protected2", (req, res) => {
//   try {
//     const token = req.headers.authorization;
//     if (!token) throw { message: "Token missing!" };

//     const verify = jwt.verify(token, process.env.JWT_SECRET);

//     res.json({ message: "Authorized User!" });
//   } catch (err) {
//     res.json(err);
//   }
// });

//MIDDLEWARE
const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw { message: "Token missing!" };

    const verify = jwt.verify(token, process.env.JWT_SECRET);

    req.id = verify.id;

    next();
  } catch (err) {
    res.json(err);
  }
};

router.post("/protected1", isAuthenticated, (req, res) => {
  res.json({ message: "You're authenticated", id: req.id });
});

router.post("/protected2", isAuthenticated, (req, res) => {
  res.json({ message: "You're authenticated", id: req.id });
});
