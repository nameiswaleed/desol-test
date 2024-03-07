import React from "react";
import Image from "next/image";
const products = [
  {
    id: 1,
    Image: "https://dummyimage.com/720x400",
    name: "The Catalyzer",
    price: "R 5,000.00",
  },
  {
    id: 1,
    Image: "https://dummyimage.com/720x400",
    name: "The Catalyzer",
    price: "R 5,000.00",
  },
  {
    id: 1,
    Image: "https://dummyimage.com/720x400",
    name: "The Catalyzer",
    price: "R 5,000.00",
  },
  {
    id: 1,
    Image: "https://dummyimage.com/720x400",
    name: "The Catalyzer",
    price: "R 5,000.00",
  },
  {
    id: 1,
    Image: "https://dummyimage.com/720x400",
    name: "The Catalyzer",
    price: "R 5,000.00",
  },
  {
    id: 1,
    Image: "https://dummyimage.com/720x400",
    name: "The Catalyzer",
    price: "R 5,000.00",
  },
  {
    id: 1,
    Image: "https://dummyimage.com/720x400",
    name: "The Catalyzer",
    price: "R 5,000.00",
  },
  {
    id: 1,
    Image: "https://dummyimage.com/720x400",
    name: "The Catalyzer",
    price: "R 5,000.00",
  },
];
const ProductViews = () => {
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          {products.map((item, index) => (
            <div
              key={index}
              class="p-4 hover:shadow-sm cursor-pointer md:w-1/4"
            >
              <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  class="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={item.Image}
                  alt="blog"
                />
                <div class="p-6">
                  {/* <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2> */}
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                    {item.name}
                  </h1>
                  <p class="leading-relaxed mb-3">{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductViews;
