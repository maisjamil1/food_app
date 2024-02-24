import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FC } from "react";
import { Recipe } from "@/types/recipe";

interface RecipeCard {
  recipe: Recipe;
}

const RecipeCard: FC<RecipeCard> = ({ recipe }) => {
  if (!recipe.image) return;
  return (
    <Link
      to={"/details/" + recipe.id}
      key={recipe.id}
      className="outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg"
    >
      <Card className="rounded-lg border-2 h-[450px]">
        <CardContent className="pt-4">
          <div className="aspect-square relative bg-foreground/5 dark:bg-background rounded-lg">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="aspect-square object-cover rounded-lg transition-all duration-300 hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <div>
            <p className="my-2 font-semibold text-lg">{recipe.title}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
