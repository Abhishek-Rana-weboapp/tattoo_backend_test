const express = require('express');
const html2canvas = require('html2canvas');

const { jsPDF } = require('jspdf');
const { PDFDocument, rgb } = require('pdf-lib');


const router = express.Router();
const db = require('../db');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { authorize, createFolder } = require('../services/upload_pdf');
const {tattoo_english_not_minor,tattoo_english_minor,tattoo_spanish_not_minor,tattoo_spanish_minor}=require('../html/tatto.js');
const {tooth_gem_english_not_minor,tooth_gem_english_minor,tooth_gem_spanish_not_minor,tooth_gem_spanish_minor}=require('../html/tooth-gems.js');
const {smp_english_not_minor,smp_english_minor,smp_spanish_not_minor,smp_spanish_minor}=require('../html/smp.js');
const {removel_english_not_minor,removel_spanish_not_minor,removel_english_minor,removel_spanish_minor}=require('../html/removel.js')
const {Permanent_markeup_english_not_minor,Permanent_markeup_english_minor,Permanent_markeup_spanish_not_minor,Permanent_markeup_spanish_minor}=require('../html/permanent_makeup.js');
const {Piercing_english_not_minor,Piercing_english_minor,Piercing_spanish_not_minor,Piercing_spanish_minor}=require('../html/Piercing.js');
const { default: puppeteer } = require('puppeteer');



const imagePath = path.join('//D:/workplass/project_WAD/fame_tattoo/fame_tattoo/tatoo_fame.png');

//const path_sig = path.join(__dirname, '../sig_image');
const drive = google.drive('v3');
//D:\workplass\project_WAD\fame_tattoo\fame_tattoo\tatoo_fame.png


async function uploadFile(authClient, folderId, filePath, fileName, mimeType) {
    const fileMetadata = {
        name: fileName,
        parents: [folderId]
    };
    const media = {
        mimeType: mimeType,
        body: fs.createReadStream(filePath)
    };

    const res = await drive.files.create({
        auth: authClient,
        resource: fileMetadata,
        media: media,
        fields: 'id'
    });

    return res.data.id;
}
async function updateDB(fieldName, fieldValue, usernameid, userName) {
    return new Promise((resolve, reject) => {
        const updateQuery = `
            UPDATE google_drive_upload_filed
            SET ${fieldName} = ?
            WHERE appoinment_id = ?
        `;
        const params = [fieldValue, usernameid, userName];

        db.run(updateQuery, params, function (err) {
            if (err) {
                console.error('Error updating google_drive_upload_filed:', err.message);
                reject('An error occurred while updating google_drive_upload_filed.');
            } else {
                console.log(`Field ${fieldName} updated to ${fieldValue} for usernameid ${usernameid} and userName ${userName}`);
                resolve('Update successful');
            }
        });
    });
}
// Function to handle Google Drive authorization
let service_id;
// convert date formet -
function formatDateTime(isoDateString) {
    const date = new Date(isoDateString);
    
    // Extract date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    // Extract time components
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12 || 12;  // Convert to 12-hour format and handle midnight (0 becomes 12)
    
    // Construct formatted date-time string
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
    
    return formattedDateTime;
}

// Example usage:
 // Output: 2024-09-25 10:51 AM


