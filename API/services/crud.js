const bcrypt = require("bcryptjs")
// const User = require('../API/models/UserModel');
const Crud = require('../models/CrudModels');

const Salt = 10
module.exports.ValidateCrudname = async function (name) {
    try {
        const userName = await Crud.findOne({ name: name.toLowerCase() }, {
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
        const result = await Crud.findOne({ email: email.toLowerCase() }).exec();
        if (result) { return result; } return null;
    } catch (err) {
        console.error(err.message);
    }
}
module.exports.CrudCreate = async function (req) {
    const { name, email, password, city, zipcode, status } = req;
    let user = new Crud();
    user.name = name?.toLowerCase();
    user.email = email;
    user.password = password;
    user.city = city;
    user.zipCode = zipcode;
    user.status = status;
    user.password = await bcrypt.hash(password, parseInt(Salt));
    const result = await user.save();
    if (result) { return result; } return result;
}
module.exports.GetCrudById = async function (id) {

    const result = await Crud
        .findById({ _id: id, 'stats.deleted': false }, {
            '__v': 0,
            'stats': 0,
            'password': 0,
            'login_attempts': 0,
            'lock_until': 0,
            // 'account.stats': 0,
            // 'account.__v': 0,
            // 'account.default_contact': 0
        }).exec();
    // .populate('account')
    if (result) { return result; }
    return null;
}

module.exports.GetAllCrud = async function () {
    const result = await Crud.find()
    if (result) { return result } return null
}
module.exports.CrudDelete = async function (id) {
    return await Crud.findByIdAndRemove(id);
}

module.exports.ChnagePassword = async function (id, req) {
    const findUser = await Crud.findOne({ _id: id });
    console.log("findUser::",findUser);
    const comparePass = await bcrypt.compare(req.oldpassword, findUser.password);
    if (comparePass) {
        const update = {
            password: await bcrypt.hash(req.newpassword, parseInt(Salt))
        }
        const result = await Crud.findOneAndUpdate({ _id: id }, update);
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
    const findUser = await Crud.findOne({ _id: id });
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
    const findUser = await Crud.findOne({ _id: id });
    console.log("findUser::",findUser);
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

module.exports.CrudUpdate = async function (id, req) {
    const filter = { _id: id };
    console.log("filter",filter);
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
    const result = await Crud.findOneAndUpdate(filter, update);
    if (result) return result;
    return result;
}

