import Container from "@/components/ui/container";
import { useParams } from "react-router-dom";
import RecipesList from "@/components/customComponents/RecipesList.tsx";
import Error from "@/components/customComponents/Error.tsx";
import { capitalize } from "@/helpers";
import { useGetRecipesComplexSearch } from "@/api/recipes/queries";
import Loading from "@/components/customComponents/Loading";
import { FC } from "react";
const Cuisine: FC = () => {
  const params = useParams();
  const { data, isFetching, isLoading, error } = useGetRecipesComplexSearch({
    cuisine: params.cuisineName,
  });

  if (isFetching || isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <Container>
      <h1 className="w-full mt-6 py-6 text-2xl flex justify-center">
        {capitalize(params.cuisineName)}
      </h1>
      <div className="space-y-10 pb-10">
        {data?.results?.[0] ? (
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <RecipesList Recipes={data?.results} />
          </div>
        ) : null}
      </div>
    </Container>
  );
};

export default Cuisine;
