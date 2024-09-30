// import { useEffect, useState } from "react";
// import { USEEEEESELECTOR } from "./useCustomReduxHook";
// // import { getParameters } from "../store/slices/messageDataSlice";

// const checkHexColor = (hexColor: string) => {
//   const hexColorRegex = /^#([0-9A-Fa]{3}|[0-9A-Fa-f]{6})$/;
//   return hexColorRegex.test(hexColor);
// };

// export const useTheme = () => {
//   // const params = USEEEEESELECTOR((state) => getParameters(state));

//   // const [theme, setTheme] = useState({
//   //   primary_color: params.primary_color || "#028FDF",
//   //   secondary_color: params.secondary_color || "#586C93",
//   //   tertiary_color: params.tertiary_color || "#169A16",
//   //   nav_and_background_colors: params.nav_and_background_colors || "#030031",
//   //   background_color: params.background_color || "#FFFFFF",
//   // });

//   useEffect(() => {
//     const primary_color = params?.hasOwnProperty("primary_color")
//       ? params.primary_color
//       : undefined;
//     const secondary_color = params?.hasOwnProperty("secondary_color")
//       ? params.secondary_color
//       : undefined;
//     const tertiary_color = params?.hasOwnProperty("tertiary_color")
//       ? params.tertiary_color
//       : undefined;
//     const nav_and_background_colors = params?.hasOwnProperty(
//       "nav_and_background_colors"
//     )
//       ? params.nav_and_background_colors
//       : undefined;
//     const background_color = params?.hasOwnProperty("background_color")
//       ? params.background_color
//       : undefined;
//     if (
//       primary_color &&
//       secondary_color &&
//       tertiary_color &&
//       nav_and_background_colors
//     ) {
//       if (
//         checkHexColor(primary_color) &&
//         checkHexColor(secondary_color) &&
//         checkHexColor(tertiary_color) &&
//         checkHexColor(nav_and_background_colors)
//       ) {
//         setTheme((prev) => ({
//           ...prev,
//           primary_color,
//           secondary_color,
//           tertiary_color,
//           nav_and_background_colors,
//         }));
//       }
//       if (background_color) {
//         if (checkHexColor(background_color))
//           setTheme((prev) => ({ ...prev, background_color }));
//       }
//     }
//   }, [params]);

//   return {
//     theme,
//   };
// };
