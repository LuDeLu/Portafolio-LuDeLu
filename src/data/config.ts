const config = {
  title: "Lucas Baez | Desarrollador Full Stack",
  description: {
    long: "Explora el portafolio de Lucas Baez, un desarrollador web full-stack especializado en crear aplicaciones web modernas, escalables y funcionales. Descubre mis proyectos, experiencia y habilidades técnicas. ¡Construyamos algo increíble juntos!",
    short:
      "Portafolio de Lucas Baez, desarrollador full-stack creando experiencias web innovadoras y funcionales.",
  },
  keywords: [
    "Lucas Baez",
    "LuDeLu",
    "portfolio",
    "desarrollador full-stack",
    "desarrollo web",
    "programador",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Vue.js",
    "Angular",
    "PHP",
    "Python",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
  ],
  author: "Lucas Baez",
  email: "lucasbaez147@gmail.com",
  site: "https://ludelu.dev",
  phone: "+54 11 5656-6083",
  location: "Buenos Aires, Argentina",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/TheLuDelu",
    linkedin: "https://www.linkedin.com/in/ludelu/",
    instagram: "https://www.instagram.com/lu.de_lu/",
    facebook: "",
    github: "https://github.com/LuDeLu",
  },
};
export { config };
