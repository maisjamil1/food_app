export interface RecipesComplexSearchResponse {
  results: Recipe[];
}
export interface GetRecipesComplexSearchDTO {
  query?: string;
  cuisine?: string;
}

export interface GetRecipeDetailsDTO {
  recipeId: string;
}

export interface Recipe {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: Gaps;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: CreditsText;
  sourceName: SourceName;
  pricePerServing: number;
  extendedIngredients: ExtendedIngredient[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: ImageType;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  instructions: string;
  analyzedInstructions: AnalyzedInstruction[];
  originalId: null;
  spoonacularScore: number;
  spoonacularSourceUrl: string;
  license?: string;
}

export interface AnalyzedInstruction {
  name: string;
  steps: Step[];
}

export interface Step {
  number: number;
  step: string;
  ingredients: Ent[];
  equipment: Ent[];
  length?: Length;
}

export interface Ent {
  id: number;
  name: string;
  localizedName: string;
  image: string;
  temperature?: Length;
}

export interface Length {
  number: number;
  unit: Unit;
}

export enum Unit {
  Celsius = "Celsius",
  Fahrenheit = "Fahrenheit",
  Minutes = "minutes",
}

export enum CreditsText {
  AfrolemsCOM = "afrolems.com",
  FoodistaCOM = "foodista.com",
  FoodistaCOMTheCookingEncyclopediaEveryoneCanEdit = "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
}

export interface ExtendedIngredient {
  id: number;
  aisle: string;
  image: null | string;
  consistency: Consistency;
  name: string;
  nameClean: null | string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: Measures;
}

export enum Consistency {
  Liquid = "LIQUID",
  Solid = "SOLID",
}

export interface Measures {
  us: Metric;
  metric: Metric;
}

export interface Metric {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export enum Gaps {
  No = "no",
}

export enum ImageType {
  Jpg = "jpg",
}

export enum SourceName {
  AfrolemsCOM = "afrolems.com",
  Foodista = "Foodista",
  FoodistaCOM = "foodista.com",
}
