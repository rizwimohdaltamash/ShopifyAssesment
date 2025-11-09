import { useNavigate } from "react-router";

// Category Data
const category = [
  { image: "https://m.media-amazon.com/images/I/71jtkd3vr0L._AC_UL480_FMwebp_QL65_.jpg", name: "shirt" },
  { image: "https://m.media-amazon.com/images/I/51qp9ls9+iL._AC_UL480_FMwebp_QL65_.jpg", name: "jacket" },
  { image: "https://m.media-amazon.com/images/I/71C8O0yT7hL._AC_UY327_FMwebp_QL65_.jpg", name: "mobile" },
  { image: "https://m.media-amazon.com/images/I/513p8BwV-RL._SX679_.jpg", name: "laptop" },
  { image: "https://m.media-amazon.com/images/I/71cflgAolqL._SY695_.jpg", name: "shoes" },
  { image: "https://m.media-amazon.com/images/I/41aafWU+WrL._SY300_SX300_.jpg", name: "home" },
  { image: "https://m.media-amazon.com/images/I/71DVDgwLPRL._AC_UY327_FMwebp_QL65_.jpg", name: "books" },
];

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-8">
      {/* Heading */}
      <h2 className="text-center text-2xl font-bold text-green-800 mb-6">
        Shop by <span className="text-green-600">Category</span>
      </h2>

      {/* Scrollable Categories */}
      <div className="flex overflow-x-scroll lg:justify-center hide-scroll-bar px-2">
        <div className="flex gap-6 lg:gap-12 pb-4">
          {category.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Category Image */}
              <div
                onClick={() => navigate(`/category/${item.name}`)}
                className="w-20 h-20 lg:w-28 lg:h-28 rounded-full overflow-hidden shadow-md border-2 border-green-200 hover:border-green-500 transition-all duration-300 hover:scale-110 hover:shadow-green-300/50 bg-white cursor-pointer flex justify-center items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Category Name */}
              <h1 className="mt-2 text-sm lg:text-lg text-center font-semibold text-green-800 first-letter:uppercase tracking-wide">
                {item.name}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .hide-scroll-bar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scroll-bar::-webkit-scrollbar {
            display: none;
          }
        `,
        }}
      />
    </div>
  );
};

export default Category;


