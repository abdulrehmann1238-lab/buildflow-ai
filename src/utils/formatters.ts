// UK Currency and Date formatters

export function formatGBP(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDateUK(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getStatusBadgeClasses(status: string): { bg: string; text: string; border: string; dot: string } {
  switch (status) {
    // Enquiry statuses
    case 'New Enquiry':
      return {
        bg: 'bg-[#EBF2EE]',
        text: 'text-[#354843]',
        border: 'border-[#CAD7D0]',
        dot: 'bg-[#536F67]'
      };
    case 'Awaiting Information':
      return {
        bg: 'bg-[#FBF6ED]',
        text: 'text-[#875317]',
        border: 'border-[#F1DFC4]',
        dot: 'bg-[#D97706]'
      };
    case 'Under Review':
      return {
        bg: 'bg-[#EAF0F4]',
        text: 'text-[#235A75]',
        border: 'border-[#CFDFEA]',
        dot: 'bg-[#0284C7]'
      };
    case 'Qualified':
      return {
        bg: 'bg-[#E8F0E9]',
        text: 'text-[#275E38]',
        border: 'border-[#CCE0CE]',
        dot: 'bg-[#16A34A]'
      };
    case 'Future Opportunity':
      return {
        bg: 'bg-[#F3EFF8]',
        text: 'text-[#5B3E84]',
        border: 'border-[#DFD4ED]',
        dot: 'bg-[#9333EA]'
      };
    case 'Declined / Closed':
      return {
        bg: 'bg-[#F4E9E6]',
        text: 'text-[#94372D]',
        border: 'border-[#E8CCC7]',
        dot: 'bg-[#DC2626]'
      };

    // Project statuses
    case 'Active Project':
      return {
        bg: 'bg-[#E8F0E9]',
        text: 'text-[#275E38]',
        border: 'border-[#CCE0CE]',
        dot: 'bg-[#16A34A]'
      };
    case 'Pre-Construction':
      return {
        bg: 'bg-[#EAF0F4]',
        text: 'text-[#235A75]',
        border: 'border-[#CFDFEA]',
        dot: 'bg-[#0284C7]'
      };
    case 'On Site':
      return {
        bg: 'bg-[#FBF6ED]',
        text: 'text-[#875317]',
        border: 'border-[#F1DFC4]',
        dot: 'bg-[#D97706]'
      };
    case 'Practical Completion':
      return {
        bg: 'bg-[#EBF2EE]',
        text: 'text-[#354843]',
        border: 'border-[#CAD7D0]',
        dot: 'bg-[#536F67]'
      };
    case 'Closed':
      return {
        bg: 'bg-[#F0F1ED]',
        text: 'text-[#747B76]',
        border: 'border-[#E7E9E4]',
        dot: 'bg-[#8E9690]'
      };

    // Task statuses
    case 'To Do':
      return {
        bg: 'bg-[#F0F1ED]',
        text: 'text-[#48504B]',
        border: 'border-[#E7E9E4]',
        dot: 'bg-[#8E9690]'
      };
    case 'In Progress':
      return {
        bg: 'bg-[#EAF0F4]',
        text: 'text-[#235A75]',
        border: 'border-[#CFDFEA]',
        dot: 'bg-[#0284C7]'
      };
    case 'Completed':
      return {
        bg: 'bg-[#E8F0E9]',
        text: 'text-[#275E38]',
        border: 'border-[#CCE0CE]',
        dot: 'bg-[#16A34A]'
      };

    // Task Priority
    case 'Urgent':
      return {
        bg: 'bg-[#F4E9E6]',
        text: 'text-[#94372D]',
        border: 'border-[#E8CCC7]',
        dot: 'bg-[#DC2626]'
      };
    case 'High':
      return {
        bg: 'bg-[#FBF6ED]',
        text: 'text-[#875317]',
        border: 'border-[#F1DFC4]',
        dot: 'bg-[#D97706]'
      };
    case 'Medium':
      return {
        bg: 'bg-[#EAF0F4]',
        text: 'text-[#235A75]',
        border: 'border-[#CFDFEA]',
        dot: 'bg-[#0284C7]'
      };
    case 'Low':
      return {
        bg: 'bg-[#F0F1ED]',
        text: 'text-[#747B76]',
        border: 'border-[#E7E9E4]',
        dot: 'bg-[#8E9690]'
      };

    // AI Classification
    case 'Existing Project Correspondence':
      return {
        bg: 'bg-[#EAF0F4]',
        text: 'text-[#235A75]',
        border: 'border-[#CFDFEA]',
        dot: 'bg-[#0284C7]'
      };
    case 'Unrelated Communication':
      return {
        bg: 'bg-[#F4E9E6]',
        text: 'text-[#747B76]',
        border: 'border-[#E7E9E4]',
        dot: 'bg-[#8E9690]'
      };

    default:
      return {
        bg: 'bg-[#F0F1ED]',
        text: 'text-[#252B29]',
        border: 'border-[#E7E9E4]',
        dot: 'bg-[#747B76]'
      };
  }
}
