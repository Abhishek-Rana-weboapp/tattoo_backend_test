const { C_questions, C_questions_m } = require("../../ConsentQuestions");
const { medicalQuestions } = require("../../MedicalQuestions");
const { terms } = require("../../TermOfServiceQuestions");
const {
  formattedDateTime,
  formatDateOnly,
} = require("../../utils/helperFunctions");
const { questionsTemplate } = require("./questionsTemplates");

const userDetails = (parsedData) => {
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
    return `<div style="display: grid;grid-template-columns:repeat(7,1fr);gap:2px;width:95%">
        <p style="grid-column: span 3; display: flex;">Name:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.firstname} ${parsedData?.lastname}</span></p>
        <p style="grid-column: span 2 ; display: flex;">Phone #:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.phone_number}</span></p>
        <p style="grid-column: span 2; display: flex;">E-mail Address:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.username}</span></p>
        </div>
        <div style="display: grid;grid-template-columns:repeat(8,1fr);gap:2px;">
        <p style="grid-column: span 4; display: flex;">Address:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.address}</span></p>
        <p style="grid-column: span 2 ; display: flex;">City #:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.city}</span></p>
        <p style="grid-column: span 1; display: flex;">State:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.state}</span></p>
        <p style="grid-column: span 1; display: flex;">Zip:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.zip}</span></p>
        
        </div>
        <div style="display: grid;grid-template-columns:repeat(8,1fr);gap:2px;">
            <p style="grid-column: span 1; display: flex;">Birthday:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.dateofbirth}</span></p>
            <p style="grid-column: span 1 ; display: flex;">Age:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${age}</span></p>
            <p style="grid-column: span 1; display: flex;">Gender:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.gender}</span></p>
            <p style="grid-column: span 1; display: flex;">Race:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.race}</span></p>
        </div>`;
  } else {
    return `<div style="margin-bottom:5px;padding:2px; border:2px solid #00ff00">
    <div style="display: grid;grid-template-columns:repeat(7,1fr);gap:2px;width:95%;">
        <p style="grid-column: span 3; display: flex;"><span style="font-weight:700;background-color:#00ff00">Minor’s info:</span>Name:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.firstname} ${parsedData?.lastname}</span></p>
        <p style="grid-column: span 2 ; display: flex;">Phone #:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.phone_number}</span></p>
        <p style="grid-column: span 2; display: flex;">E-mail Address:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.username}</span></p>
        </div>
        <div style="display: grid;grid-template-columns:repeat(8,1fr);gap:2px;">
        <p style="grid-column: span 4; display: flex;">Address:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.address}</span></p>
        <p style="grid-column: span 2 ; display: flex;">City #:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.city}</span></p>
        <p style="grid-column: span 1; display: flex;">State:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.state}</span></p>
        <p style="grid-column: span 1; display: flex;">Zip:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.zip}</span></p>
        
        </div>
        <div style="display: grid;grid-template-columns:repeat(8,1fr);gap:2px;">
            <p style="grid-column: span 1; display: flex;">Birthday:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.dateofbirth}</span></p>
            <p style="grid-column: span 1 ; display: flex;">Age:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${age}</span></p>
            <p style="grid-column: span 1; display: flex;">Gender:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.gender}</span></p>
            <p style="grid-column: span 1; display: flex;">Race:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.race}</span></p>
        </div>
        
        </div>
        
        <div style="margin-bottom:5px;padding:2px; border:2px solid #ffff00">
            <div style="display: grid;grid-template-columns:repeat(7,1fr);gap:2px;">
        <p style="grid-column: span 3; display: flex;"><span style="font-weight:700;background-color:#ffff00">Guardian's info:</span>Name:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.guardian_info?.firstName} ${parsedData?.guardian_info?.lastName}</span></p>
        <p style="grid-column: span 2 ; display: flex;">Phone #:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.guardian_info?.phoneNumber}</span></p>
        <p style="grid-column: span 2; display: flex;">E-mail Address:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.guardian_info?.email}</span></p>
        </div>
        <div style="display: grid;grid-template-columns:repeat(8,1fr);gap:2px;">
        <p style="grid-column: span 4; display: flex;">Address:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.guardian_info?.firstName.address}</span></p>
        <p style="grid-column: span 2 ; display: flex;">City #:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.city}</span></p>
        <p style="grid-column: span 1; display: flex;">State:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.state}</span></p>
        <p style="grid-column: span 1; display: flex;">Zip:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.zip}</span></p>
        
        </div>
        <div style="display: grid;grid-template-columns:repeat(8,1fr);gap:2px;">
            <p style="grid-column: span 1; display: flex;">Birthday:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.guardian_info?.firstName.dateOfBirth}</span></p>
            <p style="grid-column: span 1 ; display: flex;">Age:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${guardianAge}</span></p>
            <p style="grid-column: span 1; display: flex;">Gender:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.gender}</span></p>
            <p style="grid-column: span 1; display: flex;">Race:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.race}</span></p>
        </div>
         </div>
        
        
        `;
  }
};

