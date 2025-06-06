const { medicalQuestions } = require("../MedicalQuestions");
const { termsOfServiceSection, holdHarmlessSection, consentSection, doctorDetails, emergencyDetails, medicalSection, userDetails, signatureSection, frontDeskSection, skinConditionSection, artistSection, imagesSection } = require("./templates/detailsSection");
const { medicalSection_s, emergencyDetails_s, doctorDetails_s, userDetails_s, consentSection_s, tattooStyleSection_s, frontDeskSection_s, skinConditionSection_s, artistSection_s, holdHarmlessSection_s, signatureSection_s, termsOfServiceSection_s } = require("./templates/detailsSectionSpanish");

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

function tooth_gem_english_not_minor(parsedData) {
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
    </style>
</head>

<body style="margin: 1% 0% 1% 0%;">
    <span>
       <img src="https://i.ibb.co/vXNvFN3/Fame-Tattoos.png" alt="" width="580" style=" display: block;
                        margin-left: auto;
                        margin-right: auto;">
    </span>
    <p class="s1" style="padding-left: 7pt;text-indent: 0pt;text-align: center;">WAIVER, RELEASE AND CONSENT FOR TOOTH GEMS
    </p>
    <p style="padding-top: 6pt;text-indent: 0pt;text-align: left;"><br /></p>

    <div class="main" style="margin: 0% 2% 0% 2%;">
      <div style="margin-bottom:5px">${userDetails(parsedData[0])}</div>
      

       ${medicalSection(parsedData[0])}


       <div style="margin-bottom:5px">${emergencyDetails(parsedData[0])}</div>
        <div style="margin-bottom:5px">${doctorDetails(parsedData[0])}</div>
        ${consentSection(parsedData[0])}


        ${frontDeskSection(parsedData[0])}
        ${skinConditionSection(parsedData[0])}
  
        <p style="padding-top: 8pt;text-indent: 0pt;text-align: left;"><br /></p>
        <p style="padding-top: 8pt;text-indent: 0pt;text-align: left;"><br /></p>

         
        ${artistSection(parsedData[0])}
        <p style="padding-top: 8pt;text-indent: 0pt;text-align: left;"><br /></p>
       
           ${holdHarmlessSection(parsedData[0])}

       ${signatureSection(parsedData[0])}

        <p style="text-indent: 0pt;text-align: left;"><br /></p>
        <div id="initals1">
          
            ${termsOfServiceSection(parsedData[0])}
        </div>
        <p style="padding-top: 5pt;"></p>
       ${imagesSection(parsedData[0])}


    </div>
</body>

</html>
        `;
}

function tooth_gem_english_minor(parsedData) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Fame Tattoos MINOR</title>
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

        .s1 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 10pt;
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

        .h3 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 7pt;
        }

        .s2 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 7pt;
        }

        .s3 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 7pt;
        }

        .s4 {
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

        .s7 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: italic;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
        }

        .s8 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: italic;
            font-weight: normal;
            text-decoration: underline;
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

        .s9 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 8pt;
        }

        .s10 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
        }

        .s11 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 8pt;
        }

        .s12 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: underline;
            font-size: 8pt;
        }

        .s13 {
            color: black;
            font-family: "Times New Roman", serif;
            font-style: normal;
            font-weight: bold;
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

        .flex-container{
            display: flex;
            align-items: start;
            gap:2px;
        }

        .flex-expand{
            flex-grow: 1;
        }
    
    </style>
</head>

<body>
   <span>
            <img src="https://i.ibb.co/vXNvFN3/Fame-Tattoos.png" alt="" width="640" style=" display: block;
                        margin-left: auto;
                        margin-right: auto;">
        </span>
    <p class="s1" style="padding-left: 7pt;text-indent: 0pt;text-align: center;">MINOR WAIVER, RELEASE AND CONSENT FOR TOOTH GEM</p>
        <div class="main" style="margin: 0% 2% 0% 2%;">
    <p style="padding-top: 4pt;padding-left: 7pt;text-indent: 0pt;text-align: center;"><span class="h2">T</span><span
            class="h3">he following colors indicate the sections completed by each person: Minor’s are </span><span
            class="s2" style=" background-color: #0F0;">Green</span><span class="h3">, Legal Guardian are </span><span
            class="s3" style=" background-color: #FF0;">Yellow</span></p>
    <p style="text-indent: 0pt;text-align: left;"><br /></p>

     <div style="margin-bottom:5px">${userDetails(parsedData[0])}</div>
      

       ${medicalSection(parsedData[0])}


       <div style="margin-bottom:5px">${emergencyDetails(parsedData[0])}</div>
        <div style="margin-bottom:5px">${doctorDetails(parsedData[0])}</div>
        ${consentSection(parsedData[0])}


        
        ${frontDeskSection(parsedData[0])}
        <p style="padding-top: 8pt;text-indent: 0pt;text-align: left;"><br /></p>
        ${skinConditionSection(parsedData[0])}


         
        ${artistSection(parsedData[0])}
        <p style="padding-top: 8pt;text-indent: 0pt;text-align: left;"><br /></p>
       
           ${holdHarmlessSection(parsedData[0])}
        <p style="padding-top: 8pt;text-indent: 0pt;text-align: left;"><br /></p>


       ${signatureSection(parsedData[0])}

        <p style="text-indent: 0pt;text-align: left;"><br /></p>
        <div id="initals1">
          
            ${termsOfServiceSection(parsedData[0])}
        </div>
     <p style="padding-top: 5pt;"></p>
    ${imagesSection(parsedData[0])}
    </div>
</body>

</html>
   `;
}