function parseData(jsonData) {
    return jsonData.map(entry => {
        return {
            phone_number: entry.phone_number,
            dateofbirth: entry.dateofbirth,
            id: entry.id,
            firstname: entry.firstname,
            username: entry.username,
            minor: entry.minor,
            lang: entry.lang,
            guardian_info: JSON.parse(entry.guardian_info),
            typeofservice: entry.typeofservice,
            address: entry.address,
            city: entry.city,
            state: entry.state,
            zip: entry.zip,
            gender: entry.gender,
            race: entry.race,
            body_location: JSON.parse(entry.body_location),
            medicalhistory: JSON.parse(entry.medicalhistory),
            emergencycontactnumber: JSON.parse(entry.emergencycontactnumber),
            doctor_information: JSON.parse(entry.doctor_information),
            WaiverRelease_url: JSON.parse(entry.WaiverRelease_url),
            HoldHarmlessAgreement_url: JSON.parse(entry.HoldHarmlessAgreement_url),
            firstname: entry.firstname,
            lastname: entry.lastname,
            before_image: decodeURIComponent(entry.before_image),
            after_image: entry.after_image,
            skin_conditions: entry.skin_conditions,
            frontDeskEmployee: entry.frontDeskEmployee,
            ArtistPiercerNames: entry.ArtistPiercerNames,
            Consent_guard: entry.Consent_guard,
            Shop_location: entry.Shop_location,
            ArtistAcknowledgement: entry.ArtistAcknowledgement,
            Date: entry.Date,
            process_step: entry.process_step,
            complication: entry.complication,
            Sign_completion: entry.Sign_completion,
            price: entry.price,
            start_time: entry.start_time,
            end_time: entry.end_time,
            totalWorkingTime: entry.totalWorkingTime,
            break_time: entry.break_time,
            bill_by: entry.bill_by,
            video_url: entry.video_url,
            final_price: entry.final_price,
            fix_price: entry.fix_price,
            guardian_signature: entry.guardian_signature,
            brief_description: JSON.parse(entry.brief_description),
            guardian_initials: entry.guardian_initials,
            Consent_form: entry.Consent_form,
            guardian_id: entry.guardian_id,
            before_video: entry.before_video,
            count: entry.count,
            fl_form: entry.fl_form,
            folder_id: entry.folder_id,
            id_url: entry.id_url,
            gaurdian_id: entry.gaurdian_id,
            tattoo_type: entry.tattoo_type,
            tattoo_style: entry.tattoo_style,
            color_style: entry.tattoo_style
        };
    });
}



