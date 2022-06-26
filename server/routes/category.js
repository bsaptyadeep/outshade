const router = require("express").Router();
const Category = require('../models/category');

router.post('/', async (req, res) => {
    try {
        let cat = await Category.findOne({ category: req.body.category })
        if (cat) {
            res.status(201).send({ message: "This category already present" });
        }
        else {
            cat = await new Category({ category: req.body.category }).save();
            res.status(200).send({ message: "Category Added" })
        }
    }
    catch (err) {
        res.status(400).send({ error: err });
    }
}).get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        if(categories.length==0)
        res.status(201).send({message: "No category defined", cat: categories});
        else
        res.status(200).send({cat: categories})
    }
    catch(er)
    {
        res.status(401).send({error: er});
    }
}).delete('/', async (req, res) => {
    console.log(req.body);
    Category.deleteOne({ _id: req.body._id }).then(function(){
        console.log("Data deleted"); 
        res.status(200).send({message: "Data deleted"})// Success
    }).catch(function(error){
        res.status(400).send({message: `Delete Failed, Error: ${error}`})
        console.log(error); // Failure
    });
})

module.exports = router;