export type cardContent = {
  title: string;
  desc: string;
};

export function getContent(): cardContent[] {
  return Array.from({ length: 10 }).map((_, i) => ({
    title: `Item - ${i}`,
    desc: `This is the ${i} item in the list.`,
  }));
}
