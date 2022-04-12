const bcrypt = require("bcryptjs")
// const User = require('../API/models/UserModel');
const User = require('../models/UserModel');

const Salt = 10
module.exports.ValidateUsername = async function (name) {
    try {
        const userName = await User.findOne({ name: name.toLowerCase() }, {
            '__v': 0,
            'password': 0,
            'deleted': 0,
            'updated_by': 0,
        }).exec();
        if (userName) { return userName; } return null;
    } catch (err) {
        console.error(err.message);
    }
}
module.exports.ValidateEmail = async function (email) {
    try {
        const result = await User.findOne({ email: email.toLowerCase() }).exec();
        if (result) { return result; } return null;
    } catch (err) {
        console.error(err.message);
    }
}
module.exports.UserCreate = async function (req) {
    const { name, email, password, city, role, status } = req;
    let user = new User();
    user.name = name?.toLowerCase();
    user.email = email;
    user.password = password;
    user.city = city;
    user.role = role;
    user.status = status;
    user.password = await bcrypt.hash(password, parseInt(Salt));
    const result = await user.save();
    if (result) { return result; } return result;
}
module.exports.GetUserById = async function (id) {

    const result = await User
        .findById({ _id: id, 'stats.deleted': false }, {
            '__v': 0,
            'stats': 0,
            'password': 0,
            'login_attempts': 0,
            'lock_until': 0,
            // 'account.stats': 0,
            // 'account.__v': 0,
            // 'account.default_contact': 0
        })
        // .populate('account')
        .exec();
    if (result) { return result; }
    return null;
}

module.exports.GetAllUser = async function () {
    const result = await User.find()
    if (result) { return result } return null
}
module.exports.UserDelete = async function (id) {
    return await User.findByIdAndRemove(id);
}

module.exports.ChnagePassword = async function (id, req) {
    const findUser = await User.findOne({ _id: id });
    console.log("findUser::", findUser);
    const comparePass = await bcrypt.compare(req.oldpassword, findUser.password);
    if (comparePass) {
        const update = {
            password: await bcrypt.hash(req.newpassword, parseInt(Salt))
        }
        const result = await User.findOneAndUpdate({ _id: id }, update);
        if (result) return {
            success: true,
            message: "password is update successfully!"
        }
    }
    else {
        return {
            success: false,
            err: "Old password is wrong"
        }
    }
}

const checkCompanylogo = async function (id, file) {
    const findUser = await User.findOne({ _id: id });
    if (findUser?.companylogo && await fs.existsSync(
        `public/upload/${file[0]?.fieldname}/${findUser?.companylogo}`
    )
    ) {
        await fs.unlinkSync(
            `public/upload/${file[0]?.fieldname}/${findUser?.companylogo}`
        );
    }
}

const checkAvatar = async function (id, file) {
    const findUser = await User.findOne({ _id: id });
    console.log("findUser::", findUser);
    if (findUser?.avatar && await fs.existsSync(
        `public/upload/${file[0]?.fieldname}/${findUser?.avatar}`
    )
    ) {
        console.log("hellooooo");
        // await fs.unlinkSync(
        //     `public/upload/${file[0]?.fieldname}/${findUser?.avatar}`
        // );
    }
}

module.exports.UserUpdate = async function (id, req) {
    const filter = { _id: id };
    console.log("filter", filter);
    let update = {}
    if (req?.files?.avatar) {
        await checkAvatar(id, req?.files?.avatar)
        update = {
            ...req?.body,
            avatar: req?.files?.avatar[0]?.filename
        };
    }
    if (req?.files?.companylogo) {
        await checkCompanylogo(id, req?.files?.companylogo)
        update = {
            ...req?.body,
            companylogo: req?.files?.companylogo[0]?.filename
        };
    }
    if (req?.files?.avatar && req?.files?.companylogo) {
        await checkAvatar(id, req?.files?.avatar)
        await checkCompanylogo(id, req?.files?.companylogo)
        update = {
            ...req?.body,
            companylogo: req?.files?.companylogo[0]?.filename,
            avatar: req?.files?.avatar[0]?.filename
        };
    }
    if (!req?.files?.avatar && !req?.files?.companylogo) {
        update = {
            ...req.body
        };
    }
    const result = await User.findOneAndUpdate(filter, update);
    if (result) return result;
    return result;
}

