//db = review_lines_db
const Sequelize = require('sequelize')
const { STRING, INTEGER, DATE } = Sequelize

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/review_lines_db');

const Category = db.define('category',{
    name: {
        type: STRING,
        allowNull: false
    } 
})

const Location = db.define('location',{
    name: {
        type: STRING,
        allowNull: false
    },
    city: {
        type: STRING
    },
    img: {
        type: STRING
    }
})

const Review = db.define('review',{
    userName:{
        type: STRING,
    },
    review:{
        type: "VARCHAR(500)"
    },
    stars: {
        type: INTEGER
    },
    waitTime: {
        type: INTEGER
    }
})

Location.belongsTo(Category);
Category.hasMany(Location);

Review.belongsTo(Location);
Location.hasMany(Review);

const syncAndSeed = async() =>{
    await db.sync({ force: true });
    const [restaurants, covidTestSites, rollerCoasters] = await Promise.all(
        ['Restaurants','Covid Test Sites','Roller Coasters'].map(name=>Category.create({name}))
    )

    const [InNOut, Dotties, Convention,UNLV, SpaceMountain, Maverick]=await Promise.all(
        [{name:'In N Out',city: 'Los Angeles',img: '../assets/in n out.jpg'},{name:'Dotties True Blue Cafe',city:'San Francisco',img: '../assets/dotties.jpeg'},{name:'Convention Center',city:'Las Vegas',img: '../assets/CCC.jpg'},{name:'University of Nevada',city: 'Las Vegas',img:"../assets/unlvcov.jpg"},{name:'Space Mountain',city: 'Orlando',img:'../assets/spacemtn.jpg'},{name:'Maverick',city:'Sandusky',img: '../assets/maverick.jpg'}]
        .map(obj=>Location.create(obj))
    )

    await Promise.all([
        Review.create({userName: 'Hulk', review: 'The fries are terrible', stars: 3, waitTime: 20,locationId:InNOut.id}),
        Review.create({userName: 'Wonder Woman', review: 'Line is long', stars: 4, waitTime: 15,locationId:InNOut.id}),
        Review.create({userName: 'Super Man', review: 'Worth the wait', stars: 5, waitTime: 45,locationId:Dotties.id}),
        Review.create({userName: 'Bat Man', review: 'Best Pancakes Ever', stars: 4, waitTime: 60,locationId:Dotties.id}),
        Review.create({userName: 'Spider Man', review: 'Epic',stars: 5, waitTime: 30,locationId:Maverick.id}),
        Review.create({userName: 'Iron Man', review: 'threw up',stars: 1, waitTime: 20,locationId:Maverick.id})
    ])

    InNOut.categoryId = restaurants.id;
    Dotties.categoryId = restaurants.id;
    Convention.categoryId = covidTestSites.id;
    UNLV.categoryId = covidTestSites.id;
    SpaceMountain.categoryId = rollerCoasters.id;
    Maverick.categoryId = rollerCoasters.id;
    
    await Promise.all([InNOut.save(),Dotties.save(),Convention.save(),UNLV.save(),SpaceMountain.save(),Maverick.save()]);
}

module.exports = {
    db,
    syncAndSeed,
    Category,
    Location,
    Review

}