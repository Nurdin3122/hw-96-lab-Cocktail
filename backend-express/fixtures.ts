import mongoose from "mongoose";
import config from "./config";
import crypto from "crypto";
import User from "./models/Users";
import Cocktail from "./models/Cocktails";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;
    try {
        await db.dropCollection('users');
        await db.dropCollection('cocktails');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [user1,user2] = await User.create({
        email: 'User',
        password: '0555',
        token: crypto.randomUUID(),
        displayName:"User",
        image:"logoForAnnonUser.jpg",
        role: "user",
    }, {
        email:"Admin",
        password: "0555",
        token: crypto.randomUUID(),
        displayName:"Admin",
        image:"logoForAnnonUser.jpg",
        role: "admin"
    });

    const [cocktail1,cocktail2] = await Cocktail.create([{
        user:user2._id,
        name: 'Мохито',
        image: 'maxito.jpg',
        isPublished:true,
        recipe:"Положи в хайбол лайм 3 дольки и подави мадлером\n" +
            "Возьми мяту 10 листиков в одну руку и хлопни по ним другой рукой\n" +
            "Положи мяту в хайбол\n" +
            "Наполни бокал дробленым льдом доверху\n" +
            "Добавь сахарный сироп 15 мл и белый ром 50 мл\n" +
            "Долей содовую доверху и аккуратно размешай коктейльной ложкой\n" +
            "Досыпь немного дробленого льда\n" +
            "Укрась веточкой мяты и долькой лайма",
        ingredient:[
            {name:' Белый ром',quantity:' 50мл'},
            {name:' Сахарный сироп',quantity:'  15мл'},
            {name:' Содовая',quantity:' 100мл'},
            {name:' Лайм',quantity:' 80г'},
            {name:'Мята',quantity:'  3г'},
            {name:' Дробленый лед',quantity:' 200г'},
        ],

    },{
        user:user1._id,
        name: 'Маргарита',
        image: 'margarita.jpg',
        isPublished:false,
        recipe:"Сделай на бокале для маргариты соленую окаемку\n" +
            "Налей в шейкер лаймовый сок 30 мл, сахарный сироп 10 мл, ликер трипл сек 25 мл и серебряную текилу 50 мл\n" +
            "Наполни шейкер кубиками льда и взбей\n" +
            "Перелей через стрейнер в охлажденный бокал для маргариты\n" +
            "Укрась кружком лайма\n",
        ingredient:[
            {name:'Серебряная текила',quantity:' 50мл'},
            {name:'Трипл сек Fruko Schulz',quantity:' 25мл'},
            {name:'Сахарный сироп',quantity:' 10мл'},
            {name:'Лаймовый сок',quantity:'30мл'},
            {name:'Лайм',quantity:' 10г'},
            {name:'Соль',quantity:' 2г'},
            {name:'Лед в кубиках',quantity:'200г'},
        ],
    },
    ]);
    await db.close();
};
run().catch(console.error);