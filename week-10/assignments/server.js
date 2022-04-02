const http = require(`http`);

const parseParams = (searchparams) => {
    const params = new  URLSearchParams(searchparams);
    return Array.from(params.entries()).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: value
        }),
        {}
    );
};

const students = require("./controllers/students.js");

const server = http.createServer( async (req, res) => {
    const [basePath, searchParam] = req.url.split(`?`);

    if(basePath === `/api/students`) {
        const {code, data} = await students.getAll(parseParams(searchParam));
        res.writeHead(code, {'content-type': 'application/json' });
        res.end(JSON.stringify(data));
    }
    else if(basePath.match(/\/api\/students\/\w+/)) {
        const urlElements = req.url.split(`/`);
        const id = urlElements[urlElements.length - 1];

        const {code, data} = await students.getById(id);
        res.writeHead(code,{'content-type': 'application/json' });
        res.end(JSON.stringify(data));
    } 
    else {
        res.writeHead(404, {'content-type': 'application/json' });
        res.end(JSON.stringify({message: `Route not found`}));
    }
});

const PORT = 8080;

server.listen(PORT, () => console.log(`server is running on the port ${PORT}`))
