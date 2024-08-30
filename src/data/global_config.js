import { FaYoutube, FaLinkedin, FaVideo } from "react-icons/fa";

import data_engineering_with_azure_databricks from "./data_engineering_on_microsoft_azure.json";
import sdet_npntraining from "./sdet_npntraining.json";
import corporate_training_01 from "./sunlifeglobalsolutions29082024.json";

export const timer = {
  status: true,
  duration: 15 * 60,
  threshold: 5 * 60,
};

export const coursesList = {
  256701: {
    homePage:
      "https://docs.google.com/document/d/1RGVi5VKP9mggcliQd3RSih8jgWWMitCQC-zj7YtHAG4/pub?embedded=true",
    reportPage: "https://example.com/report",
    plannerPage: "https://example.com/report",
    evaluationPage: "https://example.com/report",
    courseWelcomePage:
      "https://docs.google.com/document/d/1I_XlJDniw6Yq6jfGkPIe008DckBEe5mt1IvTB1mEbyQ/preview",
    askQuestionsPage:
      "https://docs.google.com/forms/d/e/1FAIpQLSdvAAHRaiHHJrdBv-xS053Ky2TZEEh2K-y4Su7RiQfMFTZM5w/viewform?usp=sf_link",
    data: data_engineering_with_azure_databricks,
    expiryDate: "12/30/2024",
    globalTitles: {
      header: {
        logo: "/Logo.jpg",
        title: "NPN Training",
        courseTitle: "Data Engineering on Microsoft Azure",
      },
      socialHandles: [
        {
          id: "youtube",
          url: "https://www.youtube.com/npntraining",
          icon: FaYoutube,
        },
        {
          id: "linkedIn",
          url: "https://www.linkedin.com/NPNTraining",
          icon: FaLinkedin,
        },
        {
          id: "googlemeet",
          url: "https://meet.google.com/uux-tpip-xqt",
          icon: FaVideo,
        },
      ],
      appointment: "https://topmate.io/naveenpn",
      footer: {
        copyRights: `@ ${new Date().getFullYear()} NPN Training PVT Ltd. All Rights Reserved`,
        maintainence: "Designed & Maintained By NPN Training",
      },
    },
  },

  sdet_npntraining: {
    homePage:
      "https://docs.google.com/document/d/1RGVi5VKP9mggcliQd3RSih8jgWWMitCQC-zj7YtHAG4/pub?embedded=true",
    reportPage: "https://example.com/report",
    plannerPage: "https://example.com/report",
    evaluationPage: "https://example.com/report",
    courseWelcomePage:
      "https://docs.google.com/document/d/1I_XlJDniw6Yq6jfGkPIe008DckBEe5mt1IvTB1mEbyQ/preview",
    askQuestionsPage: "",
    data: sdet_npntraining,
    expiryDate: "12/30/2024",
    globalTitles: {
      header: {
        logo: "/Logo.jpg",
        title: "NPN Training",
        courseTitle: "Data Engineering on Microsoft Azure",
      },
      socialHandles: [
        {
          id: "youtube",
          url: "https://www.youtube.com/npntraining",
          icon: FaYoutube,
        },
        {
          id: "linkedIn",
          url: "https://www.linkedin.com/NPNTraining",
          icon: FaLinkedin,
        },
        {
          id: "googlemeet",
          url: "https://meet.google.com/uux-tpip-xqt",
          icon: FaVideo,
        },
      ],
      appointment: "https://topmate.io/naveenpn",
      footer: {
        copyRights: `@ ${new Date().getFullYear()} NPN Training PVT Ltd. All Rights Reserved`,
        maintainence: "Designed & Maintained By NPN Training",
      },
    },
  },
  sunlifeglobalsolutions29082024: {
    homePage:
      "https://drive.google.com/file/d/10L71KPo8tsqQRTOe72v345auUN7dYgkJ/preview",
    reportPage: "https://example.com/report",
    plannerPage: "https://example.com/report",
    evaluationPage: "https://example.com/report",
    courseWelcomePage: "https://example.com/course",
    askQuestionsPage: "",
    data: corporate_training_01,
    globalTitles: {
      header: {
        logo: "/Logo.jpg",
        title: "Naveen Trainer",
        courseTitle: "Data Integration and ETL using AWS Glues",
      },
      socialHandles: [
        {
          id: "linkedIn",
          url: "https://www.linkedin.com/naveenpn",
          icon: FaLinkedin,
        },
      ],
      footer: {
        copyRights: `@ ${new Date().getFullYear()} Naveen Pn PVT Ltd. All Rights Reserved`,
        maintainence: "Designed & Maintained By Naveen Pn",
      },
    },
  },
};
