const express = require('express');
const bodyParser = require('body-parser');




const app = express();


// OUR DTATABASE

let database = [];

// class to mutate our database
class User{

    // constructor to pass variables
    constructor(name, age, gen) {
        this.name = name;
        this.age = age;
        this.gen = gen;
    }


// create user method
addUser (){
    database=[...database,  {
        name:this.name,
        age:this.age,
        gen:this.gen}];

    return database;
}

static getUsers() {
    return database;
}
static updateUser(student){
    const newdatabse = database.map((item) => {
        if (item.name == student.name){
            return student;
        }

        return item;
    });
    database=newdatabse
    return database

}
// delete user
static deleteUser(name) {
    const newdatabase = database.filter((item) => item.name != name)
    database = newdatabase
    return database;

}

}


// middlewares
app.use(bodyParser.json());




// routes and handlers
// adduser
app.post("/add-user", (req, res) =>{
    // recieve data from front end in req.body
    const {name, age, gen} = req.body;

    // creating instance of user
    const student = new User(name, age, gen);
    // adding new user
    student.addUser();




res.send({message:"user created  successfully" , data:database});
});


// get all users
app.get ("/all-students", (req, res) => {
    const students = User.getUsers();
    res.send({
        message: "all students",
        students,
    })
});


// update user
app.put("/update-students", (req, res) => {
    const student = req.body
    const updateData =  User.updateUser(student);
    res.send({
        message:"update successfully updated",
        update_Data: updateData,
    })
});



// delete 
app.delete("/delete-student", (req, res) => {
    const {name} = req.body;
    const newData = User.deleteUser(name);
    res.send({
        message: "user deleted successfully",
        newData,
    })
});



const PORT = 4004;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});