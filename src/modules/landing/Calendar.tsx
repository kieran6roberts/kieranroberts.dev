import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

import { useStore } from "@nanostores/react";
import { theme } from "src/stores/themeStore";

export const Calendar = () => {
  const $theme = useStore(theme);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#fdfdfd" },
          dark: { "cal-brand": "#100114" },
        },
        // theme: $theme,
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <Cal
      namespace="15min"
      calLink="kieranroberts6dev/15min"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
};
