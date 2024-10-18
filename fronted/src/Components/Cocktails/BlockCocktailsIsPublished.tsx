import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {cocktailLoading,isPublishedCocktails} from "./CocktailsSlice";
import {getPublishedCocktails} from "./CocktailsThunks";
import Spinner from "../Spinner/Spinner";
import CocktailItem from "./CocktailItem";

const BlockCocktailsIsPublished = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(isPublishedCocktails);
    const loadingCocktails = useAppSelector(cocktailLoading);

    useEffect(() => {
        dispatch(getPublishedCocktails()).unwrap();
    }, [dispatch]);

    return (
        <div className="container-fluid">

            <div className="d-flex justify-content-center flex-wrap">
                {
                    loadingCocktails ? (
                        <Spinner/>
                    ) : (
                        cocktails.map(cocktail => (
                            <CocktailItem key={cocktail._id}
                                          id={cocktail._id}
                                          name={cocktail.name}
                                          image={cocktail.image}
                                          isPublished={cocktail.isPublished}
                            />
                        ))
                    )
                }
            </div>

        </div>
    );
};

export default BlockCocktailsIsPublished;