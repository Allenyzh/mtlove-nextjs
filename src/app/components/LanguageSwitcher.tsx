"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedLang, setSelectedLang] = useState("en");

  const t = useTranslations("Language");

  // 读取 cookie 中的语言
  useEffect(() => {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
    if (cookies.locale) {
      setSelectedLang(cookies.locale);
    }
  }, []);

  const changeLanguage = (lang: string) => {
    document.cookie = `locale=${lang}; path=/; max-age=31536000`; // 设置 cookie
    setSelectedLang(lang);
    startTransition(() => {
      router.refresh(); // 触发页面重新渲染
    });
  };

  return (
    <div>
      <label htmlFor="language-select">{t('title')}: </label>
      <select
        id="language-select"
        value={selectedLang}
        onChange={(e) => changeLanguage(e.target.value)}
        disabled={isPending}
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
        <option value="zh">中文</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
}
