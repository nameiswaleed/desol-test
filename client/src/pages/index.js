import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Head from "next/head";
import API from "@/utils/API";
import Image from "next/image";
export default function Home() {
  const [error, setError] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        const res = await API.post("/auth/login", values);
        const token = res.data.token;
        localStorage.setItem("x-auth-token", token);
        formik.setSubmitting(false);
      } catch (err) {
        setError(err.response.data.error);
        formik.setSubmitting(false);
      }
    },
  });
  return (
    <>
      <Head>
        <title>Desol Int</title>
      </Head>
      <section>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-5 flex justify-center ">
              <span>
                <Image src={"/main.svg"} width={300} height={100} alt="logo" />
              </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Sign in to your account
            </h2>
            {error ? (
              <div
                style={{ color: "red" }}
                className="bg-red-300 text-center my-2 border-2 border-red-600 rounded-md"
              >
                {error}
              </div>
            ) : null}

            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></input>
                  </div>
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: "red" }}>{formik.errors.email}</div>
                ) : null}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></input>
                  </div>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div style={{ color: "red" }}>{formik.errors.password}</div>
                ) : null}
                <div>
                  <button
                    type="submit"
                    onClick={formik.submitForm}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    {formik.isSubmitting ? (
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
                    ) : (
                      <>
                        <span> Get started </span>{" "}
                        <ArrowRight className="ml-2" size={16} />{" "}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
