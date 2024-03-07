import API from "@/utils/API";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const NewCarForm = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const [ImageFiles, setImageFiles] = useState([]);
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(values);
          try {
            const formData = new FormData();
            formData.append("carModel", values.carModel);
            formData.append("price", values.price);
            formData.append("phoneNumber", values.phoneNumber);
            formData.append("maxPictures", values.maxPictures);
            values.pictures.forEach((file) => {
              formData.append("pictures", file);
            });

            const res = await API.post("/car", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            resetForm();
            setImageFiles([]);
            setPreviewImages([]);
            console.log(res);
          } catch (error) {
            alert(error.response.data.error);
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewCarForm;
