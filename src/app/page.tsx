"use client";
import "/node_modules/primeflex/primeflex.css";
import ScenarioCard from "./components/ScenarioCard";
import { useTranslations } from "next-intl";
import { fetchScenarioList } from "./functions/fetchScenarioList";
import { useEffect, useState } from "react";

interface Scenario {
  id: number;
  title: string;
  description: string;
  system: string;
  start: string;
}

export default function Home() {
  const t = useTranslations("HomePage");

  const [scenarioList, setScenarioList] =useState<Scenario[]>([]);

  useEffect(() => {
    fetchScenarioList().then((data) => {
      setScenarioList(data);
    });
  }, []);

  return (
    <main>
      <h1 className="flex justify-content-center align-content-center">
        {t("title")}
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
