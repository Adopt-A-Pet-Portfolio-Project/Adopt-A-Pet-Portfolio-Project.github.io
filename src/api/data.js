import { getUserData } from '../util.js';
import * as api from './api.js';

export const login = api.login;

export const register = api.register;

export const logout = api.logout;

function createPointer(className, objectId) {
    return {
        __type: "Pointer",
        className,
        objectId
    };
}

function addAuthor(object) {
    const { id } = getUserData();
    object.author = createPointer('_User', id);
    return object;
}

//Pets queries

export async function getAllPets() {
    //    const aQuery = new Parse.Query('Pet');
//aQuery.select(['name', 'age', 'gender', 'img', 'category', 'objectId']);
//const results = await aQuery.find();
//console.log(`ParseObjects found: ${JSON.stringify(results)}`);
    return api.get('/classes/Pet');
}

export async function getRecentPets(){
    const urlString = '/classes/Pet?&order=-createdAt&limit=3';
    console.log(urlString);
    return api.get(urlString);
}

export async function getPetById(id) {
    return api.get('/classes/Pet/' + id);
}

export async function createPet(pet) {
    addAuthor(pet);

    const myNewObject = new Parse.Object('Pet');
    myNewObject.set('name', pet.name);
    myNewObject.set('age', pet.age);
    myNewObject.set('city', pet.city);
    myNewObject.set('vaccinated', pet.vaccinated);
    myNewObject.set('neutered', pet.neutered);
    myNewObject.set('description', pet.description);
    myNewObject.set('author', pet.author);
    myNewObject.set('gender', pet.gender);
    myNewObject.set('weight', pet.weight);
    myNewObject.set('category', pet.category);
    myNewObject.set('phone', pet.phone);
    myNewObject.set('adopted', false);
    myNewObject.set('img', new Parse.File(pet.img.name, pet.img));
    try {
        const result = await myNewObject.save();
        // Access the Parse Object attributes using the .GET method
        console.log('Pet created', result);

        return result;
    } catch (error) {
        console.error('Error while creating Pet: ', error);
    }
}

export async function updatePet(pet, id) {
    return api.put('/classes/Pet/' + id, pet);
}

export async function deletePet(id) {
    return api.del('/classes/Pet/' + id);
}
