import React, { useEffect, useState } from "react";
import Image from "next/image";
import NoCarsMessage from "./Notfound";
import { useRouter } from "next/router";
import API from "@/utils/API";

const ProductViews = ({}) => {
  const [products, SetProducts] = React.useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("x-auth-token");
        const res = await API.get("/car", {
          headers: {
            "x-auth-token": token || "",
          },
        });
        console.log(res.data);
        SetProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const router = useRouter();
  return (
    <section class="text-gray-600 body-font">
      <h1 className="text-xl font-bold mb-4 text-center my-3 py-2 bg-black text-white rounded">
        Cars Dashboard
      </h1>
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          {!loading &&
            products.length > 0 &&
            products.map((item, index) => (
              <div
                key={index}
                class="p-4 hover:shadow-sm cursor-pointer md:w-1/4 "
              >
                <div class="h-full border-2 border-gray-200 hover:border-black duration-100 border-opacity-60 rounded-lg overflow-hidden">
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
                      <span className="font-bold">Model Name :</span>{" "}
                      {item.carModel}
                    </h1>

                    <p class="leading-relaxed mb-3 ">
                      <span className="font-bold">Phone </span> :{" "}
                      {item.phoneNumber}
                    </p>

                    <p class="leading-relaxed mb-3 ">
                      {" "}
                      <span className="font-bold">Price :</span>${item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          {!loading && products.length < 1 && (
            <>
              <NoCarsMessage
                onClickAddCars={() => {
                  router.push("/dashboard/add");
                }}
              />
            </>
          )}
          {loading && (
            <>
              <div className=" container flex flex-col items-center justify-center ">
                <p className="text-4xl mb-4 font-bold">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        width="6"
                        height="14"
                        x="1"
                        y="4"
                        fill="currentColor"
                      >
                        <animate
                          id="svgSpinnersBarsScaleFade0"
                          fill="freeze"
                          attributeName="y"
                          begin="0;svgSpinnersBarsScaleFade1.end-0.25s"
                          dur="0.75s"
                          values="1;5"
                        />
                        <animate
                          fill="freeze"
                          attributeName="height"
                          begin="0;svgSpinnersBarsScaleFade1.end-0.25s"
                          dur="0.75s"
                          values="22;14"
                        />
                        <animate
                          fill="freeze"
                          attributeName="opacity"
                          begin="0;svgSpinnersBarsScaleFade1.end-0.25s"
                          dur="0.75s"
                          values="1;0.2"
                        />
                      </rect>
                      <rect
                        width="6"
                        height="14"
                        x="9"
                        y="4"
                        fill="currentColor"
                        opacity="0.4"
                      >
                        <animate
                          fill="freeze"
                          attributeName="y"
                          begin="svgSpinnersBarsScaleFade0.begin+0.15s"
                          dur="0.75s"
                          values="1;5"
                        />
                        <animate
                          fill="freeze"
                          attributeName="height"
                          begin="svgSpinnersBarsScaleFade0.begin+0.15s"
                          dur="0.75s"
                          values="22;14"
                        />
                        <animate
                          fill="freeze"
                          attributeName="opacity"
                          begin="svgSpinnersBarsScaleFade0.begin+0.15s"
                          dur="0.75s"
                          values="1;0.2"
                        />
                      </rect>
                      <rect
                        width="6"
                        height="14"
                        x="17"
                        y="4"
                        fill="currentColor"
                        opacity="0.3"
                      >
                        <animate
                          id="svgSpinnersBarsScaleFade1"
                          fill="freeze"
                          attributeName="y"
                          begin="svgSpinnersBarsScaleFade0.begin+0.3s"
                          dur="0.75s"
                          values="1;5"
                        />
                        <animate
                          fill="freeze"
                          attributeName="height"
                          begin="svgSpinnersBarsScaleFade0.begin+0.3s"
                          dur="0.75s"
                          values="22;14"
                        />
                        <animate
                          fill="freeze"
                          attributeName="opacity"
                          begin="svgSpinnersBarsScaleFade0.begin+0.3s"
                          dur="0.75s"
                          values="1;0.2"
                        />
                      </rect>
                    </svg>
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductViews;
