import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
} from "@material/material-color-utilities";

const toJson = (theme) => {
  let json = JSON.parse(JSON.stringify(theme.schemes));

  for (let i in json)
    for (let j in json[i]) json[i][j] = hexFromArgb(json[i][j]);

  json.dark.surfaceDim = hexFromArgb(theme.palettes.neutral.tone(6));

  json.dark.surface = hexFromArgb(theme.palettes.neutral.tone(6));

  json.dark.surfaceBright = hexFromArgb(theme.palettes.neutral.tone(24));

  json.dark.surfaceContainerLowest = hexFromArgb(
    theme.palettes.neutral.tone(4)
  );

  json.dark.surfaceContainerLow = hexFromArgb(theme.palettes.neutral.tone(10));

  json.dark.surfaceContainer = hexFromArgb(theme.palettes.neutral.tone(12));

  json.dark.surfaceContainerHigh = hexFromArgb(theme.palettes.neutral.tone(17));

  json.dark.surfaceContainerHighest = hexFromArgb(
    theme.palettes.neutral.tone(22)
  );

  json.dark.onSurface = hexFromArgb(theme.palettes.neutral.tone(90));

  json.dark.onSurfaceVariant = hexFromArgb(
    theme.palettes.neutralVariant.tone(80)
  );

  json.dark.outline = hexFromArgb(theme.palettes.neutralVariant.tone(60));

  json.dark.outlineVariant = hexFromArgb(
    theme.palettes.neutralVariant.tone(30)
  );

  return json;
};

const toCss = (data) => {
  let style = "";
  for (let i = 0, keys = Object.keys(data), n = keys.length; i < n; i++) {
    const key = keys[i];
    const value = data[key];
    const kebabCase = key
      .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
      .toLowerCase();
    style += "--" + kebabCase + ":" + value + ";";
  }
  return style;
};

export default (hex) => {
  return toCss(toJson(themeFromSourceColor(argbFromHex(hex))));
};