const medicalSection = (parsedData) => {
  if (parsedData?.typeofservice !== "removal") {
    return ` <div style="margin-bottom:5px">${medicalQuestions[
      parsedData.typeofservice
    ]
      .map((question, index) => {
        return questionsTemplate(question, parsedData, index);
      })
      .join("")}</div>`;
  } else {
    return `<div style="margin-bottom:5px" class="grid-section">${medicalQuestions[parsedData.typeofservice]
      .map((question, index) => {
        return questionsTemplate(question, parsedData, index);
      })
      .join("")}</div>`;
  }
};

const emergencyDetails = (parsedData) => {
  return `
 <div style="width:95%"> 
    <p style="font-weight:700;width:max-content;background-color:${
      parsedData?.minor === "true" ? "#00ff00" : ""
    }">${
    parsedData?.minor === "true"
      ? "Minor's Doctor's Information"
      : "Doctor's Information"
  }:</p>
     <div style="display:grid;grid-template-columns:repeat(8,1fr);width:100%;">
     <p style="grid-column: span 2; display: flex;width:100%;">Name:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px">${
       parsedData?.doctor_information?.name
     }</span></p>
     <p style="grid-column: span 2 ; display: flex;width:100%;">Phone #:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px">${
       parsedData?.doctor_information?.phone
     }</span></p>
     <p style="grid-column: span 2; display: flex;width:100%;">City:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px">${
       parsedData?.doctor_information?.city
     }</span></p>
     <p style="grid-column: span 2; display: flex;width:100%;">State:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px">${
       parsedData?.doctor_information?.state
     }</span></p>
     </div></div>`;
};

const doctorDetails = (parsedData) => {
  return `<div style="width:95%"> 
    <p style="font-weight:700;width:max-content;background-color:${
      parsedData?.minor === "true" ? "#00ff00" : ""
    }">${
    parsedData?.minor === "true"
      ? "Minor's Doctor's Information"
      : "Doctor's Information"
  }:</p>
     <div style="display:grid;grid-template-columns:repeat(8,1fr);width:100%;">
     <p style="grid-column: span 2; display: flex;width:100%;">Name:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px">${
       parsedData?.doctor_information?.name
     }</span></p>
     <p style="grid-column: span 2 ; display: flex;width:100%;">Phone #:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px">${
       parsedData?.doctor_information?.phone
     }</span></p>
     <p style="grid-column: span 2; display: flex;width:100%;">City:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px">${
       parsedData?.doctor_information?.city
     }</span></p>
     <p style="grid-column: span 2; display: flex;width:100%;">State:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px">${
       parsedData?.doctor_information?.state
     }</span></p>
     </div></div>`;
};

