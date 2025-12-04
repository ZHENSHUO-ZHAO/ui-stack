export type cardContent = {
  title: string;
  desc: string;
};

export function getContent(): cardContent[] {
  return Array.from({ length: 20 }).map((_, i) => ({
    title: `Card - ${i + 1}`,
    desc: `This is the ${i + 1} card in the list.`,
  }));
}
