import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Zod from "zod";

import { SearchFormContainer } from "./styles";

const searchFormSchema = Zod.object({
  query: Zod.string(),
});

type SearchDataForm = Zod.infer<typeof searchFormSchema>;

export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchDataForm>({
    resolver: zodResolver(searchFormSchema),
  });

  const onSubmit = async (data: SearchDataForm) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
