import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {cocktailLoading, cocktailState} from "./CocktailsSlice";
import {getAllCocktails} from "./CocktailsThunks";
import Spinner from "../Spinner/Spinner";
import CocktailItem from "./CocktailItem";

const BlockCocktails = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(cocktailState);
    const loadingCocktails = useAppSelector(cocktailLoading);

    useEffect(() => {
        dispatch(getAllCocktails()).unwrap();
    }, [dispatch]);
    return (
        <div className="container-fluid ">
            <h4 className="text-center">My cocktails</h4>
            <div className=" d-flex justify-content-center flex-wrap">
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

export default BlockCocktails;