import data from "./../data.json";
import dataStores from './../data/stores'
import dataCategories from './../data/categories'
import dataProducts from './../data/products.json'

export function getAllStores() {
  const category1 = dataStores;
  const value = Math.floor(category1.length / 2);
  const category2 = category1.splice(0, value);
  return [category1, category2];
}
export function _getAllStores() {
  return dataStores
}

export function getAllCategories() {
  return dataCategories;
}

export function getProductsxCategories(){
  const category1 = dataProducts;
  const value = Math.floor(category1.length / 2);
  const category2 = category1.splice(0, value);
  return [category1, category2];
}

function getTwoCategories(archive) {
  /* La función obtiene 2 categorías a partir de la info de data.json */
  const category1 = archive.slice(0);
  const value = Math.floor(category1.length / 2);
  const category2 = category1.splice(0, value);
  return [category1, category2];
}

export const myCategories = getTwoCategories(data);

export const myproducts = getProductsxCategories();

export const mystores = getAllStores();


