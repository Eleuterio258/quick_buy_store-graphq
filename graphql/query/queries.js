const { User, Role, Product } = require("../../models");
const bcrypt = require("bcryptjs");
const { jwt } = require("jsonwebtoken");
const { Op } = require("sequelize");
const { UserInputError, AuthenticationError } = require("apollo-server");
const { where } = require("sequelize");
//import { Client } from '@paymentsds/mpesa'

const querys = {
    login: async (_, args) => {
        const { username, password } = args;
        let errors = {};
        try {
            if (username.trim() === "") errors.username = "username must not be empty";
            if (password === "") errors.password = "password must not be empty";

            if (Object.keys(errors).length > 0) {
                throw new UserInputError("bad input", { errors });
            }
            const user = await User.findOne({ where: { username } });

            if (!user) {
                errors.username = "user not found";
                throw new UserInputError("user not found", { errors });
            }

            const correctPassword = await bcrypt.compare(password, user.password);

            if (!correctPassword) {
                errors.password = "password incorect";
                throw new AuthenticationError("password incorect", { errors });
            }
            const expiresIn = 60 * 60;
            const token = jwt.sign({ username }, '1lp96y3y', {
                expiresIn: expiresIn,
            });
            return {
                ...user.toJSON(),
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.createdAt.toISOString(),
                expiresIn,
                token,
            };
        } catch (error) {
            throw error;
        }
    },

    role: async (_, __, { user }) => {
        // try {
        //     if (!user) throw new AuthenticationError('Unauthenticated')
        let roles = await Role.findAll();
        return roles;
        // } catch (error) {
        //     console.log(error.message);
        //     throw error
        // }
    },

    getProducts: async () => {
        try {
            let products = await Product.findAll()
            return products
        } catch (error) {
            throw error
        }
    },
    getUsers: async (_, __, { user }) => {
        try {
            if (!user) throw new AuthenticationError('Unauthenticated')
            let users = await User.findAll({
                attributes: [
                    "id", "username", "fullname", "imageUrl", "email", "role", "status", "createdAt", "updatedAt",
                ],


            });
            return users;
        } catch (error) {
            console.log(error.message)
            throw error
        }
    },
}

module.exports = querys