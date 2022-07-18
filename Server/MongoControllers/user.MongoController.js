// const db = require('../DB/dataBase');
const { ObjectId } = require('mongodb');
const userModel=require('../Models/users.schema')

module.exports = {
    getAllUsers: async function (req, res) {
        // const users = await db.getDB().collection("users").find().toArray();
        const users=userModel.find({});
        // res.send(users);
        try {
            res.send(users);
          } catch (error) {
            res.status(500).send(error);
          }
    },

    getUserById: async function (req, res) {
        const id = req.params.id;
        const user = await db.getDB().collection("users").findOne(ObjectId(id));
        res.send(`get user ${user}`)
    },
    addUser: async function (req, res) {
        if (req.body) {
            const user = req.body;
            const inserted = await db.getDB().collection("users").insertOne(user);
            res.send(inserted)
        }
    },
    updateUserDetails: async function (req, res) {
        const userToUpdate = req.body;
        const filter = { _id: ObjectId(req.params.id) };
        const user = await db.getDB().collection("users").updateOne(filter, userToUpdate);
        res.send(`user ${user} updated!`)
    },
    removeUser: async function (req, res) {
        const user = await db.getDB().collection("users").deleteOne({ _id: ObjectId(req.params.id) });
        res.send(`delete user ${user}`)
    }

}