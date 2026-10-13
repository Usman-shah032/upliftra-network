"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Category =
| "Information Technology"
| "Software Engineering"
| "Networking"
| "Cybersecurity"
| "Cloud & DevOps"
| "AI & Data"
| "Business & Entrepreneurship"
| "Healthcare"
| "Design & Creativity"
| "Finance & Accounting"
| "Career Development"
| "Project Management"
| "IoT & Embedded Systems"
| "Blockchain & Emerging Tech";

type LegacyCategory =
| "Technology"
| "AI & Data"
| "Business & Economics"
| "Health & Medical"
| "Design & Creativity"
| "Career & Personal"
| "Finance & Accounting";

type Level = "Beginner" | "Intermediate" | "Advanced";

type Seed = {
id: number;
title: string;
category: LegacyCategory;
subjectArea: string;
level: Level;
description: string;
skills: string[];
tools: string[];
careers: string[];
};

type Course = Seed & {
modules: { title: string; description: string }[];
outcomes: string[];
};

const categories: Category[] = [
"Information Technology",
"Software Engineering",
"Networking",
"Cybersecurity",
"Cloud & DevOps",
"AI & Data",
"Business & Entrepreneurship",
"Healthcare",
"Design & Creativity",
"Finance & Accounting",
"Career Development",
"Project Management",
"IoT & Embedded Systems",
"Blockchain & Emerging Tech",
];

