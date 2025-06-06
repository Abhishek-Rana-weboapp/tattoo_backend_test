const {
  medicalSection,
  userDetails,
  emergencyDetails,
  doctorDetails,
  consentSection,
  tattooStyleSection,
  frontDeskSection,
  skinConditionSection,
  artistSection,
  holdHarmlessSection,
  signatureSection,
  termsOfServiceSection,
  imagesSection,
} = require("./templates/detailsSection");

const {
  medicalSection_s,
  userDetails_s,
  emergencyDetails_s,
  doctorDetails_s,
  consentSection_s,
  tattooStyleSection_s,
  frontDeskSection_s,
  skinConditionSection_s,
  artistSection_s,
  holdHarmlessSection_s,
  signatureSection_s,
  termsOfServiceSection_s,
} = require("./templates/detailsSectionSpanish");

const date = new Date().toISOString().slice(0, 10);
function formatDateTime(isoDateString) {
  const date = new Date(isoDateString);

  // Extract date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  // Extract time components
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0 becomes 12)

  // Construct formatted date-time string
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;

  return formattedDateTime;
}

function removel_english_not_minor(parsedData) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Fame Tattoos</title>
    <meta name="author" content="Fame Tattoos" />
    <style type="text/css">
        @page {
            margin: 1% 0% 1% 0%;
        }

        * {
            margin: 0;
            padding: 0;
            text-indent: 0;
        }

        @media print {
            @page {
                margin: initial;/ Reset margins to default /
            }
        }

        .s1 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 10pt;
        }

        .p,
        p {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
            margin: 0pt;
        }

        h2 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 8pt;
        }

        .a,
        a {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
        }

        h1 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: underline;
            font-size: 10pt;
        }

        .s6 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 8pt;
        }

        .s7 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
        }

        li {
            display: block;
        }

        #l1 {
            padding-left: 0pt;
        }

        #l1>li>*:first-child:before {
            content: "• ";
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
        }

        table,
        tbody {
            vertical-align: top;
            overflow: visible;
        }
            .grid-section {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
}

.grid-section .item:nth-child(-n + 10) {
  grid-column: span 2;
}

.grid-section .item:nth-child(n + 11) {
  grid-column: span 1;
}

.med-grid{
 display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
}

.med-grid .item:nth-child(1) {
grid-column: span 2;
}

.med-grid .item:nth-child(2) {
grid-column: span 1;
}

.med-grid .item:nth-child(3) {
grid-column: span 1;
}

.consent-div > :nth-child(13) {
   margin-top:30px !important;
}
    </style>
</head>

<body style="margin: 1% 0% 1% 0%;">
<span>
 <img src="https://i.ibb.co/vXNvFN3/Fame-Tattoos.png" alt="" width="640" style=" display: block;
                 margin-left: auto;
                 margin-right: auto;">
</span>
<p class="s1" style="padding-left: 7pt;text-indent: 0pt;text-align: center;">WAIVER, RELEASE AND CONSENT FOR TATTOO REMOVAL
</p>
<p style="padding-top: 6pt;text-indent: 0pt;text-align: left;"><br /></p>

<div class="main" style="margin: 0% 2% 0% 2%;">
 <div style="margin-block:4px">${userDetails(parsedData[0])}</div>

 ${medicalSection(parsedData[0])}

 <div style="margin-block:10px">${emergencyDetails(parsedData[0])}</div>

 <div style="margin-block:10px">${doctorDetails(parsedData[0])}</div>

 <div style="margin-block:10px">${consentSection(parsedData[0])}</div>

 <p style="text-indent: 0pt;text-align: left;"><br /></p>
 ${tattooStyleSection(parsedData[0])}

 ${frontDeskSection(parsedData[0])}


 ${skinConditionSection(parsedData[0])}

 <p style="text-indent: 0pt;text-align: left;"><br /></p>

