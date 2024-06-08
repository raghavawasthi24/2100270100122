const express = require("express");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const tokenMiddleware = require("../middleware/auth.js");
const validSortFields = ["name", "price", "rating", "discount", "availability"];

// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
};

let cacheObj = {};

// Get Products
const getProducts = async (req, res, next) => {
  const {
    n = 10,
    page = 1,
    sortby = "price",
    order = "asc",
    minPrice,
    maxPrice,
  } = req.query;
  const { categoryname, companyname } = req.params;
  const limit = parseInt(n);
  const pageNum = parseInt(page);

  try {
    const response = await axios.get(
      `http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products?top=10&minPrice=1&maxPrice=8000`,
      {
        params: {
          top: n,
          minPrice: minPrice,
          maxPrice: maxPrice,
        },
        headers: {
          Authorization: req.headers["Authorization"],
        },
      }
    );

    let products = response.data.map((product) => {
      const id = uuidv4();
      if (!cacheObj[categoryname]) {
        cacheObj[categoryname] = {};
      }
      cacheObj[categoryname][id] = { ...product, id };
      return cacheObj[categoryname][id];
    });

    if (sortby && validSortFields.includes(sortby)) {
      products = products.sort((a, b) => {
        const valueA = a[sortby];
        const valueB = b[sortby];
        if (order === "asc") {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
    }
    console.log(products);

    const startIndex = (pageNum - 1) * limit;
    const paginatedProducts = products.slice(startIndex, startIndex + limit);

    res.json(paginatedProducts);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { productid } = req.params;
  const { categoryname } = req.params;

  try {
    console.log(cacheObj);
    const product = cacheObj[categoryname][productid];

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getProductById, getProducts };
