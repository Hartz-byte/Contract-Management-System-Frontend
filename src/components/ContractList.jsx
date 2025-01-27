import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

import {
  useContracts,
  useUpdateContract,
  useDeleteContract,
} from "../hooks/useContracts";
import ContractSearch from "./ContractSearch";
import ContractEditModal from "./ContractEditModal";

export default function ContractList() {
  const [filters, setFilters] = useState({});
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    contractId: null,
  });
  const [updateError, setUpdateError] = useState("");
  const [editDialog, setEditDialog] = useState({
    isOpen: false,
    contract: null,
  });

  const { data, isLoading, error } = useContracts(filters);
  const updateMutation = useUpdateContract();
  const deleteMutation = useDeleteContract();

  // search function
  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
  };

  // clear filter function
  const handleClearFilters = () => {
    setFilters({});
  };

  // status change function
  const handleStatusChange = async (contract, newStatus) => {
    try {
      await updateMutation.mutateAsync({
        id: contract.id,
        status: newStatus,
      });
      setUpdateError("");
    } catch (error) {
      setUpdateError("Failed to update contract status. Please try again.");
      console.log(error);
    }
  };

  // contract delete function
  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(deleteDialog.contractId);
      setDeleteDialog({ isOpen: false, contractId: null });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Add this to existing handlers
  const handleEdit = async (updatedContract) => {
    try {
      await updateMutation.mutateAsync(updatedContract);
      setEditDialog({ isOpen: false, contract: null });
    } catch (error) {
      setUpdateError("Failed to update contract. Please try again.");
      console.error("Edit error:", error);
    }
  };

  // loading check
  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  // error check
  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-red-600">
          Error loading contracts: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* h2, clear filter button & contract search component */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Search Contracts</h2>

          {/* clear filter button */}
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            Clear Filters
          </button>
        </div>

        {/* contract search component */}
        <ContractSearch onSearch={handleSearch} />
      </div>

      {/* update error */}
      {updateError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {updateError}
        </div>
      )}

      {/* contract list table */}
      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
          {data?.data.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No contracts found
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              {/* table headings */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contract ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Edit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>

              {/* contract list details */}
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.data.map((contract) => (
                  <tr key={contract.id}>
                    {/* contract id */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {contract.contract_id}
                    </td>

                    {/* client name */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contract.client_name}
                    </td>

                    {/* status change */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={contract.status}
                        onChange={(e) =>
                          handleStatusChange(contract, e.target.value)
                        }
                        className="block w-full pl-3 pr-0 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md cursor-pointer"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Finalized">Finalized</option>
                      </select>
                    </td>

                    {/* buttons */}
                    <>
                      {/* edit button */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() =>
                            setEditDialog({ isOpen: true, contract: contract })
                          }
                          className="text-indigo-600 hover:text-indigo-900 cursor-pointer mr-4"
                        >
                          Edit
                        </button>
                      </td>

                      {/* delete button */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() =>
                            setDeleteDialog({
                              isOpen: true,
                              contractId: contract.id,
                            })
                          }
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* edit dialog model */}
      {editDialog.isOpen && (
        <ContractEditModal
          contract={editDialog.contract}
          isOpen={editDialog.isOpen}
          onClose={() => setEditDialog({ isOpen: false, contract: null })}
          onSave={handleEdit}
        />
      )}

      {/* delete confirmation dialog */}
      <Dialog
        open={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, contractId: null })}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
            {/* dialog title */}
            <Dialog.Title className="text-lg font-medium mb-4">
              Confirm Delete
            </Dialog.Title>

            {/* dialog text */}
            <p>
              Are you sure you want to delete this contract? This action cannot
              be undone.
            </p>

            {/* buttons */}
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleDelete}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  setDeleteDialog({ isOpen: false, contractId: null })
                }
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
