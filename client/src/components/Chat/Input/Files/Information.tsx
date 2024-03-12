import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui';
import { cn } from '~/utils/';

export default function Information({ open, onOpenChange, onOpenPricing }) {
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
          <p className="py-4 text-sm">
            In Language Models like GPT-4 and GPT-3.5, tokens represent the basic units of text that
            are processed. Credits in our app represent the currency used to perform operations with
            these models. Each interaction with the model, whether processing input or generating
            output, costs a certain number of credits.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-200">
                    Model
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-200">
                    Text Input Tokens
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-200">
                    Text Output Tokens
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-200">
                    Image Tokens
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-800">
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                    GPT-4 Turbo
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    1 credit
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    3 credits
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    3 credits
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                    GPT-3.5 Turbo
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    0.05 credits
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    0.15 credits
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    —
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="my-3 text-center">
            <button
              onClick={() => {
                onOpenPricing(true);
                onOpenChange(false);
              }}
              className="btn btn-sm inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Buy Credits
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
