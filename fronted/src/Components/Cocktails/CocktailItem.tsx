import React from 'react';
import {apiURL} from "../../AxiosApi/baseUrl";
import imageNotAvailable from '../../assets/imageNotAvailab.jpg';
import "./cssCocktailItem.css"
import {useNavigate} from "react-router-dom";

export interface Props {
    id:string;
    name:string;
    image:string
}

const CocktailItem:React.FC<Props> = ({id,name,image}) => {
    const navigate = useNavigate();
    let cardImage = imageNotAvailable
    if (image) {
        cardImage = apiURL + "/" + image;
    }

    const getOneCocktail = (id:string) => {
        navigate(`/info-cocktail/${id}`);
    }
    return (
        <>
                <div className="card me-3 ms-3 border cocktail-image" style={{width:"250px",height:"auto",borderRadius:"10px",}} onClick={() => getOneCocktail(id)}>
                    <img src={`${cardImage}`} alt={`${name}`} style={{height:"250px",width:"100%",borderRadius:"15px",padding:"9px",objectFit: "cover"}}/>
                    <div className="card-body text-center">
                        <h6>{name}</h6>
                    </div>
                </div>
        </>
    );
};

export default CocktailItem;