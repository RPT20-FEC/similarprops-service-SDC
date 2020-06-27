const pool = require('./pool.js');
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
  let precision = 100;
  let randomNum = Math.floor(Math.random() * (5 * precision - 3 * precision) + 3 * precision) / (1 * precision);

  if (randomNum === 0) {
    randomNum === 3.14;
  };

  return randomNum;
};

// WILL NEED REFACTORING FOR NOSQL DB
generateRandomPhotos = function() {
  const shuffled = stockImages.sort(() => 0.5 - Math.random());

  let min = 5;
  let max = 15;
  let randomNum = Math.floor(Math.random() * (max - min + 1) + min);

  let selected = shuffled.slice(0, randomNum); // array of urls

  let string = '{';
  for (x = 0; x < selected.length; x++) {

    string += selected[x] + ',';

    if (x === selected.length - 1) {
      string += selected[x] + '}';
    };

  };

  return string;

};


/*---------------------data generation function-----------------------*/


// class Writer {

//     constructor(file) {
//         this.writer = csvWriter();
//         this.writer.pipe(fs.createWriteStream(file, { flags: 'a' }));
//     }

//     write(obj) {
//         // if .write returns false we have to wait until `drain` is emitted
//         if(!this.writer.write(obj))
//             return new Promise(resolve => this.writer.once('drain', resolve))

//         return true;
//     }

//     end() {
//         // Wrap it in a promise if you wish to wait for the callback.
//         this.writer.end();
//     }

// }

// (async() => {
//     console.log('start time is: ', new Date().toUTCString()); // start time

//     const writer = new Writer('fakeData.csv');

//     for (let i = 0; i < 1000; i++) {
//         const res = writer.write({
//           id: i,
//           assets: generateRandomPhotos(),
//           location: randomLocation[Math.round(Math.random() * (randomLocation.length - 1))],
//           typeOfRoom: lorem.generateWords(2),
//           totalBeds: Math.round(Math.random() * 3),
//           headline: lorem.generateWords(5) + i.toString(),
//           pricing: Math.floor(Math.random() * (400 - 75 + 1) + 75),
//           stars: generateRandomRating(),
//           reviews: Math.round(Math.random() * 1000)
//         });

//         if (res instanceof Promise) {
//             await res;
//         }
//     }


//     writer.end(console.log('end time is: ', new Date().toUTCString()));


// })();


/*---------------------database seeder function-----------------------*/

// seedDB = () => {
//   console.log('start time for db seed script is: ', new Date().toUTCString());
//   pool.query(`\COPY properties FROM '/Users/minhngo/Desktop/SDC/similarprops-service-sdc/fakeData.csv' DELIMITER ',' CSV HEADER;`, (err, data) => {
//     if (err) {
//       return console.log(err);
//     }
//     console.log('end time for db seed script is: ', new Date().toUTCString());
//   });

// };

// seedDB();



