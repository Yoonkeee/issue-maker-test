import { atom } from "recoil";

export const issuesAtom = atom({
  key: "issuesAtom",
  default: {},
});

export const metadataAtom = atom({
  key: "metadataAtom",
  default: { repos: {}, labels: {} },
});
