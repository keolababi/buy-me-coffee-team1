import { Check } from "lucide-react";

type Props = {
  steps: string[];
  currentStep: number;
};

export default function StepIndicator({ steps, currentStep }: Props) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const done = stepNum < currentStep;
        const active = stepNum === currentStep;

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  done
                    ? "bg-teal-500 text-white"
                    : active
                      ? "bg-gray-900 text-white"
                      : "bg-white border border-gray-300 text-gray-400"
                }`}
              >
                {done ? <Check className="w-4 h-4" /> : stepNum}
              </div>
              <span
                className={`mt-1.5 text-xs ${
                  active ? "text-gray-800 font-medium" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div
                className={`w-16 h-px mx-1 mb-5 transition-colors duration-300 ${
                  done ? "bg-teal-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
