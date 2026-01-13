const Centered = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-[90dvh] items-center justify-center">
      {children}
    </div>
  );
};

export default Centered;
