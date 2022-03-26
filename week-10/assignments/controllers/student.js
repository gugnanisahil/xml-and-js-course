const students = require('../student.json')

const getAll = ({ rollno, firstname, lastname, nickname, marks }) =>
  new Promise((resolve) => {
    let studentArray = Array.from(students);
    
    if (rollno) {
        studentArray = studentArray.filter((item) => item.rollno === rollno);
    }

    if (firstname) {
        studentArray = studentArray.filter((item) => item.firstname === firstname);
    }

    if (lastname) {
        studentArray = studentArray.filter((item) => item.lastname === lastname);
    }

    if (nickname) {
        studentArray = studentArray.filter((item) => item.nickname === nickname);
    }

    if (marks) {
        studentArray = studentArray.filter((item) => item.ipaddress === Number(marks));
    }

    resolve({ code: 200, data: studentArray });
  });


  const getById = (id) =>
    new Promise((resolve) => {
    const student = students.find((student) => student.rollno === Number(id));
    if (student) {
      resolve({ code: 200, data: student });
    } else {
      resolve({
        code: 404,
        data: { message: `error` },
      });
    }
  });

module.exports = {
  getAll,
  getById,
};