const consentSection = (parsedData) => {
  const links = ["WWW.FAMETATTOOS.COM", "WWW.TATTOOVANISHMETHOD.COM"];
  const modifiedQuestions =
    parsedData.minor === "false"
      ? C_questions[parsedData?.typeofservice].map((rem) => {
          links.forEach((link) => {
            rem = rem.replace(
              new RegExp(link, "g"),
              `<a href="${link}">${link}</a>`
            );
          });
          return rem;
        })
      : C_questions_m[parsedData?.typeofservice].map((rem) => {
          links.forEach((link) => {
            rem = rem.replace(
              new RegExp(link, "g"),
              `<a href="${link}">${link}</a>`
            );
          });
          return rem;
        });
  return `<div style="width:95%;" class="consent-div">${modifiedQuestions
    .map((question, index) => {
      if (parsedData.minor === "false") {
        return `<div class="p" style="width:100%;display:flex;gap:3px;align-items:start;margin-block:6px;">  
      <span><b>(initials)</b></span><span style="width:50px;border-bottom:1px solid black;"><img style="width:25px;height:20px;object-fit:contain;margin-inline:auto;margin-top:-8px" src="${
        parsedData?.HoldHarmlessAgreement_url?.initialsImg
      }" /></span><span style="flex: 1;line-height:115%"><b>${
          index + 1
        }</b>. ${question}</span>
    </div>`;
      } else {
        return `<div class="p" style="width:100%;display:flex;gap:3px;align-items:start;margin-block:2px;">  
      <span><b>Int.</b></span><span style="background-color:#00ff00"><b>M.</b></span><span style="width:40px;border-bottom:1px solid black;"><img style="width:25px;height:20px;object-fit:contain;margin-inline:auto;margin-top:-8px" src="${
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

