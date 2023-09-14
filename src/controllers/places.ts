import express from "express";

import {
  deletePlaceByName,
  updatePlaceByName,
  getPlaces,
  createPlace,
  getPlaceByName,
} from "../db/places";

export const createPlaces = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, address, contact, imgURL, description, urlMaps, category } =
      req.body;

    if (
      !name ||
      !address ||
      !contact ||
      !imgURL ||
      !description ||
      !urlMaps ||
      !category
    ) {
      return res.sendStatus(400);
    }

    const existingPlace = await getPlaceByName(name);

    if (existingPlace) {
      return res.sendStatus(400);
    }
    const user = await createPlace({
      name,
      address,
      contact,
      imgURL,
      description,
      urlMaps,
      category,
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAllPlaces = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const places = await getPlaces();

    return res.status(200).json(places);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deletePlace = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name } = req.params;
    const deletedPlace = await deletePlaceByName(name);
    return res.json(deletedPlace);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updatePlace = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name } = req.params;

    const place = await getPlaceByName(name);

    place.name = name;
    await place.save();

    return res.status(200).json(place).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
