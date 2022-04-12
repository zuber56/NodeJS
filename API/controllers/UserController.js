let { ValidateUsername, ValidateEmail, UserCreate, GetUserById, GetAllUser, UserDelete, ChnagePassword, UserUpdate } = require('../services/user')
let User = require('../models/UserModel')
let {authentic} = require('../middleware/auth')
let { SendEmail } = require('../services/sendGrid');


module.exports = {

  get: async function (req, res) {
    try {
      const user = await GetAllUser();
      return res.status(200).json({ success: true, data: user });
    } catch (err) {
      return res.status(500).json({ success: false, message: err });
    }
  },

  create: async function (req, res) {

    
    const { name, email,isCreatedByAgency } = req.body
    if (name) {
      const isUsername = await ValidateUsername(name)
      if (isUsername) return res.status(403).json({ success: false, message: 'username is already registered' })
    }
    if (email) {
      const isEmail = await ValidateEmail(email);
      if (isEmail) return res.status(403).json({ success: false, message: 'Email is already registered' });
    }

    try {
      const user = await UserCreate(req.body)
      if (isCreatedByAgency) {

        // console.log("isCreatedByAgency::",isCreatedByAgency);
          await SendEmail(req.body);
      }
      return res.status(200).json({ success: true, data: await GetUserById(user._id) });
    } catch (error) {
      res.status(500).json({ error: error, success: false, message: error })
    }
  },

  getById: async function (req, res) {
    try {
      return res.status(200).json({ success: true, data: await GetUserById(req.params.id) })
    } catch (err) {
      return res.status(500).json({ success: false, message: err?.message });
    }
  },

  delete: async function (req, res) {
    try {
      const result = await UserDelete(req.params.id);
      return res.status(200).json({ success: true, data: result });
    } catch (err) {
      return res.status(500).send({ success: false, message: err });
    }
  },

  chnagePassword: async function (req, res) {
    try {
      const user = await ChnagePassword(req.params.id, req.body);
      if (user.success) { return res.status(200).json(user); }
      else { return res.status(200).json(user); }
    }
    catch (err) {
      return res.status(500).send({ success: false, message: "something went wrong", });
    }
  },
  update: async function (req, res) {
    const {
      username,
      email,
    } = req.body;
    console.log("username", username,email);
    // validate email
    if (email) {
        const isEmail = await ValidateEmail(email);
        if (isEmail) return res.status(403).json({ success: false, message: 'Email is already registered' });
    }

    // validate username
    if (username) {
        const isUsername = await ValidateUsername(username);
        if (isUsername) return res.status(403).json({ success: false, message: 'Username is already registered' });
    }

    try {
      const user = await UserUpdate(req.params.id, req);
       console.log("userupdate::::",user);
      return res.status(200).json({ success: true, data: await GetUserById(user._id) });
    } catch (err) {
      return res.status(500).json({ success: false, message: err?.message });
    }
  },
}


