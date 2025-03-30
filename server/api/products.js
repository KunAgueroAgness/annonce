export default defineEventHandler(() => {
  return {
    products: {
      rostovNaDonu: {
        naslediy: [
          { 
            category: 'cars',
            subCategory: 'car',
            categoryName:'Автомобили',
            subCategoryName: 'Легковой автомобиль',
            name: "White Sedan",
            price: "25 000",
            image: "./../../images/rostovNaDonu/naslediy/cars/black-sedan.png",
            views: 120,
            daysSincePublished: 5,
            isAvailable: true,
            isPromoted : false
          },
          {
            category: 'cars',
            subCategory: 'jeep',
            categoryName:'Автомобили',
            subCategoryName: 'Внедорожник',
            name: "White SUV",
            price: '65 885',
            image: "./../../images/rostovNaDonu/naslediy/cars/white-suv.png",
            views: 95,
            daysSincePublished: 3,
            isAvailable: true,
            isPromoted : false
          },
          {
            category: 'cars',
            subCategory: 'car',
            categoryName:'Автомобили',
            subCategoryName: 'Легковой автомобиль',
            name: "White Sedan",
            price: '27 000',
            image: "./../../images/rostovNaDonu/naslediy/cars/white-sedan.png",
            views: 150,
            daysSincePublished: 7,
            isAvailable: false,
            isPromoted : false
          },
          {
            category: 'cars',
            subCategory: 'jeep',
            categoryName:'Автомобили',
            subCategoryName: 'Внедорожник',
            name: "Black SUV",
            price: '37 000',
            image: "./../../images/rostovNaDonu/naslediy/cars/black-suv.png",
            views: 110,
            daysSincePublished: 2,
            isAvailable: true,
            isPromoted : false
          },
          {
            category:"clothes",
            subCategory:"hat",
            categoryName:'Одежда',
            subCategoryName:'Головной убор',
            name: "Black Hat",
            price: 50,
            image: "./../../images/rostovNaDonu/naslediy/clothes/black-hat.png",
            views: 200,
            daysSincePublished: 10,
            isAvailable: true,
            isPromoted : false
          },
          {
            category:"clothes",
            subCategory:"hat",
            name: "White Hat",
            categoryName:'Одежда',
            subCategoryName:'Головной убор',
            price: 45,
            image: "./../../images/rostovNaDonu/naslediy/clothes/white-hat.png",
            views: 180,
            daysSincePublished: 8,
            isAvailable: true,
            isPromoted : false
          },
          {
            category:"clothes",
            subCategory:"outerwear",
            name: "Winter Coat",
            categoryName:'Одежда',
            subCategoryName:'Верхняя одежда',
            price: 150,
            image: "./../../images/rostovNaDonu/naslediy/clothes/winter-coat.png",
            views: 300,
            daysSincePublished: 15,
            isAvailable: true,
            isPromoted : false
          },
          {
            category:"clothes",
            subCategory:"outerwear",
            name: "Raincoat",
            categoryName:'Одежда',
            subCategoryName:'Верхняя одежда',
            price: 100,
            image: "./../../images/rostovNaDonu/naslediy/clothes/raincoat.png",
            views: 250,
            daysSincePublished: 12,
            isAvailable: false,
            isPromoted : false
          },
        ],
      },
    },
  };
});
