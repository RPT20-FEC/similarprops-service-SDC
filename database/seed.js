const pool = require('./pool.js');
// const {seedDB} = require('./postgres.js');

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

const randomLocation = ['Los Angeles, California', 'Long Beach, California', 'Brooklyn, New York', 'Cave Creek, Arizona', 'Napa, California', 'Boston, Massachusetts', 'Naples, Florida', 'Moscow, Russia', 'Boise, Idaho'];

const stockImages = [
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80",
  "https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80",
  "https://images.unsplash.com/photo-1504963642567-227b3bbd79de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1557124816-e9b7d5440de2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1574180045003-cad27065101e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1556597249-cd6a997737df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1521483756775-c37af386fce9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
];


generateRandomPrice = function() {
  let min = 75;
  let max = 400;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

generateRandomRating = function() {
  var precision = 100;
  var randomNum = Math.floor(Math.random() * (5 * precision - 3 * precision) + 3 * precision) / (1 * precision);
  
  if (randomNum === 0) {
    randomNum === 3.00;
  }
  return randomNum;
};

// WILL NEED REFACTORING FOR NOSQL DB
generateRandomPhotos = function() {
  const shuffled = stockImages.sort(() => 0.5 - Math.random());

  let min = 5;
  let max = 15;
  let randomNum = Math.floor(Math.random() * (max - min + 1) + min);

  let selected = shuffled.slice(0, randomNum); // array of urls

  let string = '{[';
  for (x = 0; x < selected.length; x++) {

    string += selected[x] + ',';

    if (x === selected.length - 1) {
      string += selected[x] + ']}';
    };

  };

  return string;

};


/*---------------------seeder function-----------------------*/


const generateSeedData = () => {
  let listingId = 0;

  for (var x = 0; x < 100; x++) {
    let writer = csvWriter();
    writer.pipe(fs.createWriteStream(`seedData${x}.csv`));

    for (var i = 0; i < 10000; i++) {

      writer.write({
        id: listingId++,
        assets: generateRandomPhotos(),
        location: randomLocation[Math.round(Math.random() * (randomLocation.length - 1))],
        typeOfRoom: lorem.generateWords(2),
        totalBeds: Math.round(Math.random() * 3),
        headline: lorem.generateWords(5) + listingId.toString(),
        pricing: Math.floor(Math.random() * (400 - 75 + 1) + 75),
        reviews: Math.round(Math.random() * 1000),
        stars: generateRandomRating()
      });


    };
    writer.end();
  };


};


seedDB = () => {
  let file = 0;

  while (file < 100) {
    pool.query(`\COPY properties FROM '/Users/minhngo/Desktop/SDC/similarprops-service-sdc/seedData${file++}.csv' DELIMITER ',' CSV HEADER;`, (err, data) => {
      if (err) {
        return console.log(err);
      }
      console.log('successfully seeded the db with current file.')
    });
  };


};

console.time(generateSeedData);
generateSeedData();
console.timeEnd(generateSeedData);

console.time(seedDB);
seedDB();
console.timeEnd(seedDB);
