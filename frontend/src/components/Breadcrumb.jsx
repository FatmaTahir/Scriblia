import { Link } from "react-router-dom";
const Breadcrumb = ({ items }) => {
  return (
    <div
      className="ms-24 mt-[110px]  px-10 py-3 text-sm font-semibold text-pink-500 text-center"
      style={{fontFamily:'PlayFair Display'}}
    >
      {items.map((item, index) => (
        <span key={index}>
          {item.path ? (
            <Link
              to={item.path}
              className="hover:text-pink-600 transition-colors"
            >
              {item.name}
            </Link>
          ) : (
            <span className="text-gray-500">{item.name}</span>
          )}

          {index !== items.length - 1 && (
            <span className="mx-2 text-gray-500">{">"}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;