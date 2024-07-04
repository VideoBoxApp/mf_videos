import { importRemote } from "module-federation-import-remote";

export const remoteVideosPage = async () => {
  let result: any;
  try {
    await importRemote({
      url: process?.env?.MF_DRAWER_URL!,
      scope: "mfDrawer",
      remoteEntryFileName: "dist/remoteEntry.js",
      module: "./storeDrawer",
    });

    const remoteModule = await import("mfDrawer/storeDrawer");
    result = remoteModule.default || remoteModule;
  } catch (err) {
    alert("Erro ao importar modulo remoto: " + err);
  }

  return result;
};
