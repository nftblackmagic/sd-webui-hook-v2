import { useEffect, useState } from "react";
import { downloadBase64Image, downloadImage } from "../utils/file";
import { v5 as uuidv5 } from "uuid";
import { useDispatch } from "react-redux";
import { addResult } from "../redux/Features/GeneratedState/GeneratedSlice";

interface ImageGalleryProps {
  result: any;
  display?: boolean;
}

export const ImageGallery = (props: ImageGalleryProps) => {
  const { result, display } = props;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const dispatch = useDispatch();

  const handleImageClick = (image: string, index: number) => {
    // setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const handleDownload = () => {
    if (selectedImage) {
      if (/(http(s?)):\/\//i.test(selectedImage)) {
        downloadImage(selectedImage);
      } else {
        downloadBase64Image(selectedImage, "image.png");
      }
    }
  };

  const handledDelete = () => {
    if (display) {
      console.log("deleting", result);
      try {
        fetch(`/api/note?id=${result["id"]}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (result) {
      console.log('mounted >>>', result)
      setSelectedImage(result["images"][0]);
      const generateResults = result["images"].map(
        (image: string, index: number) => {
          return {
            image: image,
            id: uuidv5(image, uuidv5.URL),
          };
        }
      );
      dispatch(addResult(generateResults));
    }
  }, []);

  useEffect(() => {
    if (result) {
      setSelectedImage(result["images"][selectedImageIndex]);
    }
  }, [selectedImageIndex, result]);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      {selectedImage && (
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="flex flex-row gap-2">
            <button
              onClick={() => {
                setSelectedImageIndex(
                  (selectedImageIndex - 1) % result["images"].length
                );
              }}
              type="button"
              className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="sr-only">Icon description</span>
            </button>
            <img
              src={
                /(http(s?)):\/\//i.test(selectedImage)
                  ? selectedImage
                  : `data:image/png;base64,${selectedImage}`
              }
              width="512"
            />
            <button
              onClick={() => {
                setSelectedImageIndex(
                  (selectedImageIndex + 1) % result["images"].length
                );
              }}
              type="button"
              className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="sr-only">Icon description</span>
            </button>
          </div>
          <div className="flex flex-row gap-2">
            <button onClick={handleDownload}>Download</button>
          </div>
        </div>
      )}
      <div className="flex flex-row gap-1 snap-x scroll-smooth overflow-x-auto">
        {result &&
          result["images"]?.map((image: string, index: number) => (
            <div className="scroll-ms-6 snap-start" key={image}>
              <img
                src={
                  /(http(s?)):\/\//i.test(image)
                    ? image
                    : `data:image/png;base64,${image}`
                }
                onClick={() => handleImageClick(image, index)}
                className="cursor-pointer w-20"
              />
              {selectedImage == image && (
                <div className="bg-blue-500 w-20 h-1"></div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
