"use client";

export default function ChangeLanguageModal({
    isOpen,
    onConfirm,
    onCancel,
    loading = false
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
            <div className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-[#1e1e1e]">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Change Code Language?
                </h2>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Your current code will be translated to the new language.
                    Are you sure you want to continue?
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-lg cursor-pointer px-4 py-2 text-sm font-medium
                        text-gray-700 hover:bg-gray-100
                        dark:text-gray-300 dark:hover:bg-[#2a2a2a]
                        disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm
                        font-medium text-white cursor-pointer hover:bg-red-700
                        disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "OK"}
                    </button>
                </div>
            </div>
        </div>
    );
}