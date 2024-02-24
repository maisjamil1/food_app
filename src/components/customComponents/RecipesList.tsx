import RecipeCard from "./RecipeCard";
import { FC } from "react";
import { Recipe } from "@/types/recipe";

interface RecipesListProps {
  Recipes: Recipe[];
}

const RecipesList: FC<RecipesListProps> = ({ Recipes }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipesList;
