const fs = require('fs');

const districtsToFile = (cities, name) => {
  fs.writeFile(`${name}.json`, JSON.stringify(cities), err => {
    if (err) {
      throw err;
    }
    console.log("Saved");
  });
};

module.exports = districtsToFile;
