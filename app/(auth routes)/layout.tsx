export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      {children}
    </main>
  );
}
