import React, {useEffect, useState} from 'react';
import { useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getOneCocktail, ratingCocktail} from "./CocktailsThunks";
import {oneCocktailLoading, oneCocktailState} from "./CocktailsSlice";
import Spinner from "../Spinner/Spinner";
import imageNotAvailable from "../../assets/imageNotAvailab.jpg";
import {apiURL} from "../../AxiosApi/baseUrl";

const InfoOfCocktail = () => {
    const {id}:string = useParams();
    const dispatch = useAppDispatch();
    const loadingOneCocktail = useAppSelector(oneCocktailLoading);
    const cocktail = useAppSelector(oneCocktailState);
    const [userRating, setUserRating] = useState<number>(0);

    let cardImage = imageNotAvailable
    if (cocktail && cocktail.image) {
        cardImage = apiURL + "/" + cocktail.image;
    }

    useEffect(() => {
        dispatch(getOneCocktail(id));
    }, [id,dispatch]);

    const handleRating = async (score: number) => {
        setUserRating(score);
        await  dispatch(ratingCocktail({ id, score }));
       await dispatch(getOneCocktail(id));
    };

    if (!cocktail) {
        return <div>Коктейль не найден.</div>;
    }
    return (
        <>
            {
                loadingOneCocktail ? (
                    <Spinner/>
                ) : (
                    <div className="container-fluid d-flex flex-column" style={{minHeight: "100vh"}}>
                        <div className="mb-5 d-flex justify-content-around mt-auto">
                            <div>
                                <img src={`${cardImage}`} alt={`${cocktail.name}`} style={{
                                    height: "250px",
                                    width: "250px",
                                    borderRadius: "15px",
                                    padding: "9px",
                                    objectFit: "cover"
                                }}/>
                            </div>
                            <div>
                                <h5>{cocktail.name}</h5>
                                <span>
                                    ingredient:
                                </span>
                                <ul>

                                    {
                                        cocktail.ingredient.map((ingredient, index) => (
                                            <li key={index}>
                                                {ingredient.name} - {ingredient.quantity}
                                            </li>
                                        ))
                                    }
                                </ul>

                            </div>
                        </div>
                        <div className="mt-5 mb-auto">
                            <span style={{fontSize: "16px"}}>Recipe:</span>
                            <p>
                                {cocktail.recipe}
                            </p>

                            <span style={{fontSize: "16px"}}>Score:</span>
                            <div>
                                {[1, 2, 3, 4, 5].map(score => (
                                    <button
                                        key={score}
                                        onClick={() => handleRating(score)}
                                        style={{fontWeight: userRating === score ? 'bold' : 'normal'}}
                                        className="btn btn-light m-2"
                                    >
                                        {score}
                                    </button>
                                ))}
                                <ul>
                                    {cocktail.ratings.map((ratingItem, index) => (
                                        <li key={index}>
                                           your last score: {ratingItem.score}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                )
            }
        </>
    );
};

export default InfoOfCocktail;