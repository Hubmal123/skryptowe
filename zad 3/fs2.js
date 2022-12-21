const http = require("http");
const fs = require('fs');

function requestListener(request, response) 
{
        var url = new URL(request.url, `http://${request.headers.host}`); // Create the URL object

        if (url.pathname == '/submit')
        { 
            response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            if (request.method == 'GET')
            {
                check(response, url.searchParams.get('path'));
            }
            else 
            {    
                response.write(`This application does not support the ${request.method} method`);
                response.end(); 
            }
        }
        else 
        { 
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            response.write(`<form method="GET" action="/submit">
                                <label for="path">Give a path</label>
                                <input name="path">
                                <br>
                                <input type="submit">
                                <input type="reset">
                            </form>`);
            response.end();  
        }
}

function check(response, path) {

    fs.stat(path, (err, stats) => {
        if (err){
            response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            response.write("Plik nie istnieje");
            response.end();
            return false;
        }
    
        if (stats.isDirectory())
        {
            response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            response.write(`${path} jest katalogiem`);
            response.end(); 
        }
        
        if (stats.isFile())
        {
            response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            response.write(`${path} jest plikiem a jego zawartość to: `);
            fs.readFile(path, (err, data) => {
            response.write("\n" + data);
            response.end();
            });
        }
    });
}
    
var server = http.createServer(requestListener); 
server.listen(8080);
console.log("The server was started on port 8080");
console.log("To stop the server, press 'CTRL + C'");