function tooth_gem_spanish_not_minor(parsedData) {
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
    </style>
</head>

<body>
<div style="width:95%;margin-inline:auto;">
    <span>
            <img src="https://i.ibb.co/vXNvFN3/Fame-Tattoos.png" alt="" width="580" style=" display: block;
                    margin-left: auto;
                    margin-right: auto;">
        </span>
    <h1 style="padding-left: 6pt;text-indent: 0pt;text-align: center;">RENUNCIA, LIBERACIÓN Y CONSENTIMIENTO PARA GEMAS DENTALES
    </h1>
    <p style="padding-top: 6pt;text-indent: 0pt;text-align: left;"><br /></p>
    <div style="margin-block:4px">${userDetails_s(parsedData[0])}</div>


    ${medicalSection_s(parsedData[0])}


    <div style="margin-bottom:10px">${emergencyDetails_s(parsedData[0])}</div>
    <div style="margin-bottom:10px">${doctorDetails_s(parsedData[0])}</div>

   
    <!-- New Consent questions section -->

    ${consentSection_s(parsedData[0])}

     ${frontDeskSection_s(parsedData[0])}


 ${skinConditionSection_s(parsedData[0])}

 ${artistSection_s(parsedData[0])}
   
    <br>

    <div id="customer">
       ${holdHarmlessSection_s(parsedData[0])}
    </div>

    ${signatureSection_s(parsedData[0])}

    ${termsOfServiceSection_s(parsedData[0])}
   
     ${imagesSection(parsedData[0])}
    </div>
</body>

</html>
   `;
}

function tooth_gem_spanish_minor(parsedData) {
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
    </style>
</head>

<body>
<div style="width:95%;margin-inline:auto;">
    <span>
            <img src="https://i.ibb.co/vXNvFN3/Fame-Tattoos.png" alt="" width="580" style=" display: block;
                    margin-left: auto;
                    margin-right: auto;">
        </span>
    <h1 style="padding-left: 6pt;text-indent: 0pt;text-align: center;">RENUNCIA, LIBERACIÓN Y CONSENTIMIENTO PARA GEMAS DENTALES
    </h1>
    <p style="padding-top: 6pt;text-indent: 0pt;text-align: left;"><br /></p>
    <div style="margin-block:4px">${userDetails_s(parsedData[0])}</div>


    ${medicalSection_s(parsedData[0])}


    <div style="margin-bottom:10px">${emergencyDetails_s(parsedData[0])}</div>
    <div style="margin-bottom:10px">${doctorDetails_s(parsedData[0])}</div>

   
    <!-- New Consent questions section -->

    ${consentSection_s(parsedData[0])}

     ${frontDeskSection_s(parsedData[0])}

    <p style="padding-top: 6pt;text-indent: 0pt;text-align: left;"><br /></p>

 ${skinConditionSection_s(parsedData[0])}

 ${artistSection_s(parsedData[0])}
   
    <br>

    <div id="customer">
       ${holdHarmlessSection_s(parsedData[0])}
    </div>

    ${signatureSection_s(parsedData[0])}

    ${termsOfServiceSection_s(parsedData[0])}
   
     ${imagesSection(parsedData[0])}
    </div>
</body>

</html>
   `;
}

module.exports = {
  tooth_gem_english_not_minor,
  tooth_gem_english_minor,
  tooth_gem_spanish_not_minor,
  tooth_gem_spanish_minor,
};