${artistSection(parsedData[0])}
 <br>

 <p style="padding-top: 6pt;text-indent: 0pt;text-align: left;"><br /></p>
     ${holdHarmlessSection(parsedData[0])}
 <p style="padding-top: 8pt;text-indent: 0pt;text-align: left;"><br /></p>
 <br>

 ${signatureSection(parsedData[0])}


 ${termsOfServiceSection(parsedData[0])}

 <p style="text-indent: 0pt;text-align: left;"><br /></p>
 <p style="padding-top: 5pt;"></p>
 ${imagesSection(parsedData[0])}

</div>
</body>

</html>
        `;
}

function removel_spanish_not_minor(parsedData) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Fame Tattoos Spanish</title>
    <meta name="author" content="Fame Tattoos" />
    <style type="text/css">
        @page {
           margin: 1% 0% 1% 0%;
            }
        * {
            margin: 0;
            padding: 0;
            text-indent: 0;
        }
        @media print {
        @page {
      margin: initial; /* Reset margins to default */
            }}
        h1 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 10pt;
        }

        .p,
        p {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
            margin: 0pt;
        }

        h2 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 8pt;
        }

        .a,
        a {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
        }

        .s5 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: underline;
            font-size: 8pt;
        }

        .s6 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 8pt;
        }

        .s7 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
        }

        li {
            display: block;
        }

        #l1 {
            padding-left: 0pt;
        }

        #l1>li>*:first-child:before {
            content: "• ";
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
        }

        table,
        tbody {
            vertical-align: top;
            overflow: visible;
        }

        .grid-section {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
}

.grid-section .item:nth-child(-n + 10) {
  grid-column: span 2;
}

.grid-section .item:nth-child(n + 11) {
  grid-column: span 1;
}

.med-grid{
 display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
}

.med-grid .item:nth-child(1) {
grid-column: span 2;
}

.med-grid .item:nth-child(2) {
grid-column: span 1;
}

.med-grid .item:nth-child(3) {
grid-column: span 1;
}

.consent-div > :nth-child(13) {
   margin-top:10px !important;
}
    </style>
</head>

<body style="margin: 1% 0% 1% 0%;">
<span>
 <img src="https://i.ibb.co/vXNvFN3/Fame-Tattoos.png" alt="" width="640" style=" display: block;
                 margin-left: auto;
                 margin-right: auto;">
</span>
<p class="s1" style="padding-left: 7pt;text-indent: 0pt;text-align: center;">RENUNCIA, LIBERACIÓN Y CONSENTIMIENTO PARA ELIMINACIÓN DE TATUAJES
</p>
<p style="padding-top: 6pt;text-indent: 0pt;text-align: left;"><br /></p>

<div class="main" style="margin: 0% 2% 0% 2%;">
 <div style="margin-block:4px">${userDetails_s(parsedData[0])}</div>

 ${medicalSection_s(parsedData[0])}

 <div style="margin-block:10px">${emergencyDetails_s(parsedData[0])}</div>

 <div style="margin-block:10px">${doctorDetails_s(parsedData[0])}</div>

 <div style="margin-block:10px">${consentSection_s(parsedData[0])}</div>

 <p style="text-indent: 0pt;text-align: left;"><br /></p>
 ${tattooStyleSection_s(parsedData[0])}

 ${frontDeskSection_s(parsedData[0])}


 ${skinConditionSection_s(parsedData[0])}

 <p style="text-indent: 0pt;text-align: left;"><br /></p>

${artistSection_s(parsedData[0])}
 <br>

 <p style="padding-top: 6pt;text-indent: 0pt;text-align: left;"><br /></p>
     ${holdHarmlessSection_s(parsedData[0])}
 <p style="padding-top: 8pt;text-indent: 0pt;text-align: left;"><br /></p>
 <br>

 ${signatureSection_s(parsedData[0])}


 ${termsOfServiceSection_s(parsedData[0])}

 <p style="text-indent: 0pt;text-align: left;"><br /></p>
 <p style="padding-top: 5pt;"></p>
 ${imagesSection(parsedData[0])}

</div>
</body>

</html>
   `;
}