const seeds: Seed[] = [
{
id: 1,
title: "Full-Stack Web Development",
category: "Technology",
subjectArea: "Web Development & Software Engineering",
level: "Beginner",
description: "Learn how to build complete web applications, from responsive user interfaces to server-side logic, APIs, databases, authentication, testing, and deployment.",
skills: ["HTML, CSS & JavaScript", "Frontend and backend concepts", "REST APIs", "Database integration", "Authentication", "Deployment"],
tools: ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL", "Git"],
careers: ["Full-Stack Developer", "Junior Software Engineer", "Web Application Developer"],
},
{
id: 2,
title: "Mobile App Development",
category: "Technology",
subjectArea: "Mobile Application Development",
level: "Beginner",
description: "Build cross-platform mobile applications from the ground up, including programming fundamentals, responsive mobile UI, navigation, APIs, database integration, authentication, device features, testing, debugging, and release preparation.",
skills: [
"JavaScript and TypeScript fundamentals",
"React Native and Expo",
"Mobile UI and navigation",
"REST API integration",
"Database and local data storage",
"Authentication and session handling",
"Testing, debugging, and release builds",
],
tools: ["JavaScript", "TypeScript", "React Native", "Expo", "React Navigation", "REST APIs", "Firebase or Supabase", "Android Studio", "Git"],
careers: ["Mobile App Developer", "React Native Developer", "Junior Application Developer"],
},
{
id: 3,
title: "Artificial Intelligence & Machine Learning",
category: "AI & Data",
subjectArea: "Artificial Intelligence and Machine Learning",
level: "Intermediate",
description: "Understand AI and machine learning, datasets, model training, evaluation, and practical applications.",
skills: ["AI fundamentals", "Data preparation", "Model training", "Evaluation"],
tools: ["Python", "Jupyter Notebook", "Scikit-learn"],
careers: ["AI Engineer", "Machine Learning Associate"],
},
{
id: 4,
title: "Data Analytics & Business Intelligence",
category: "AI & Data",
subjectArea: "Data Analytics and Business Intelligence",
level: "Beginner",
description: "Learn to clean, analyse, and visualise data to support business decisions.",
skills: ["Data cleaning", "Data visualisation", "Reporting", "Business insights"],
tools: ["Excel", "Power BI", "SQL"],
careers: ["Data Analyst", "Business Intelligence Analyst"],
},
{
id: 5,
title: "Python Programming & Problem Solving",
category: "Technology",
subjectArea: "Python Programming",
level: "Beginner",
description: "Build programming foundations through Python syntax, functions, problem-solving, and practical exercises.",
skills: ["Python syntax", "Loops", "Functions", "Problem solving"],
tools: ["Python", "VS Code", "Jupyter Notebook"],
careers: ["Python Developer", "Junior Programmer"],
},
{
id: 6,
title: "Cybersecurity Fundamentals",
category: "Technology",
subjectArea: "Cybersecurity",
level: "Beginner",
description: "Explore security principles, common threats, access control, safe practices, and incident handling.",
skills: ["Security awareness", "Threat identification", "Access control", "Risk basics"],
tools: ["Linux", "Wireshark", "VirtualBox"],
careers: ["Security Analyst Trainee", "IT Security Associate"],
},
{
id: 7,
title: "Cloud Computing & DevOps Essentials",
category: "Technology",
subjectArea: "Cloud Computing and DevOps",
level: "Beginner",
description: "Understand cloud services, deployment workflows, automation, and development-operations collaboration.",
skills: ["Cloud concepts", "Deployment", "CI/CD basics", "Automation"],
tools: ["AWS", "Docker", "GitHub Actions"],
careers: ["Cloud Support Associate", "DevOps Trainee"],
},
{
id: 8,
title: "Computer Networking Fundamentals",
category: "Technology",
subjectArea: "Computer Networking",
level: "Beginner",
description: "Learn network devices, IP addressing, subnetting, network models, and connectivity troubleshooting.",
skills: ["TCP/IP", "Subnetting", "Routing", "Switching"],
tools: ["Cisco Packet Tracer", "Wireshark", "PuTTY"],
careers: ["Network Support Technician", "Junior Network Administrator"],
},
{
id: 9,
title: "UI/UX Design & Product Prototyping",
category: "Design & Creativity",
subjectArea: "User Experience and Interface Design",
level: "Beginner",
description: "Learn user research, wireframing, interface design, prototyping, and usability evaluation.",
skills: ["Wireframing", "User flows", "Prototyping", "Usability"],
tools: ["Figma", "FigJam", "Miro"],
careers: ["UI/UX Designer", "Product Design Associate"],
},
{
id: 10,
title: "Graphic Design & Visual Communication",
category: "Design & Creativity",
subjectArea: "Graphic Design and Visual Communication",
level: "Beginner",
description: "Explore typography, colour theory, visual hierarchy, layouts, and digital design assets.",
skills: ["Typography", "Layout design", "Colour theory", "Brand visuals"],
tools: ["Canva", "Adobe Illustrator", "Photoshop"],
careers: ["Graphic Designer", "Visual Content Designer"],
},
{
id: 11,
title: "Digital Marketing & Content Strategy",
category: "Business & Economics",
subjectArea: "Digital Marketing and Content Strategy",
level: "Beginner",
description: "Learn marketing channels, audience research, content planning, campaign measurement, and optimisation.",
skills: ["Content strategy", "SEO basics", "Campaign planning", "Analytics"],
tools: ["Google Analytics", "Canva", "Google Search Console"],
careers: ["Digital Marketing Associate", "Content Strategist"],
},
{
id: 12,
title: "Entrepreneurship & Business Model Validation",
category: "Business & Economics",
subjectArea: "Entrepreneurship and Business Model Development",
level: "Beginner",
description: "Learn to validate business ideas, understand customers, test assumptions, and develop a business model.",
skills: ["Customer discovery", "Market research", "Business models", "Validation"],
tools: ["Business Model Canvas", "Google Forms", "Miro"],
careers: ["Startup Founder", "Business Development Associate"],
},
{
id: 13,
title: "Economics & Financial Literacy",
category: "Business & Economics",
subjectArea: "Economics and Financial Literacy",
level: "Beginner",
description: "Understand economic principles, budgeting, saving, inflation, and everyday financial decisions.",
skills: ["Economic concepts", "Budgeting", "Saving", "Financial planning"],
tools: ["Excel", "Budget templates", "Financial calculators"],
careers: ["Business Associate", "Economics Research Assistant"],
},
{
id: 14,
title: "Accounting & Financial Reporting Basics",
category: "Finance & Accounting",
subjectArea: "Accounting and Financial Reporting",
level: "Beginner",
description: "Learn accounting principles, journal entries, ledgers, trial balances, and financial statements.",
skills: ["Bookkeeping", "Journal entries", "Reconciliation", "Financial statements"],
tools: ["Excel", "Accounting software", "Google Sheets"],
careers: ["Accounts Assistant", "Junior Accountant"],
},
{
id: 15,
title: "Health Informatics & Hospital Information Systems",
category: "Health & Medical",
subjectArea: "Health Informatics",
level: "Beginner",
description: "Explore how information systems support hospital operations, clinical workflows, and healthcare data management.",
skills: ["Health information systems", "Clinical workflows", "Data management", "Privacy awareness"],
tools: ["Electronic health record demos", "Excel", "Database concepts"],
careers: ["Health Informatics Assistant", "Hospital Systems Support"],
},
{
id: 16,
title: "Healthcare Data Analytics & Visualization",
category: "Health & Medical",
subjectArea: "Healthcare Data Analytics",
level: "Intermediate",
description: "Learn to analyse and visualise healthcare datasets to identify trends and improve services.",
skills: ["Data cleaning", "Healthcare indicators", "Visualisation", "Reporting"],
tools: ["Excel", "Power BI", "SQL"],
careers: ["Healthcare Data Analyst", "Reporting Analyst"],
},
{
id: 17,
title: "Digital Health & Telemedicine Operations",
category: "Health & Medical",
subjectArea: "Digital Health and Telemedicine",
level: "Beginner",
description: "Understand telemedicine workflows, digital health platforms, patient communication, and responsible data handling.",
skills: ["Telehealth workflows", "Digital health operations", "Communication", "Privacy"],
tools: ["Telehealth platforms", "Scheduling systems", "Digital forms"],
careers: ["Digital Health Coordinator", "Telemedicine Operations Assistant"],
},
{
id: 18,
title: "Project Management & Agile Collaboration",
category: "Career & Personal",
subjectArea: "Project Management and Agile Delivery",
level: "Beginner",
description: "Learn project planning, task estimation, Agile principles, team collaboration, and progress tracking.",
skills: ["Project planning", "Scrum basics", "Task management", "Team communication"],
tools: ["Jira", "Trello", "Notion"],
careers: ["Project Coordinator", "Scrum Team Associate"],
},
{
id: 19,
title: "Professional Communication & Workplace Skills",
category: "Career & Personal",
subjectArea: "Professional Communication and Workplace Skills",
level: "Beginner",
description: "Develop workplace communication, professional writing, collaboration, presentation, and feedback skills.",
skills: ["Professional writing", "Communication", "Presentation", "Teamwork"],
tools: ["Google Docs", "Microsoft Office", "Presentation tools"],
careers: ["Administrative Associate", "Client Support Associate"],
},
{
id: 20,
title: "Interview Preparation",
category: "Career & Personal",
subjectArea: "Career and Interview Preparation",
level: "Beginner",
description: "Prepare for interviews through CV review, common questions, communication practice, and mock interviews.",
skills: ["CV preparation", "Interview practice", "Self-presentation", "Research"],
tools: ["LinkedIn", "Google Docs", "Video meeting tools"],
careers: ["Job Seeker", "Graduate Trainee Applicant"],
},
{
id: 23,
title: "JavaScript & TypeScript Development",
category: "Technology",
subjectArea: "JavaScript and TypeScript Programming",
level: "Intermediate",
description: "Develop programming skills with JavaScript, TypeScript, asynchronous operations, and type-safe code.",
skills: ["JavaScript", "TypeScript", "Async programming", "Debugging"],
tools: ["VS Code", "Node.js", "Git"],
careers: ["JavaScript Developer", "Software Engineer"],
},
{
id: 25,
title: "Java Programming & Object-Oriented Design",
category: "Technology",
subjectArea: "Java Programming and Object-Oriented Design",
level: "Beginner",
description: "Learn Java syntax, object-oriented programming, collections, exception handling, and application structure.",
skills: ["Java", "OOP", "Collections", "Exception handling"],
tools: ["IntelliJ IDEA", "Eclipse", "JDK"],
careers: ["Java Developer", "Junior Software Engineer"],
},
{
id: 26,
title: "C# & .NET Application Development",
category: "Technology",
subjectArea: "C# and .NET Application Development",
level: "Intermediate",
description: "Explore C# programming, object-oriented design, .NET fundamentals, and application development.",
skills: ["C#", ".NET", "OOP", "Application design"],
tools: ["Visual Studio", ".NET SDK", "Git"],
careers: [".NET Developer", "Application Developer"],
},
{
id: 27,
title: "C and C++ Systems Programming",
category: "Technology",
subjectArea: "C and C++ Systems Programming",
level: "Intermediate",
description: "Study C and C++ fundamentals, memory concepts, data structures, and low-level programming.",
skills: ["C/C++", "Pointers", "Memory concepts", "Debugging"],
tools: ["GCC", "VS Code", "Visual Studio"],
careers: ["C++ Developer", "Systems Programming Associate"],
},
{
id: 28,
title: "SQL & Relational Database Design",
category: "Technology",
subjectArea: "SQL and Relational Database Design",
level: "Beginner",
description: "Learn relational database concepts, SQL queries, joins, constraints, normalisation, and schema design.",
skills: ["SQL", "Joins", "Normalisation", "Schema design"],
tools: ["PostgreSQL", "MySQL", "SQL Server"],
careers: ["SQL Developer", "Database Associate"],
},
{
id: 29,
title: "Database Administration & NoSQL Fundamentals",
category: "Technology",
subjectArea: "Database Administration and NoSQL",
level: "Intermediate",
description: "Understand database administration, backups, permissions, performance basics, and NoSQL data models.",
skills: ["Database administration", "Backups", "Permissions", "NoSQL"],
tools: ["PostgreSQL", "MongoDB", "MySQL"],
careers: ["Database Administrator Trainee", "Database Support Associate"],
},
{
id: 30,
title: "Software Engineering Principles & Design Patterns",
category: "Technology",
subjectArea: "Software Engineering and Design Patterns",
level: "Intermediate",
description: "Learn maintainable software design, clean code principles, design patterns, and collaborative engineering practices.",
skills: ["Clean code", "Design patterns", "Refactoring", "Code reviews"],
tools: ["Git", "UML tools", "VS Code"],
careers: ["Software Engineer", "Application Developer"],
},
{
id: 31,
title: "Software Architecture & System Design",
category: "Technology",
subjectArea: "Software Architecture and System Design",
level: "Advanced",
description: "Explore requirements, architecture styles, scalability, reliability, and software design trade-offs.",
skills: ["System design", "Architecture diagrams", "Scalability", "Reliability"],
tools: ["Draw.io", "UML tools", "Cloud architecture diagrams"],
careers: ["Software Architect Trainee", "System Design Engineer"],
},
{
id: 32,
title: "Software Testing & Quality Assurance",
category: "Technology",
subjectArea: "Software Testing and Quality Assurance",
level: "Beginner",
description: "Learn testing principles, test cases, defect reporting, test planning, and software quality practices.",
skills: ["Test cases", "Bug reporting", "Test planning", "Quality assurance"],
tools: ["Jira", "Postman", "Test management tools"],
careers: ["QA Tester", "Software Test Analyst"],
},
{
id: 33,
title: "Test Automation Engineering",
category: "Technology",
subjectArea: "Test Automation Engineering",
level: "Intermediate",
description: "Learn to automate repeatable software tests, organise test suites, and interpret test results.",
skills: ["Automation scripts", "Regression testing", "Test suites", "Reporting"],
tools: ["Playwright", "Selenium", "Git"],
careers: ["Test Automation Engineer", "QA Automation Associate"],
},
{
id: 34,
title: "API Testing & Automation",
category: "Technology",
subjectArea: "API Testing and Automation",
level: "Intermediate",
description: "Understand API requests, responses, status codes, authentication, assertions, and automated API testing.",
skills: ["HTTP", "REST APIs", "Assertions", "API test automation"],
tools: ["Postman", "Newman", "Swagger"],
careers: ["API Tester", "QA Engineer"],
},
{
id: 35,
title: "Git, GitHub & Collaborative Development",
category: "Technology",
subjectArea: "Version Control and Collaborative Development",
level: "Beginner",
description: "Learn version control, commits, branches, merges, pull requests, and team collaboration workflows.",
skills: ["Git commands", "Branching", "Pull requests", "Conflict resolution"],
tools: ["Git", "GitHub", "VS Code"],
careers: ["Junior Developer", "Software Team Contributor"],
},
{
id: 36,
title: "Linux & Command-Line Administration",
category: "Technology",
subjectArea: "Linux and Command-Line Administration",
level: "Beginner",
description: "Practise Linux commands, file permissions, processes, package management, and system administration.",
skills: ["Linux commands", "Permissions", "Processes", "Shell basics"],
tools: ["Ubuntu", "Bash", "VirtualBox"],
careers: ["Linux Support Associate", "System Administrator Trainee"],
},
{
id: 37,
title: "IT Support & Technical Troubleshooting",
category: "Technology",
subjectArea: "IT Support and Technical Troubleshooting",
level: "Beginner",
description: "Learn a structured approach to diagnosing hardware, software, connectivity, and user issues.",
skills: ["Troubleshooting", "Operating systems", "Hardware basics", "Documentation"],
tools: ["Windows tools", "Device Manager", "Remote support tools"],
careers: ["IT Support Technician", "Help Desk Analyst"],
},
{
id: 38,
title: "Network Administration & Troubleshooting",
category: "Technology",
subjectArea: "Network Administration and Troubleshooting",
level: "Intermediate",
description: "Practise network configuration, connectivity diagnosis, routing, switching, and network documentation.",
skills: ["Network configuration", "Troubleshooting", "Routing", "Switching"],
tools: ["Cisco Packet Tracer", "Wireshark", "PuTTY"],
careers: ["Network Administrator", "Network Support Engineer"],
},
{
id: 39,
title: "Cloud Architecture with AWS, Azure & GCP",
category: "Technology",
subjectArea: "Multi-Cloud Architecture",
level: "Intermediate",
description: "Learn architecture concepts for compute, storage, networking, availability, and major cloud platforms.",
skills: ["Cloud architecture", "Storage", "Networking", "High availability"],
tools: ["AWS", "Microsoft Azure", "Google Cloud"],
careers: ["Cloud Engineer", "Cloud Solutions Associate"],
},
{
id: 40,
title: "Docker & Kubernetes Essentials",
category: "Technology",
subjectArea: "Containerization and Orchestration",
level: "Intermediate",
description: "Understand containers, Docker images, Kubernetes resources, deployments, services, and troubleshooting.",
skills: ["Containers", "Docker images", "Kubernetes", "Deployments"],
tools: ["Docker", "Kubernetes", "Minikube"],
careers: ["DevOps Engineer Trainee", "Platform Support Associate"],
},
{
id: 41,
title: "CI/CD Pipelines & GitHub Actions",
category: "Technology",
subjectArea: "Continuous Integration and Delivery",
level: "Intermediate",
description: "Build automated workflows for code validation, testing, and deployment using CI/CD principles.",
skills: ["CI/CD", "Workflow configuration", "Automated testing", "Deployment"],
tools: ["GitHub Actions", "Git", "Docker"],
careers: ["DevOps Associate", "Build and Release Engineer"],
},
{
id: 42,
title: "Infrastructure as Code with Terraform",
category: "Technology",
subjectArea: "Infrastructure as Code and Automation",
level: "Intermediate",
description: "Learn infrastructure configuration, reusable modules, state management, and infrastructure planning.",
skills: ["Infrastructure as Code", "Terraform modules", "State management", "Cloud provisioning"],
tools: ["Terraform", "AWS", "Git"],
careers: ["Infrastructure Engineer", "Cloud Automation Associate"],
},
{
id: 43,
title: "Web Application Security",
category: "Technology",
subjectArea: "Web Application Security",
level: "Intermediate",
description: "Study common web vulnerabilities, secure coding, authentication risks, and defensive testing in authorised environments.",
skills: ["Secure coding", "OWASP concepts", "Authentication security", "Risk assessment"],
tools: ["OWASP ZAP", "Burp Suite Community", "Local test labs"],
careers: ["Application Security Trainee", "Security Analyst"],
},
{
id: 44,
title: "SOC Analyst & Incident Response",
category: "Technology",
subjectArea: "Security Operations and Incident Response",
level: "Intermediate",
description: "Learn security monitoring, alert triage, incident documentation, log analysis, and response fundamentals.",
skills: ["Alert triage", "Log analysis", "Incident handling", "Threat monitoring"],
tools: ["SIEM labs", "Wireshark", "Linux"],
careers: ["SOC Analyst Trainee", "Incident Response Associate"],
},
{
id: 45,
title: "Ethical Hacking in Authorized Labs",
category: "Technology",
subjectArea: "Ethical Hacking and Vulnerability Assessment",
level: "Intermediate",
description: "Practise reconnaissance, vulnerability assessment, and reporting in authorised security labs.",
skills: ["Reconnaissance", "Vulnerability assessment", "Lab testing", "Security reporting"],
tools: ["Kali Linux", "OWASP Juice Shop", "VirtualBox"],
careers: ["Penetration Testing Trainee", "Security Testing Associate"],
},
{
id: 46,
title: "Data Engineering & ETL Pipelines",
category: "AI & Data",
subjectArea: "Data Engineering and ETL Pipelines",
level: "Intermediate",
description: "Learn how data moves through extraction, transformation, validation, and loading pipelines.",
skills: ["ETL", "Data modelling", "Pipeline design", "Data quality"],
tools: ["Python", "SQL", "Apache Airflow"],
careers: ["Data Engineer", "ETL Developer"],
},
{
id: 47,
title: "Big Data Engineering with Spark & Kafka",
category: "AI & Data",
subjectArea: "Big Data Engineering and Stream Processing",
level: "Advanced",
description: "Explore distributed data processing, streaming pipelines, and large-scale data systems.",
skills: ["Distributed processing", "Streaming", "Data pipelines", "Event handling"],
tools: ["Apache Spark", "Apache Kafka", "Python"],
careers: ["Big Data Engineer", "Streaming Data Engineer"],
},
{
id: 48,
title: "Machine Learning Engineering & MLOps",
category: "AI & Data",
subjectArea: "Machine Learning Engineering and MLOps",
level: "Advanced",
description: "Learn model packaging, experiment tracking, deployment, monitoring, and repeatable ML workflows.",
skills: ["Model deployment", "Experiment tracking", "Monitoring", "ML pipelines"],
tools: ["Python", "MLflow", "Docker"],
careers: ["ML Engineer", "MLOps Associate"],
},
{
id: 49,
title: "Deep Learning & Neural Networks",
category: "AI & Data",
subjectArea: "Deep Learning and Neural Networks",
level: "Advanced",
description: "Understand neural network architectures, training workflows, optimisation, and model evaluation.",
skills: ["Neural networks", "Backpropagation", "Model evaluation", "Training"],
tools: ["Python", "PyTorch", "TensorFlow"],
careers: ["Deep Learning Engineer", "AI Research Assistant"],
},
{
id: 50,
title: "Natural Language Processing & LLM Applications",
category: "AI & Data",
subjectArea: "Natural Language Processing and LLM Applications",
level: "Advanced",
description: "Explore text processing, embeddings, language models, retrieval-based applications, and evaluation.",
skills: ["Text processing", "Embeddings", "LLM integration", "Evaluation"],
tools: ["Python", "Hugging Face", "LLM APIs"],
careers: ["NLP Engineer", "LLM Application Developer"],
},
{
id: 51,
title: "Generative AI & Prompt Engineering",
category: "AI & Data",
subjectArea: "Generative Artificial Intelligence",
level: "Beginner",
description: "Learn generative AI concepts, effective prompting, output evaluation, and responsible AI use.",
skills: ["Prompt design", "Output evaluation", "AI workflows", "Responsible AI"],
tools: ["LLM tools", "Prompt testing templates", "Python"],
careers: ["AI Workflow Associate", "Generative AI Practitioner"],
},
{
id: 52,
title: "Building AI Agents & AI Automation",
category: "AI & Data",
subjectArea: "AI Agents and Workflow Automation",
level: "Intermediate",
description: "Understand AI agents, tool calling, workflow orchestration, context handling, and practical automation.",
skills: ["Agent workflows", "Tool calling", "Automation", "Evaluation"],
tools: ["Python", "LLM APIs", "Workflow automation tools"],
careers: ["AI Automation Developer", "AI Solutions Associate"],
},
{
id: 53,
title: "Robotic Process Automation & Workflow Automation",
category: "Technology",
subjectArea: "Robotic Process and Workflow Automation",
level: "Intermediate",
description: "Learn to map repetitive tasks and automate structured workflows with validation and error handling.",
skills: ["Process mapping", "Workflow design", "Automation logic", "Exception handling"],
tools: ["Power Automate", "UiPath", "Excel"],
careers: ["RPA Developer Trainee", "Automation Analyst"],
},
{
id: 54,
title: "Computer Vision & Image Processing",
category: "AI & Data",
subjectArea: "Computer Vision and Image Processing",
level: "Advanced",
description: "Explore image preprocessing, feature extraction, classification, and computer vision evaluation.",
skills: ["Image processing", "Classification", "Feature extraction", "Evaluation"],
tools: ["Python", "OpenCV", "PyTorch"],
careers: ["Computer Vision Engineer", "AI Research Associate"],
},
{
id: 55,
title: "Blockchain & Smart Contract Fundamentals",
category: "Technology",
subjectArea: "Blockchain and Smart Contract Development",
level: "Intermediate",
description: "Understand distributed ledgers, blockchain transactions, smart contract logic, and development safety.",
skills: ["Blockchain concepts", "Smart contracts", "Testing", "Security awareness"],
tools: ["Solidity", "Remix IDE", "Local blockchain test tools"],
careers: ["Blockchain Developer Trainee", "Smart Contract Tester"],
},
{
id: 56,
title: "Cloud Security & Identity Management",
category: "Technology",
subjectArea: "Cloud Security and Identity Management",
level: "Intermediate",
description: "Learn identity and access management, least privilege, cloud security controls, and monitoring.",
skills: ["IAM", "Access policies", "Cloud security", "Monitoring"],
tools: ["AWS IAM", "Microsoft Entra ID", "Cloud security labs"],
careers: ["Cloud Security Associate", "IAM Analyst"],
},
{
id: 57,
title: "DevSecOps & Secure Software Delivery",
category: "Technology",
subjectArea: "DevSecOps and Secure Software Delivery",
level: "Advanced",
description: "Explore security checks, dependency scanning, secrets management, and secure delivery pipelines.",
skills: ["Secure CI/CD", "Dependency scanning", "Secrets management", "Security automation"],
tools: ["GitHub Actions", "Docker", "SAST tools"],
careers: ["DevSecOps Engineer Trainee", "Application Security Associate"],
},
{
id: 58,
title: "Algorithms & Data Structures",
category: "Technology",
subjectArea: "Algorithms and Data Structures",
level: "Intermediate",
description: "Strengthen problem-solving with data structures, algorithm design, complexity analysis, and coding practice.",
skills: ["Arrays", "Trees", "Sorting", "Complexity analysis"],
tools: ["Python", "Java", "Online coding platforms"],
careers: ["Software Engineer", "Programming Interview Candidate"],
},
{
id: 59,
title: "Financial Analyst with Power BI",
category: "Finance & Accounting",
subjectArea: "Financial Analytics and Business Intelligence",
level: "Intermediate",
description: "Transform financial data into dashboards, reports, performance indicators, and business insights.",
skills: ["Financial analysis", "Dashboard design", "DAX basics", "Reporting"],
tools: ["Power BI", "Excel", "SQL"],
careers: ["Financial Analyst", "Business Reporting Analyst"],
},
{
id: 60,
title: "Financial Modeling & Business Valuation",
category: "Finance & Accounting",
subjectArea: "Financial Modeling and Business Valuation",
level: "Advanced",
description: "Explore financial projections, assumptions, cash flow modelling, valuation methods, and scenario analysis.",
skills: ["Financial projections", "Cash flow models", "Valuation", "Scenario analysis"],
tools: ["Excel", "Google Sheets", "Financial model templates"],
careers: ["Financial Modeling Analyst", "Corporate Finance Associate"],
},
{
id: 61,
title: "Fraud Detection & Financial Crime Analytics",
category: "Finance & Accounting",
subjectArea: "Fraud Detection and Financial Crime Analytics",
level: "Intermediate",
description: "Use transaction patterns, anomaly detection, and risk indicators to support fraud investigation.",
skills: ["Transaction analysis", "Anomaly detection", "Risk indicators", "Case documentation"],
tools: ["Excel", "SQL", "Power BI"],
careers: ["Fraud Analyst", "Financial Crime Analyst"],
},
{
id: 62,
title: "Forensic Accounting & Fraud Investigation",
category: "Finance & Accounting",
subjectArea: "Forensic Accounting and Fraud Investigation",
level: "Intermediate",
description: "Understand forensic accounting, evidence documentation, financial discrepancies, and investigation workflows.",
skills: ["Financial investigation", "Evidence handling", "Reconciliation", "Reporting"],
tools: ["Excel", "Accounting software", "Document analysis tools"],
careers: ["Forensic Accounting Associate", "Fraud Investigation Assistant"],
},
{
id: 69,
title: "AML/CFT & Transaction Monitoring",
category: "Finance & Accounting",
subjectArea: "Anti-Money Laundering and Transaction Monitoring",
level: "Intermediate",
description: "Understand anti-money laundering concepts, transaction monitoring, red flags, and case escalation.",
skills: ["Transaction monitoring", "Risk indicators", "Case review", "Compliance documentation"],
tools: ["Excel", "SQL", "Monitoring system demos"],
careers: ["AML Analyst", "Transaction Monitoring Associate"],
},
{
id: 70,
title: "Internal Audit, Risk & Financial Controls",
category: "Finance & Accounting",
subjectArea: "Internal Audit, Risk and Financial Controls",
level: "Intermediate",
description: "Learn internal controls, risk assessment, audit evidence, process reviews, and audit reporting.",
skills: ["Risk assessment", "Internal controls", "Audit documentation", "Process review"],
tools: ["Excel", "Audit templates", "Risk registers"],
careers: ["Internal Audit Associate", "Risk Analyst"],
},
{
id: 71,
title: "Excel for Finance & Accounting",
category: "Finance & Accounting",
subjectArea: "Spreadsheet Analysis for Finance and Accounting",
level: "Beginner",
description: "Practise spreadsheet formulas, financial calculations, data cleaning, reconciliation, and reporting.",
skills: ["Excel formulas", "Pivot tables", "Reconciliation", "Financial reporting"],
tools: ["Microsoft Excel", "Google Sheets"],
careers: ["Accounts Assistant", "Finance Reporting Associate"],
},
{
id: 72,
title: "Financial Data Analysis with SQL & Python",
category: "Finance & Accounting",
subjectArea: "Financial Data Analytics",
level: "Intermediate",
description: "Use SQL and Python to analyse financial datasets, identify trends, and prepare reproducible reports.",
skills: ["SQL queries", "Python analysis", "Data cleaning", "Visualisation"],
tools: ["Python", "Pandas", "SQL", "Jupyter Notebook"],
careers: ["Financial Data Analyst", "Analytics Associate"],
},
{
id: 73,
title: "ERP & Accounting Information Systems",
category: "Finance & Accounting",
subjectArea: "ERP and Accounting Information Systems",
level: "Intermediate",
description: "Understand how ERP and accounting systems connect financial records, business processes, and reporting.",
skills: ["ERP concepts", "Business workflows", "Data records", "Financial reporting"],
tools: ["ERP demos", "Excel", "Accounting information systems"],
careers: ["ERP Support Associate", "Accounting Systems Analyst"],
},
{
id: 74,
title: "Business Analysis & Requirements Engineering",
category: "Business & Economics",
subjectArea: "Business Analysis and Requirements Engineering",
level: "Intermediate",
description: "Learn stakeholder analysis, requirements gathering, process mapping, user stories, and acceptance criteria.",
skills: ["Requirements gathering", "User stories", "Process mapping", "Stakeholder communication"],
tools: ["Jira", "Draw.io", "Confluence"],
careers: ["Business Analyst", "Requirements Analyst"],
},
{
id: 75,
title: "Microservices & Distributed API Systems",
category: "Technology",
subjectArea: "Microservices and Distributed Systems",
level: "Advanced",
description: "Explore service boundaries, API communication, resilience, observability, and distributed application design.",
skills: ["Microservices", "API design", "Resilience", "Observability"],
tools: ["Docker", "Postman", "OpenAPI"],
careers: ["Backend Systems Engineer", "Distributed Systems Developer"],
},
{
id: 76,
title: "IT Service Management & ITIL Foundations",
category: "Technology",
subjectArea: "IT Service Management",
level: "Beginner",
description: "Understand service management, incident handling, change management, service requests, and continual improvement.",
skills: ["Incident management", "Service requests", "Change management", "Documentation"],
tools: ["Service desk systems", "Ticketing tools", "Knowledge bases"],
careers: ["IT Service Desk Analyst", "IT Operations Associate"],
},
{
id: 77,
title: "Game Development Fundamentals",
category: "Technology",
subjectArea: "Game Development",
level: "Beginner",
description: "Learn game loops, scenes, player controls, collisions, basic physics, and interactive gameplay.",
skills: ["Game logic", "Scene design", "Player controls", "Debugging"],
tools: ["Unity", "Godot", "C#"],
careers: ["Junior Game Developer", "Game Design Assistant"],
},
{
id: 78,
title: "IoT & Embedded Systems Fundamentals",
category: "Technology",
subjectArea: "Internet of Things and Embedded Systems",
level: "Beginner",
description: "Explore sensors, microcontrollers, embedded programming, device connectivity, and IoT system design.",
skills: ["Sensors", "Microcontrollers", "Embedded programming", "Connectivity"],
tools: ["Arduino", "ESP32", "C/C++"],
careers: ["IoT Developer Trainee", "Embedded Systems Associate"],
},
];

