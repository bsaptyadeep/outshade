const router = require("express").Router();
const Category = require('../models/category');
const Product = require('../models/product');

router.post('/', async (req, res) => {
    try {
        let pro = await Product.findOne({ category: req.body.category, product: req.body.product })
        let cat = await Category.findOne({ category: req.body.category })
        if (pro) {
            res.status(201).send({ message: "This product already present" });
        }
        else if(!cat)
        {
            res.status(400).send({message: "This category does not exit! Try again"});
        }
        else {
            pro = await new Product({ category: req.body.category, product: req.body.product }).save();
            res.status(200).send({ message: "Product Added" })
        }
    }
    catch (err) {
        res.status(400).send({ error: err });
    }
}).get('/', async (req, res) => {
    try {
        const product = await Product.find();
        if(product.length==0)
        res.status(201).send({message: "No category defined", pro: product});
        else
        res.status(200).send({pro: product})
    }
    catch(er)
    {
        res.status(401).send({error: er});
    }
})
.delete('/', async (req, res) => {
    console.log(req.body);
    Product.deleteOne({ _id: req.body._id }).then(function(){
        console.log("Data deleted"); 
        res.status(200).send({message: "Data deleted"})// Success
    }).catch(function(error){
        res.status(400).send({message: `Delete Failed, Error: ${error}`})
        console.log(error); // Failure
    });
})

module.exports = router;