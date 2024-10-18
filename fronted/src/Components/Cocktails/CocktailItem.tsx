import React from 'react';
import {apiURL} from "../../AxiosApi/baseUrl";
import imageNotAvailable from '../../assets/imageNotAvailab.jpg';
import "./cssCocktailItem.css"
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteCocktailLoading, isPublishedCocktailLoading} from "./CocktailsSlice";
import {deleteCocktail, getAllCocktails, getPublishedCocktails, isPublishedCocktail} from "./CocktailsThunks";
import {userState} from "../User/UserSlice";
import Spinner from "../Spinner/Spinner";

export interface Props {
    id:string;
    name:string;
    image:string;
    isPublished:boolean;
}

const CocktailItem:React.FC<Props> = ({id,name,image,isPublished}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(userState);
    const deleteLoadingCocktail = useAppSelector(deleteCocktailLoading);
    const publishedLoading = useAppSelector(isPublishedCocktailLoading);
    let cardImage = imageNotAvailable
    if (image) {
        cardImage = apiURL + "/" + image;
    }

    const onDelete = async  (id:string) => {
        await dispatch(deleteCocktail(id));
        await dispatch(getPublishedCocktails());
        navigate("/");

    };

    const isPublishedBtn = async (id:string) => {
        await dispatch(isPublishedCocktail(id));
        await dispatch(getPublishedCocktails());
        navigate("/")
    };


    const getOneCocktail = (id:string) => {
        navigate(`/info-cocktail/${id}`);
    }
    return (
        <>
            <div className="card me-3 ms-3 border cocktail-image"
                 style={{width: "250px", height: "auto", borderRadius: "10px",}}>

                <p className="text-center mt-2"
                   style={{color: "gray"}}>{isPublished ? "Published" : "your cocktail is under review by the moderator"}</p>

                <img src={`${cardImage}`} alt={`${name}`} style={{
                    height: "250px",
                    width: "100%",
                    borderRadius: "15px",
                    padding: "9px",
                    objectFit: "cover"
                }}/>
                <div className="card-body text-center">
                    <h6>{name}</h6>
                </div>

                <div className="d-flex justify-content-center align-items-center flex-wrap mb-4">

                    <button type="button" className="btn btn-light " onClick={() => getOneCocktail(id)}>Recipe
                    </button>
                    {
                        publishedLoading ? (
                            <Spinner/>
                        ) : (
                            user && user.role === 'admin' && (
                                <button className="btn btn-light ms-3"
                                        onClick={() => isPublishedBtn(id)}> {isPublished ? "Published" : "Not Published"}
                                </button>
                            )
                        )
                    }
                    {
                        deleteLoadingCocktail ? (
                            <Spinner/>
                        ) : (
                            user && user.role === 'admin' && (
                                <button className="btn btn-close ms-2" onClick={() => onDelete(id)}></button>
                            )
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default CocktailItem;