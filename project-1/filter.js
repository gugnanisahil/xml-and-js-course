const loadData = (path, callback) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ({ target }) => {
      if (target.readyState == 4 && target.status == 200) {
        callback(target.responseXML);
      }
    };
    xhttp.open("GET", path, true);
    xhttp.send();
  };

const htmlToElement = (html) => {
    const template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  };

const generateTableRow = (item) => {
    
    const Name = Array.from(item.getElementsByTagName(`name`))[0];
    const age = Array.from(item.getElementsByTagName(`Age`))[0];
    const height = Array.from(item.getElementsByTagName(`Height`))[0];
    const weight = Array.from(item.getElementsByTagName(`weight`))[0];
    const gender = Array.from(item.getAttribute(`gender`))[0];
    const country =Name.getAttribute(`country`);
    
    console.log(Name)
    console.log(country)

    return `<tr>
        <td>${Name.textContent}</td>
        <td>${age.textContent}</td>
        <td>${height.textContent}</td>
        <td>${weight.textContent}</td>
        <td>${gender}</td>
        <td>${country}</td>
    </tr>`;
  };


//filteration logic.
const renderTable = (xmlData) => {
    const table = document.getElementById("table-main");
  
    if (!table) {
      throw new Error("No table element found");
    }
  
    const nodes = Array.from(xmlData.documentElement.childNodes).filter(
      ({ nodeName }) => nodeName === `person`
    );
  
    nodes.map((personNode) =>
      table.appendChild(htmlToElement(generateTableRow(personNode)))
    );

const withFilters = Boolean(window.location.search);

if (withFilters) {
    const params = new URLSearchParams(window.location.search);
    const input = params.get(`input_value`);
    const inputControl = document.getElementById(`input_value`);
    inputControl.value = input;

    console.log(nodes)
    const filteredForm = nodes.filter((obj)  => document.getElementsByTagName('name').includes(input));

    filteredForm.map((personNode) =>
        table.appendChild(htmlToElement(generateTableRow(personNode)))
    );
    }
};    

loadData("http://192.168.56.1:8080/Project-1/people.xml",renderTable)

  const onReset = () => {
    window.location.replace(window.location.pathname);
  };