function buildCourse(seed: Seed): Course {
const mobileModules = [
{
title: "Mobile Development Foundations",
description: "Understand native vs cross-platform development, Android and iOS app structure, client-server architecture, development environment setup, Git, and the app development lifecycle. Set up Node.js, VS Code, Expo, and an Android emulator or physical test device.",
},
{
title: "JavaScript and TypeScript for Apps",
description: "Learn variables, data types, operators, conditions, loops, functions, arrays, objects, modules, promises, async/await, error handling, and JSON. Add TypeScript types and interfaces to make application data and component props safer.",
},
{
title: "React and React Native Fundamentals",
description: "Build reusable components using JSX, props, state, hooks, and event handling. Learn View, Text, Image, TextInput, Pressable, ScrollView, FlatList, styling, Flexbox layouts, reusable UI components, and responsive screens.",
},
{
title: "Screens, Navigation, and Forms",
description: "Create multiple screens with React Navigation, stack and tab navigation, route parameters, reusable form controls, input validation, keyboard handling, loading states, empty states, and user-friendly error messages.",
},
{
title: "APIs and Backend Integration",
description: "Connect the app to REST APIs with fetch or Axios. Learn HTTP methods, status codes, JSON requests and responses, environment configuration, async loading, pagination basics, error handling, and safe handling of API credentials. Practise with a test API before connecting a real backend.",
},
{
title: "Database and Data Persistence",
description: "Model the app's data and understand tables/collections, records, relationships, identifiers, and CRUD operations. Use AsyncStorage for appropriate local preferences and simple persisted state; connect a backend database such as Supabase/PostgreSQL or Firebase when the project needs shared user data. Learn validation, access rules, backups, and why secrets must not be embedded in the app.",
},
{
title: "Authentication and User Accounts",
description: "Implement sign-up, sign-in, sign-out, session persistence, protected screens, password reset flow, form validation, and authenticated API requests using a suitable backend authentication service. Understand authorization, least privilege, secure token handling, and privacy-conscious storage.",
},
{
title: "Device Features and App Quality",
description: "Work with permissions and appropriate device capabilities such as camera, image selection, location, notifications, or file access using supported Expo modules. Handle permission denial, offline or slow connections, accessibility, performance, and different screen sizes.",
},
{
title: "Testing, Debugging, and Security",
description: "Use emulator and physical-device testing, React Native/Expo debugging tools, logs, and reproducible bug reports. Test navigation, forms, API failures, authentication, persistence, permissions, and edge cases. Add suitable unit/component tests, review dependencies, validate inputs, and check that private data and credentials are not exposed.",
},
{
title: "Final Project, Build, and Release",
description: "Plan and build a complete app with multiple screens, validated forms, navigation, API integration, persistent data, and authentication where appropriate. Use Git branches and commits, test the release configuration, create an Android development/release build with Expo EAS or the appropriate Android tooling, document installation and known limitations, and prepare store assets and release notes. iOS release signing and App Store submission require the relevant Apple developer account and Apple tooling.",
},
];

const modules = seed.id === 2 ? mobileModules : [
{
title: `1. Foundations of ${seed.title}`,
description: `Start with the core concepts, terminology, workflows, and real-world use cases of ${seed.subjectArea}. Establish the prerequisites needed to work confidently with this subject.`,
},
{
title: `2. Core Skills: ${seed.skills.slice(0, 2).join(" and ")}`,
description: `Learn and practise ${seed.skills.slice(0, 2).join(" and ")}. Work through guided examples, explain the decisions behind each step, and identify common mistakes and how to correct them.`,
},
{
title: "3. Applied Tools and Techniques",
description: `Use ${seed.tools.join(", ")} where appropriate to practise ${seed.skills.slice(2, 4).join(" and ") || seed.skills[0]}. Complete hands-on exercises, interpret results, troubleshoot issues, and follow a repeatable professional workflow.`,
},
{
title: "4. Practical Project and Professional Readiness",
description: `Apply ${seed.title} skills in a small subject-specific task. Validate the result, document your process, review quality and limitations, and connect the work to roles such as ${seed.careers.slice(0, 2).join(" and ")}.`,
},
];

return {
...seed,
modules,
outcomes: seed.id === 2
? [
"Set up a React Native and Expo project and explain the cross-platform app development workflow.",
"Build reusable screens, forms, navigation, and responsive mobile layouts with JavaScript/TypeScript.",
"Connect a mobile app to REST APIs and persist suitable data using local storage and a backend database.",
"Implement an appropriate authentication flow, permissions, validation, and error handling.",
"Test and debug the app on an emulator or device, create a release build, and document deployment requirements.",
]
: [
`Explain the foundations and real-world workflow of ${seed.subjectArea}.`,
`Practise ${seed.skills.slice(0, 2).join(" and ")} using guided examples.`,
`Apply ${seed.skills.slice(2, 4).join(" and ") || seed.skills[0]} with relevant tools such as ${seed.tools.slice(0, 3).join(", ")}.`,
`Complete and document a practical task relevant to ${seed.title}, and identify suitable next steps for ${seed.careers[0]}.`,
],
};
}

