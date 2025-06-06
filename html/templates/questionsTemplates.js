const questionsTemplate = (question, parsedData, index) => {
  if (question.type === "YN") {
    return `<p class="item" style="text-indent: 0pt;padding-top: 2pt;text-align: left;">${
      question.q
    } <span class="s3">${
      parsedData?.medicalhistory[index + 1]?.ans
    }</span></p>`;
  } else if (question.type === "YNO") {
    return `<p class="item" style="text-indent: 0pt;text-align: left;">
    ${question.q}<b class="s3">${parsedData?.medicalhistory[index + 1]?.ans}</b>
     <p style="padding-top: 2pt;text-indent: 0pt;line-height: 9pt;text-align: left;">option: ${
       parsedData?.medicalhistory[index + 1]?.opt
     }
     </p>`;
  } else if (question.type === "YNE") {
    return `<div class="item"><p style="text-indent: 0pt;line-height: 119%;text-align: left;width:95%;">${
      question.q
    }<span class="s3">${parsedData?.medicalhistory[index + 1]?.ans} </span>
     </p>
    <p style="padding-top: 2pt; text-indent: 0pt; line-height: 9pt; text-align: left; display: flex; gap: 5px;">
  <span class="s3" style="white-space: nowrap;font-weight:700">If Yes, Explain:</span>
  <span style="flex-grow: 1; border-bottom: 1px solid black;">
    ${parsedData?.medicalhistory[index + 1]?.explanation}
  </span>
</p></div>`;
  } else if (question.type === "YNS") {
    return `<div  class="p item" style="padding-top: 2pt;">
         <div class="p" style="display:flex"><span>${question.q}</span> <span style="flex-1;border-bottom:1px solid black">${
      parsedData?.medicalhistory[index + 1]?.ans
    }</span></div>
         <div class="med-grid">
           ${question?.sq?.map((sub, i) => {
            const subKeys = parsedData?.medicalhistory[index+1]?.sub ? Object.keys(parsedData?.medicalhistory[index + 1]?.sub) : [];
            if(subKeys.length > 0){
              if (sub.type === "E") {
                return `<div class="item p" style="text-indent: 0pt;line-height: 119%;text-align: left;display:flex;align-items:center;width:100%">${
                  sub.q
                  }<span class="s3" style="flex:1;border-bottom:1px solid black;">${
                    parsedData?.medicalhistory[index + 1]?.sub[subKeys[i]].ans
                    } </span>
                    </div>`;
                  } else if (sub.type === "NUM") {
                    return `<div class="item p"  style="text-indent: 0pt;line-height: 119%;text-align: left;;display:flex;align-items:center;width:100%">${
                      sub.q
                      }<span class="s3" style="flex:1;border-bottom:1px solid black;">${
                        parsedData?.medicalhistory[index + 1]?.sub[subKeys[i]].ans
                        } </span> </div>`;
                      }
                    }
           }).join("")}
         </div>
    </div>`;
  }else if(question.type === "NUM"){
    return `<p class="item" style="text-indent: 0pt;padding-top: 2pt;text-align: left;">${
      question.q
    } <span class="s3">${
      parsedData?.medicalhistory[index + 1]?.ans
    }</span></p>`}
};

const questionsTemplate_s = (question, parsedData, index) => {
  if (question.type === "YN") {
    return `<p style="text-indent: 0pt;text-align: left;">${
      question.q
    } <span class="s3">${
      parsedData?.medicalhistory[index + 1]?.ans
    }</span></p>`;
  } else if (question.type === "YNO") {
    return `<p style="text-indent: 0pt;text-align: left;">
    ${question.q}<b class="s3">${parsedData?.medicalhistory[index + 1]?.ans}</b>
     <p style="padding-top: 2pt;text-indent: 0pt;line-height: 9pt;text-align: left;">option: ${
       parsedData?.medicalhistory[index + 1]?.opt
     }
     </p>`;
  } else if (question.type === "YNE") {
    return `<p style="text-indent: 0pt;line-height: 119%;text-align: left;width:95%;">${
      question.q
    }<span class="s3">${parsedData?.medicalhistory[index + 1]?.ans} </span>
     </p>
    <p style="padding-top: 2pt; text-indent: 0pt; line-height: 9pt; text-align: left; display: flex; gap: 5px;">
  <span class="s3" style="white-space: nowrap;font-weight:700">En caso afirmativo, explíquelo por favor:</span>
  <span style="flex-grow: 1; border-bottom: 1px solid black;">
    ${parsedData?.medicalhistory[index + 1]?.explanation}
  </span>
</p>`;
  }else if (question.type === "YNS") {
    return `<div  class="p item" style="padding-top: 2pt;">
         <div class="p" style="display:flex"><span>${question.q}</span> <span style="flex-1;border-bottom:1px solid black">${
      parsedData?.medicalhistory[index + 1]?.ans
    }</span></div>
         <div class="med-grid">
           ${question?.sq?.map((sub, i) => {
            const subKeys = parsedData?.medicalhistory[index+1]?.sub ? Object.keys(parsedData?.medicalhistory[index + 1]?.sub) : [];
            if(subKeys.length > 0){
              if (sub.type === "E") {
                return `<div class="item p" style="text-indent: 0pt;line-height: 119%;text-align: left;display:flex;align-items:center;width:100%">${
                  sub.q
                  }<span class="s3" style="flex:1;border-bottom:1px solid black;">${
                    parsedData?.medicalhistory[index + 1]?.sub[subKeys[i]].ans
                    } </span>
                    </div>`;
                  } else if (sub.type === "NUM") {
                    return `<div class="item p"  style="text-indent: 0pt;line-height: 119%;text-align: left;;display:flex;align-items:center;width:100%">${
                      sub.q
                      }<span class="s3" style="flex:1;border-bottom:1px solid black;">${
                        parsedData?.medicalhistory[index + 1]?.sub[subKeys[i]].ans
                        } </span> </div>`;
                      }
                    }
           }).join("")}
         </div>
    </div>`;
  }else if(question.type === "NUM"){
    return `<p class="item" style="text-indent: 0pt;padding-top: 2pt;text-align: left;">${
      question.q
    } <span class="s3">${
      parsedData?.medicalhistory[index + 1]?.ans
    }</span></p>`}
};

module.exports = { questionsTemplate, questionsTemplate_s };
