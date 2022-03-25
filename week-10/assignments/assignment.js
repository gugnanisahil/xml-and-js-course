
const http = require("http");

const person = require("./controllers/person");

const parseParams = (searchParams) => {
    const params = new URLSearchParams(searchParams);
    return Array.from(params.entries()).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: value,
        }),
        {}
    );
};
const server = http.createServer(async (req, res) => {
    const [basePath, searchParam] = req.url.split('?');
    if(basePath === '/api/person'){
        const {code, data} = await person.getAll(parseParams(searchParam));
        res.writeHead(code);
        res.end(JSON.stringify(data));
    }else if(req.url.match(/\/api\/person\/\w+/)){
        const urlElements = req.url.split('/');
        const id = urlElements[urlElements.length - 1];

        const {code, data} = await person.getById(id);
        res.writeHead(code);
        res.end(JSON.stringify(data));
    }
    else{
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Route not found'}))
    }
});

const PORT = 8080;

server.listen(PORT, () => console.log('Server is runnin on port ${PORT}`'));