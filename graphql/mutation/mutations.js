
const { User, Product } = require("../../models");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { UserInputError} = require("apollo-server");
const { where } = require("sequelize");

const mutations = {
    regiter: async (_, args) => {
        let { username, email, password, confirmPassword, phone, fullname } = args;
        let errors = {};
        try {
            // TODO: validade input data
            if (email.trim() === "") errors.email = "email must not be empty";
            if (username.trim() === "") errors.username = "username must not be empty";
            if (fullname.trim() === "") errors.fullname = "fullname must not be empty";
            if (phone.trim() === "") errors.phone = "phone must not be empty";
            if (password.trim() === "") errors.password = "password must not be empty";
            if (confirmPassword.trim() === "") errors.confirmPassword = "repeat password must not be empty";
            if (password !== confirmPassword) errors.confirmPassword = "passwords must match";

            // TODO: chek exist username and password
            const userExist = User.findOne({ where: { username } });
            const userEmail = User.findOne({ where: { email } });
            const userPhone = User.findOne({ where: { phone } });
            if (Object.keys(errors).length > 0) {
                throw errors;
            }

            //TODO: hast  password
            password = await bcrypt.hash(password, 6);
            // TODO: validade create
            const user = await User.create({ username, email, password, phone, fullname });
            // TODO: validade return
            return user;
        } catch (err) {
            console.log(err);
            if (err.name === "SequelizeUniqueConstraintError") {
                err.errors.forEach(
                    (e) => (errors[e.path] = `${e.path} is already taken`)
                );
            } else if (err.name === "SequelizeValidationError") {
                err.errors.forEach((e) => (errors[e.path] = e.message));
            }
            throw new UserInputError("Bad input", { errors });
        }
    }, 
    regiterProduct: async (_, args) => {
        let { name, description, image_id, brand, price, stock, featured } = args;
        let errors = {};
        try {
            // TODO: validade input data
            if (name.trim() === "") errors.name = "name must not be empty";
            if (description.trim() === "") errors.description = "description must not be empty";
            if (image_id.trim() === "") errors.image_id = "image must not be empty";
            if (brand.trim() === "") errors.brand = "brand must not be empty";
            if (price.trim() === "") errors.price = "price must not be empty";
            if (stock.trim() === "") errors.stock = "stock must not be empty";
            if (featured.trim() === "") errors.featured = "ffeatured must not be empty";

            if (Object.keys(errors).length > 0) {
                throw errors;
            }
            const product = await Product.create({ name, price, stock, status, featured, image_id, description, brand });
            return product;
        } catch (err) {
            console.log(err);
            if (err.name === "SequelizeUniqueConstraintError") {
                err.errors.forEach(
                    (e) => (errors[e.path] = `${e.path} is already taken`)
                );
            } else if (err.name === "SequelizeValidationError") {
                err.errors.forEach((e) => (errors[e.path] = e.message));
            }
            throw new UserInputError("Bad input", { errors });
        }
    },
}

module.exports = mutations