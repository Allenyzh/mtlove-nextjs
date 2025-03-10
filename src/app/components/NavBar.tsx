import "/node_modules/primeflex/primeflex.css";
import "/node_modules/primereact/resources/themes/saga-blue/theme.css";
import "/node_modules/primereact/resources/primereact.min.css";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NavBar({
  score,
  setScore,
}: {
  score: number;
  setScore: (score: number) => void;
}) {
  const t = useTranslations("Nav");
  return (
    <div className="card">
      <Link href="/" style={{ textDecoration: "none" }}>
        {t("home")}
      </Link>
      <h1 className="flex justify-content-center align-content-center">
        <span>
          {t("title")} | {t("score")}: {score}
        </span>
      </h1>
    </div>
  );
}
