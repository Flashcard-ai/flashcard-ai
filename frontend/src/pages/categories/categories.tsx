import { useCategories } from "../../hooks/useCategory";
import { CardComponent } from "./_components/card-categories";

export const CategoriesPage = () => {
  const { data: dataCategories } = useCategories();

  return (
    <div className="w-screen min-h-screen bg-gradient-gblack flex flex-col py-4 pl-2 md:p-8">
      <div className="flex flex-col justify-center gap-3">
        <h1 className="text-5xl font-bold font-exo2 bg-gradient-blue bg-clip-text text-transparent">
          Categorias
        </h1>
        <h6 className="text-cyan-secondary text-[14px] font-inter pl-1">
          Olá, aqui você pode organizar seus flashcards.
        </h6>
      </div>

      <div className="flex flex-wrap gap-4 p-4 justify-start">
        <CardComponent
            id={-10}
            title={''}
            newCategory={true}
            categories={dataCategories?.data || []}
          />
        {dataCategories?.data.map((cat) => (
          <CardComponent
            key={cat.id}
            id={cat.id}
            title={cat.name}
            newCategory={false}
            categories={dataCategories?.data || []}
          />
        ))}
      </div>
    </div>
  );
};