const courses: Course[] = seeds.map(buildCourse);

const categoryStyles: Record<Category, string> = {
"Information Technology": "bg-blue-50 text-blue-700",
"Software Engineering": "bg-indigo-50 text-indigo-700",
Networking: "bg-cyan-50 text-cyan-800",
Cybersecurity: "bg-rose-50 text-rose-700",
"Cloud & DevOps": "bg-sky-50 text-sky-700",
"AI & Data": "bg-violet-50 text-violet-700",
"Business & Entrepreneurship": "bg-amber-50 text-amber-800",
Healthcare: "bg-pink-50 text-pink-700",
"Design & Creativity": "bg-fuchsia-50 text-fuchsia-700",
"Finance & Accounting": "bg-teal-50 text-teal-800",
"Career Development": "bg-purple-50 text-purple-700",
"Project Management": "bg-orange-50 text-orange-800",
"IoT & Embedded Systems": "bg-lime-50 text-lime-800",
"Blockchain & Emerging Tech": "bg-slate-100 text-slate-700",
};

function getCourseCategory(course: Seed): Category {
const text =
`${course.title} ${course.subjectArea} ${course.description} ${course.skills.join(" ")} ${course.tools.join(" ")}`.toLowerCase();

if (/networking|computer networks?|network administration|routing and switching|cisco/.test(text)) {
return "Networking";
}
if (/cyber ?security|ethical hacking|penetration test|soc analyst|incident response|application security|cloud security|information security|digital forensics/.test(text)) {
return "Cybersecurity";
}
if (/cloud computing|cloud engineer|cloud architecture|aws|azure|google cloud|devops|docker|kubernetes|terraform|ci\/cd|continuous integration|infrastructure as code|site reliability/.test(text)) {
return "Cloud & DevOps";
}
if (/finance|financial|accounting|fraud detection|financial crime|aml\/cft|transaction monitoring|internal audit|financial controls|spreadsheet analysis|enterprise resource planning/.test(text)) {
return "Finance & Accounting";
}
if (/artificial intelligence|machine learning|\bai\b|data analytics|data engineering|big data|deep learning|natural language processing|generative ai|\bllm\b|computer vision|data science|business intelligence/.test(text)) {
return "AI & Data";
}
if (/health|medical|hospital|healthcare|telemedicine|digital health|clinical/.test(text)) {
return "Healthcare";
}
if (/ui\/ux|graphic design|visual communication|user experience design|user interface design|figma|prototyping/.test(text)) {
return "Design & Creativity";
}
if (/project management|agile|scrum|kanban|product management/.test(text)) {
return "Project Management";
}
if (/career development|interview preparation|professional communication|workplace skills|resume|cv writing|personal branding|leadership skills/.test(text)) {
return "Career Development";
}
if (/entrepreneurship|business model|digital marketing|content strategy|economics|business analysis|sales strategy|customer relationship|crm|startup|e-commerce|ecommerce/.test(text)) {
return "Business & Entrepreneurship";
}
if (/internet of things|\biot\b|embedded systems|microcontroller|arduino|raspberry pi|robotics/.test(text)) {
return "IoT & Embedded Systems";
}
if (/blockchain|smart contract|web3|cryptocurrency|distributed ledger/.test(text)) {
return "Blockchain & Emerging Tech";
}
if (/web development|software engineering|programming|javascript|typescript|java programming|\.net|systems programming|database|\bsql\b|software architecture|software testing|quality assurance|test automation|api testing|git|github|algorithms|data structures|microservices|distributed api|game development|mobile app development|app development|python|c\\+\\+|c#|php|html|css|react|node\.js/.test(text)) {
return "Software Engineering";
}
return "Information Technology";
}

