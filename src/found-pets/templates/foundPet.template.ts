import { FoundPetDto } from "src/core/interfaces/foundPets.interface";
import { generateMapboxImage } from "src/core/utils/utils";
import { LostPetDto } from "src/core/interfaces/lostPets.interface";


export const generateFoundPetEmailTemplate = (foundPet: FoundPetDto, lostPet?: LostPetDto): string => {

    const foundImageUrl = generateMapboxImage(foundPet.lat, foundPet.lon);
    const lostImageUrl = lostPet ? generateMapboxImage(lostPet.lat, lostPet.lon) : null;

    const date = new Date().toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>

    <body style="margin:0;padding:0;background-color:#f0f2f5;font-family:'Segoe UI',Roboto,Arial,sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f5;padding:32px 0;">
            <tr>
                <td align="center">

                    <table width="600" cellpadding="0" cellspacing="0"
                        style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                        <tr>
                            <td style="background:linear-gradient(135deg,#ff7a18,#ffb347);padding:32px 40px;">

                                <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">
                                    🐾 Mascota Encontrada
                                </h1>

                                <p style="margin:8px 0 0;color:#ffffffcc;font-size:14px;">
                                    Posible coincidencia con una mascota perdida
                                </p>

                            </td>
                        </tr>
                        ${foundPet.photo_url ? `
                        <tr>
                            <td style="padding:24px 40px 0;">
                                <img src="${foundPet.photo_url}" width="520"
                                    style="width:100%;border-radius:12px;display:block;max-height:300px;object-fit:cover;"
                                    alt="Foto de la mascota"/>
                            </td>
                        </tr>` : ''}
                        <tr>
                            <td style="padding:32px 40px 0;">

                                <h2 style="margin:0 0 12px;font-size:14px;font-weight:600;color:#6b7280;text-transform:uppercase;">
                                    Informacion de la Mascota
                                </h2>

                                <table width="100%" cellpadding="0" cellspacing="0">

                                    <tr>
                                        <td width="50%" style="padding-bottom:10px;">
                                            <span style="font-size:12px;color:#9ca3af;">Especie</span><br/>
                                            <strong>${foundPet.species}</strong>
                                        </td>

                                        <td width="50%" style="padding-bottom:10px;">
                                            <span style="font-size:12px;color:#9ca3af;">Raza</span><br/>
                                            <strong>${foundPet.breed ?? "No identificada"}</strong>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td width="50%" style="padding-bottom:10px;">
                                            <span style="font-size:12px;color:#9ca3af;">Color</span><br/>
                                            <strong>${foundPet.color}</strong>
                                        </td>

                                        <td width="50%">
                                            <span style="font-size:12px;color:#9ca3af;">Tamaño</span><br/>
                                            <strong>${foundPet.size}</strong>
                                        </td>
                                    </tr>

                                </table>

                                <p style="margin-top:16px;font-size:15px;color:#1f2937;line-height:1.6;">
                                    ${foundPet.description}
                                </p>

                            </td>
                        </tr>
                        <tr>
                            <td style="padding:24px 40px 0;">

                                <table width="100%" cellpadding="0" cellspacing="0"
                                    style="background-color:#f8f9fb;border-radius:12px;">

                                    <tr>
                                        <td style="padding:20px 24px;">

                                            <h2 style="margin:0 0 16px;font-size:14px;font-weight:600;color:#6b7280;text-transform:uppercase;">
                                                Contacto de quien encontro la mascota
                                            </h2>

                                            <table width="100%" cellpadding="0" cellspacing="0">

                                                <tr>
                                                    <td width="50%" style="padding-bottom:10px;">
                                                        <span style="font-size:12px;color:#9ca3af;">Nombre</span><br/>
                                                        <strong>${foundPet.finder_name}</strong>
                                                    </td>

                                                    <td width="50%">
                                                        <span style="font-size:12px;color:#9ca3af;">Telefono</span><br/>
                                                        <strong>${foundPet.finder_phone}</strong>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td colspan="2" style="padding-top:10px;">
                                                        <span style="font-size:12px;color:#9ca3af;">Email</span><br/>
                                                        <strong>${foundPet.finder_email}</strong>
                                                    </td>
                                                </tr>

                                            </table>

                                        </td>
                                    </tr>

                                </table>

                            </td>
                        </tr>
                        <tr>
                            <td style="padding:24px 40px 0;">

                                <h2 style="margin:0 0 12px;font-size:14px;font-weight:600;color:#6b7280;text-transform:uppercase;">
                                    Ubicacion donde fue encontrada
                                </h2>

                                <p style="margin:0 0 12px;font-size:15px;color:#1f2937;">
                                    ${foundPet.address}
                                </p>

                            </td>
                        </tr>
                        <tr>
                            <td style="padding:16px 40px 0;">
                                <img src="${foundImageUrl}" width="520"
                                    style="width:100%;border-radius:12px;display:block;"
                                    alt="Mapa donde fue encontrada"/>
                            </td>
                        </tr>
                        ${lostImageUrl ? `
                        <tr>
                            <td style="padding:24px 40px 0;">

                                <h2 style="margin:0 0 12px;font-size:14px;font-weight:600;color:#6b7280;text-transform:uppercase;">
                                    Ubicacion donde se perdio
                                </h2>

                                <p style="margin:0 0 12px;font-size:15px;color:#1f2937;">
                                    ${lostPet?.address}
                                </p>

                            </td>
                        </tr>

                        <!-- MAP PERDIDA -->
                        <tr>
                            <td style="padding:16px 40px 24px;">
                                <img src="${lostImageUrl}" width="520"
                                    style="width:100%;border-radius:12px;display:block;"
                                    alt="Mapa donde se perdio"/>
                            </td>
                        </tr>` : ''}
                        <tr>
                            <td style="padding:0 40px 32px;">

                                <table width="100%" cellpadding="0" cellspacing="0"
                                    style="border-top:1px solid #e5e7eb;padding-top:20px;">

                                    <tr>
                                        <td>

                                            <p style="margin:0;font-size:12px;color:#9ca3af;">
                                                Reporte generado el ${date}
                                            </p>

                                            <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">
                                                Sistema PetRadar
                                            </p>

                                        </td>
                                    </tr>

                                </table>

                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

    </body>
    </html>
    `;
}