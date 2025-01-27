import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

export default function ContractSearch({ onSearch }) {
  const { register, handleSubmit } = useForm();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Search Contracts</h2>

      {/* form */}
      <form
        onSubmit={handleSubmit(onSearch)}
        className="grid grid-cols-1 gap-4 sm:grid-cols-4"
      >
        {/* contract id */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contract ID
          </label>
          <input
            type="text"
            {...register("contract_id")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* client name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Client Name
          </label>
          <input
            type="text"
            {...register("client_name")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            {...register("status")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="">All</option>
            <option value="Draft">Draft</option>
            <option value="Finalized">Finalized</option>
          </select>
        </div>

        {/* search button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

ContractSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
