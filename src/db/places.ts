import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  contact: {type: String, required: true},
  imgURL: {type: String, required: true},
  description: {type: String, required: true},
  urlMaps: {type: String, required: true},
  category: {type: String, required: true},
});

export const PlacesModel = mongoose.model('Place', PlaceSchema);


export const getPlaces = () => PlacesModel.find();
export const getPlaceByName = (name: string) => PlacesModel.findOne({name});

export const getUserByAddress = (address: string) => PlacesModel.findById(address);
export const createPlace = (values: Record<string, any>) => new PlacesModel(values).save().then((place)=> place.toObject());;
export const deletePlaceByName = (name: string) => PlacesModel.findOneAndDelete({ _name: name });
export const updatePlaceByName = (name: string, values: Record<string, any>) => PlacesModel.findByIdAndUpdate({ _name: name, values});

