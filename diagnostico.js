// importacion de modulos nativos (core)
const os = require("os");
const path = require("path");

const fs = require("fs/promises");

async function generarDiagnostico() {
  try {
    const infoHost = {
      cpu: os.cpus()[0].model,
      arquitectura: os.arch(),
      plataforma: os.platform(),
      memoriaTotalGB: (os.totalmem() / 1024 ** 3).toFixed(2),
      memoriaLibreGB: (os.freemem() / 1024 ** 3).toFixed(2),
      usuario: os.userInfo().username,
      uptimeHoras: (os.uptime() / 3600).toFixed(2),
    };

    console.table(infoHost);
    const carpetaLogs = path.join(__dirname, "logs", "diagnosticos");
    const archivoLog = path.join(carpetaLogs, "sistema.log");

    await fs.mkdir(carpetaLogs, { recursive: true });

    const timestamp = new Date().toISOString();

    const log = `
        ==============================================================
        FECHA DE REPORTE:   ${timestamp}
        USUARIO ACTIVO:     ${infoHost.usuario}
        HARDWARE:           ${infoHost.cpu} (${infoHost.arquitectura}) 
        SISTEMA:            ${infoHost.plataforma}
        ESTADO RAM:         ${infoHost.memoriaLibreGB} GB
        TIEMPO ACTIVIDAD:   ${infoHost.uptimeHoras} HORAS
        ==============================================================
        `;

        await fs.appendFile(archivoLog, log);
        console.log("Diagnostico guardado con éxito en: ")
        console.log(archivoLog);
  } catch (error) {
    console.error("Error crítico en el sistema: ");
    console.error(error.message);
  }
}

generarDiagnostico();
