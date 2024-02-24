import { useGetRecipesComplexSearch } from "@/api/recipes/queries";
import SearchBar from "@/components/customComponents/SearchBar.tsx";
import RecipesList from "@/components/customComponents/RecipesList";
import Container from "@/components/ui/container";
import { FC, useState } from "react";
import Error from "@/components/customComponents/Error.tsx";
import Loading from "@/components/customComponents/Loading";
import banner from "@/assets/images/banner.webp";

const Home: FC = () => {
  const [search, setSearch] = useState("pizza");
  const { data, isLoading, isFetching, error } = useGetRecipesComplexSearch(
    {
      query: search,
    },
    {
      enabled: Boolean(search),
    },
  );

  const onSubmit = (search: string) => {
    setSearch(search);
  };

  if (error) return <Error />;

  if (isLoading || isFetching) return <Loading />;

  return (
    <>
      <Container>
        <div className="space-y-10 pb-10">
          <div className="p-4 sm:p-6 lg:p-8 rounded-lg overflow-hidden">
            <div
              style={{ backgroundImage: `url(${banner})` }}
              className="rounded-lg relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
            >
              <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-black dark:text-white bg-secondary/60 p-4 rounded-lg">
                  <SearchBar onSubmit={onSubmit} />
                </div>
              </div>
            </div>
          </div>
          {data?.results?.[0] ? (
            <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
              <RecipesList Recipes={data?.results} />
            </div>
          ) : null}
        </div>
      </Container>
    </>
  );
};

export default Home;
