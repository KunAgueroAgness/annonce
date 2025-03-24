export default defineEventHandler(() => {
  return {
    products: {
      rostovNaDonu: {
        naslediy: {
          cars: {
            whiteCars: [
              {
                name: "White Sedan",
                price: 25000,
                image: "/images/rostovNaDonu/naslediy/cars/white-sedan.jpg", // Обновленный путь
                views: 120,
                daysSincePublished: 5,
                isAvailable: true,
              },
              {
                name: "White SUV",
                price: 35000,
                image: "/images/rostovNaDonu/naslediy/cars/white-suv.jpg", // Обновленный путь
                views: 95,
                daysSincePublished: 3,
                isAvailable: true,
              },
            ],
            blackCars: [
              {
                name: "Black Sedan",
                price: 27000,
                image: "/images/rostovNaDonu/naslediy/cars/black-sedan.jpg", // Обновленный путь
                views: 150,
                daysSincePublished: 7,
                isAvailable: false,
              },
              {
                name: "Black SUV",
                price: 37000,
                image: "/images/rostovNaDonu/naslediy/cars/black-suv.jpg", // Обновленный путь
                views: 110,
                daysSincePublished: 2,
                isAvailable: true,
              },
            ],
          },
          clothes: {
            hats: [
              {
                name: "Black Hat",
                price: 50,
                image: "/images/rostovNaDonu/naslediy/clothes/black-hat.jpg", // Обновленный путь
                views: 200,
                daysSincePublished: 10,
                isAvailable: true,
              },
              {
                name: "White Hat",
                price: 45,
                image: "/images/rostovNaDonu/naslediy/clothes/white-hat.jpg", // Обновленный путь
                views: 180,
                daysSincePublished: 8,
                isAvailable: true,
              },
            ],
            coats: [
              {
                name: "Winter Coat",
                price: 150,
                image: "/images/rostovNaDonu/naslediy/clothes/winter-coat.jpg", // Обновленный путь
                views: 300,
                daysSincePublished: 15,
                isAvailable: true,
              },
              {
                name: "Raincoat",
                price: 100,
                image: "/images/rostovNaDonu/naslediy/clothes/raincoat.jpg", // Обновленный путь
                views: 250,
                daysSincePublished: 12,
                isAvailable: false,
              },
            ],
          },
        },
      },
    },
  };
});