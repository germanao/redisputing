const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

module.exports = {
  async create(req, res) {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json("Email já cadastrado!");
      return
    }
    try {
      const user = await User.create({
        name,
        email,
        password,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json("Email não cadastrado!");
      return
    }

    if (await user.matchPassword(password)) {
      console.log(generateToken(user._id))
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
      
    } else {
      res.status(400).json("Senha inválida");
      return
    }
  },
  async update(req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(400).json("Usuário não existe!!");
      return
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    try {
      const updateUser = await user.save();
      res.status(201).json(updateUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async getProfile(req, res) {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded  = jwt.verify(token, process.env.JWT_SECRET);
  
        const id = decoded.id

        const user = await User.findOne({id})
  
        if (user) {
          const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email
          }
          return res.json(userResponse);

        } else {
          res.status(401).json("Não autorizado, usuário não encontrado");
        }
      } catch (error) {
        console.log(error)
        res.status(401).json("Not authorized, no token");
      }
    }
  },
};
