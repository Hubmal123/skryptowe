var supertest = require("supertest");
var server = supertest.agent("http://localhost:8080");

describe('Test', function () {
      it('File does not exist', function (done) {
            server
                  .get('/submit?path=plik2.txt')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, "Plik nie istnieje", done);
      });

      it('Directory', function (done) {
            server
                  .get('/submit?path=directory')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, "directory jest katalogiem", done);
      });

      it('File', function (done) {
            server
                  .get('/submit?path=plik.txt')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, "plik.txt jest plikiem a jego zawartość to: \nAla ma kota", done);
      });
});