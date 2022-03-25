
const persons = require("../data/people.json");

const getAll = ({id, first_name, last_name, email, gender, ip_address}) =>
new Promise((resolve) => {
  let filtered = Array.from(persons);

  if(id){
    filtered = filtered.filter((item) => item.id === id);
  }

  if(first_name){
    filtered = filtered.filter((item) => item.name === first_name);
  }
  if(last_name){
    filtered = filtered.filter((item) => item.description === last_name);
  }

  if(email){
    filtered = filtered.filter((item) => item.price === email);
  }

  if(gender){
    filtered = filtered.filter((item) => item.price === gender);
  }

  if(ip_address){
    filtered = filtered.filter((item) => item.price === ip_address);
  }
  resolve({code: 200, data: filtered});
});

const getById = (id) => new Promise((resolve) => {
  const person = persons.find((person) => person.id === id);

  if(person) {
    resolve ({code:200 ,data: JSON.stringify(person)});
  }else{
    resolve({code:404, data:{message:'error'},
  });
  }
});

module.exports = {
  getAll,
  getById,
};
