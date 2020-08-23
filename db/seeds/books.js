exports.seed = function (knex) {
  return knex('Books').del()
    .then(function () {
      return knex('Books').insert([{
        id: 1,
        title: 'Heavy',
        author: 'Kiese Laymon',
        dateFinished: '2019-01-21',
        pages: 256,
        rating: 5
      },
      {
        id: 2,
        title: 'Boy Swallows Universe',
        author: 'Trent Dalton',
        dateFinished: '2019-04-27',
        pages: 464,
        rating: 5
      },
      {
        id: 3,
        title: 'The Buried',
        author: 'Peter Hessler',
        dateFinished: '2019-05-22',
        pages: 480,
        rating: 5
      },
      {
        id: 4,
        title: 'The Body Papers',
        author: 'Grace Talusan',
        dateFinished: '2019-07-17',
        pages: 256,
        rating: 5
      },
      {
        id: 6,
        title: 'Small Fry',
        author: 'Lisa Jobs',
        dateFinished: '2018-11-18',
        pages: 383,
        rating: 4
      },
      {
        id: 7,
        title: 'Boom Town',
        author: 'Sam Anderson',
        dateFinished: '2018-09-22',
        pages: 448,
        rating: 5
      },
      {
        id: 8,
        title: 'Flights',
        author: 'Olga Tokarczuk',
        dateFinished: '2018-10-18',
        pages: 403,
        rating: 3
      },
      {
        id: 9,
        title: 'The Hearts Invisble Furies',
        author: 'John Boyne',
        dateFinished: '2019-08-18',
        pages: 582,
        rating: 5
      },
      {
        id: 10,
        title: 'The Great Believers',
        author: 'Rebecca Mekkai',
        dateFinished: '2019-01-01',
        pages: 421,
        rating: 3
      }
      ])
    })
}
