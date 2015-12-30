var fs = require('fs');
var parse5 = require('parse5');
var utils = require('parse5-utils')

var generateMainTemplate = function (pathOriginal, pathHarp, filename) {
  fs.readFile(pathOriginal + '/' + filename + '.html', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var document = utils.parse(data);
    var wrapperDiv = document.childNodes[2].childNodes[2].childNodes[9];
    var pageContent = wrapperDiv.childNodes[1].childNodes[3];
    utils.replace(pageContent, utils.createTextNode("<%- yield %>"))
    var content = utils.stringify(document);
    writeFile( pathHarp + '/' + '_layout.ejs', content);
  });
}

var processPageContent = function (pathOriginal, pathHarp, filename){
  fs.readFile(pathOriginal + '/' + filename + '.html', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var document = utils.parse(data);
    var wrapperDiv = document.childNodes[2].childNodes[2].childNodes[9];
    var pageContent = wrapperDiv.childNodes[1].childNodes[3];
    var pageContentAsText = '<div id="content">' + utils.stringify(pageContent) + '</div>';
    writeFile( pathHarp + '/' + filename + '.md', pageContentAsText);
  });
}

var writeFile = function(filename, content){
  fs.writeFile(filename, content, function (err) {
    if (err) return console.log(err);
      console.log( filename + ' written');
  });
}

var pathOriginal = 'www.opensourcetreffen.de';
var pathHarp = 'harp/site'
var filename = 'index';
generateMainTemplate(pathOriginal, pathHarp, filename);
processPageContent(pathOriginal, pathHarp, filename);