const levelStyles: Record<Level, string> = {
Beginner: "bg-emerald-50 text-emerald-700",
Intermediate: "bg-amber-50 text-amber-800",
Advanced: "bg-red-50 text-red-700",
};

export default function LearningPage() {
const resultsRef = useRef<HTMLDivElement | null>(null);
const [search, setSearch] = useState("");
const [appliedSearch, setAppliedSearch] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");
const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

const filteredCourses = useMemo(() => {
const query = appliedSearch.trim().toLowerCase();

return courses.filter((course) => {
const matchesSearch =
!query ||
course.title.toLowerCase().includes(query) ||
course.description.toLowerCase().includes(query) ||
course.subjectArea.toLowerCase().includes(query) ||
course.skills.some((skill) => skill.toLowerCase().includes(query)) ||
course.tools.some((tool) => tool.toLowerCase().includes(query)) ||
course.careers.some((career) => career.toLowerCase().includes(query));

const matchesCategory =
selectedCategory === "All" ||
getCourseCategory(course) === selectedCategory;

return matchesSearch && matchesCategory;
});
}, [appliedSearch, selectedCategory]);

useEffect(() => {
if (appliedSearch.trim() || selectedCategory !== "All") {
requestAnimationFrame(() => {
resultsRef.current?.scrollIntoView({
behavior: "smooth",
block: "start",
});
});
}
}, [appliedSearch, selectedCategory, filteredCourses.length]);

const resetFilters = () => {
setSearch("");
setAppliedSearch("");
setSelectedCategory("All");
};

if (selectedCourse) {
return (
<main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
<div className="mx-auto max-w-5xl">
<button
type="button"
onClick={() => setSelectedCourse(null)}
className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
>
<span aria-hidden="true">←</span> Back to courses
</button>

<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
<div className="bg-gradient-to-r from-blue-950 via-blue-800 to-blue-600 px-6 py-10 text-white sm:px-10">
<span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
{getCourseCategory(selectedCourse)}
</span>

<h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
{selectedCourse.title}
</h1>

<p className="mt-4 max-w-3xl leading-7 text-blue-50">
{selectedCourse.description}
</p>

<div className="mt-5 flex flex-wrap gap-2">
<span
className={`rounded-full px-3 py-1 text-xs font-semibold ${levelStyles[selectedCourse.level]}`}
>
{selectedCourse.level}
</span>

<span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
Subject area: {selectedCourse.subjectArea}
</span>
</div>
</div>

<div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.5fr_1fr]">
<div>
<h2 className="text-xl font-bold text-slate-900">
Course overview
</h2>

<p className="mt-3 leading-7 text-slate-600">
{selectedCourse.description}
</p>

<h2 className="mt-8 text-xl font-bold text-slate-900">
Learning modules
</h2>

<div className="mt-4 space-y-3">
{selectedCourse.modules.map((module, index) => (
<article
key={module.title}
className="rounded-xl border border-slate-200 p-4"
>
<div className="flex items-start gap-3">
<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-700">
{index + 1}
</span>

<div>
<h3 className="font-semibold text-slate-900">
{module.title}
</h3>

<p className="mt-1 text-sm leading-6 text-slate-600">
{module.description}
</p>
</div>
</div>
</article>
))}
</div>

<h2 className="mt-8 text-xl font-bold text-slate-900">
Learning outcomes
</h2>

<ul className="mt-3 space-y-3">
{selectedCourse.outcomes.map((outcome) => (
<li
key={outcome}
className="flex items-start gap-3 text-sm leading-6 text-slate-600"
>
<span className="mt-0.5 text-emerald-600">✓</span>
<span>{outcome}</span>
</li>
))}
</ul>
</div>

<aside className="h-fit rounded-xl border border-slate-200 bg-slate-50 p-5">
<h2 className="text-lg font-bold text-slate-900">
Course details
</h2>

<div className="mt-5 space-y-5">
<div>
<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
Course level
</p>

<p className="mt-1 font-semibold text-slate-800">
{selectedCourse.level}
</p>
</div>

<div>
<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
Subject area
</p>

<p className="mt-1 font-semibold text-slate-800">
{selectedCourse.subjectArea}
</p>
</div>

<div>
<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
Skills covered
</p>

<div className="mt-2 flex flex-wrap gap-2">
{selectedCourse.skills.map((skill) => (
<span
key={skill}
className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700"
>
{skill}
</span>
))}
</div>
</div>

<div>
<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
Tools & technologies
</p>

<div className="mt-2 flex flex-wrap gap-2">
{selectedCourse.tools.map((tool) => (
<span
key={tool}
className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
>
{tool}
</span>
))}
</div>
</div>

<div>
<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
Related career paths
</p>

<ul className="mt-2 space-y-2">
{selectedCourse.careers.map((career) => (
<li key={career} className="text-sm text-slate-700">
• {career}
</li>
))}
</ul>
</div>
</div>

<button
type="button"
onClick={() => {
setSelectedCourse(null);
window.scrollTo({ top: 0, behavior: "smooth" });
}}
className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800 transition hover:border-blue-700 hover:bg-blue-700 hover:text-white"
>
<span>Explore more courses</span>
<span aria-hidden="true">→</span>
</button>
</aside>
</div>
</section>
</div>
</main>
);
}

