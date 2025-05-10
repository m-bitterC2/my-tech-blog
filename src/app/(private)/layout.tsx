import PrivateHeader from "@/components/layouts/PrivateHeader";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <PrivateHeader />
      {children}
    </>
  );
};

export default layout;
