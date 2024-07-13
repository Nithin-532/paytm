const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config");
const { authMiddleware } = require("../middleware");

const signUpSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string()
})

router.post('/signup', async (req, res) => {
  const body = req.body;
  const { success } = signUpSchema.safeParse(body);

  if (!success) {
    res.status(411).send(
      {
        message: "Incorrect inputs"
      }
    );
    return;
  }

  const existingUser = await User.findOne({
    username: body.username
  })

  if (existingUser) {
    res.status(411).send(
      {
        message: "Email already taken / Incorrect inputs"
      }
    );
    return;
  }

  const newUser = await User.create(body);

  const token = jwt.sign({userId: newUser._id}, JWT_SECRET);

  await Account.create({ userId: newUser._id, balance: Math.random() * 10000 + 1 });

  res.status(200).send({
    message: "User created successfully",
    token: token,
  })

});

const signInParse = (obj) => {
  const safeParseSignIn = zod.object({
    username: zod.string().email(),
    password: zod.string()
  })

  return safeParseSignIn.safeParse(obj);
}

router.post('/signin', async (req, res) => {
  const body = req.body;
  const { success } = signInParse(body);

  if (!success) {
    res.status(411).json({
      message: "Error while logging in"
    });
    return;
  }
  
  const userFound = await User.findOne({
    username: body.username,
    password: body.password
  })

  if (!userFound) {
    res.status(411).json({
      message: "Error while logging in"
    });
    return;
  }

  const token = jwt.sign({ userId: userFound._id }, JWT_SECRET);

  res.status(200).json({ token: token });
})

const userValidation = zod.object({
  password: zod.string().min(6).optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = userValidation.safeParse(body);

  if (!success) {
    res.status(411).json({
      message: "Error while updating information"
    })
  }

  await User.updateOne({ _id: req.userId}, body);

  res.status(200).json({
    message: "Updated successfully"
  });
})

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find(
    { 
      $or: [
      {firstName: {"$regex": filter, "$options": "i"}}, 
      {lastName: {"$regex": filter, "$options": "i"}}
      ]
    });

  console.log(users);

  res.status(200).json({
    users: users.map(user => ({
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
      username: user.username,
    }))
  })
})

module.exports = router;