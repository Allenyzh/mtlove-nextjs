import "/node_modules/primeflex/primeflex.css";
import "/node_modules/primereact/resources/themes/saga-blue/theme.css";
import "/node_modules/primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useTranslations } from "next-intl";
import { Menubar } from "primereact/menubar";
import { useState } from "react";

export default function NavBar({ score }: { score: number }) {
  const t = useTranslations("Nav");

  const getInitialLocale = () => {
    if (typeof document !== "undefined") {
      // 判断是否在浏览器环境
      const match = document.cookie.match(/locale=([^;]+)/); // 从 cookie 中获取 locale 通过正则表达式来提取locale的值
      return match ? match[1] : "fr"; // 如果匹配到了则返回 locale 的值，否则返回 fr
    }
    return "fr"; // 如果不在浏览器环境则返回 fr
  };

  const [currentLanguage, setCurrentLanguage] = useState(getInitialLocale()); // 获取当前语言

  const languageMap: Record<string, string> = {
    en: "English",
    fr: "Français",
    zh: "简体中文",
    "zh-Hant": "繁體中文",
    es: "Español",
  }; // 语言映射，用于显示语言名称

  const handleLanguageChange = (locale: string) => {
    document.cookie = `locale=${locale}; path=/; max-age=31536000`;
    setCurrentLanguage(locale);
    window.location.reload();
  };

  const items = [
    {
      label: t("home"),
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location.href = "/";
      },
    },
    {
      label: languageMap[currentLanguage] || t("language"),
      icon: "pi pi-fw pi-globe",
      items: [
        {
          label: "English",
          icon: "pi pi-fw pi-flag",
          command: () => handleLanguageChange("en"),
        },
        {
          label: "Français",
          icon: "pi pi-fw pi-flag",
          command: () => handleLanguageChange("fr"),
        },
        {
          label: "中文",
          icon: "pi pi-fw pi-flag",
          items: [
            {
              label: "简体中文",
              icon: "pi pi-fw pi-flag",
              command: () => handleLanguageChange("zh"),
            },
            {
              label: "繁體中文",
              icon: "pi pi-fw pi-flag",
              command: () => handleLanguageChange("zh-Hant"),
            },
          ],
        },
        {
          label: "Español",
          icon: "pi pi-fw pi-flag",
          command: () => handleLanguageChange("es"),
        },
      ],
    },
  ];

  const startElement = (
    <h1 className="flex justify-content-center align-content-center">
      {t("title")}
    </h1>
  );

  const end =
    score !== -999 ? (
      <span className="flex justify-content-center align-content-center">
        {t("score")}: {score}
      </span>
    ) : null;
  return (
    <div className="card">
      <Menubar model={items} start={startElement} end={end} />
    </div>
  );
}