function removel_english_minor(parsedData) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Fame Tattoos</title>
    <meta name="author" content="Fame Tattoos" />
    <style type="text/css">
        @page {
            margin: 1% 0% 1% 0%;
        }

        * {
            margin: 0;
            padding: 0;
            text-indent: 0;
        }

        @media print {
            @page {
                margin: initial;/ Reset margins to default /
            }
        }

        .s1 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 10pt;
        }

        .p,
        p {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
            margin: 0pt;
        }

        h2 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 8pt;
        }

        .a,
        a {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
        }

        h1 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: underline;
            font-size: 10pt;
        }

        .s6 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 8pt;
        }

        .s7 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
        }

        li {
            display: block;
        }

        #l1 {
            padding-left: 0pt;
        }

        #l1>li>*:first-child:before {
            content: "• ";
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
        }

        table,
        tbody {
            vertical-align: top;
            overflow: visible;
        }

         .grid-section {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
}

.grid-section .item:nth-child(-n + 10) {
  grid-column: span 2;
}

.grid-section .item:nth-child(n + 11) {
  grid-column: span 1;
}

.med-grid{
 display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
}

.med-grid .item:nth-child(1) {
grid-column: span 2;
}

.med-grid .item:nth-child(2) {
grid-column: span 1;
}

.med-grid .item:nth-child(3) {
grid-column: span 1;
}

.consent-div > :nth-child(13) {
   margin-top:30px !important;
}



    </style>
</head>

<body style="margin: 1% 0% 1% 0%;">
<span>
 <img src="https://i.ibb.co/vXNvFN3/Fame-Tattoos.png" alt="" width="640" style=" display: block;
                 margin-left: auto;
                 margin-right: auto;">
</span>
<p class="s1" style="padding-left: 7pt;text-indent: 0pt;text-align: center;">WAIVER, RELEASE AND CONSENT FOR TATTOO REMOVAL
</p>
<p style="padding-top: 6pt;text-indent: 0pt;text-align: left;"><br /></p>

<div class="main" style="margin: 0% 2% 0% 2%;">
 <div style="margin-block:4px">${userDetails(parsedData[0])}</div>

 ${medicalSection(parsedData[0])}

 <div style="margin-block:10px">${emergencyDetails(parsedData[0])}</div>

 <div style="margin-block:10px">${doctorDetails(parsedData[0])}</div>

 <div style="margin-block:10px">${consentSection(parsedData[0])}</div>

 <p style="text-indent: 0pt;text-align: left;"><br /></p>
 ${tattooStyleSection(parsedData[0])}

 ${frontDeskSection(parsedData[0])}


 ${skinConditionSection(parsedData[0])}

 <p style="text-indent: 0pt;text-align: left;"><br /></p>

${artistSection(parsedData[0])}
 <br>

 <p style="padding-top: 6pt;text-indent: 0pt;text-align: left;"><br /></p>
     ${holdHarmlessSection(parsedData[0])}
 <p style="padding-top: 8pt;text-indent: 0pt;text-align: left;"><br /></p>
 <br>

 ${signatureSection(parsedData[0])}


 ${termsOfServiceSection(parsedData[0])}

 <p style="text-indent: 0pt;text-align: left;"><br /></p>
 <p style="padding-top: 5pt;"></p>
 ${imagesSection(parsedData[0])}

</div>
</body>

