import { Dialog } from "@headlessui/react";
import {
  ExclaimationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { buttonColors, buttonShapes, cases } from "../lib/constants";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Inputs = {
  case: string;
  buttonShape: string;
  buttonColors: string[];
  credit: string | null;
  creditUrl: string;
  image: any;
};

type FormStates = "unsubmitted" | "pending" | "complete";

const SubmitMircoForm = ({ isOpen, setIsOpen }: Props) => {
  const [formStatus, setFormStatus] = useState<FormStates>("unsubmitted");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [isUploadedImageLoading, setUploadedImageLoading] =
    useState<boolean>(true);
  const [showFormErrorMessage, setShowFormErrorMessage] =
    useState<boolean>(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>("");

  const {
    register,
    getValues,
    getFieldState,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useForm({
    defaultValues: {
      case: "black",
      buttonShapes: "concave",
      buttonColors: [],
      credit: null,
      creditUrl: "",
      image: null,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setFormStatus("pending");
    setShowFormErrorMessage(false);

    const formData = new FormData();
    formData.append("buttonShape", data.buttonShape);
    formData.append("case", data.case);
    formData.append("buttonColors", JSON.stringify(data.buttonColors));
    formData.append("credit", data.credit as string);
    formData.append("creditUrl", data.creditUrl);
    formData.append("image", data.image[0]);

    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    if (response.status === 500) {
      setShowFormErrorMessage(true);
      setFormStatus("unsubmitted");
      return;
    }

    const parsedRes = await response.json();
    console.log(parsedRes);
    setUploadedImageUrl(parsedRes?.rowData[0]?.src);
    setFormStatus("complete");
  };

  const handleClose = () => {
    setIsOpen(false);
    setFormStatus("unsubmitted");
    setSelectedFileUrl("");
    reset(
      {
        case: "black",
        buttonShape: "concave",
        buttonColors: [""],
        credit: null,
        creditUrl: "",
        image: null,
      },
      { keepErrors: false }
    );
  };

  const atLeastOne = () => (getValues("buttonColors").length ? true : false);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="fixed inset-0 z-10 overflow-y-auto p-4 md:pt-[25vh]"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />

      <div
        className={`relative mx-auto w-full divide-base-200 rounded-lg bg-base-100 px-4 pb-4 shadow-2xl ${
          formStatus === "complete" ? "max-w-3xl" : "max-w-5xl"
        }`}
      >
        <div
          className={`flex w-full items-center justify-end ${
            showFormErrorMessage ? "pt-4" : "pt-2"
          }`}
        >
          {showFormErrorMessage && (
            <div className="mr-auto flex items-center gap-2 rounded bg-warning px-3 py-2 text-sm font-bold text-warning-content">
              <ExclaimationTriangleIcon className="h-6 w-6" />
              There was an error submitting. Please try again.
            </div>
          )}
          <button onClick={handleClose} className="btn btn-ghost btn-sm">
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full">
            {formStatus !== "complete" && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center ">
                  <div className="form-control w-full gap-y-3">
                    {/* Upload Image */}
                    <div>
                      <label className="label">
                        <span className="label-text font-bold md:text-lg">
                          Upload image
                          {errors.image && (
                            <span className="ml-2 rounded bg-error p-1 text-sm text-error-content">
                              Choose a file
                            </span>
                          )}
                        </span>
                      </label>
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        disabled={formStatus !== "unsubmitted"}
                        className="file-input file-input-bordered w-full"
                        {...register("image", {
                          required: true,
                          onChange: (e) =>
                            setSelectedFileUrl(
                              URL.createObjectURL(e.target.files[0])
                            ),
                        })}
                      />
                    </div>
                    <div className="flex flex-col gap-x-2 md:flex-row">
                      {/* Case type */}
                      <div className="w-full md:w-1/2">
                        <label className="label">
                          <span className="label-text font-bold md:text-lg">
                            Case type
                          </span>
                        </label>
                        <select
                          disabled={formStatus !== "unsubmitted"}
                          className="select select-bordered w-full"
                          {...register("case")}
                        >
                          {cases.map((item) => (
                            <option value={item.value} key={item.value}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* Button shape */}
                      <div className="w-full md:w-1/2">
                        <label className="label">
                          <span className="label-text font-bold md:text-lg">
                            Button shape
                          </span>
                        </label>
                        <select
                          disabled={formStatus !== "unsubmitted"}
                          className="select select-bordered w-full"
                          {...register("buttonShape")}
                        >
                          {buttonShapes.map((shape) => (
                            <option value={shape.value} key={shape.value}>
                              {shape.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* Button colors */}
                    <div>
                      <label className="label">
                        <span className="label-text font-bold md:text-lg">
                          Buttons color(s)
                          {errors.buttonColors && (
                            <span className="ml-2 rounded bg-error p-1 text-sm text-error-content">
                              Choose at least 1
                            </span>
                          )}
                        </span>
                      </label>
                      <div className="flex flex-wrap">
                        {buttonColors.map((color) => (
                          <div className="w-1/2 sm:w-1/3" key={color.value}>
                            <label className="flex cursor-pointer select-none items-center gap-x-3 rounded-lg py-2 px-2 hover:bg-accent/10">
                              <input
                                type="checkbox"
                                value={color.value}
                                disabled={formStatus !== "unsubmitted"}
                                className="checkbox checkbox-accent checkbox-sm md:checkbox-md"
                                {...register("buttonColors", {
                                  validate: atLeastOne,
                                })}
                              />

                              <span className="label-text">{color.name}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-x-2 md:flex-row">
                      {/* Image credit */}
                      <div className="w-full md:w-1/2">
                        <label className="label">
                          <span className="label-text font-bold md:text-lg">
                            Image credit{" "}
                            {errors.credit && (
                              <span className="ml-2 rounded bg-error p-1 text-sm text-error-content">
                                Required
                              </span>
                            )}
                          </span>
                        </label>
                        <input
                          type="text"
                          disabled={formStatus !== "unsubmitted"}
                          placeholder="@twitterName or DiscordName#1234"
                          className="input input-bordered w-full placeholder:text-slate-400/50"
                          {...register("credit", {
                            required: true,
                          })}
                        />
                      </div>
                      {/* Image credit url */}
                      <div className="w-full md:w-1/2">
                        <label className="label">
                          <span className="label-text font-bold md:text-lg">
                            Image credit URL
                          </span>
                        </label>
                        <input
                          type="text"
                          disabled={formStatus !== "unsubmitted"}
                          placeholder="twitter.com/junkfoodarcades"
                          className="input input-bordered w-full placeholder:text-slate-400/50"
                          {...register("creditUrl")}
                        />
                      </div>
                    </div>

                    {formStatus === "unsubmitted" && (
                      <input
                        type="submit"
                        value="Submit your Micro"
                        className="btn btn-primary mt-4 w-full font-bold normal-case md:h-14 md:text-lg"
                      />
                    )}

                    {formStatus === "pending" && <PendingButton />}
                  </div>
                </div>
              </form>
            )}

            {formStatus === "complete" && (
              <div className="flex flex-col gap-8 md:my-3 md:flex-row md:gap-1">
                <div className="flex flex-col items-center justify-center gap-3 md:items-start">
                  <p className="text-2xl font-bold text-accent md:text-3xl">
                    Woah, nice micro
                  </p>
                  <p className="text-center md:text-start">
                    Check back in a few days to see it in the gallery.
                  </p>
                </div>
                <div className="mx-auto md:mx-0 md:ml-auto">
                  <div
                    className={`relative aspect-square h-full overflow-hidden rounded-lg  ${
                      isUploadedImageLoading ? "bg-base-300" : ""
                    }`}
                  >
                    <Image
                      alt="Your uploaded photo"
                      src={uploadedImageUrl}
                      objectFit="cover"
                      height="320px"
                      width="320px"
                      className={`transform duration-700 ease-in-out will-change-auto ${
                        isUploadedImageLoading
                          ? "scale-110 blur-xl grayscale"
                          : "scale-100 blur-0 grayscale-0"
                      }`}
                      onLoadingComplete={() => setUploadedImageLoading(false)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          {selectedFileUrl && formStatus !== "complete" ? (
            <div className="mt-4 hidden w-full md:block">
              <div className="relative flex h-full items-center justify-center rounded-lg bg-base-300">
                <Image
                  alt="Your selected file to upload"
                  src={selectedFileUrl}
                  layout="fill"
                  objectFit="contain"
                  className="object-fill"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Dialog>
  );
};

const PendingButton = () => {
  return (
    <button
      disabled
      className="btn btn-primary mt-4 inline-flex w-full normal-case md:text-lg"
    >
      <svg
        aria-hidden="true"
        role="status"
        className="mr-3 inline h-6 w-6 animate-spin text-primary"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      Please wait
    </button>
  );
};

export default SubmitMircoForm;
