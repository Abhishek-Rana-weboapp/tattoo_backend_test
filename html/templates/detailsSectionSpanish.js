const { C_questions_s, C_questions_m_s } = require("../../ConsentQuestions");
const { medicalQuestions_s } = require("../../MedicalQuestions");
const { terms_s } = require("../../TermOfServiceQuestions");
const {
  formattedDateTime,
  formatDateOnly,
} = require("../../utils/helperFunctions");
const { questionsTemplate_s, questionsTemplate } = require("./questionsTemplates");

const userDetails_s = (parsedData) => {
  const dateOfBirth = new Date(parsedData.dateofbirth);
  const age = Math.floor(
    (new Date() - dateOfBirth) / (365.25 * 24 * 60 * 60 * 1000)
  );

  const gaurdianDOB = parsedData?.guardian_info?.dateOfBirth
    ? new Date(parsedData.guardian_info.dateOfBirth)
    : null;
  const guardianAge =
    gaurdianDOB !== null
      ? Math.floor((new Date() - dateOfBirth) / (365.25 * 24 * 60 * 60 * 1000))
      : "";
  if (parsedData.minor === "false") {
    return `<div style="display: grid;grid-template-columns:repeat(8,1fr);gap:2px;width:95%">
        <p style="grid-column: span 3; display: flex;">Nombre:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.firstname} ${parsedData?.lastname}</span></p>
        <p style="grid-column: span 2; display: flex;">Teléfono #:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.phone_number}</span></p>
        <p style="grid-column: span 3; display: flex;">Correo electrónico:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.username}</span></p>
        </div>
        <div style="display: grid;grid-template-columns:repeat(8,1fr);gap:2px;">
        <p style="grid-column: span 4; display: flex;">Dirección:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.address}</span></p>
        <p style="grid-column: span 1 ; display: flex;">Ciudad #:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.city}</span></p>
        <p style="grid-column: span 1; display: flex;">Estado:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.state}</span></p>
        <p style="grid-column: span 2; display: flex;">Código postal:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.zip}</span></p>
        
        </div>
        <div style="display: grid;grid-template-columns:repeat(8,1fr);gap:2px;">
            <p style="grid-column: span 3; display: flex;">Fecha de Nacimiento:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.dateofbirth}</span></p>
            <p style="grid-column: span 1 ; display: flex;">Edad:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${age}</span></p>
            <p style="grid-column: span 1; display: flex;">Género:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.gender}</span></p>
            <p style="grid-column: span 1; display: flex;">Raza:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.race}</span></p>
        </div>`;
  } else {
    return `<div style="margin-bottom:5px;padding:2px; border:2px solid #00ff00">
    <div style="display: grid;grid-template-columns:repeat(8,1fr);gap:2px;width:95%;">
        <p style="grid-column: span 3; display: flex;"><span style="font-weight:700;background-color:#00ff00">Información del menor:</span>Nombre:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.firstname} ${parsedData?.lastname}</span></p>
        <p style="grid-column: span 2 ; display: flex;">Teléfono #:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.phone_number}</span></p>
        <p style="grid-column: span 3; display: flex;">Correo electrónico:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.username}</span></p>
        </div>
        <div style="display: grid;grid-template-columns:repeat(8,1fr);gap:2px;">
        <p style="grid-column: span 3; display: flex;">Dirección:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.address}</span></p>
        <p style="grid-column: span 2 ; display: flex;">Ciudad #:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.city}</span></p>
        <p style="grid-column: span 1; display: flex;">Estado:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.state}</span></p>
        <p style="grid-column: span 2; display: flex;">Código postal:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.zip}</span></p>
        
        </div>
        <div style="display: grid;grid-template-columns:repeat(8,1fr);gap:2px;">
            <p style="grid-column: span 2; display: flex;">Fecha de Nacimiento:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.dateofbirth}</span></p>
            <p style="grid-column: span 1 ; display: flex;">Edad:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${age}</span></p>
            <p style="grid-column: span 1; display: flex;">Género:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.gender}</span></p>
            <p style="grid-column: span 1; display: flex;">Raza:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.race}</span></p>
        </div>
        
        </div>
        
        <div style="margin-bottom:5px;padding:2px; border:2px solid #ffff00">
            <div style="display: grid;grid-template-columns:repeat(8,1fr);gap:2px;">
        <p style="grid-column: span 3; display: flex;"><span style="font-weight:700;background-color:#ffff00">Información del guardián:</span>Nombre:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.guardian_info?.firstName} ${parsedData?.guardian_info?.lastName}</span></p>
        <p style="grid-column: span 2 ; display: flex;">Teléfono #:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.guardian_info?.phoneNumber}</span></p>
        <p style="grid-column: span 3; display: flex;">Correo electrónico:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.guardian_info?.email}</span></p>
        </div>
        <div style="display: grid;grid-template-columns:repeat(8,1fr);gap:2px;">
        <p style="grid-column: span 3; display: flex;">Dirección:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.guardian_info?.firstName.address}</span></p>
        <p style="grid-column: span 2 ; display: flex;">Ciudad #:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.city}</span></p>
        <p style="grid-column: span 1; display: flex;">Estado:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.state}</span></p>
        <p style="grid-column: span 2; display: flex;">Código postal:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.zip}</span></p>
        
        </div>
        <div style="display: grid;grid-template-columns:repeat(8,1fr);gap:2px;">
            <p style="grid-column: span 2; display: flex;">Fecha de Nacimiento:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.guardian_info?.firstName.dateOfBirth}</span></p>
            <p style="grid-column: span 1 ; display: flex;">Edad:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${guardianAge}</span></p>
            <p style="grid-column: span 1; display: flex;">Género:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.gender}</span></p>
            <p style="grid-column: span 1; display: flex;">Raza:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.race}</span></p>
        </div>
         </div>
        
        
        `;
  }
};

