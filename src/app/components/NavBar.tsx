import "/node_modules/primeflex/primeflex.css";
import "/node_modules/primereact/resources/themes/saga-blue/theme.css";
import "/node_modules/primereact/resources/primereact.min.css";
import Link from "next/link";

export default function NavBar({
  score,
  setScore,
}: {
  score: number;
  setScore: (score: number) => void;
}) {
  return (
    <div className="card">
      <Link href="/" style={{ textDecoration: "none" }}>
        Home
      </Link>
      <h1 className="flex justify-content-center align-content-center">
        <span>MTLove | Score: {score}</span>
      </h1>
    </div>
  );
}
