import express from 'express';
import { deletePlace, getAllPlaces, createPlaces, updatePlace } from '../controllers/places';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.post('/places/create', isAuthenticated, createPlaces)
    router.get("/places", isAuthenticated, getAllPlaces);
    router.delete("/places/:id", isAuthenticated, isOwner, deletePlace);
    router.patch('/places/:id', isAuthenticated, isOwner, updatePlace);
}