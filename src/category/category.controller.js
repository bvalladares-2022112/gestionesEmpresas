'use strict'

import Category from './category.model.js'

export const test = (req, res)=>{
    console.log('server is running')
    res.send({message:'test category is running '})
}

export const save = async(req,res)=>{
    try{
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send({message:'category saved succesfully'})

    }catch(err){
        console.error(err)
        return res.status(500).send({message:'error saving category'})
    }
}

export const get = async(req, res)=>{
    try{
        let categories = await Category.find()
        if(!categories) return res.status(404).send({message:'not found '})
        return res.send({categories})
    }catch(err){
        console.error(err)
        return res.status(500).send({message:'error getting categories'})
    }
}

export const update = async(req, res)=>{
    try{
        let {id} = req.params
        let data = req.body
        if(!update) return res.status(400).send({message:'Have submited some data that cannot be update or missing data'})
        let updateCategory = await Category.findOneAndUpdate(
            {_id: id},
            data,
            {new:true} 
        )
        if(!updateCategory) return res.status(404).send({message:'user not found and not update'})
        return res.send({message:`category updated `, updateCategory})
    }catch(err){
        console.error(err)
        return res.status(500).send({message:'error updating category'})
    }
}

export const deleteCategory = async(req, res)=>{
    try{
        let { id } = req.params
        let deleteCategory = await Category.findOneAndDelete({_id: id})
        if(!deleteCategory) return res.status(404).send({message:'category not found and not deleted'})
        return res.send({message: `category ${deleteCategory.category} deleted succesfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message:'error deleting category'})
    }
}
