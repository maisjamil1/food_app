import RecipeDetails from "@/components/customComponents/RecipeDetails";
import Container from "@/components/ui/container";
import { useParams } from "react-router-dom";
import { useGetRecipeDetails } from "@/api/recipes/queries";
import { FC } from "react";
import Loading from "@/components/customComponents/Loading.tsx";
import Error from "@/components/customComponents/Error.tsx";
const Details: FC = () => {
  const params = useParams();

  const { data, isLoading, isFetching, error } = useGetRecipeDetails({
    recipeId: params.recipeId as string,
  });

  if (isLoading || isFetching) return <Loading />;
  if (error) return <Error />;

  return (
    <Container>
      <RecipeDetails recipe={data} />
    </Container>
  );
};

export default Details;