const medicalSection_s = (parsedData) => {
  if (parsedData?.typeofservice !== "removal") {
    return ` <div style="margin-bottom:5px">${medicalQuestions_s[
      parsedData.typeofservice
    ]
      .map((question, index) => {
        return questionsTemplate(question, parsedData, index);
      })
      .join("")}</div>`;
  } else {
    return `<div style="margin-bottom:5px" class="grid-section">${medicalQuestions_s[parsedData.typeofservice]
      .map((question, index) => {
        return questionsTemplate(question, parsedData, index);
      })
      .join("")}</div>`;
  }
};

const emergencyDetails_s = (parsedData) => {
  return `
  <div style="width:95%"> 
    <p style="font-weight:700;width:max-content;background-color:${parsedData?.minor === "true" ? "#00ff00" : ""}">${
      parsedData?.minor === "true"
        ? "Contacto de emergencia del menor"
        : "Contacto de emergencia"
    }:</p>
     <div style="display:grid;grid-template-columns:repeat(8,1fr);width:100%;">
     <p style="grid-column: span 3; display: flex;width:100%;">Nombre:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px">${
       parsedData?.emergencycontactnumber?.name
     }</span></p>
     <p style="grid-column: span 2 ; display: flex;width:100%;">Teléfono #:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px">${
       parsedData?.emergencycontactnumber?.phone
     }</span></p>
     <p style="grid-column: span 2; display: flex;width:100%;">Ciudad:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px">${
       parsedData?.emergencycontactnumber?.city
     }</span></p>
     <p style="grid-column: span 1; display: flex;width:100%;">Estado:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px">${
       parsedData?.emergencycontactnumber?.state
     }</span></p>
     </div></div>`;
};

const doctorDetails_s = (parsedData) => {
  return `<div style="width:95%"> 
    <p style="font-weight:700;width:max-content;background-color:${parsedData?.minor === "true" ? "#00ff00" : ""}">${
      parsedData?.minor === "true"
        ? "Información del médico del menor"
        : "Información del médico"
    }:</p>
     <div style="display:grid;grid-template-columns:repeat(8,1fr);width:100%;">
     <p style="grid-column: span 3; display: flex;width:100%;">Nombre:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px">${
       parsedData?.doctor_information?.name
     }</span></p>
     <p style="grid-column: span 2 ; display: flex;width:100%;">Teléfono #:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px">${
       parsedData?.doctor_information?.phone
     }</span></p>
     <p style="grid-column: span 2; display: flex;width:100%;">Ciudad:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px">${
       parsedData?.doctor_information?.city
     }</span></p>
     <p style="grid-column: span 1; display: flex;width:100%;">Estado:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px">${
       parsedData?.doctor_information?.state
     }</span></p>
     </div></div>`;
};

const consentSection_s = (parsedData) => {
  const links = ["WWW.FAMETATTOOS.COM", "WWW.TATTOOVANISHMETHOD.COM"];
  const modifiedQuestions =
    parsedData.minor === "false"
      ? C_questions_s[parsedData?.typeofservice].map((rem) => {
          links.forEach((link) => {
            rem = rem.replace(
              new RegExp(link, "g"),
              `<a href="${link}">${link}</a>`
            );
          });
          return rem;
        })
      : C_questions_m_s[parsedData?.typeofservice].map((rem) => {
          links.forEach((link) => {
            rem = rem.replace(
              new RegExp(link, "g"),
              `<a href="${link}">${link}</a>`
            );
          });
          return rem;
        });
  return `<div style="width:95%" class="consent-div">${modifiedQuestions
    .map((question, index) => {
      if (parsedData.minor === "false") {
        return `<div class="p" style="width:100%;display:flex;gap:3px;align-items:start;margin-block:6px;">  
      <span>(iniciales)</span><span style="width:50px;border-bottom:1px solid black;"><img style="width:25px;height:20px;object-fit:contain;margin-inline:auto;margin-top:-8px" src="${
        parsedData?.HoldHarmlessAgreement_url?.initialsImg
      }" /></span><span style="flex: 1;line-height:115%"><b>${
          index + 1
        }</b>. ${question}</span>
    </div>`;
      } else {
        return `<div class="p" style="width:100%;display:flex;gap:3px;align-items:start;margin-block:2px;">  
      <span>Int.</span><span style="background-color:#00ff00"><b>M.</b></span><span style="width:40px;border-bottom:1px solid black;"><img style="width:25px;height:20px;object-fit:contain;margin-inline:auto;margin-top:-8px" src="${
        parsedData?.HoldHarmlessAgreement_url?.initialsImg
      }" /></span>
      <span  style="background-color:#ffff00"><b>G.</b></span><span style="width:40px;border-bottom:1px solid black;"><img style="width:25px;height:20px;object-fit:contain;margin-inline:auto;margin-top:-8px" src="${
        parsedData?.HoldHarmlessAgreement_url?.gaurdianInitialsImg
      }" /></span><span style="flex: 1;line-height:115%"><b>${
          index + 1
        }</b>. ${question}</span>
    </div>`;
      }
    })
    .join("")}</div>`;
};

const tattooStyleSection_s = (parsedData) => {
  const piercingGauge = Object.keys(parsedData?.body_location).map((key)=>{
    const gauge =  parsedData?.body_location[key]?.level2?.split(" ")[1]
    return gauge ? gauge : null
  })

  if(parsedData?.typeofservice === "tattoo") {
    return `
     <div class="p" style="display:grid;grid-template-columns:repeat(8,1fr);align-items: start;">
        <p style="grid-column: span 1; display: flex;"><b>Tipo</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${
          parsedData?.tattoo_type
        }</span></p>
        <p style="grid-column: span 1; display: flex;"><b>Color</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;"${
          parsedData?.color_style
        }</span></p>
        <p style="grid-column: span 1; display: flex;"><b>Estilo</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${
          parsedData?.tattoo_style
        }</span></p>
        <div style="grid-column: span 3;display:flex">
         <b>Descripción:</b>
       <div style="margin-left: 4px; display: flex; flex-direction: column;flex:1">
         ${Object.keys(parsedData?.brief_description || {})
           .map(
             (key) => `
        <div style="border-bottom: 1px solid black; padding: 2px 0;">
          ${key}. ${parsedData?.brief_description[key]}
        </div>`
           )
           .join("")}
    </div>
  </div>
        <div style="grid-column: span 2;display:flex">
         <b>Ubicación:</b>
       <div style="margin-left: 4px; display: flex; flex-direction: column;flex:1">
         ${Object.keys(parsedData?.body_location || {})
           .filter((key) => key !== "selectedTattooType")
           .map(
             (key) => `
        <div style="border-bottom: 1px solid black; padding: 2px 0;">
          ${key}. ${Object.values(parsedData?.body_location[key])
               .filter((key) => key !== null)
               .join("-")}
        </div>`
           )
           .join("")}
    </div>
  </div>
     </div>
  `}else if(parsedData?.typeofservice === "piercing"){
    return ` <div class="p" style="display:grid;grid-template-columns:repeat(8,1fr);align-items: start;">
<div style="grid-column: span 3;display:flex">
 <b>Descripción de Tatuaje y/o Piercing:</b>
<div style="margin-left: 4px; display: flex;flex:1;border-bottom: 1px solid black;">
 
</div>
</div>
<p style="grid-column: span 2; display: flex;"><b>Tamaño de las joyas</b>:<span style="border-bottom: 1px solid black;display:flex; flex-grow: 1;padding-left: 2px;">${
 piercingGauge.map((gauge) => gauge).join("-")
}</span></p>
<div style="grid-column: span 3;display:flex">
 <b>Ubicación en el cuerpo:</b>
<div style="margin-left: 4px; display: flex; flex-direction: column;flex:1">
 ${Object.keys(parsedData?.body_location || {})
   .filter((key) => key !== "selectedTattooType")
   .map(
     (key) => `
<div style="border-bottom: 1px solid black; padding: 2px 0;">
  ${key}. ${Object.values(parsedData?.body_location[key])
       .filter((key) => key !== null)
       .join("-")}
</div>`
   )
   .join("")}
</div>
</div>
</div>`
  }else if (parsedData?.typeofservice === "removal" ) {
    return ` <div class="p" style="display:grid;grid-template-columns:repeat(8,1fr);align-items: start;">
        <div style="grid-column: span 5;display:flex">
         <b>Descripción de Tatuaje:</b>
       <div style="margin-left: 4px; display: flex;flex:1;border-bottom: 1px solid black;">
         
    </div>
  </div>
        <div style="grid-column: span 3;display:flex">
         <b>Ubicación en el cuerpo:</b>
       <div style="margin-left: 4px; display: flex; flex-direction: column;flex:1">
         ${Object.keys(parsedData?.body_location || {})
           .filter((key) => key !== "selectedTattooType")
           .map(
             (key) => `
        <div style="border-bottom: 1px solid black; padding: 2px 0;">
          ${key}. ${Object.values(parsedData?.body_location[key])
               .filter((key) => key !== null)
               .join("-")}
        </div>`
           )
           .join("")}
    </div>
  </div>
     </div>`;
  }
};

