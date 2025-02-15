import {
  GetRecipeDetailsDTO,
  GetRecipesComplexSearchDTO,
} from "@/_types/recipe";

export const recipesKeys = {
  all: ["recipes"] as const,
  getRandomRecipes: () => [...recipesKeys.all, "getRandomRecipes"] as const,
  getRecipesComplexSearch: (dto: GetRecipesComplexSearchDTO) =>
    [...recipesKeys.all, "getRecipesComplexSearch", dto] as const,
  getRecipesDetails: (dto: GetRecipeDetailsDTO) =>
    [...recipesKeys.all, "getRecipesDetails", dto] as const,
};
