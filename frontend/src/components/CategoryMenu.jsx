const CategoryMenu = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="flex overflow-x-auto space-x-5 pb-3 mt-5">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`${
            selectedCategory === category
              ? "bg-primary-orange text-white font-medium"
              : "bg-gray-300 text-gray-600 font-light"
          } px-4 py-[2px] rounded-full whitespace-nowrap`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryMenu;
