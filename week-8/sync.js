const timeout = (ms = 3000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const inc = (a) => {
  return new Promise((resolve) => timeout().then(() => resolve(a+1)));
};

const sum = function (a, b) {
return new Promise((resolve) =>timeout().then(() => resolve(a+b)));
};

const max = function (a, b) {
 return new Promise((resolve) =>timeout().then(()=>resolve(a > b ? a : b))); 
}

const avg = function (a, b) {
  return new Promise((resolve)=>timeout().then(()=>sum(a,b)).then((s)=>resolve(s / 2)));
};

const obj = {
  name: "Marcus Aurelius",
  split(sep = " ") {
    return this.name.split(sep);
  },
};

class Person {
  constructor(name) {
    this.name = name;
  }

  static of(name) {
    return new Person(name);
  }

  split(sep = " ") {
    return this.name.split(sep);
  }
}

const person = Person.of("Marcus Aurelius");

inc(5).then((x)=> console.log(x));
sum(1,3).then((b)=> console.log(b));
max(3,8).then((x)=> console.log(x));
avg(5,10).then((a)=>console.log(a));
console.log("obj.split() =", obj.split());
console.log("person.split() =", person.split());
