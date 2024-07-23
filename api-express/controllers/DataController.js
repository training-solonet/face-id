import { where } from "sequelize";
import Data from "../model/dataModel";

export const getData = async (req, res) => {
  try {
    const resp = await Data.findAll()
    res.status(200).json(resp)
  } catch (error) {
    console.log(error.message);
  }
};

export const getDataById = async (req, res) => {
    try {
        const resp = await Data.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(resp)
    } catch (error) {
        console.log(error.message)
    }
}

export const saveData = async (req, res) => {
    try {
        await Data.create(req.body)
        res.status(201).json({
            msg: 'Data saved'
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const updateData = async (req, res) => {
    try {
        await Data.update({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            msg: 'Data Updated'
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteData = async (req, res) => {
    try {
        await Data.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            msg: 'Data destroyed'
        })
    } catch (error) {
        console.log(error.message)
    }
}