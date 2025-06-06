

const medicalQuestions = {
  tattoo: [
    {
      id: 1,
      type: "YN",
      q: "Have you ever been tattooed before?",
    },
    {
      id: 2,
      type: "YNO",
      q: "Are you Pregnant( ) or Nursing( )?",
      subOpt: ["pregnant", "nursing"],
    },
    {
      id: 3,
      type: "YNE",
      q: "Are you a hemophiliac (bleeder) or on any medications that may cause bleeding or may hinder blood clotting?",
    },
    {
      id: 4,
      type: "YNE",
      q: "Do you have any medical or skin conditions? Example: (keloids or hypertrophic scarring, psoriasis)?",
    },
    {
      id: 5,
      type: "YNE",
      q: "Do you have any communicable diseases? Example: (H.I.V., A.I.D.S., HEPATITIS)",
    },
    {
      id: 6,
      type: "YNE",
      q: "Are you under the influence of alcohol or drugs, prescribed or otherwise?",
    },
    {
      id: 7,
      type: "YNE",
      q: "Do you have any allergies? Example: (to metals, latex gloves, soaps and medications)",
    },
    {
      id: 8,
      type: "YNE",
      q: "Do you have a heart condition, epilepsy, or diabetes?",
    },
  ],
  
  "permanent-makeup": [
    {
      id: 1,
      type: "YN",
      q: "Have you ever been tattooed before?",
    },
    {
      id: 2,
      type: "YNO",
      q: "Are you Pregnant( ) or Nursing( )?",
      subOpt: ["pregnant", "nursing"],
    },
    {
      id: 3,
      type: "YNE",
      q: "Are you a hemophiliac (bleeder) or on any medications that may cause bleeding or may hinder blood clotting?",
    },
    {
      id: 4,
      type: "YNE",
      q: "Do you have any medical or skin conditions? Example: (keloids or hypertrophic scarring, psoriasis)?",
    },
    {
      id: 5,
      type: "YNE",
      q: "Do you have any communicable diseases? Example: (H.I.V., A.I.D.S., HEPATITIS)",
    },
    {
      id: 6,
      type: "YNE",
      q: "Are you under the influence of alcohol or drugs, prescribed or otherwise?",
    },
    {
      id: 7,
      type: "YNE",
      q: "Do you have any allergies? Example: (to metals, latex gloves, soaps and medications)",
    },
    {
      id: 8,
      type: "YNE",
      q: "Do you have a heart condition, epilepsy, or diabetes?",
    },
  ],

  smp: [
    {
      id: 1,
      type: "YN",
      q: "Have you ever been tattooed before?",
    },
    {
      id: 2,
      type: "YNO",
      q: "Are you Pregnant( ) or Nursing( )?",
      subOpt: ["pregnant", "nursing"],
    },
    {
      id: 3,
      type: "YNE",
      q: "Are you a hemophiliac (bleeder) or on any medications that may cause bleeding or may hinder blood clotting?",
    },
    {
      id: 4,
      type: "YNE",
      q: "Do you have any medical or skin conditions? Example: (keloids or hypertrophic scarring, psoriasis)?",
    },
    {
      id: 5,
      type: "YNE",
      q: "Do you have any communicable diseases? Example: (H.I.V., A.I.D.S., HEPATITIS)",
    },
    {
      id: 6,
      type: "YNE",
      q: "Are you under the influence of alcohol or drugs, prescribed or otherwise?",
    },
    {
      id: 7,
      type: "YNE",
      q: "Do you have any allergies? Example: (to metals, latex gloves, soaps and medications)",
    },
    {
      id: 8,
      type: "YNE",
      q: "Do you have a heart condition, epilepsy, or diabetes?",
    },
  ],
  
  
  piercing: [
    {
      id: 1,
      type: "YN",
      q: "Have ever been pierced before?",
    },
    {
      id: 2,
      type: "YNO",
      q: "Are you Pregnant( ) or Nursing( )?",
      subOpt: ["pregnant", "nursing"],
    },
    {
      id: 3,
      type: "YNE",
      q: "Are you a hemophiliac (bleeder) or on any medications that may cause bleeding or may hinder blood clotting?",
    },
    {
      id: 4,
      type: "YNE",
      q: "Do you have any medical or skin conditions? Example: (keloids or hypertrophic scarring, psoriasis)?",
    },
    {
      id: 5,
      type: "YNE",
      q: "Do you have any communicable diseases? Example: (H.I.V., A.I.D.S., HEPATITIS)",
    },
    {
      id: 6,
      type: "YNE",
      q: "Are you under the influence of alcohol or drugs, prescribed or otherwise?",
    },
    {
      id: 7,
      type: "YNE",
      q: "Do you have any allergies? Example: (to metals, latex gloves, soaps and medications)",
    },
    {
      id: 8,
      type: "YNE",
      q: "Do you have a heart condition, epilepsy, or diabetes?",
    },
  ],
  
  
  
  "tooth-gems": [
    {
      id: 1,
      type: "YNE",
      q: "Are you under the influence of alcohol or drugs, prescribed or otherwise?",
    },
    {
      id: 2,
      type: "YNE",
      q: "Do you have any allergies? Example: (to metals, latex gloves, soaps and medications)",
    },
    {
      id: 3,
      type: "YNE",
      q: "Do you have any medical or skin conditions? Example: (keloids or hypertrophic scarring, psoriasis)?",
    },
    {
      id: 4,
      type: "YNE",
      q: "Do you have any communicable diseases? Example: (H.I.V., A.I.D.S., HEPATITIS)",
    },
    {
      id: 5,
      type: "YNE",
      q: "Do you have a heart condition, epilepsy, or diabetes?",
    },
    {
      id: 6,
      type: "YNE",
      q: "Do you have sensitive teeth?",
    },
    {
      id: 7,
      type: "YNE",
      q: "Do you have any synthetic (false, veneers, crowned, or capped) teeth?",
    },
  ],
  
  removal: [
    {
      id: 1,
      type: "NUM",
      q: "How old is your Tattoo?",
    },
    {
      id: 2,
      type: "YNS",
      q: "Did you have any adverse reactions after the application of the unwanted tattoo, (including, but not limited to: infections, swelling, and/or bleeding)?",
      sq: [
        {
          id: 21,
          type: "E",
          q: "did you pursue any additional medical treatment?",
        },
      ]
    },
    {
      id: 3,
      type: "YNS",
      q: "Have you had any previous tattoo removal sessions?",
      sq: [
        {
          id:31,
          type: "E",
          q:"What type of tattoo removal treatment have you received? Example: (Laser, Tattoo Vanish, etc.)"
        },
        {
          id:32,
          type: "NUM",
          q:"How many sessions have you done in total?"
        },
        {
          id:33,
          type: "E",
          q:"When was your last session?"
        },
      ]
    },
    {
      id: 4,
      type: "YNO",
      q: "Are you Pregnant or Nursing?",
      subOpt:["pregnant", "nursing"]
    },
    {
      id: 5,  
      type: "YNE",
      q: "Are you a hemophiliac (bleeder) or on any medications that may cause bleeding or may hinder blood clotting?",
    },
    {
      id: 6,
      type: "YNE",
      q: "Do you have any medical or skin conditions? Example: (keloids or hypertrophic scarring, psoriasis)",
    },
    {
      id: 7,
      type: "YNE",
      q: "Do you have any communicable diseases? Example: (H.I.V., A.I.D.S., HEPATITIS)",
    },
    {
      id: 8,
      type: "YNE",
      q: "Are you under the influence of alcohol or drugs, prescribed or otherwise?",
    },
    {
      id: 9,
      type: "YNE",
      q: "Do you have any allergies? Example: (to metals, latex gloves, soaps, and medications)",
    },
    {
      id: 10,
      type: "YN",
      q: "Do you have a heart condition, epilepsy, or diabetes?",
    },
    {
      id: 11,
      type: "YN",
      q: "Have you used Accutane within the past 6 months?",
    },
    {
      id: 12,
      type: "YN",
      q: "Do you have any medical implants?",
    },
    {
      id: 13,
      type: "YN",
      q: "Do you have Asthma?",
    },
    {
      id: 14,
      type: "YN",
      q: "Do you have an Autoimmune disorder?",
    },
    {
      id: 15,
      type: "YN",
      q: "Do you ever Faint or become dizzy?",
    },
    {
      id: 16,
      type: "YN",
      q: "Do you ever have problems healing minor wounds?",
    },
    {
      id: 17,
      type: "YN",
      q: "Have you taken any Herbal supplements today?",
    },
    {
      id: 18,
      type: "YN",
      q: "Do you have Hyper-pigment (darkened scars) or Hypo-pigment (lightened scars)?",
    },
    {
      id: 19,
      type: "YN",
      q: "Do you have a Pace Maker?",
    },
    {
      id: 20,
      type: "YN",
      q: "Have you ever received Radiation or chemotherapy treatment?",
    },
    
    {
      id: 21,
      type: "YN",
      q: "Do you have a Seizure-related condition?",
    },
    {
      id: 22,
      type: "YN",
      q: "Do you, or have you ever had Skin Cancer?",
    },
    {
      id: 23,
      type: "YN",
      q: "Are you a Smoker?",
    },
    {
      id: 24,
      type: "YN",
      q: "Do you use a tanning bed or any other artificial tanning products?",
    },
    {
      id: 25,
      type: "YN",
      q: "Do you Sunburn easily?",
    },
    {
      id: 26,
      type: "YN",
      q: "Do you have Vitiligo?",
    },   
  ],
};
const medicalQuestions_s = {
  tattoo: [
    {
      id: 1,
      type: "YN",
      q: "¿Alguna vez te has tatuado antes?",
    },
    {
      id: 2,
      type: "YNO",
      q: "¿Estás embarazada ( ) o amamantando ( )?",
      subOpt: ["embarazada", "amamantando"],
    },
    {
      id: 3,
      type: "YNE",
      q: "¿Eres hemofílico (sangrador) o estás tomando algún medicamento que pueda causar sangrado o dificultar la coagulación de la sangre?",
    },
    {
      id: 4,
      type: "YNE",
      q: "¿Tienes alguna condición médica o de la piel? Ejemplo: (queloides o cicatrización hipertrófica, psoriasis)",
    },
    {
      id: 5,
      type: "YNE",
      q: "¿Tienes alguna enfermedad contagiosa? Ejemplo: (H.I.V., S.I.D.A., HEPATITIS)",
    },
    {
      id: 6,
      type: "YNE",
      q: "¿Estás bajo la influencia de alcohol o drogas, recetadas o de otro tipo?",
    },
    {
      id: 7,
      type: "YNE",
      q: "¿Tienes alguna alergia? Ejemplo: (a metales, guantes de látex, jabones y medicamentos)",
    },
    {
      id: 8,
      type: "YNE",
      q: "¿Tienes una condición cardíaca, epilepsia o diabetes?",
    },
  ],
  
  "permanent-makeup": [
    {
      id: 1,
      type: "YN",
      q: "¿Alguna vez te has tatuado antes?",
    },
    {
      id: 2,
      type: "YNO",
      q: "¿Estás embarazada ( ) o amamantando ( )?",
      subOpt: ["embarazada", "amamantando"],
    },
    {
      id: 3,
      type: "YNE",
      q: "¿Eres hemofílico (sangrador) o estás tomando algún medicamento que pueda causar sangrado o dificultar la coagulación de la sangre?",
    },
    {
      id: 4,
      type: "YNE",
      q: "¿Tienes alguna condición médica o de la piel? Ejemplo: (queloides o cicatrización hipertrófica, psoriasis)",
    },
    {
      id: 5,
      type: "YNE",
      q: "¿Tienes alguna enfermedad contagiosa? Ejemplo: (H.I.V., S.I.D.A., HEPATITIS)",
    },
    {
      id: 6,
      type: "YNE",
      q: "¿Estás bajo la influencia de alcohol o drogas, recetadas o de otro tipo?",
    },
    {
      id: 7,
      type: "YNE",
      q: "¿Tienes alguna alergia? Ejemplo: (a metales, guantes de látex, jabones y medicamentos)",
    },
    {
      id: 8,
      type: "YNE",
      q: "¿Tienes una condición cardíaca, epilepsia o diabetes?",
    },
  ],

  smp: [
    {
      id: 1,
      type: "YN",
      q: "¿Alguna vez te has tatuado antes?",
    },
    {
      id: 2,
      type: "YNO",
      q: "¿Estás embarazada ( ) o amamantando ( )?",
      subOpt: ["embarazada", "amamantando"],
    },
    {
      id: 3,
      type: "YNE",
      q: "¿Eres hemofílico (sangrador) o estás tomando algún medicamento que pueda causar sangrado o dificultar la coagulación de la sangre?",
    },
    {
      id: 4,
      type: "YNE",
      q: "¿Tienes alguna condición médica o de la piel? Ejemplo: (queloides o cicatrización hipertrófica, psoriasis)",
    },
    {
      id: 5,
      type: "YNE",
      q: "¿Tienes alguna enfermedad contagiosa? Ejemplo: (H.I.V., S.I.D.A., HEPATITIS)",
    },
    {
      id: 6,
      type: "YNE",
      q: "¿Estás bajo la influencia de alcohol o drogas, recetadas o de otro tipo?",
    },
    {
      id: 7,
      type: "YNE",
      q: "¿Tienes alguna alergia? Ejemplo: (a metales, guantes de látex, jabones y medicamentos)",
    },
    {
      id: 8,
      type: "YNE",
      q: "¿Tienes una condición cardíaca, epilepsia o diabetes?",
    },
  ],
  
  piercing: [
    {
      id: 1,
      type: "YN",
      q: "¿Alguna vez te has perforado antes?",
    },
    {
      id: 2,
      type: "YNO",
      q: "¿Estás embarazada ( ) o amamantando ( )?",
      subOpt: ["embarazada", "amamantando"],
    },
    {
      id: 3,
      type: "YNE",
      q: "¿Eres hemofílico (sangrador) o estás tomando algún medicamento que pueda causar sangrado o dificultar la coagulación de la sangre?",
    },
    {
      id: 4,
      type: "YNE",
      q: "¿Tienes alguna condición médica o de la piel? Ejemplo: (queloides o cicatrización hipertrófica, psoriasis)?",
    },
    {
      id: 5,
      type: "YNE",
      q: "¿Tienes alguna enfermedad contagiosa? Ejemplo: (H.I.V., S.I.D.A., HEPATITIS)",
    },
    {
      id: 6,
      type: "YNE",
      q: "¿Estás bajo la influencia de alcohol o drogas, recetadas o de otro tipo?",
    },
    {
      id: 7,
      type: "YNE",
      q: "¿Tienes alguna alergia? Ejemplo: (a metales, guantes de látex, jabones y medicamentos)",
    },
    {
      id: 8,
      type: "YNE",
      q: "¿Tienes una condición cardíaca, epilepsia o diabetes?",
    },
  ],
  
  "tooth-gems": [
    {
      id: 1,
      type: "YNE",
      q: "¿Estás bajo la influencia de alcohol o drogas, recetadas o de otro tipo?",
    },
    {
      id: 2,
      type: "YNE",
      q: "¿Tienes alguna alergia? Ejemplo: (a metales, guantes de látex, jabones y medicamentos)",
    },
    {
      id: 3,
      type: "YNE",
      q: "¿Tienes alguna condición médica o de la piel? Ejemplo: (queloides o cicatrización hipertrófica, psoriasis)?",
    },
    {
      id: 4,
      type: "YNE",
      q: "¿Tienes alguna enfermedad contagiosa? Ejemplo: (H.I.V., S.I.D.A., HEPATITIS)",
    },
    {
      id: 5,
      type: "YNE",
      q: "¿Tienes una condición cardíaca, epilepsia o diabetes?",
    },
    {
      id: 6,
      type: "YNE",
      q: "¿Tienes dientes sensibles?",
    },
    {
      id: 7,
      type: "YNE",
      q: "¿Tienes dientes sintéticos (postizos, carillas, coronados o encapados)?",
    },
  ],
  
  removal: [
    {
      id: 1,
      type: "NUM",
      q: "¿Cuántos años tiene tu tatuaje?",
    },
    {
      id: 2,
      type: "YNS",
      q: "¿Tuviste alguna reacción adversa después de la aplicación del tatuaje no deseado, (incluyendo, pero no limitado a: infecciones, hinchazón y/o sangrado)?",
      sq: [
        {
          id: 21,
          type: "E",
          q: "¿Recibiste algún tratamiento médico adicional?",
        },
      ]
    },
    {
      id: 3,
      type: "YNS",
      q: "¿Has tenido sesiones previas de eliminación de tatuajes?",
      sq: [
        {
          id: 31,
          type: "E",
          q: "¿Qué tipo de tratamiento de eliminación de tatuajes has recibido? Ejemplo: (Láser, Tattoo Vanish, etc.)",
        },
        {
          id: 32,
          type: "NUM",
          q: "¿Cuántas sesiones has hecho en total?",
        },
        {
          id: 33,
          type: "E",
          q: "¿Cuándo fue tu última sesión?",
        },
      ]
    },
    {
      id: 4,
      type: "YNO",
      q: "¿Estás embarazada o amamantando?",
      subOpt: ["embarazada", "amamantando"],
    },
    {
      id: 5,  
      type: "YNE",
      q: "¿Eres hemofílico (sangrador) o estás tomando algún medicamento que pueda causar sangrado o dificultar la coagulación de la sangre?",
    },
    {
      id: 6,
      type: "YNE",
      q: "¿Tienes alguna condición médica o de la piel? Ejemplo: (queloides o cicatrización hipertrófica, psoriasis)",
    },
    {
      id: 7,
      type: "YNE",
      q: "¿Tienes alguna enfermedad contagiosa? Ejemplo: (H.I.V., S.I.D.A., HEPATITIS)",
    },
    {
      id: 8,
      type: "YNE",
      q: "¿Estás bajo la influencia de alcohol o drogas, recetadas o de otro tipo?",
    },
    {
      id: 9,
      type: "YNE",
      q: "¿Tienes alguna alergia? Ejemplo: (a metales, guantes de látex, jabones y medicamentos)",
    },
    {
      id: 10,
      type: "YN",
      q: "¿Tienes una condición cardíaca, epilepsia o diabetes?",
    },
    {
      id: 11,
      type: "YN",
      q: "¿Has usado Accutane en los últimos 6 meses?",
    },
    {
      id: 12,
      type: "YN",
      q: "¿Tienes algún implante médico?",
    },
    {
      id: 13,
      type: "YN",
      q: "¿Tienes asma?",
    },
    {
      id: 14,
      type: "YN",
      q: "¿Tienes un trastorno autoinmune?",
    },
    {
      id: 15,
      type: "YN",
      q: "¿Te desmayas o mareas con frecuencia?",
    },
    {
      id: 16,
      type: "YN",
      q: "¿Tienes problemas para curar heridas menores?",
    },
    {
      id: 17,
      type: "YN",
      q: "¿Has tomado algún suplemento herbal hoy?",
    },
    {
      id: 18,
      type: "YN",
      q: "¿Tienes hiperpigmentación (cicatrices oscuras) o hipopigmentación (cicatrices claras)?",
    },
    {
      id: 19,
      type: "YN",
      q: "¿Tienes un marcapasos?",
    },
    {
      id: 20,
      type: "YN",
      q: "¿Alguna vez has recibido tratamiento de radiación o quimioterapia?",
    },
    {
      id: 21,
      type: "YN",
      q: "¿Tienes una condición relacionada con convulsiones?",
    },
    {
      id: 22,
      type: "YN",
      q: "¿Tienes o has tenido cáncer de piel?",
    },
    {
      id: 23,
      type: "YN",
      q: "¿Eres fumador?",
    },
    {
      id: 24,
      type: "YN",
      q: "¿Usas camas de bronceado o cualquier otro producto de bronceado artificial?",
    },
    {
      id: 25,
      type: "YN",
      q: "¿Te quemas fácilmente con el sol?",
    },
    {
      id: 26,
      type: "YN",
      q: "¿Tienes vitíligo?",
    },   
  ],
};
module.exports={medicalQuestions,medicalQuestions_s}