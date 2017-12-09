const db = require ("./server/db");
//const {Campus, Course, Event, Student } = require ("./server/db/models");
const Campus = require("./server/db/models/campus");
const Student = require("./server/db/models/student");
Student.belongsTo(Campus);
Campus.hasMany(Student);
const campuses = [
    {name: 'Earth',
    description: 'Third Rock from the Sun',
    imageUrl: 'img/earth.jpg'},
    {name: 'Luna',
    description: "Orbits planet Earth, being Earth's only permanent natural satellite.  When turns blue, buy lottery tickets",
    imageUrl: 'img/moon.jpg'},
    {name: 'Mars',
    description: "Major supplier of snack bars and G-ds of War",
    imageUrl: 'img/mars.jpg'},
    {name: 'Titan',
    description: 'Largest moon of Saturn, covered in water ice and rocky material, home to the largest winter sport resort in the galaxy',
    imageUrl: 'img/titan.jpg'},
    {name: 'Tatooine',
    description: 'Distant colony on a small red planet, where most poses "the force" due to exposure to high levels of radiation.',
    imageUrl: 'img/tatooine.jpg'},
    {name: 'Remote',
    description: 'Option for those more than 1.5 light years for any B&M campus',
    imageUrl: 'img/remote.jpg'}
];

const students = [
    { firstName: 'Karen',
      lastName: 'MacPherson',
      email: 'kmcpherson@earth.com',
      campusId: 1
    },
    { firstName: 'John',
    lastName: 'McDonald',
    email: 'jmcdonald@earth.com',
    campusId: 1
    },
    { firstName: 'Distant',
    lastName: 'Student',
    email: 'dstudent@remotecornerofuniverse.com',
    campusId: 6
    },
    { firstName: 'Anakin',
    lastName: 'Skywalker',
    email: 'darthvader@tatooine.com',
    campusId: 5
    }
];

const seed = () => {
    const campusPromise = campuses.map(campus => Campus.create(campus));
    const studentPromise = students.map(student => Student.create(student))
    return Promise.all (campusPromise).then( () => Promise.all(studentPromise)).catch(errFunc) ;
}
 
const errFunc = (err) =>  {
    console.log('Error while seeding');
    console.log(err.stack);
  }

const main = () => {
    console.log('Syncing db...');
    db.sync({ force: true })
      .then(() => {
        console.log('Seeding databse...');
        return seed();
      })
      .catch(errFunc)
      .then(() => {
        db.close();
        return null;
      });
  };
  
  main();
  