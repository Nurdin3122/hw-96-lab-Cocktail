import React, {useState} from 'react';
import FormFiles from "../FormFiles/FormFiles";
import { CocktailMutation } from "../../Types";
import {useAppDispatch} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {createCocktail} from "./CocktailsThunks";

const emptyState:CocktailMutation = {
    name:"",
    recipe:"",
    ingredient: [],
    image: null,
}

const CreateCocktails = () => {
    const [newCocktail, setNewCocktail] = useState<CocktailMutation>(emptyState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setNewCocktail(prevState => ({
                ...prevState, [name]: files[0]
            }));
        }
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewCocktail((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    const removeIngredient = (index: number) => {
        setNewCocktail(prevState => ({
            ...prevState,
            ingredient: prevState.ingredient.filter((_, i) => i !== index),
        }));
    };

    const addIngredient = () => {
        setNewCocktail(prevState => ({
            ...prevState,
            ingredient: [...prevState.ingredient, { name: '', quantity: '' }],
        }));
    };


    const handleIngredientChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const updatedIngredients = [...newCocktail.ingredient];
        updatedIngredients[index][name] = value;
        setNewCocktail(prevState => ({
            ...prevState,
            ingredient: updatedIngredients,
        }));
    };

    const onSend = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(createCocktail(newCocktail));
            navigate('/');
        } catch(error) {
            console.log(error);
        }
    };



    return (
        <div className="container-fluid mt-4">
            <div className="text-center">
                <h4>Create Cocktail</h4>
            </div>
            <div className="border d-flex justify-content-center p-4 mt-3" style={{borderRadius:"10px"}}>
                <form onSubmit={onSend}>

                    <div className="form-group m-2">
                        <label htmlFor="email" className="form-label">Name:</label>
                        <input type="text"
                               className="form-control"
                               style={{width: "300px"}}
                               name="name"
                               id="name"
                               placeholder="name of cocktail"
                               onChange={onChange}
                               value={newCocktail.name}
                               required
                        />
                    </div>

                    <div className="form-group m-2">
                        <label htmlFor="recipe" className="form-label">Recipe:</label>
                        <textarea className="form-control" rows="2" onChange={onChange}
                                  placeholder="Введите рецепт здесь..."
                                  style={{width: "300px"}}
                                  name="recipe"
                                  id="recipe"
                                  value={newCocktail.recipe}
                        ></textarea>
                    </div>

                    <div className="form-group mt-3">
                        <span>image:</span>
                        <FormFiles
                            name="image"
                            id="image"
                            onChange={fileInputChangeHandler}
                            value={newCocktail.image}
                        />
                    </div>


                    <div>
                        <div className="d-flex align-items-center mb-4">
                            <span>ingredients:</span>
                            <button type="button" className="btn btn-primary mt-2 ms-5" onClick={addIngredient}>add
                                Ingredient
                            </button>
                        </div>

                        {newCocktail.ingredient.map((ingredient, index) => (
                            <div key={index} className="d-flex align-items-center mb-2">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    name="name"
                                    placeholder="Ingredient name"
                                    value={ingredient.name}
                                    onChange={(e) => handleIngredientChange(index, e)}
                                    required
                                />
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    name="quantity"
                                    placeholder="Quantity"
                                    value={ingredient.quantity}
                                    onChange={(e) => handleIngredientChange(index, e)}
                                    required
                                />
                                <button type="button" className="btn btn-danger"
                                        onClick={() => removeIngredient(index)}>remove
                                </button>
                            </div>
                        ))}
                    </div>


                    <div className="d-flex justify-content-center" style={{marginTop: "70px", marginBottom:"10px"}}>
                        <button type="submit" className="btn btn-danger">create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCocktails;