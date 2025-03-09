export interface Scenario {
  id: string;
  title: string;
  description: string;
  system: string;
  start: string;
}

export async function fetchDb(sid: string): Promise<Scenario> {
  const response = await fetch(
    `https://mtloveapi.huangdong.workers.dev/api/scenarios/${sid}`
  );
  const data: Scenario | null = await response.json();
  // console.log(data);

  if (!data) {
    throw new Error("No data found");
  }

  const { id, title, description, system, start } = data;
  // console.log(
  //   `id: ${id} \n title: ${title} \n description: ${description} \n system: ${system} \n start: ${start}`
  // );

  return { id, title, description, system, start };
}
