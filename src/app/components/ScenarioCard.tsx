import { Card } from "primereact/card";
import { Button } from "primereact/button";
import Link from "next/link";
import {useTranslations} from 'next-intl';
import "./ScenarioCard.css";
import "/node_modules/primeflex/primeflex.css";
import "/node_modules/primereact/resources/themes/saga-blue/theme.css";
import "/node_modules/primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface Scenario {
  id: number;
  title: string;
  description: string;
  system: string;
  start: string;
}

export default function ScenarioCard({ scenario }: { scenario: Scenario }) {

  const t = useTranslations('Card');

  const footer = (
    <Link href={`/challenges/${scenario.id}`} passHref>
      <Button label={t('button')} severity="info" className="w-full" />
    </Link>
  );

  return (
    <div className="card flex justify-content-center h-full w-full">
      <Card
        title={scenario.title}
        subTitle=""
        footer={footer}
        className="md:w-25rem"
      >
        <p className="m-0 ">{scenario.description}</p>
      </Card>
    </div>
  );
}
