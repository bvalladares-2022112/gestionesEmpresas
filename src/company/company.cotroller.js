'use strict'

import Company from './company.model.js '
import Category from '../category/category.model.js'
import { checkUpdate } from '../utils/validator.js'
import ExcelJS from 'exceljs'

export const test = (req, res) => {
    console.log('Test is running')
    res.send({ message: 'test company is running' })
}

export const save = async(req,res)=>{
    try{
        let data = req.body
        let category = await Category.findOne({ _id: data.category })
        if(!category) return res.send({message: 'category not found or not exist'})
        let company = new Company(data)
        await company.save()
        return res.send({message: 'company saved successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message:'error saving company'})
    }
}




export const orderAZ = async (req, res) => {
    try {
        let companies = await Company.find().sort({name: 1})
        return res.send({ companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error ordening companies' })
    }
}

export const orderZA = async (req, res) => {
    try {
        let companies = await Company.find().sort({name: -1})
        return res.send({ companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error ordening companies' })
    }
}

export const orderorderAge = async (req, res) => {
    try {
        let companies = await Company.find().sort({age: 1})
        return res.send({ companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error ordening companies' })
    }
}


export const update = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        let update = checkUpdate(data, false)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
    let updateCompany = await Company.findOneAndUpdate(
        {_id: id},
        data,
        {new: true}
        ).populate('category', ['category'])
        if(!updateCompany) return res.status(404).send({message: 'company not found and not updated'})
        return res.send({message: 'company updated successfully', updateCompany})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating company' })
    }
}

export const report = async (req, res) => {
    try {
        const companies = await Company.find();
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Companies');
        worksheet.addRow(['Name', 'Level of Immpact', 'Years', 'Category']);
        companies.forEach(company => {
            worksheet.addRow([
                company.name,
                company.impact,
                company.age,
                company.category
            ]);
        });
        let excel = await workbook.xlsx.writeBuffer();
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=empresas.xlsx');
        res.send(excel);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'error generating excel report' });
    }
};