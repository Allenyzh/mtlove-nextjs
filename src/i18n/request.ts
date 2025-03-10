import { getRequestConfig } from "next-intl/server";
import {cookies} from 'next/headers'; // 用于读取cookie

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  // 从cookie获取语言设置，默认是 'fr'
  const locale = (await cookies()).get('locale')?.value || 'fr';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
