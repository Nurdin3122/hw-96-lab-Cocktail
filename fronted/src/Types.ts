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