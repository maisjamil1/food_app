import { Input } from "../ui/input.tsx";
import { Button } from "../ui/button.tsx";
import { FormEvent, useRef } from "react";

function SearchBar({ onSubmit }: { onSubmit: (search: string) => void }) {
  const search = useRef("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(search.current);
  };

  return (
    <>
      <form className="my-2" onSubmit={submitHandler}>
        <Input
          className="bg-white inline-flex items-center justify-center  shadow  h-10 rounded-md w-full py-6 border-none"
          type="text"
          placeholder="Search For A Recipe .. "
          onChange={(e) => {
            search.current = e.target.value;
          }}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full mt-6 py-6 text-xl bg-green-700"
        >
          Search
        </Button>
      </form>
    </>
  );
}

export default SearchBar;
