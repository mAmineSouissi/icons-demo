import type { GetStaticPaths, GetStaticProps } from "next";
import CreatorProfilePage from "@/components/pages/CreatorProfilePage";
import { creators, getCreatorByHandle, type CreatorProfile } from "@/data/creators";

type Props = { creator: CreatorProfile };

export default function CreatorProfile({ creator }: Props) {
  return <CreatorProfilePage creator={creator} />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: creators.map((c) => ({ params: { handle: c.handle } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const creator = getCreatorByHandle(params?.handle as string);
  if (!creator) return { notFound: true };
  return { props: { creator } };
};
