const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    SUCCESS: 'bg-[#ECFDF3] text-[#027A48]',
    PENDING: 'bg-[#FFFAEB] text-[#B54708]',
    FAILED: 'bg-[#FEF3F2] text-[#B42318]',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-[12px] font-medium ${styles[status] || styles.PENDING}`}>
      {status}
    </span>
  );
};

export default StatusBadge;