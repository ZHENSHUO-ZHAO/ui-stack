import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";

export default function DialogBox({
  getApi,
}: {
  getApi: (api: { open: () => void }) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (getApi) {
      getApi({
        open: () => {
          setIsOpen(true);
        },
      });
    }
  }, [getApi]);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative">
      <DialogBackdrop className="fixed inset-0 bg-blue-900/50 backdrop-blur-xs"></DialogBackdrop>
      <div className="fixed inset-0 flex justify-center items-center">
        <DialogPanel className="space-y-4 min-w-1/4 max-w-1/3 bg-gray-600 rounded-lg py-6">
          <DialogTitle className="text-2xl w-full text-center border-b border-slate-500 pb-2">
            Notification
          </DialogTitle>
          <Description className="text-slate-300 text-lg px-10 pb-4 max-h-[20vh] overflow-y-auto">
            Your request has been shipped.
          </Description>
          <div className="flex gap-10 justify-center w-full">
            <button
              className="w-1/3 flex-initial bg-amber-500 text-slate-200 rounded-md px-2 py-1 hover:bg-amber-700"
              onClick={() => setIsOpen(false)}
            >
              OK
            </button>
            <button
              className="w-1/3 flex-initial bg-amber-500 text-slate-200 rounded-md px-2 py-1 hover:bg-amber-700"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
