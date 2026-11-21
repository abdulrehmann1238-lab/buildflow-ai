import React from 'react';
import { useWorkspace, ToastMessage } from '../../context/WorkspaceContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useWorkspace();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => dismissToast(toast.id)} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: () => void }> = ({ toast, onDismiss }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-[#275E38] shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-[#875317] shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-[#94372D] shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-[#235A75] shrink-0" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success': return 'border-[#CCE0CE] bg-[#F7FAF7]';
      case 'warning': return 'border-[#F1DFC4] bg-[#FDF9F3]';
      case 'error': return 'border-[#E8CCC7] bg-[#FDF6F5]';
      case 'info': return 'border-[#CFDFEA] bg-[#F5F9FC]';
    }
  };

  return (
    <div className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-modal animate-fade-in ${getBorderColor()}`}>
      <div className="pt-0.5">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-[#252B29] font-heading">{toast.title}</h4>
        <p className="text-xs text-[#747B76] mt-0.5 leading-relaxed">{toast.description}</p>
      </div>
      <button
        onClick={onDismiss}
        className="p-1 text-[#747B76] hover:text-[#252B29] rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
