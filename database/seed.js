// const pool = require('./riak-client.js');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

/*------- helper vars & functions to seeder function---------*/

const randomLocation = ['Los Angeles', 'Long Beach', 'San Francisco', 'Tokyo', 'Paris', 'Cave Creek', 'Boston'];

const stockImages = [
  'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-1.2.1&auto=format&fit=crop&w=890&q=80',
  'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1047&q=80',
  'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80'
];


generateRandomPrice = function() {
  let min = 75;
  let max = 400;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

generateRandomRating = function() {
  var precision = 100;
  var randomNum = Math.floor(Math.random() * (5 * precision - 3 * precision) + 3 * precision) / (1 * precision);
  return randomNum;
};


generateRandomPhotos = function() {
  const shuffled = stockImages.sort(() => 0.5 - Math.random());

  let min = 5;
  let max = 15;
  let randomNum = Math.floor(Math.random() * (max - min + 1) + min);

  let selected = shuffled.slice(0, randomNum); // array of urls

  // let string = '[';
  // for (x = 0; x < selected.length; x++) {

  //   string += selected[x] + ',';

  //   if (x === selected.length - 1) {
  //     string += selected[x] + ']';
  //   };

  // };

  // return string;

  return selected;

};


/*---------------------data generation function-----------------------*/

// generateRandomPhotos = function() {
//   const shuffled = stockImages.sort(() => 0.5 - Math.random());

class Writer {

    constructor(file) {
        this.writer = csvWriter();
        this.writer.pipe(fs.createWriteStream(file, { flags: 'a' }));
    }

    write(obj) {
        // if .write returns false we have to wait until `drain` is emitted
        if(!this.writer.write(obj))
            return new Promise(resolve => this.writer.once('drain', resolve))

        return true;
    }

    end() {
        // Wrap it in a promise if you wish to wait for the callback.
        this.writer.end();
    }

}

(async() => {
    console.log('start time is: ', new Date().toUTCString()); // start time

    const writer = new Writer('seedData.csv');

    for (let i = 0; i < 10000000; i++) {
        const res = writer.write({
          listingId: i,
          assets: generateRandomPhotos(),
          location: randomLocation[Math.round(Math.random() * (randomLocation.length - 1))],
          typeOfRoom: lorem.generateWords(2),
          totalBeds: Math.round(Math.random() * 3),
          headline: lorem.generateWords(5) + i.toString(),
          pricing: Math.floor(Math.random() * (400 - 75 + 1) + 75),
          stars: generateRandomRating(),
          reviews: Math.round(Math.random() * 1000)
        });

        if (res instanceof Promise) {
            await res;
        }
    }


    writer.end(console.log('end time is: ', new Date().toUTCString()));


})();



// const CSVToJSON = require('csvtojson');

// // convert users.csv file to JSON array
// CSVToJSON().fromFile('seedData.csv')
//     .then(results => {

//       let stringified = JSON.stringify(results);
//       fs.writeFile('seedData.json', stringified, function(err) {
//         if (err) {return console.log(err)};
//       });
//         // console.log(results);
//     }).catch(err => {
//         // log error if any
//         console.log(err);
//     });

// const insertSeedData = function() {

//   let seederData = [];
//   for (var i = 0; i < 10000000; i++) {

//     var singleProp = {
//       listingId: i,
//       assets: stockImages,
//       location: randomLocation[Math.round(Math.random() * 7)],
//       typeOfRoom: lorem.generateWords(2),
//       totalBeds: Math.round(Math.random() * 3),
//       headline: lorem.generateWords(5),
//       pricing: generateRandomPrice(),
//       stars: generateRandomRating(),
//       reviews: Math.round(Math.random() * 1000)
//     };

//     seederData.push(singleProp);
//     let jsonData = JSON.stringify(seederData);
//     fs.writeFile('seedData.json', jsonData, function(err) {
//       if (err) {return console.log(err)};
//     });
//   }

// };

// console.log('start time is: ', new Date().toUTCString());
// insertSeedData();
// console.log('end time is: ', new Date().toUTCString());


/*---------------------seeder function-----------------------*/

const insertSeedData = function() {
  const seederData = [];

  for (var i = 1001; i < 1120; i++) {

    var singleProp = {
      listingId: i,
      assets: stockImages,
      location: randomLocation[Math.round(Math.random() * 7)],
      typeOfRoom: lorem.generateWords(2),
      totalBeds: Math.round(Math.random() * 3),
      headline: lorem.generateWords(5),
      pricing: generateRandomPrice(),
      stars: generateRandomRating(),
      reviews: Math.round(Math.random() * 1000)
    };

    seederData.push(singleProp);
  }

  similarProperties.create(seederData)
    .then(() => {console.log('Success creating and seeding db.')})
    .catch((err) => {console.log(err)});
};

insertSeedData();