const CategoryMenu = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="px-5 pb-3 flex overflow-x-auto space-x-4 mt-5">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`${
            selectedCategory === category
              ? "bg-orange-500 text-white"
              : "bg-gray-300 text-gray-600"
          } px-4 py-2 rounded-full whitespace-nowrap`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryMenu;