const tattooStyleSection = (parsedData) => {
  const piercingGauge = Object.keys(parsedData?.body_location).map((key) => {
    const gauge = parsedData?.body_location[key]?.level2?.split(" ")[1];
    return gauge ? gauge : null;
  });

  if (parsedData?.typeofservice === "tattoo") {
    return `
     <div class="p" style="display:grid;grid-template-columns:repeat(8,1fr);align-items: start;">
        <p style="grid-column: span 1; display: flex;"><b>Type</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${
          parsedData?.tattoo_type
        }</span></p>
        <p style="grid-column: span 1; display: flex;"><b>Color</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;"${
          parsedData?.color_style
        }</span></p>
        <p style="grid-column: span 1; display: flex;"><b>Style</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${
          parsedData?.tattoo_style
        }</span></p>
        </div>
        <div>
          <div class="p" style="grid-column: span 3;display:flex">
           <b>Description:</b>
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
          <div style="grid-column: span 2;display:flex">
           <b>Location:</b>
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
        </div>
  `;
  } else if (parsedData?.typeofservice === "piercing" ) {
    return ` <div class="p" style="display:grid;grid-template-columns:repeat(8,1fr);align-items: start;">
        <div style="grid-column: span 3;display:flex">
         <b>Description of Piercing:</b>
       <div style="margin-left: 4px; display: flex;flex:1;border-bottom: 1px solid black;">
         
    </div>
  </div>
   <p style="grid-column: span 2; display: flex;"><b>Piercing Gauge</b>:<span style="border-bottom: 1px solid black;display:flex; flex-grow: 1;padding-left: 2px;">${piercingGauge
     .map((gauge) => gauge)
     .join("-")}</span></p>
        <div style="grid-column: span 3;display:flex">
         <b>Location:</b>
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
  }else if (parsedData?.typeofservice === "removal" ) {
    return ` <div class="p" style="display:grid;grid-template-columns:repeat(8,1fr);align-items: start;">
        <div style="grid-column: span 5;display:flex">
         <b>Description</b>
       <div style="margin-left: 4px; display: flex;flex:1;border-bottom: 1px solid black;">
         
    </div>
  </div>
        <div style="grid-column: span 3;display:flex">
         <b>Location:</b>
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

const frontDeskSection = (parsedData) => {
  const date = new Date();

  if (parsedData.minor === "false") {
    return `<div class="p" style="display:grid;grid-template-columns:repeat(8,1fr);align-items: end; ${
      parsedData.minor === "false" ? "margin-top:20px" : "margin-top:10px"
    }">
     <p style="grid-column: span 4; display: flex;align-items:end"><b>Customer’s Signature</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;"><img style="height:45px;object-fit:cover;object-fit:center;margin-top:-20px" src="${
       parsedData?.HoldHarmlessAgreement_url?.signatureurl
     }"/></span></p>
       <p style="grid-column: span 1; display: flex;"><b>Date</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${formatDateOnly(
         date
       )}</span></p>
        <p style="grid-column: span 3; display: flex;"><b>Front Desk Rep</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${
          parsedData?.frontDeskEmployee
        }</span></p>
          </div>`;
  } else {
    return `<div class="p" style="display:grid;grid-template-columns:repeat(8,1fr);align-items: end;gap:2px; ${
      parsedData.minor === "false" ? "margin-top:20px" : "margin-top:10px"
    }">
     <p style="grid-column: span 3; display: flex;align-items:end"><b>Signed</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;"><span style="background-color:#00ff00"><b>M.</b></span><img style="height:45px;object-fit:cover;object-fit:center;margin-top:-20px" src="${
       parsedData?.HoldHarmlessAgreement_url?.signatureurl
     }"/></span></p>
     <p style="grid-column: span 2; display: flex;align-items:end"><span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;"><span style="background-color:#ffff00"><b>G.</b></span><img style="height:45px;object-fit:cover;object-fit:center;margin-top:-20px" src="${
       parsedData?.HoldHarmlessAgreement_url?.gaurdianSignature
     }"/></span></p>
       <p style="grid-column: span 1; display: flex;"><b>Date</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${formatDateOnly(
         date
       )}</span></p>
        <p style="grid-column: span 2; display: flex;"><b>Front Desk Rep</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${
          parsedData?.frontDeskEmployee
        }</span></p>
          </div>`;
  }
};

const skinConditionSection = (parsedData) => {
  const diffHrs = parsedData.totalWorkingTime / (1000 * 60 * 60);

  // Format to 2 decimal places
  const totalWorkingTime = diffHrs.toFixed(2);

  return ` <div class="p" style="display:flex;align-items:end;gap:8px;margin-top:20px">
        ${
          parsedData.typeofservice !== "tooth-gems"
            ? `<p style="display:flex;">Skin Condition:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${parsedData?.skin_conditions}</span></p>`
            : ""
        }
        <p style="display:flex;">Complications:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${
          parsedData?.complication
        }</span></p>
        <p style="display:flex;">Time Started:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${formattedDateTime(
          parsedData?.start_time
        )}</span></p>
        <p style="display:flex;">Time Ended:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${formattedDateTime(
          parsedData?.end_time
        )}</span></p>
        <p style="display:flex;">Total Hours:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${totalWorkingTime}</span></p>
        <p style="display:flex;">Price of tattoo:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${
          parsedData?.price
        }</span></p>        
         </div>
      `;
};

const artistSection = (parsedData) => {
  const date = new Date();
  return ` <div class="p" style="display:grid;grid-template-columns:repeat(8,1fr);align-items: end;margin-top:20px">
  <p style="grid-column: span 2; display: flex;"><b>Artist</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${
    parsedData?.bill_by
  }</span></p>
  <p style="grid-column: span 4; display: flex;align-items:end"><b>Artist Signature</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;"><img style="height:45px;object-fit:cover;object-fit:center;margin-top:-20px" src="${
    parsedData?.Sign_completion
  }"/></span></p>
        <p style="grid-column: span 2; display: flex;"><b>Date</b>:<span style="border-bottom: 1px solid black; flex-grow: 1;padding-left: 2px;">${formatDateOnly(
          date
        )}</span></p>
  </div>`;
};

const holdHarmlessSection = (parsedData) => {
  return `<h1 style="width:max-content;margin-inline:auto">HOLD HARMLESS AGREEMENT.
     IMPORTANT: RELEASE AND WAIVER OF LIABILITY AND INDEMNITY.</h1>
     <p style="padding-top: 6pt;text-indent: 0pt;text-align: left;"><br /></p>
     <p style="padding-left: 7pt;text-indent: 0pt;line-height: 108%;"><b>I, the
             customer</b>,<span style="border-bottom: 1px solid black;text-transform: capitalize;padding-left:2px;"
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
  }&nbsp;hereby
         acknowledge and agree that
         as a patron, and customer of Fame Tattoos, Inc., its premises, facility,
         services, and products, involves risks of injury to persons or property, including but not limited to
         those
         described below, and patron/customer assumes full responsibility for such risks. In consideration of
         being a
         patron/customer of Fame Tattoos, Inc., for any purpose including, but not limited to, tattoo services,
         piercing
         services, tattoo removal services, observation, use of shop equipment, services, or participation in any
         way,
         patron/customer agrees to the following: Patron/Customer hereby releases and holds Fame Tattoos, Inc.,
         its
         directors, officers, employees, independent contractors and agents harmless from all liability to any
         patron/customer, their children, personal representatives, assigns, heirs, and next of kin for any loss,
         damage,
         personal injury, deformity, death, and forever gives up any claims or demands therefore, on account of
         injury to
         patron/customer&#39;s person or property, including injury leading to disfigurement or death of
         patron/customer
         whether caused by the active or passive negligence of Fame Tattoos, Inc., or otherwise, to the fullest
         extent
         permitted by law, while patron/customer are in, upon, or about the Fame Tattoos, Inc., premises using or
         not
         using their services, facility, or equipment. <b>(initials)</b> ${
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

const signatureSection = (parsedData) => {
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
       <div><b>EXPLAINED AND UNDERSTOOD</b> </div>
       <div><b>PATRON/CUSTOMER SIGNATURE</b> </div>
           </div>
     </div>
    ${
      parsedData.minor === "true"
        ? `<div style="display:flex;gap:2px;align-item:start">
      <span style="background-color:#ffff00; height:max-content;"><b>G.</b></span>
      <div>
       <div style="border-bottom:1px solid black;margin-bottom:2px;"><img style="height:45px;object-fit:cover;object-fit:center;margin-top:-20px" src="${parsedData?.HoldHarmlessAgreement_url?.gaurdianSignature}"/>  </div>
       <div><b>EXPLAINED AND UNDERSTOOD </b></div>
       <div><b>PATRON/CUSTOMER SIGNATURE </b></div>
      </div>
    </div>`
        : ""
    }
       <div>
       <div style="border-bottom:1px solid black">${formatDateOnly(date)} </div>
       <div><b>DATE</b> </div>
        </div>
  </div>`;
};

const termsOfServiceSection = (parsedData) => {
  return `<div class="p" style="width:90%;">
         ${terms[parsedData.typeofservice]
           .map((term) => {
             return `
           <h2 style="margin-top:10px;margin-bottom:10px;padding-left:5px;display:flex;gap:2px;align-items:end;">(initials)<span style="border-bottom: 1px solid black;width:60px;">${
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

const imagesSection = (parsedData) => {
  return `<div style="display:flex;justify-content:space-between;">
  <img src="${parsedData?.id_url}" style="width:25%;object-fit:cover;" />
  ${
    parsedData.minor === "true"
      ? ` <img src="${parsedData?.id_url}" style="width:25%;object-fit:cover;" />`
      : ""
  }
   </div>${
     (parsedData?.typeofservice === "tooth-gems" ||  parsedData?.typeofservice === "smp" )
       ? `<div style="display:flex;justify-content:start;">
       <img src="${parsedData?.body_location[1]?.level1}" style="width:30%;object-fit:cover;" />
     </div>`
       : ""
   } `;
};

module.exports = {
  userDetails,
  emergencyDetails,
  doctorDetails,
  consentSection,
  tattooStyleSection,
  frontDeskSection,
  skinConditionSection,
  artistSection,
  holdHarmlessSection,
  termsOfServiceSection,
  signatureSection,
  medicalSection,
  imagesSection,
};