const frontDeskSection_s = (parsedData) => {
  const date = new Date();

  if (parsedData.minor === "false") {
    return `<div class="p" style="display:grid;grid-template-columns:repeat(8,1fr);align-items: end; ${
      parsedData.minor === "false" ? "margin-top:20px" : "margin-top:10px"
    }">
     <p style="grid-column: span 4; display: flex;align-items:end"><b>Firma</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;"><img style="height:45px;object-fit:cover;object-fit:center;margin-top:-20px" src="${
       parsedData?.HoldHarmlessAgreement_url?.signatureurl
     }"/></span></p>
       <p style="grid-column: span 1; display: flex;"><b>Fecha</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${formatDateOnly(
         date
       )}</span></p>
        <p style="grid-column: span 3; display: flex;"><b>Representante de recepción</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${
          parsedData?.frontDeskEmployee
        }</span></p>
          </div>`;
  } else {
    return `<div class="p" style="display:grid;grid-template-columns:repeat(8,1fr);align-items: end;gap:2px; ${
      parsedData.minor === "false" ? "margin-top:20px" : "margin-top:10px"
    }">
     <p style="grid-column: span 3; display: flex;align-items:end"><b>Firma</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;"><span style="background-color:#00ff00"><b>M.</b></span><img style="height:45px;object-fit:cover;object-fit:center;margin-top:-20px" src="${
       parsedData?.HoldHarmlessAgreement_url?.signatureurl
     }"/></span></p>
     <p style="grid-column: span 2; display: flex;align-items:end"><span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;"><span style="background-color:#ffff00"><b>G.</b></span><img style="height:45px;object-fit:cover;object-fit:center;margin-top:-20px" src="${
       parsedData?.HoldHarmlessAgreement_url?.gaurdianSignature
     }"/></span></p>
       <p style="grid-column: span 1; display: flex;"><b>Fecha</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${formatDateOnly(
         date
       )}</span></p>
        <p style="grid-column: span 2; display: flex;"><b>Representante de recepción</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${
          parsedData?.frontDeskEmployee
        }</span></p>
          </div>`;
  }
};