</html>
        `;
}

function removel_spanish_minor(parsedData) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Fame Tattoos Spanish Minor</title>
    <meta name="author" content="Fame Tattoos" />
    <style type="text/css">
       @page {
           margin: 1% 0% 1% 0%;
            }
           

        * {
            margin: 0;
            padding: 0;
            text-indent: 0;
        }
        @media print {
        @page {
      margin: initial; /* Reset margins to default */
            }}
        h1 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 10pt;
        }

        .h3 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 6pt;
        }

        .s1 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 6pt;
        }

        .s2 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 6pt;
        }

        .s3 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 8pt;
        }

        .p,
        p {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
            margin: 0pt;
        }

        .h2,
        h2 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 8pt;
        }

        .s5 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            /* text-decoration: underline; */
            font-size: 8pt;
        }

        .s6 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            /* font-weight: bold; */
            /* text-decoration: none; */
            font-size: 8pt;
        }

        .a,
        a {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
        }

        .s7 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: italic;
            font-weight: normal;
            /* text-decoration: none; */
            font-size: 8pt;
        }

        .s8 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: italic;
            font-weight: normal;
            /* text-decoration: underline; */
            font-size: 8pt;
        }

        .s9 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            /* text-decoration: underline; */
            font-size: 8pt;
        }

        .s10 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            /* text-decoration: none; */
            font-size: 8pt;
        }

        .s11 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            /* text-decoration: none; */
            font-size: 8pt;
        }

        .s12 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            /* text-decoration: none; */
            font-size: 8pt;
        }

        .s13 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            /* text-decoration: underline; */
            font-size: 8pt;
        }

        .s14 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 8pt;
        }

        .s15 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 8pt;
        }

        .s16 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 6pt;
        }

        li {
            display: block;
        }

        #l1 {
            padding-left: 0pt;
        }

        #l1>li>*:first-child:before {
            content: "• ";
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
        }

        table,
        tbody {
            vertical-align: top;
            overflow: visible;
        }

        .grid-section {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
}

.grid-section .item:nth-child(-n + 10) {
  grid-column: span 2;
}

.grid-section .item:nth-child(n + 11) {
  grid-column: span 1;
}

.med-grid{
 display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
}

.med-grid .item:nth-child(1) {
grid-column: span 2;
}

.med-grid .item:nth-child(2) {
grid-column: span 1;
}

.med-grid .item:nth-child(3) {
grid-column: span 1;
}


.consent-div > :nth-child(12) {
   margin-top:30px !important;
}
    </style>
</head>

<body style="margin: 1% 0% 1% 0%;">
<span>
 <img src="https://i.ibb.co/vXNvFN3/Fame-Tattoos.png" alt="" width="640" style=" display: block;
                 margin-left: auto;
                 margin-right: auto;">
</span>
<p class="s1" style="padding-left: 7pt;text-indent: 0pt;text-align: center;">RENUNCIA, LIBERACIÓN Y CONSENTIMIENTO PARA ELIMINACIÓN DE TATUAJES
</p>
<p style="padding-top: 6pt;text-indent: 0pt;text-align: left;"><br /></p>

<div class="main" style="margin: 0% 2% 0% 2%;">
 <div style="margin-block:4px">${userDetails_s(parsedData[0])}</div>

 ${medicalSection_s(parsedData[0])}

 <div style="margin-block:10px">${emergencyDetails_s(parsedData[0])}</div>

 <div style="margin-block:10px">${doctorDetails_s(parsedData[0])}</div>

 <div style="margin-block:10px">${consentSection_s(parsedData[0])}</div>

 <p style="text-indent: 0pt;text-align: left;"><br /></p>
 ${tattooStyleSection_s(parsedData[0])}

 ${frontDeskSection_s(parsedData[0])}


 ${skinConditionSection_s(parsedData[0])}

 <p style="text-indent: 0pt;text-align: left;"><br /></p>

${artistSection_s(parsedData[0])}
 <br>

 <p style="padding-top: 6pt;text-indent: 0pt;text-align: left;"><br /></p>
     ${holdHarmlessSection_s(parsedData[0])}
 <p style="padding-top: 8pt;text-indent: 0pt;text-align: left;"><br /></p>
 <br>

 ${signatureSection_s(parsedData[0])}


 ${termsOfServiceSection_s(parsedData[0])}

 <p style="text-indent: 0pt;text-align: left;"><br /></p>
 <p style="padding-top: 5pt;"></p>
 ${imagesSection(parsedData[0])}

</div>
</body>

</html>
   `;
}

module.exports = {
  removel_english_not_minor,
  removel_spanish_not_minor,
  removel_english_minor,
  removel_spanish_minor,
};
