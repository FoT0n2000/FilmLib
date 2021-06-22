const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const Category = require('../models/Category')
const router = Router()

router.post("/add", async (req, res) => {
    try{
        const {name} = req.body
        const category = new Category({Name : name, Titles: []})
        
        await category.save()

        res.status(200).json({ message: "категория добавлена"})
    }
    catch{
        res.status(500).json({ message: "категория добавлена"})
    }
})

router.post("/add/:catId", async (req, res) => {
    try{
        const {title} = req.body
        const category = await Category.findById(req.params.catId)

        category.Titles.push(title)
        
        await category.save()

        res.status(200).json({ message: "title добавлен в категорию"})
    }
    catch{
        res.status(500).json({ message: "ошибка"})
    }
})

router.get("/get/:catId", async (req, res) => {
    try {
        const category = await Category.findOne({Name: req.params.catId})
        
        console.log(category)

        if(!category)
            res.status(500).json({ message: "категории с именем " + req.params.catId + " не существует"})

        res.status(200).json({titles : category.Titles})
    }
    catch{
        res.status(500).json({ message: "что-то пошло не так"})
    }
})

router.get("/get", async (req, res) => {
    try{
        var categories = []
        for await (const cat of Category.find()) {
            categories.push({name:cat.Name, id:cat._id})
        }
        
        res.status(200).json({categories: categories})
    }
    catch
    {
        res.status(500).json({message: "ошибка при получении категорий"})
    }
})

router.put("/del/:catId", async (req, res) => {
    const body = req.body

})

router.put("/edit/:catId", async (req, res) => {
    
})

module.exports = router
