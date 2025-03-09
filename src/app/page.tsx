import "/node_modules/primeflex/primeflex.css";
import ScenarioCard from "./components/ScenarioCard";

interface Scenario {
  id: number;
  title: string;
  description: string;
  system: string;
  start: string;
}

export default async function Home() {
  const data = await fetch(
    "https://mtloveapi.huangdong.workers.dev/api/scenarios"
  );
  const scenarioList = await data.json();
  // console.log(scenarioList);
  return (
    <main>
      <h1 className="flex justify-content-center align-content-center">
        MTLove
      </h1>
      <div className="grid">
        {scenarioList.map((scenario: Scenario, index: number) => {
          return (
            <div className="col-12 md:col-6 lg:col-3 " key={index}>
              <ScenarioCard scenario={scenario} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
