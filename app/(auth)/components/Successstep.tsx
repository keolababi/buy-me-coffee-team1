import { CheckCircle } from "lucide-react";

export default function SuccessStep() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-teal-500" />
        </div>
      </div>
      <h1 className="text-xl font-medium text-gray-900 mb-2">Бэлэн боллоо!</h1>
      <p className="text-sm text-gray-400 mb-6">
        Таны профайл амжилттай үүслээ. Одоо хандивлагчдаа хуваалцаарай.
      </p>
      <button className="w-full bg-gray-900 text-white text-sm font-medium py-3 rounded-xl hover:bg-gray-700 transition-colors">
        Профайл харах
      </button>
    </div>
  );
}
