const UserCategoryMenu = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="flex overflow-x-auto space-x-5 pb-3 mt-5">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`${
            selectedCategory === category
              ? "bg-primary-orange text-white font-medium"
              : "bg-light-grey text-gray-600"
          } px-4 py-[2px] rounded-full text-sm whitespace-nowrap`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default UserCategoryMenu;
