import { Product } from "@/types";
import ProductCard from "./product-card";

const ProductList = ({
  data,
  title,
  limit,
}: {
  data: Product[];
  title?: string;
  limit?: number;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4 ">{title}</h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
          {limitedData.map((product: Product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
