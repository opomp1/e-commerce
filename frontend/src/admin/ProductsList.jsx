import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useEffect } from "react";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  return (
    <motion.div
      className="shadow-lg rounded-lg border border-gray-400 overflow-x-auto max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className="table-fixed min-w-full divide-y divide-gray-400">
        <thead className="">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider w-full"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider text-right"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
            >
              Category
            </th>

            <th
              scope="col"
              className="px-2 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
            >
              Featured
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className=" divide-y divide-gray-200">
          {products?.map((product) => (
            <tr key={product._id} className="hover:bg-gray-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={product.image.replace(
                        "/upload/",
                        "/upload/w_100,h_100,c_fill,q_auto,f_auto/"
                      )}
                      alt={product.name}
                      loading="lazy"
                    />
                  </div>

                  <div className="text-sm font-medium flex-grow text-gray-800 ml-4 truncate w-10">
                    {product.name}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-800 text-right">
                  ${product.price.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-800">{product.category}</div>
              </td>
              <td className="px-2 py-4  whitespace-nowrap ">
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-1 rounded-full cursor-pointer text-gray-800 ${
                    product.isFeatured ? "bg-yellow-400  " : "border "
                  } hover:bg-yellow-500 transition-colors duration-200`}
                >
                  <Star className="h-5 w-5" />
                </button>
              </td>
              <td className="px-2 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-red-600 hover:text-red-400 cursor-pointer"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductsList;
