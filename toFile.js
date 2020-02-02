const fs = require('fs');

const districtsToFile = cities => {
  fs.writeFile("cities.json", JSON.stringify(cities), err => {
    if (err) {
      throw err;
    }
    console.log("Saved");
  });
};

module.exports = districtsToFile;
