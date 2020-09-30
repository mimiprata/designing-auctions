const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath); //

const contracts = path.resolve(__dirname, 'contracts');
const fileNames = fs.readdirSync(contracts);

const input = fileNames.reduce(
    (input, fileName) => {
        const filePath = path.resolve(__dirname, "contracts", fileName);
        const source = fs.readFileSync(filePath, "utf8");
        console.log(filePath);
        return { sources: { ...input.sources, [fileName]: source } };
    },
    { sources: {} }
);
const output = solc.compile(input,1).contracts;
fs.ensureDirSync(buildPath); //create build
for (let contract in output){

    fs.outputJsonSync(path.resolve(buildPath, contract.split(":")[1]+ ".json"), output[contract]);
}
