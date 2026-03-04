use ("rescue")


//Exercises Update()
//1
db.animals.updateOne(
    {name: "Catty", breed: "British Shorthair"},
    {$set: {adopted: false}}
)

//2
db.animals.updateOne(
    {name: "Spot", breed: "Beagle"},
    {$set: {"vaccinations.1": {type: "kennel cough", frequency: "yearly", amountMg: 2}}}
)   

//3


//4
db.animals.updateOne(
    {_id: "MC-3012"},
    {$push: {tags: "very very cute"}}
)

//5
db.animals.updateOne(
    {_id: "MC-1033"},
    {$pop: {tags: 1}}
)

//6

//7

//8
