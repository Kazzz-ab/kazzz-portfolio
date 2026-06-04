interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div
      className={`max-w-[720px] mx-auto px-5 py-7 md:px-7 ${className}`}
    >
      {children}
    </div>
  );
}
