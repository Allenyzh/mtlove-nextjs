export async function fetchScenarioList() {
  const data = await fetch(
    "https://mtloveapi.huangdong.workers.dev/api/scenarios"
  );
  const scenarioList = await data.json();
  return scenarioList;
}
