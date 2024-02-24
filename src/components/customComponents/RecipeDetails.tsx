import { IRecipeDetails } from "@/types/recipeDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface RecipeDetailsProps {
  recipe: IRecipeDetails | undefined;
}

const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {
  if (!recipe) return;
  return (
    <section className="container flex-grow mx-auto max-w-[1200px] py-5 lg:grid lg:grid-cols-2 lg:py-10 lg:h-[100vh]">
      <div className="container mx-auto px-4">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className="mx-auto px-5 lg:px-5">
        <h2 className="pt-3 text-2xl font-bold lg:pt-0">{recipe.title}</h2>
        {recipe?.dishTypes?.[0] && (
          <p className="mt-5 font-bold">
            Dish Types:{" "}
            {recipe?.dishTypes.map((dishType) => (
              <span className="text-green-600">{dishType} . </span>
            ))}
          </p>
        )}
        {recipe?.cuisines?.[0] && (
          <p className="font-bold">
            Cuisines:{" "}
            {recipe?.cuisines.map((cuisine) => (
              <span className="font-normal">{cuisine} . </span>
            ))}
          </p>
        )}
        <p className="mt-4 text-1xl">
          Price Per Serving : {recipe.pricePerServing}
        </p>
        <div className="mt-7 flex flex-row items-center gap-6">
          <Tabs defaultValue="summary" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
              <p
                className="pt-5 text-sm leading-5 text-gray-500"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              />{" "}
            </TabsContent>
            <TabsContent value="ingredients">
              <ul className="pt-5 text-sm leading-5 text-gray-500">
                {recipe.extendedIngredients.map((ingredient) => (
                  <li className={"list-disc"} key={ingredient.id}>
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="instructions">
              <p
                className="pt-5 text-sm leading-5 text-gray-500"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />{" "}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default RecipeDetails;