const skinConditionSection_s = (parsedData) => {
  const diffHrs = parsedData.totalWorkingTime / (1000 * 60 * 60);

  // Format to 2 decimal places
  const totalWorkingTime = diffHrs.toFixed(2);

  return ` <div class="p" style="display:flex;align-items:end;gap:8px;margin-top:20px">
        <p style="display:flex;">Condición de la piel:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${
          parsedData?.skin_conditions
        }</span></p>
        <p style="display:flex;">Complicaciones:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${
          parsedData?.complication
        }</span></p>
        <p style="display:flex;">Hora de inicio:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${formattedDateTime(
          parsedData?.start_time
        )}</span></p>
        <p style="display:flex;">Hora de finalización:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${formattedDateTime(
          parsedData?.end_time
        )}</span></p>
        <p style="display:flex;">Total de horas:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${totalWorkingTime}</span></p>
        <p style="display:flex;">Precio:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${
          parsedData?.price
        }</span></p>        
         </div>
      `;
};

const artistSection_s = (parsedData) => {
  const date = new Date();
  return ` <div class="p" style="display:grid;grid-template-columns:repeat(8,1fr);align-items: end;margin-top:20px">
  <p style="grid-column: span 2; display: flex;"><b>Nombre del artista</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${
    parsedData?.bill_by
  }</span></p>
  <p style="grid-column: span 4; display: flex;align-items:end"><b>Firma del artista</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;"><img style="height:45px;object-fit:cover;object-fit:center;margin-top:-20px" src="${
    parsedData?.Sign_completion
  }"/></span></p>
        <p style="grid-column: span 2; display: flex;"><b>Fecha</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${formatDateOnly(
          date
        )}</span></p>
  </div>`;
};

const holdHarmlessSection_s = (parsedData) => {
  return `<h1 style="width:max-content;font-size:10px;margin-inline:auto;text-decoration:underline;letter-spacing:.001em;word-spacing:0.1em;">ACUERDO DE EXENCIÓN DE RESPONSABILIDAD. IMPORTANTE: LIBERACIÓN Y EXENCIÓN DE RESPONSABILIDAD E INDEMNIZACIÓN.</h1>
     <p style="padding-top: 6pt;text-indent: 0pt;text-align: left;"><br /></p>
     <p style="padding-left: 7pt;text-indent: 0pt;line-height: 108%;"><b>Yo, el cliente,</b>,<span style="border-bottom: 1px solid black;text-transform: capitalize;padding-left:2px;"
             id="">${
               parsedData.minor === "true"
                 ? `<span style="background-color:#00ff00"><b>M</b></span>`
                 : ""
             }${parsedData?.firstname} 
             ${parsedData?.lastname ? parsedData?.lastname : ""}</span>${
    parsedData.minor === "true"
      ? `<span style="border-bottom: 1px solid black;text-transform: capitalize;padding-left:2px;"
             id=""><span style="background-color:#ffff00"><b>G</b></span>${parsedData?.guardian_info?.firstName} ${parsedData?.guardian_info?.lastName}</span>`
      : ""
  }&nbsp;por el presente reconozco y acepto que, como patrocinador y cliente de Fame Tattoos, Inc., su
local, instalaciones, servicios y productos implican riesgos de lesiones a personas o propiedad, incluidos, entre otros, los que se describen a continuación, y el usuario/cliente asume
toda la responsabilidad por dichos riesgos. En consideración de ser un patrocinador/cliente de Fame Tattoos, Inc., para cualquier propósito, incluidos, entre otros, servicios de tatuajes,
servicios de perforación, servicios de eliminación de tatuajes, observación, uso de equipos de la tienda, servicios o participación de cualquier manera, el usuario/cliente acepta lo
siguiente: El cliente/usuario por la presente libera y exime a Fame Tattoos, Inc., sus directores, funcionarios, empleados, contratistas independientes y agentes de toda responsabilidad
hacia cualquier cliente/usuario, sus hijos, representantes personales, cesionarios, herederos y parientes más cercanos por cualquier pérdida, daño, lesión personal, deformidad, muerte
y renuncia para siempre a cualquier reclamo o demanda por daños a la persona o propiedad del cliente/usuario, incluidas las lesiones que conducen a la desfiguración o muerte del
cliente/usuario, ya sea causada por el activo o negligencia pasiva de Fame Tattoos, Inc., o de otra manera, en la máxima medida permitida por la ley, mientras el cliente/patrocinador
se encuentra en, sobre o cerca de las instalaciones de Fame Tattoos, Inc., utilizando o no sus servicios, instalaciones o equipo.<b>(iniciales)</b> ${
           parsedData.minor === "true"
             ? `<span style="background-color:#00ff00"><b>M</b></span>`
             : ""
         } <span
                 style="border-bottom: 1px solid black;" id=""><img
                     src="${
                       parsedData.HoldHarmlessAgreement_url?.initialsImg
                     }" alt="Signature"
                     style="height: 20px;" /></span>${
                       parsedData.minor === "true"
                         ? `<span style="background-color:#ffff00"><b>G</b></span><span
                 style="border-bottom: 1px solid black;" id=""><img
                     src="${parsedData.HoldHarmlessAgreement_url?.gaurdianInitialsImg}" alt="Signature"
                     style="height: 20px;" /></span>`
                         : ""
                     }.</p>`;
};

