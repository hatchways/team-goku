const axios = require('axios');

const data = { name: "Spaghetti", ingredients: "Pasta", description: "Italianooooo", price: "$100" };
const update_data = { name: "Chicken Soup", ingredients: "Chicken", description: "Wholesome", price: "$23" };
const update_data_two = { name: "Surf and Turf", ingredients: "Steak, Shrimp", description: "Summer food", price: "$35" };

axios.post('http://localhost:5000/recipes/new_recipe', data)
    .then((res) => {
        console.log(`Status of create: ${res.status}`);
        console.log('Body: ', res.data);
    }).catch((err) => {
        console.error(err);
});


axios.get('http://localhost:5000/recipes/delete_recipe/600766b9cdff133076e2faa8', data)
    .then((res) => {
        console.log(`Status of delete: ${res.status}`);
        console.log('Body: ', res.data);
    }).catch((err) => {
        console.error(err);
});

axios.post('http://localhost:5000/recipes/update_recipe/6007670ccdff133076e2faaa', update_data_two)
    .then((res) => {
        console.log(`Status of update: ${res.status}`);
        console.log('Body: ', res.data);
    }).catch((err) => {
        console.error(err);
});

axios.get('http://localhost:5000/recipes/get_recipe/6007670ccdff133076e2faaa')
    .then((res) => {
        console.log(`Status of get: ${res.status}`);
        console.log('Body: ', res.data);
    }).catch((err) => {
        console.error(err);
});
