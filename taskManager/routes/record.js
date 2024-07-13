const express = require("express");
const router = express.Router();
const db = require("../db/connection.js");

//This help convert the id from string to ObjectId for the _id.
const { ObjectId } = require("mongodb");

router.get("/tasks", async (req, res, next) => {
    try {
        let collection = await db.collection("task_collection");
        let results = await collection.find({}).toArray();
        res.send(results).status(200);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching tasks!");
    }
});

router.post("/tasks", async (req, res, next) => {
    try {
        console.log(req.body.task_name);
        const newDocument = {
            task_name: req.body.task_name,
            is_completed: req.body.is_completed,
        };
        const collection = await db.collection("task_collection");
        const result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error adding a task");
    }
});

router
    .route("/tasks/:id")
    .get(async (req, res, next) => {
        try {
            const collection = await db.collection("task_collection");
            const query = { _id: new ObjectId(req.params.id) };
            const result = await collection.findOne(query);
            if (result) res.status(200).send(result);
            else res.status(404).send("Not found the task");
        } catch (err) {
            res.status(500).send({ error: `${err}` });
        }
    })

    .patch(async (req, res, next) => {
        try {
            const collection = await db.collection("task_collection");
            const query = { _id: new ObjectId(req.params.id) };
            const updates = {
                $set: {
                    task_name: req.body.task_name,
                    is_completed: req.body.is_completed,
                },
            };
            const result = await collection.updateOne(query, updates);
            res.status(200).send(result);
        } catch (err) {
            res.status(500).send({
                msg: "Error updating task!",
                err: `${err}`,
            });
        }
    })

    .delete(async (req, res, next) => {
        try {
            const query = { _id: new ObjectId(req.params.id) };
            const collection = db.collection("task_collection");
            const result = await collection.deleteOne(query);
            res.status(200).send(result);
        } catch (err) {
            res.status(500).send({
                Msg: "Error deleting record",
                error: `${err}`,
            });
        }
    });

module.exports = router;