return (
<main className="min-h-screen bg-slate-50">
<section className="bg-gradient-to-r from-blue-950 via-blue-800 to-blue-600 px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-10">
<div className="mx-auto max-w-7xl">
<p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
Upliftra Network
</p>

<h1 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
Explore Learning Opportunities
</h1>

<p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
Discover courses, develop practical skills, and explore learning
paths for your academic and professional growth.
</p>
</div>
</section>

<section className="px-4 py-8 sm:px-6 lg:px-10">
<div className="mx-auto max-w-7xl">
<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
<form
onSubmit={(event) => {
event.preventDefault();
setAppliedSearch(search.trim());
}}
className="flex flex-col gap-4 lg:flex-row lg:items-end"
>
<div className="relative min-w-0 flex-1">
<label
htmlFor="course-search"
className="mb-2 block text-sm font-semibold text-slate-700"
>
Search learning opportunities
</label>

<div className="flex flex-col gap-2 sm:flex-row">
<div className="relative min-w-0 flex-1">
<span
className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
aria-hidden="true"
>
<svg
viewBox="0 0 24 24"
fill="none"
className="h-5 w-5"
stroke="currentColor"
strokeWidth="2"
strokeLinecap="round"
strokeLinejoin="round"
>
<circle cx="11" cy="11" r="7" />
<path d="m20 20-4-4" />
</svg>
</span>

<input
id="course-search"
type="search"
value={search}
onChange={(event) => setSearch(event.target.value)}
placeholder="Search courses, skills, tools..."
className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
/>
</div>

<button
type="submit"
className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
>
<svg
viewBox="0 0 24 24"
fill="none"
className="h-4 w-4"
stroke="currentColor"
strokeWidth="2"
strokeLinecap="round"
strokeLinejoin="round"
aria-hidden="true"
>
<circle cx="11" cy="11" r="7" />
<path d="m20 20-4-4" />
</svg>
Search
</button>
</div>
</div>

<div className="w-full lg:w-72">
<label
htmlFor="course-category"
className="mb-2 block text-sm font-semibold text-slate-700"
>
Category
</label>

<select
id="course-category"
value={selectedCategory}
onChange={(event) => setSelectedCategory(event.target.value)}
className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
>
<option value="All">All categories</option>
{categories.map((category) => (
<option key={category} value={category}>
{category}
</option>
))}
</select>
</div>
</form>

{(search || appliedSearch || selectedCategory !== "All") && (
<div className="mt-3 flex justify-end">
<button
type="button"
onClick={resetFilters}
className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
>
<span aria-hidden="true">×</span>
Clear search and filters
</button>
</div>
)}
</div>

<div ref={resultsRef} className="scroll-mt-24">
{filteredCourses.length > 0 ? (
<div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
{filteredCourses.map((course) => (
<article
key={course.id}
className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:p-6"
>
<div className="flex flex-wrap items-center justify-between gap-2">
<span
className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryStyles[getCourseCategory(course)]}`}
>
{getCourseCategory(course)}
</span>

<span
className={`rounded-full px-3 py-1 text-xs font-semibold ${levelStyles[course.level]}`}
>
{course.level}
</span>
</div>

<h2 className="mt-5 text-lg font-bold leading-7 text-slate-900 transition group-hover:text-blue-700">
{course.title}
</h2>

<p className="mt-2 text-xs font-medium text-slate-500">
{course.subjectArea}
</p>

<p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
{course.description}
</p>

<div className="mt-5">
<p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
Key skills
</p>

<div className="mt-2 flex flex-wrap gap-2">
{course.skills.slice(0, 3).map((skill) => (
<span
key={skill}
className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-700"
>
{skill}
</span>
))}

{course.skills.length > 3 && (
<span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
+{course.skills.length - 3} more
</span>
)}
</div>
</div>

<button
type="button"
onClick={() => {
setSelectedCourse(course);
window.scrollTo({ top: 0, behavior: "smooth" });
}}
className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:border-blue-700 hover:bg-blue-700 hover:text-white"
>
View course details <span aria-hidden="true">→</span>
</button>
</article>
))}
</div>
) : (
<div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
<div className="text-3xl text-slate-400" aria-hidden="true">
⌕
</div>

<h2 className="mt-4 text-lg font-bold text-slate-900">
No courses found
</h2>

<p className="mt-2 text-sm text-slate-600">
Try a different search term or change your selected filters.
</p>

<button
type="button"
onClick={resetFilters}
className="mt-5 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
>
Reset filters
</button>
</div>
)}
</div>
</div>
</section>
</main>
);
}