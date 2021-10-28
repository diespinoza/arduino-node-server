// # Controllers

const Animation = require('../models/Animation');

const getAllAnimations= async (req,res) => {
  try{
    res.send('get allturkeyu chicken the tasks');
    //const animation = await Anim
  } catch(error){

  }
}

const createAnimation = (req,res) => {
  res.send('creating a new animation');
}

const getAnimation = (req,res) => {
  res.send('get a single animation');
}

const updateAnimation = (req,res) => {
  res.send('Update a single animation');
}

const deleteAnimation = (req,res) => {
  res.send('delete an animation');
}

const getAllDeviceAnimations = (req,res) => {
  res.send('get all animations for a device');
}

//Object of controllers functions to export
//
module.exports = {
  getAllAnimations,
  createAnimation,
  getAnimation,
  updateAnimation,
  deleteAnimation,
  getAllDeviceAnimations
}
