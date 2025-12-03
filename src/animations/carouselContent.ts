export type cardContent = {
  title: string;
  desc: string;
};

export function getContent(): cardContent[] {
  return Array.from({ length: 10 }).map((_, i) => ({
    title: `Item - ${i + 1}`,
    desc: `This is the ${i + 1} item in the list.`,
  }));
}
