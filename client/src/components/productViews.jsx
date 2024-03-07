import React, { useEffect } from "react";
import Image from "next/image";
import NoCarsMessage from "./Notfound";
import { useRouter } from "next/router";
import API from "@/utils/API";

const ProductViews = ({}) => {
  const [products, SetProducts] = React.useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/car");
        console.log(res.data);
        SetProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  const router = useRouter();
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          {products.length > 0 &&
            products.map((item, index) => (
              <div
                key={index}
                class="p-4 hover:shadow-sm cursor-pointer md:w-1/4"
              >
                <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <img
                    class="lg:h-48 md:h-36 w-full object-contain object-center"
                    src={item.pictures[0]}
                    alt="blog"
                  />
                  <div class="p-6">
                    {/* <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2> */}
                    <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                      {item.carModel}
                    </h1>
                    <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                      {item.phoneNumber}
                    </h1>
                    <p class="leading-relaxed mb-3 font-bold">${item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          {products.length < 1 && (
            <>
              <NoCarsMessage
                onClickAddCars={() => {
                  router.push("/dashboard/add");
                }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductViews;
