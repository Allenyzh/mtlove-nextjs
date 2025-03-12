"use client";
import "/node_modules/primeflex/primeflex.css";
import ScenarioCard from "./components/ScenarioCard";
import { useTranslations } from "next-intl";
import { fetchScenarioList } from "./functions/fetchScenarioList";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";

interface Scenario {
  id: number;
  title: string;
  description: string;
  system: string;
  start: string;
}

export default function Home() {
  const t = useTranslations("HomePage");

  const [scenarioList, setScenarioList] = useState<Scenario[]>([]);

  useEffect(() => {
    fetchScenarioList().then((data) => {
      setScenarioList(data);
    });
  }, []);

  return (
    <main className="flex flex-column">
      <div className="fixed top-0 w-full z-5">
        <NavBar score={-999} />
      </div>

      <div className="grid flex-1 pt-8">
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
