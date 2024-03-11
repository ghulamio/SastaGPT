import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui';
import { cn } from '~/utils/';

export default function Pricing({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'overflow-x-auto shadow-2xl dark:bg-gray-900 dark:text-white md:min-h-[373px] md:w-[720px]',
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
            Pricing
          </DialogTitle>
        </DialogHeader>
        <div className="m-5 overflow-x-auto p-0 sm:p-6 sm:pt-4">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="relative rounded-lg border p-5 shadow-sm">
              <h3 className="text-center text-lg font-medium leading-6">100,000 credits</h3>
              <p className="mt-4 text-center">
                <span className="text-4xl font-semibold">$1.5</span>
              </p>
            </div>
            <div className="relative rounded-lg border p-5 shadow-sm">
              <h3 className="text-center text-lg font-medium leading-6">500,000 credits</h3>
              <p className="mt-4 text-center">
                <span className="text-4xl font-semibold">$7</span>
              </p>
              <p className="mt-2 text-right text-sm text-emerald-500">
                Save {Math.floor((1 - 7 / (5 * 1.5)) * 100)}%
              </p>
            </div>
            <div className="relative rounded-lg border p-5 shadow-sm">
              <h3 className="text-center text-lg font-medium leading-6">1,000,000 credits</h3>
              <p className="mt-4 text-center">
                <span className="text-4xl font-semibold">$13</span>
              </p>
              <p className="mt-2 text-right text-sm text-emerald-500">
                Save {Math.floor((1 - 13 / (10 * 1.5)) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
