export interface User {
    _id:string
    email:string;
    token: string;
    role: string;
    displayName:string;
    image: string | null;
}

export interface UserMutation {
    email:string;
    password:string;
    displayName:string;
    image: string | null;
}

export interface Cocktail {
    _id:string;
    user:string;
    name:string;
    image:string;
    recipe:string;
    isPublished:boolean;
    ingredient:[];
}

export interface CocktailMutation {
    name:string;
    image: string | null;
    recipe:string;
    ingredient: { name: string; quantity: string }[];
}