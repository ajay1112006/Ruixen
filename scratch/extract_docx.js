const mammoth = require('mammoth');
const fs = require('fs');

mammoth.extractRawText({path: "./Project Description.docx"})
    .then(function(result) {
        const text = result.value;
        fs.writeFileSync('./scratch/project_description.txt', text);
        console.log('Text extracted to ./scratch/project_description.txt');
    })
    .catch(function(err) {
        console.log(err);
    });
