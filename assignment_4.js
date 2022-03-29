// ASSIGNMENT: 4 (Problem :2)

var products = [{
        id: 1,
        title: "laptop",
        price: 567,
        description: "Laptop  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quasi, facere sint incidunt saepe maxime."
    },
    {
        id: 2,
        title: "mobile",
        price: 367,
        description: "Mobile  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quasi, facere sint incidunt saepe maxime."
    },
    {
        id: 3,
        title: "watch",
        price: 180,
        description: "Watch  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quasi, facere sint incidunt saepe maxime."
    },
    {
        id: 4,
        title: "coffee",
        price: 40,
        description: "Coffee  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quasi, facere sint incidunt saepe maxime."
    }
];

var found = -1;
// By Using for loop(Method: 1)
function searchProduct(title) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].title == title.toLowerCase()) {
            found = i;

        }
    }

    if (found == -1) {
        console.log("Sorry Your Product Not Found");


    } else {
        console.log(products[found])

    }

}


var result = searchProduct("LAPTOP");


// By Using forEach Loop (Method: 2)

function searchProduct_2(title2) {
    products.forEach(product => {
        if (product.title == title2.toLowerCase()) {
            found = product;
            console.log(found)
        }
    })

    if (found == -1) {
        console.log("not found")
    }
}

var result_2 = searchProduct_2('Laptop')