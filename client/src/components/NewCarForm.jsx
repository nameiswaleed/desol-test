import API from "@/utils/API";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const NewCarForm = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const [ImageFiles, setImageFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const initialValues = {
    carModel: "",
    price: "",
    phoneNumber: "",
    maxPictures: "",
    pictures: [],
  };

  const validationSchema = Yup.object().shape({
    carModel: Yup.string()
      .min(3, "Car model must be at least 3 characters")
      .required("Required"),
    price: Yup.number()
      .integer("Price must be an integer")
      .min(1, "Price must be at least 1")
      .required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, "Invalid phone number"),
    maxPictures: Yup.number()
      .integer("Max pictures must be an integer")
      .min(1, "Max pictures must be at least 1")
      .max(10, "Max pictures cannot exceed 10")
      .required("Required"),
    pictures: Yup.array().test(
      "maxPictures",
      "Number of pictures must match maxPictures",
      function (value) {
        return value.length === this.parent.maxPictures;
      }
    ),
  });

  const handleFileChange = (setFieldValue, event) => {
    const files = event.currentTarget.files;
    const updatedFiles = [...ImageFiles, ...Array.from(files)];
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    const updatedImages = [...previewImages, ...newImages];
    setImageFiles(updatedFiles);
    setFieldValue("pictures", updatedFiles);
    setPreviewImages(updatedImages);
  };

  const removeImage = (index, setFieldValue) => {
    const updatedImages = [...previewImages];
    const updatedFiles = [...ImageFiles];
    updatedImages.splice(index, 1);
    updatedFiles.splice(index, 1);
    setFieldValue("pictures", updatedFiles);
    setPreviewImages(updatedImages);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center my-3 py-2 bg-black text-white rounded">
        Add Car
      </h1>
      {successMessage && (
        <p className="text-sm max-w-xs mx-auto font-bold mb-4 text-center my-3 py-2 bg-green-400 text-green-900 rounded">
          {successMessage}
        </p>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(values);
          try {
            setSubmitting(true);
            const formData = new FormData();
            formData.append("carModel", values.carModel);
            formData.append("price", values.price);
            formData.append("phoneNumber", values.phoneNumber);
            formData.append("maxPictures", values.maxPictures);
            values.pictures.forEach((file) => {
              formData.append("pictures", file);
            });
            const token = localStorage.getItem("x-auth-token");
            const res = await API.post("/car", formData, {
              headers: {
                "Content-Type": "multipart/form-data",

                "x-auth-token": token || "",
              },
            });
            setSuccessMessage("Car Has been Added");
            setTimeout(() => {
              setSuccessMessage(undefined);
            }, 2000);
            resetForm();
            setImageFiles([]);
            setPreviewImages([]);
            setSubmitting(false);
            console.log(res);
          } catch (error) {
            alert(JSON.stringify(error.response.data.message));
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="max-w-md mx-auto mt-8">
            <div className="mb-4">
              <label
                htmlFor="carModel"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Car Model
              </label>
              <Field
                type="text"
                name="carModel"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="carModel"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Price
              </label>
              <Field
                type="number"
                name="price"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="price"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Phone Number
              </label>
              <Field
                type="text"
                name="phoneNumber"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="phoneNumber"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="maxPictures"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Max Pictures
              </label>
              <Field
                type="number"
                name="maxPictures"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="maxPictures"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <input
                type="file"
                name="pictures"
                onChange={(event) => handleFileChange(setFieldValue, event)}
                accept="image/*"
                multiple
              />
              <ErrorMessage
                name="pictures"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="flex flex-wrap">
              {previewImages.map((image, index) => (
                <div key={index} className="mr-2 mb-2">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index, setFieldValue)}
                    className="text-red-500 text-xs"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div>
              <button
                type="submit"
                className={` bg-black hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
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
                  "Submit"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewCarForm;