const signatureSection_s = (parsedData) => {
  const date = new Date();
  return `<div class="p" style="display:flex;gap:2px;align-items:start">
    <span s><b>Signed</b>:</span>
     <div style="display:flex;gap:2px;align-item:start">
     ${
       parsedData.minor === "true"
         ? `<span style="background-color:#00ff00; height:max-content;"><b>M.</b></span>`
         : ""
     }
       <div>
       <div style="border-bottom:1px solid black;margin-bottom:2px;"><img style="height:45px;object-fit:cover;object-fit:center;margin-top:-20px" src="${
         parsedData?.HoldHarmlessAgreement_url?.signatureurl
       }"/> </div>
       <div><b>EXPLICADA Y COMPRENDIDA</b> </div>
       <div style="font-size:9px;">FIRMA DEL MENOR, PATROCINADOR / CLIENTE</div>
           </div>
     </div>
    ${
      parsedData.minor === "true"
        ? `<div style="display:flex;gap:2px;align-item:start">
      <span style="background-color:#ffff00; height:max-content;"><b>G.</b></span>
      <div>
       <div style="border-bottom:1px solid black;margin-bottom:2px;"><img style="height:45px;object-fit:cover;object-fit:center;margin-top:-20px" src="${parsedData?.HoldHarmlessAgreement_url?.gaurdianSignature}"/>  </div>
       <div><b>EXPLICADA Y COMPRENDIDA</b></div>
       <div style="font-size:9px;">FIRMA DEL GUARDIÁN, PATROCINADOR / CLIENTE</div>
      </div>
    </div>`
        : ""
    }
       <div>
       <div style="border-bottom:1px solid black">${formatDateOnly(date)} </div>
       <div><b>FECHA</b> </div>
        </div>
  </div>`;
};

const termsOfServiceSection_s = (parsedData) => {
  return `<div class="p" style="width:90%;">
         ${terms_s[parsedData.typeofservice]
           .map((term) => {
             return `
           <h2 style="margin-top:10px;margin-bottom:10px;padding-left:5px;display:flex;gap:2px;align-items:end;">(iniciales)<span style="border-bottom: 1px solid black;width:60px;">${
             parsedData.minor === "true"
               ? `<span style="background-color:#00ff00;padding-right:2px"><b>M</b></span>`
               : ""
           }<img
                     src="${
                       parsedData.HoldHarmlessAgreement_url?.initialsImg
                     }" alt="Signature"
                     style="height: 20px;" /></span> 
                    
                     ${
                       parsedData.minor === "true"
                         ? `<span style="border-bottom: 1px solid black;width:60px;"><span style="background-color:#ffff00;padding-right:2px;"><b>G</b></span><img
                     src="${parsedData.HoldHarmlessAgreement_url?.gaurdianInitialsImg}" alt="Signature"
                     style="height: 20px;" /></span>`
                         : ""
                     }${term.heading}</h2>
           <ul id="l1" >${term.terms
             .map((termText) => {
               return `<li data-list-text="•">
             <p style="padding-left: 11pt;text-indent: -4pt;line-height: 9pt;text-align: left;">${termText}</p>
         </li>`;
             })
             .join("")} </ul>
           `;
           })
           .join("")}
     </div>`;
};

module.exports = {
  userDetails_s,
  emergencyDetails_s,
  doctorDetails_s,
  consentSection_s,
  tattooStyleSection_s,
  frontDeskSection_s,
  skinConditionSection_s,
  artistSection_s,
  holdHarmlessSection_s,
  termsOfServiceSection_s,
  signatureSection_s,
  medicalSection_s
};
