import {
  GetRecipeDetailsDTO,
  GetRecipesComplexSearchDTO,
  RecipesComplexSearchResponse,
} from "@/_types/recipe";
import { UseQueryOptions, useQuery } from "react-query";
import { recipesKeys } from "./queryKeys";
import {
  getRecipeDetails,
  getRecipesComplexSearch,
} from "@/_services/api.service";
import { IRecipeDetails } from "@/_types/recipe";

export function useGetRecipesComplexSearch(
  dto: GetRecipesComplexSearchDTO,
  options?: UseQueryOptions<unknown, Error, RecipesComplexSearchResponse>,
) {
  return useQuery<unknown, Error, RecipesComplexSearchResponse>({
    queryKey: recipesKeys.getRecipesComplexSearch(dto),
    queryFn: () => getRecipesComplexSearch(dto),
    ...options,
  });
}

export function useGetRecipeDetails(
  dto: GetRecipeDetailsDTO,
  options?: UseQueryOptions<unknown, Error, IRecipeDetails>,
) {
  return useQuery<unknown, Error, IRecipeDetails>({
    queryKey: recipesKeys.getRecipesDetails(dto),
    queryFn: () => getRecipeDetails(dto),
    ...options,
  });
}