router.post('/generate', (req, res) => {
//////////////////////////////////////////////update service table first /////////////////////////////////////////////////////////
const { username, serviceId } = req.body;
console.log("username", username);

const updateServiceCategory = (username, serviceId) => {
    const query = `
        WITH LatestUserIdentity AS (
            SELECT UserIDCard 
            FROM UserIdentity 
            WHERE username = ? 
            ORDER BY UpdatedAt DESC 
            LIMIT 1
        ),
        LatestGuardianIdentity AS (
            SELECT GuardianIDCard 
            FROM GuardianIdentity 
            WHERE username = ? 
            ORDER BY UpdatedAt DESC 
            LIMIT 1
        )
        UPDATE ServiceCategory
        SET id_url = (SELECT UserIDCard FROM LatestUserIdentity),
            gaurdian_id = COALESCE((SELECT GuardianIDCard FROM LatestGuardianIdentity), gaurdian_id)
        WHERE id = ?;
    `;

    db.run(query, [username, username, serviceId], function (err) {
        if (err) {
            console.error("Error updating ServiceCategory:", err.message);
        } else {
            console.log(`ServiceCategory updated successfully for serviceId ${serviceId}`);
        }
    });
};


updateServiceCategory(username, serviceId);



///////////////////////////////////////////////////////////////////////////////old code //////////////////////////////////// 
    const date = new Date().toISOString().slice(0, 10);

    var outputPath = null;

    const { medicalQuestions, medicalQuestions_s } = require("../MedicalQuestions")
    const { C_questions, C_questions_m, C_questions_s, C_questions_m_s } = require("../ConsentQuestions")

    const { terms, terms_s } = require("../TermOfServiceQuestions")
    

    // Ensure serviceId is a number
    const serviceIdNumber = parseInt(serviceId, 10);
    if (isNaN(serviceIdNumber)) {
        return res.status(400).json({ error: "serviceId must be a valid number" });
    }

    db.run(`SELECT * FROM users WHERE username = notminor1@gmail.com`, (err, user)=>{
        console.log(user)
    })

    const userQuery = `SELECT * FROM users WHERE username = ?`;
    const serviceQuery = `SELECT * FROM servicecategory WHERE id = ?`;

    db.get(userQuery, [username], (err, user) => {
        console.log("user", user);
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        db.get(serviceQuery, [serviceIdNumber], (err, service) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (!service) {
                return res.status(404).json({ error: "Service not found" });
            }

            // Combine user data and service data into a single object

            const combinedData = { ...user };

            for (let key in service) {
                // Avoid duplicating fields that already exist in user data
                if (!combinedData.hasOwnProperty(key)) {
                    combinedData[key] = service[key];
                }
            }
            const parsedData = parseData([combinedData,]);
            const tupeofservice = parsedData[0]?.typeofservice
            const minor = true;
            const id_url = parsedData[0]?.id_url;
            const gaurdian_id = parsedData[0]?.gaurdian_id;
            const medicalhistory = parsedData[0]?.medicalhistory ? parsedData[0]?.medicalhistory : []
            let madicalquestion = medicalQuestions[tupeofservice];
            let madicalquestion_s = medicalQuestions_s[tupeofservice];

            let temsqn = null
            let temsqn_s = null;
            if (tupeofservice == "tooth-gems") {
                temsqn = terms[`tooth_gems`]
                temsqn_s = terms_s[`tooth_gems`]

            }
            else if (tupeofservice == "permanent-makeup") {
                temsqn = terms['permanent_makeup']
                temsqn_s = terms_s[`permanent_makeup`]
            }
            else {
                temsqn = terms[tupeofservice]
                temsqn_s = terms_s[tupeofservice]
            }

            
            const nodeHtmlToImage = require('node-html-to-image');
            const { PDFDocument } = require('pdf-lib');
            const fs = require('fs');
            const path = require('path');
            const { v4: uuidv4 } = require('uuid');

            // async function generatePDF(htmlContent) {
            //     try {
            //         // Convert HTML to image using node-html-to-image
            //         const imageBuffer = await nodeHtmlToImage({
            //             html: htmlContent,
            //             output: './output-image.png', // Temporarily save the image on disk
            //             puppeteerArgs: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
            //         });

            //         // Create a new PDF document using pdf-lib
            //         const pdfDoc = await PDFDocument.create();

            //         // Define A4 page size (595.28, 841.89 points)
            //         const pageWidth = 595.28;
            //         const pageHeight = 841.89;

            //         // Embed the image into the PDF
            //         const image = await pdfDoc.embedPng(imageBuffer);
            //         const { width: imageWidth, height: imageHeight } = image;

            //         // Calculate scale factor to fit the image across 2 pages
            //         const scaleFactor = Math.min(pageWidth / imageWidth, (pageHeight * 2) / imageHeight);
            //         const scaledWidth = imageWidth * scaleFactor;
            //         const scaledHeight = imageHeight * scaleFactor;

            //         // Add the first page
            //         const page1 = pdfDoc.addPage([pageWidth, pageHeight]);

            //         // Draw the image on the first page
            //         page1.drawImage(image, {
            //             x: (pageWidth - scaledWidth) / 2, // Center the image horizontally
            //             y: pageHeight - scaledHeight, // Place image vertically
            //             width: scaledWidth,
            //             height: scaledHeight,
            //         });

            //         // Add the second page if content is still there
            //         if (scaledHeight > pageHeight) {
            //             const page2 = pdfDoc.addPage([pageWidth, pageHeight]);

            //             // Draw the remaining content on the second page
            //             page2.drawImage(image, {
            //                 x: (pageWidth - scaledWidth) / 2, // Center the image horizontally
            //                 y: pageHeight - (scaledHeight - pageHeight), // Place remaining image vertically
            //                 width: scaledWidth,
            //                 height: scaledHeight,
            //             });
            //         }

            //         // Generate a unique ID for the PDF file
            //         const uniqueID = uuidv4();
            //         const outputFolder = path.join(__dirname, '../upload/pdfs');
            //         const outputPath = path.join(outputFolder, `output${uniqueID}.pdf`);

            //         // Ensure the output folder exists
            //         await fs.promises.mkdir(outputFolder, { recursive: true });

            //         // Save the PDF to the file system
            //         const pdfBytes = await pdfDoc.save();
            //         fs.writeFileSync(outputPath, pdfBytes);


            //         // Continue with your existing logic to update the database
            //         await updateDB('stage', 3, serviceIdNumber);
            //         await updateDB('pdf_file', true, serviceIdNumber);
            //         await main(serviceIdNumber, outputPath);

            //     } catch (error) {
            //         console.error('Error generating PDF:', error);
            //     }
            // }


// Assume these are defined elsewhere in your code
// const updateDB = ...
// const main = ...

const generatePDF = async (htmlContent, serviceIdNumber) => {
  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Set HTML content directly
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Use screen styles instead of print, if needed
    await page.emulateMediaType('screen');

    // Generate unique PDF path
    const uniqueID = uuidv4();
    const outputFolder = path.join(__dirname, '../upload/pdfs');
    const outputPath = path.join(outputFolder, `output${uniqueID}.pdf`);

    // Ensure the output folder exists
    await fs.promises.mkdir(outputFolder, { recursive: true });

    // Generate and save the PDF
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    // Optional: Update your database
    await updateDB('stage', 3, serviceIdNumber);
    await updateDB('pdf_file', true, serviceIdNumber);
    // await main(serviceIdNumber, outputPath);

    console.log('PDF generated and saved to:', outputPath);
  } catch (error) {
    console.error('Error generating PDF with Puppeteer:', error);
  }
}

            async function main(serviceId, outputPath) {
                try {
                    const authClient = await authorize();
                    db.get('SELECT folder_id FROM servicecategory WHERE id = ?', [serviceId], async (err, row) => {
                        if (err) {
                            console.error('Error fetching folder_id:', err.message);
                            return res.status(500).json({ error: 'An error occurred while fetching folder_id.' });
                        }

                        if (!row) {
                            return res.status(404).json({ error: 'No matching record found.' });
                        }

                        const folderId = row.folder_id;

                        try {

                            
                            await uploadFile(authClient, folderId, outputPath, `${parsedData[0]?.firstname}_${parsedData[0]?.lastname}_${parsedData[0]?.Date}/pdf`);
                            console.log('File uploaded successfully');
                        } catch (uploadError) {
                            console.error('Error uploading file:', uploadError);
                            return res.status(500).json({ error: 'An error occurred while uploading the file.' });
                        }
                    });
                } catch (error) {
                    console.error('Error during authorization:', error);
                    return res.status(500).json({ error: 'An error occurred during authorization.' });
                }
            }

            //not minor  


            if(parsedData[0]?.typeofservice ==="tattoo")
            {
            if (parsedData[0]?.minor === "false") {
                if (parsedData[0]?.lang === "en") {
                    generatePDF(tattoo_english_not_minor(parsedData))
                        .then(async () =>(
                       console.log('not minor PDF generated successfully.')
                        )
                        )
                        .catch(error => console.error('Error generating PDF:', error));
                }
                else {
                    generatePDF(tattoo_spanish_not_minor(parsedData))
                        .then(async () =>

                        (
                       
                           console.log('not minor PDF generated successfully.')
                        )
                        )
                        .catch(error => console.error('Error generating PDF:', error));
                }
            }
            else {
                if (parsedData[0]?.lang === "en") {
                    generatePDF(tattoo_english_minor(parsedData))
                        .then(async () => (
                            //console.log('id----',service_id),
                            console.log('minor PDF generated successfully.')
                        )
                        )
                        .catch(error => console.error('Error generating PDF:', error));

                }
                else {
                    generatePDF(tattoo_spanish_minor(parsedData))
                        .then(async () => (
                            //console.log('id----',service_id),
                            console.log('minor PDF generated successfully.')
                        )
                        )
                        .catch(error => console.error('Error generating PDF:', error));

                }
            }}
              else if(parsedData[0]?.typeofservice ==="piercing")
                {
                    console.log("=================piercing===================")
                if (parsedData[0]?.minor === "false") {
                    if (parsedData[0]?.lang === "en") {
                        generatePDF(Piercing_english_not_minor(parsedData))
                            .then(async () =>
    
                            (
                           console.log('not minor PDF generated successfully.')
                            )
                            )
                            .catch(error => console.error('Error generating PDF:', error));
                    }
    
                    else {
                        generatePDF(Piercing_spanish_not_minor(parsedData))
                            .then(async () =>
    
                            (
                           
                               console.log('not minor PDF generated successfully.')
                            )
                            )
                            .catch(error => console.error('Error generating PDF:', error));
                    }
                }
                else {
                    if (parsedData[0]?.lang === "en") {
                        generatePDF(Piercing_english_minor(parsedData))
                            .then(async () => (
                                //console.log('id----',service_id),
                                console.log('minor PDF generated successfully.')
                            )
                            )
                            .catch(error => console.error('Error generating PDF:', error));
    
                    }
                    else {
                        generatePDF(Piercing_spanish_minor(parsedData))
                            .then(async () => (
                                //console.log('id----',service_id),
                                console.log('minor PDF generated successfully.')
                            )
                            )
                            .catch(error => console.error('Error generating PDF:', error));
    
                    }
                }}
                  else if(parsedData[0]?.typeofservice ==="removal")
                        {
                            console.log("=================removal===================")
                        if (parsedData[0]?.minor === "false") {
                            if (parsedData[0]?.lang === "en") {
                                generatePDF(removel_english_not_minor(parsedData))
                                    .then(async () =>
            
                                    (
                                   console.log('not minor PDF generated successfully.')
                                    )
                                    )
                                    .catch(error => console.error('Error generating PDF:', error));
                            }
            
                            else {
                                generatePDF(removel_spanish_not_minor(parsedData))
                                    .then(async () =>
            
                                    (
                                   
                                       console.log('not minor PDF generated successfully.')
                                    )
                                    )
                                    .catch(error => console.error('Error generating PDF:', error));
                            }
                        }
                        else {
                            if (parsedData[0]?.lang === "en") {
                                generatePDF(removel_english_minor(parsedData))
                                    .then(async () => (
                                        //console.log('id----',service_id),
                                        console.log('minor PDF generated successfully.')
                                    )
                                    )
                                    .catch(error => console.error('Error generating PDF:', error));
            
                            }
                            else {
                                generatePDF(removel_spanish_minor(parsedData))
                                    .then(async () => (
                                        //console.log('id----',service_id),
                                        console.log('minor PDF generated successfully.')
                                    )
                                    )
                                    .catch(error => console.error('Error generating PDF:', error));
                            }
                        }}
                       else if(parsedData[0]?.typeofservice ==="tooth-gems")
                            {
                                console.log("=================tooth_gems===================")
                            if (parsedData[0]?.minor === "false") {
                                if (parsedData[0]?.lang === "en") {
                                    generatePDF(tooth_gem_english_not_minor(parsedData))
                                        .then(async () =>
                
                                        (
                                       console.log('not minor PDF generated successfully.')
                                        )
                                        )
                                        .catch(error => console.error('Error generating PDF:', error));
                                }
                
                                else {
                                    generatePDF(tooth_gem_spanish_not_minor(parsedData))
                                        .then(async () =>
                
                                        (
                                       
                                           console.log('not minor PDF generated successfully.')
                                        )
                                        )
                                        .catch(error => console.error('Error generating PDF:', error));
                                }
                            }
                            else {
                                if (parsedData[0]?.lang === "en") {
                                    generatePDF(tooth_gem_english_minor(parsedData))
                                        .then(async () => (
                                            //console.log('id----',service_id),
                                            console.log('minor PDF generated successfully.')
                                        )
                                        )
                                        .catch(error => console.error('Error generating PDF:', error));
                
                                }
                                else {
                                    generatePDF(tooth_gem_spanish_minor(parsedData))
                                        .then(async () => (
                                            //console.log('id----',service_id),
                                            console.log('minor PDF generated successfully.')
                                        )
                                        )
                                        .catch(error => console.error('Error generating PDF:', error));
                
                                }
                            }}
                            else if(parsedData[0]?.typeofservice === "permanemt-makeup" ||parsedData[0]?.typeofservice === "smp" ){
                                if (parsedData[0]?.minor === "false") {
                                    if (parsedData[0]?.lang === "en") {
                                        generatePDF(tattoo_english_not_minor(parsedData))
                                            .then(async () =>
                    
                                            (
                                           console.log('not minor PDF generated successfully.')
                                            )
                                            )
                                            .catch(error => console.error('Error generating PDF:', error));
                                    }
                                    else {
                                        generatePDF(tattoo_spanish_not_minor(parsedData))
                                            .then(async () =>
                    
                                            (
                                           
                                               console.log('not minor PDF generated successfully.')
                                            )
                                            )
                                            .catch(error => console.error('Error generating PDF:', error));
                                    }
                                }
                                else {
                                    if (parsedData[0]?.lang === "en") {
                                        generatePDF(tattoo_english_minor(parsedData))
                                            .then(async () => (
                                                //console.log('id----',service_id),
                                                console.log('minor PDF generated successfully.')
                                            )
                                            )
                                            .catch(error => console.error('Error generating PDF:', error));
                    
                                    }
                                    else {
                                        generatePDF(tattoo_spanish_minor(parsedData))
                                            .then(async () => (
                                                //console.log('id----',service_id),
                                                console.log('minor PDF generated successfully.')
                                            )
                                            )
                                            .catch(error => console.error('Error generating PDF:', error));
                    
                                    }
                                }
                            }
                            // else if(parsedData[0]?.typeofservice ==="permanent-makeup")
                            //     {
                            //         console.log("=================permanent_makeup===================")
                            //     if (parsedData[0]?.minor === "false") {
                            //         if (parsedData[0]?.lang === "en") {
                            //             generatePDF(Permanent_markeup_english_not_minor(parsedData))
                            //                 .then(async () =>
                    
                            //                 (
                            //                console.log('not minor PDF generated successfully.')
                            //                 )
                            //                 )
                            //                 .catch(error => console.error('Error generating PDF:', error));
                            //         }
                    
                            //         else {
                            //             generatePDF(Permanent_markeup_spanish_not_minor(parsedData))
                            //                 .then(async () =>
                    
                            //                 (
                                           
                            //                    console.log('not minor PDF generated successfully.')
                            //                 )
                            //                 )
                            //                 .catch(error => console.error('Error generating PDF:', error));
                            //         }
                            //     }
                            //     else {
                            //         if (parsedData[0]?.lang === "en") {
                            //             generatePDF(Permanent_markeup_english_minor(parsedData))
                            //                 .then(async () => (
                            //                     //console.log('id----',service_id),
                            //                     console.log('minor PDF generated successfully.')
                            //                 )
                            //                 )
                            //                 .catch(error => console.error('Error generating PDF:', error));
                    
                            //         }
                            //         else {
                            //             generatePDF(Permanent_markeup_spanish_minor(parsedData))
                            //                 .then(async () => (
                            //                     //console.log('id----',service_id),
                            //                     console.log('minor PDF generated successfully.')
                            //                 )
                            //                 )
                            //                 .catch(error => console.error('Error generating PDF:', error));
                    
                            //         }
                            //     }}
                            //     else if(parsedData[0]?.typeofservice ==="smp")
                            //         {
                            //             console.log("=================smp===================")
                            //         if (parsedData[0]?.minor === "false") {
                            //             if (parsedData[0]?.lang === "en") {
                            //                 generatePDF(smp_english_not_minor(parsedData))
                            //                     .then(async () =>
                        
                            //                     (
                            //                    console.log('not minor PDF generated successfully.')
                            //                     )
                            //                     )
                            //                     .catch(error => console.error('Error generating PDF:', error));
                            //             }
                        
                            //             else {
                            //                 generatePDF(smp_spanish_not_minor(parsedData))
                            //                     .then(async () =>
                        
                            //                     (
                                               
                            //                        console.log('not minor PDF generated successfully.')
                            //                     )
                            //                     )
                            //                     .catch(error => console.error('Error generating PDF:', error));
                            //             }
                            //         }
                            //         else {
                            //             if (parsedData[0]?.lang === "en") {
                            //                 generatePDF(smp_english_minor(parsedData))
                            //                     .then(async () => (
                            //                         //console.log('id----',service_id),
                            //                         console.log('minor PDF generated successfully.')
                            //                     )
                            //                     )
                            //                     .catch(error => console.error('Error generating PDF:', error));
                        
                            //             }
                            //             else {
                            //                 generatePDF(smp_spanish_minor(parsedData))
                            //                     .then(async () => (
                            //                         //console.log('id----',service_id),
                            //                         console.log('minor PDF generated successfully.')
                            //                     )
                            //                     )
                            //                     .catch(error => console.error('Error generating PDF:', error));
                        
                            //             }
                            //         }}
                                else{
                                 print("no service exist");
                                }
            res.json(parsedData[0]);
        });
    });

});
module.exports = router;