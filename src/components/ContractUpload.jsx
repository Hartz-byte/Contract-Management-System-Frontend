import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";

import { useUploadContract } from "../hooks/useContracts";

export default function ContractUpload() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const uploadMutation = useUploadContract();

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");

  // content validation
  const validateContent = (content) => {
    if (content.trim() === "") {
      return "Content is required";
    }
    try {
      JSON.parse(content);
    } catch (e) {
      console.log(e);
    }
    return true;
  };

  // on submit button click function
  const onSubmit = async (data) => {
    setFormData(data);
    setIsOpen(true);
  };

  // confirm function
  const handleConfirm = async () => {
    try {
      let processedContent;
      try {
        processedContent = JSON.parse(formData.content);
      } catch (e) {
        processedContent = formData.content;
        console.log(e);
      }

      await uploadMutation.mutateAsync({
        client_name: formData.clientName,
        content: processedContent,
      });
      reset();
      setIsOpen(false);
      setError("");
    } catch (error) {
      setError("Failed to upload contract. Please try again.");
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Upload Contract</h2>

        {/* error display */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* client name field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client Name
            </label>
            <input
              type="text"
              {...register("clientName", {
                required: "Client name is required",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />

            {/* error display */}
            {errors.clientName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.clientName.message}
              </p>
            )}
          </div>

          {/* content field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contract Content (Text or JSON Format)
            </label>
            <textarea
              {...register("content", { validate: validateContent })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />

            {/* error display */}
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* submit button */}
          <button
            type="submit"
            disabled={uploadMutation.isPending}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            {uploadMutation.isPending ? "Uploading..." : "Upload Contract"}
          </button>
        </form>
      </div>

      {/* confirmation dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
            {/* dialog title */}
            <Dialog.Title className="text-lg font-medium mb-4">
              Confirm Upload
            </Dialog.Title>

            {/* dialog text */}
            <p>Are you sure you want to upload this contract?</p>

            {/* buttons */}
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleConfirm}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
