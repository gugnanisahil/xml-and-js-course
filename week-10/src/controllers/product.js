
const products = require("../data/products.json");

const getAll = ({id, name, description, price}) =>
new Promise((resolve) => {
  let filtered = Array.from(products);

  if(id){
    filtered = filtered.filter((item) => item.id === id);
  }

  if(name){
    filtered = filtered.filter((item) => item.name === name);
  }
  if(description){
    filtered = filtered.filter((item) => item.description === description);
  }

  if(price){
    filtered = filtered.filter((item) => item.price === Number(price));
  }
  resolve({code: 200, data: filtered});
});

const getById = (id) => new Promise((resolve) => {
  const product = products.find((product) => product.id === id);

  if(product) {
    resolve ({code:200 ,data: JSON.stringify(product)});
  }else{
    resolve({code:404, data:{message:'error'},
  });
  }
});

module.exports = {
  getAll,
  getById,
};
