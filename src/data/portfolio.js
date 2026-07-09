export const personal = {
  logo: "FM.",
  name: "Faisal Malik",
  title: "MERN Stack Developer",
  tagline: "Building modern, responsive, and scalable web applications with the MERN stack.",

  // Full bio lives here 
bio: `A Computer Applications (Honours with Research) graduate from Kashmir, India.

My journey into technology began with web development, where I discovered a passion for building modern, responsive, and user-friendly web applications. Since then, I've been strengthening my skills across the MERN stack by developing projects that focus on clean user interfaces, reusable components, and practical backend development.

My current focus is improving my backend fundamentals with Node.js, Express.js, MongoDB, REST APIs, authentication, and database design while continuing to grow as a full-stack developer.

As part of my undergraduate research, I developed an Explainable AI project for retinal disease classification. That experience introduced me to machine learning research and strengthened my problem-solving and analytical thinking, although my primary career focus is software engineering and MERN stack development.

I'm actively seeking software engineering internships where I can contribute, learn from experienced developers, and continue building production-ready applications while growing into a strong full-stack engineer.`,

  location: "Kashmir, India",
  email: "thefaisalmallik@gmail.com",         
  github: "https://github.com/Faisalmalik01",
  linkedin: "https://www.linkedin.com/in/faisalmalik01/",
  twitter: "https://x.com/faisalmalik_01",
  resume: "/resume.pdf",
};

export const education = [
  {
    institution: "University of Kashmir",
    degree: "Bachelor of Computer Applications",
    field: "BCA (Honours with Research)",
    period: "2022 — 2026",
    grade: "Honours",
    highlights: [
      {
        icon: "book",
        text: "Strong foundation in computer science, including algorithms, data structures, operating systems, computer networks, databases, and software engineering.",
      },
      {
        icon: "flask",
        text: "Studied artificial intelligence, machine learning, data science, probability & statistics, and computational mathematics.",
      },
      {
        icon: "code",
        text: "Experienced with C++, Python, Java, modern web technologies, cybersecurity, Android development, and IoT fundamentals.",
      },
      {
        icon: "research",
        text: "Final-year research project: Adaptive Fused Grad-CAM for OCT Analysis — an explainable AI framework for retinal disease classification.",
      },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Adaptive Fused Grad-CAM for OCT Analysis",
    description:
      "Multi-layer Grad-CAM framework for improving explanation quality in retinal OCT classification.",
    domain: "Explainable AI",
    color: "purple",          // purple accent
    year: "2026",
    tags: ["TensorFlow", "ResNet50", "Grad-CAM", "XAI", "SSIM"],
    link: "https://github.com/Faisalmalik01/adaptive-oct-explainability",
    images: [
      "/projects/oct-gradcam.png",
      "/projects/oct-gradcam2.png",
      "/projects/oct-gradcam3.png",
    ],
  },
  {
    id: 2,
    title: "Recipe Assistant",
    description:
      "Global recipe discovery platform with search, filtering, favourites, and responsive navigation.",
    domain: "FoodTech",
    color: "green",           
    year: "2025",
    tags: ["React", "Tailwind CSS", "REST API", "TheMealDB"],
    link: "https://github.com/Faisalmalik01/recipe-assistant",
    demo: "https://recipe-assistant-gilt.vercel.app/",
    images: [
      "/projects/recipe-assistant1.png",
      "/projects/recipe-assistant5.png",
      "/projects/recipe-assistant2.png",
      "/projects/recipe-assistant3.png",
      "/projects/recipe-assistant4.png",
    ],
  },
  {
    id: 3,
    title: "AxisWardrobe",
    description:
      "Fashion eCommerce experience featuring authentication, wishlist management, and dynamic product browsing.",
    domain: "Fashion Commerce",
    color: "green",            
    year: "2025",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Auth", "Fake Store API"],
    link: "https://github.com/Faisalmalik01/AxisWardrobe",
    demo: "https://axis-wardrobe.vercel.app/",
    images: [
      "/projects/axis-wardrobe1.png",
      "/projects/axis-wardrobe3.png",
      "/projects/axis-wardrobe4.png",
      "/projects/axis-wardrobe2.png",
    ],
  },
];
