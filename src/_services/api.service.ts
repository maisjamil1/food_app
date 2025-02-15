import { spoonacular } from "@/api";
import { NUMBER_OF_RECIPES } from "@/constants";
import {
  GetRecipeDetailsDTO,
  GetRecipesComplexSearchDTO,
} from "@/_types/recipe";

export const getRecipesComplexSearch = async (
  dto: GetRecipesComplexSearchDTO,
) => {
  const params = new URLSearchParams();
  params.append("number", String(NUMBER_OF_RECIPES));
  if (dto.query) params.append("query", dto.query);
  if (dto.cuisine) params.append("cuisine", dto.cuisine);

  const queryString = params.toString();

  const response = await spoonacular.get(
    `/recipes/complexSearch?${queryString}`,
  );
  return response.data;
};

export const getRecipeDetails = async (data: GetRecipeDetailsDTO) => {
  const response = await spoonacular.get(
    `/recipes/${data.recipeId}/information`,
  );
  return response.data;
};
