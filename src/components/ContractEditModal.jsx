import React from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

export default function ContractEditModal({
  contract,
  isOpen,
  onClose,
  onSave,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      client_name: contract?.client_name || "",
      content: contract?.content
        ? JSON.stringify(contract.content, null, 2)
        : "",
      status: contract?.status || "Draft",
    },
  });

  const onSubmit = (data) => {
    // Parse content if it's valid JSON
    let processedContent;
    try {
      processedContent = JSON.parse(data.content);
    } catch (e) {
      processedContent = { text: data.content };
      console.log(e);
    }

    onSave({
      id: contract.id,
      ...data,
      content: processedContent,
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full rounded bg-white p-6">
          <Dialog.Title className="text-lg font-medium mb-4">
            Edit Contract
          </Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client Name
              </label>
              <input
                type="text"
                {...register("client_name", {
                  required: "Client name is required",
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.client_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.client_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                {...register("content", { required: "Content is required" })}
                rows={10}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.content.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                {...register("status")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="Draft">Draft</option>
                <option value="Finalized">Finalized</option>
              </select>
            </div>

            <div className="mt-4 flex space-x-4">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

ContractEditModal.propTypes = {
  contract: PropTypes.shape({
    id: PropTypes.number.isRequired,
    client_name: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
      .isRequired,
    status: PropTypes.string.isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
