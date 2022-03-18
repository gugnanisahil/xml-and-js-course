const loadDataJS = (path) =>
new Promise((resolve) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = ({ target }) => {
    if (target.readyState == 4 && target.status == 200) {
      resolve(JSON.parse(target.response));
    }
  };
  xhttp.open("GET", path, true);
  xhttp.send();
});

const renderDataJS = (data, searchTerm) => {
  const table = document.getElementById("html-table");
  if (searchTerm) {
      searchTerm = searchTerm.toLowerCase();
  data = data.filter(
    ({ first_name, last_name, email, gender, ip_address }) =>
      last_name.toLowerCase().includes(searchTerm) ||
      first_name.toLowerCase().includes(searchTerm) ||
      email.toLowerCase().includes(searchTerm) ||
      gender.toLowerCase().includes(searchTerm) ||
      ip_address.includes(searchTerm)
  );
}
const rows = data.reduce(
  (acc, row) =>
    acc +
    `<tr id="table-row-${row.id}"><td>${row.id}</td><td>${row.first_name}</td><td>${row.last_name}</td><td>${row.email}</td><td>${row.gender}</td><td>${row.ip_address}</td></tr>`,
  ``
);
table.innerHTML = rows;
};

const onSubmit = (event) => {
event.preventDefault();
const searchTerm = event.target.search.value;
loadDataJS("./data.json").then((data) => renderDataJS(data, searchTerm));
};

loadDataJS("./data.json").then((data) => renderDataJS(data));

const onReset = () => {
loadDataJS("./data.json").then((data) => renderDataJS(data));
};