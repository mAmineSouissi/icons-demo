import type { GetServerSideProps } from "next";

// Old route — permanently redirected to /brief-builder
export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: { destination: "/brief-builder", permanent: true },
});

export default function Brief() {
  return null;
}
