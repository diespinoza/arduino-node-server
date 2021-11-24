// # Controllers

const Animation = require('../models/Animation');

const getAllAnimations= async (req,res) => {
  try{
    const animations = await Animation.find({});
    res.status(200).json({animations});
  } catch(error){
    res.status(500).json({msg: error});
  }
}

const createAnimation = async (req,res) => {
  try{
    console.log(req.body);
    const animation = await Animation.create(req.body);
    // res.status(201).redirect('/');
    res.status(201).json({animation});
  } catch (error){
    res.status(500).json({msg: error})
  }
}

const getAnimation = async (req,res) => {
  try{
    const {id: animationID} = req.params;
    const animation = await Animation.findOne({_id:animationID})
    //Check if no animation was found. Returns because
    // it will not go into the catch block
    if(!animation){
      return res.status(404).json({msg: `No animation with id: ${animationID}`});
    }
    //return normally if animation found
    res.status(200).json({animation});
  } catch (error){
    //goes here if the id syntax was incorrect
    res.status(500).json({msg: error});
  }

}

const updateAnimation = async (req,res) => {
  //to update, need the id as well as req.body
  //pass the options into the schema validators too
  try{
    const {id: animationID} = req.params;
    const animation = await Animation.findOneAndUpdate({_id:animationID}, req.body, {
      new: true, //returns the newly updated object
      runValidators: true,
    });

    if(!animation){
      return res.status(404).json({msg: `No animation with id: ${animationID}`});
    }
    //return normally if animation found
    res.status(200).json({animation});
  } catch (error){
    res.status(500).json({msg: error});
  }
}

const deleteAnimation = async (req,res) => {
  try{
    const {id: animationID} = req.params;
    const animation = await Animation.findOneAndDelete({_id:animationID})
    //Check if no animation was found.
    if(!animation){
      return res.status(404).json({msg: `No animation with id: ${animationID}`});
    }
    //return normally if animation found
    //note: you dont have to respond with the object
    //the UI doesnt care. just cares if it was successfull
    console.log(animation);
    res.status(200).json({animation});
  } catch (error){
    res.status(500).json({msg: error});
  }
}

//TODO not sure if needed yet
const getAllDeviceAnimations = async (req,res) => {
  //this will take a device ID
  //Device ID needs to be given based on a different path
  //The devices will also be stored in a different collection
  res.send('get all animations for a device');
}

//Object of controllers functions to export
module.exports = {
  getAllAnimations,
  createAnimation,
  getAnimation,
  updateAnimation,
  deleteAnimation,
  getAllDeviceAnimations
}
