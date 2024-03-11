import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui';
import { cn } from '~/utils/';

export default function Information({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'overflow-x-auto shadow-2xl dark:bg-gray-900 dark:text-white md:min-h-[373px] md:w-[680px]',
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
            Credits
          </DialogTitle>
        </DialogHeader>
        <div className="m-5 overflow-x-auto p-0 sm:p-6 sm:pt-4">
          <div className="mx-auto max-w-sm sm:max-w-96">
            <img src="/assets/tokens.png" alt="Flaticon" />
          </div>
          <div className=" mx-auto max-w-5xl ">
            <p className="mt-4 text-sm">
              In Language Models like GPT-4 and GPT-3.5, tokens represent the basic units of text
              that are processed. Credits in our app represent the currency used to perform
              operations with these models. Each interaction with the model, whether processing
              input or generating output, costs a certain number of credits.
            </p>
            <h2 className="mt-4 text-lg font-medium leading-6">GPT-4 Turbo Credits Usage:</h2>
            <ul className="mt-2 list-disc pl-5">
              <li>
                <strong>Input Tokens:</strong> Each text input token uses 1 credit.
              </li>
              <li>
                <strong>Output Tokens:</strong> Each text output token uses 3 credits.
              </li>
              <li>
                <strong>Image Input Tokens:</strong> Each image input token uses 3 credits.
              </li>
            </ul>
            <h2 className="mt-4 text-lg font-medium leading-6">GPT-3.5 Turbo Credits Usage:</h2>
            <ul className="mt-2 list-disc pl-5">
              <li>
                <strong>Input Tokens:</strong> Each input token uses 0.05 credits.
              </li>
              <li>
                <strong>Output Tokens:</strong> Each output token uses 0.15 credits.
              </li>
            </ul>
          </div>
          <div className="my-3 text-center">
            <button
              onClick={() => {
                window.location.href = 'mailto:contact.sastagpt@gmail.com';
              }}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Buy Credits
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
