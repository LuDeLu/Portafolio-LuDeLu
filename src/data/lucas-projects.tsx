import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiVuedotjs,
  SiPhp,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiMysql,
} from "react-icons/si";

export const ProjectsLinks = ({ live, repo, visitLabel }: { live: string; repo?: string; visitLabel?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      <Link
        className="font-mono underline flex gap-2"
        rel="noopener"
        target="_new"
        href={live}
      >
        <Button variant={"default"} size={"sm"}>
          {visitLabel || "Visit Site"}
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <SiVuedotjs />,
  },
  php: {
    title: "PHP",
    bg: "black",
    fg: "white",
    icon: <SiPhp />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mysql: {
    title: "MySQL",
    bg: "black",
    fg: "white",
    icon: <SiMysql />,
  },
};

export type Project = {
  id: string;
  // Category key used for filtering — language-neutral
  categoryKey: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  github?: string;
  live: string;
  video?: string;
};

const lucasProjects: Project[] = [
  {
    id: "orionmkt",
    categoryKey: "website",
    title: "Orion Marketing",
    src: "/proyectos/orionmkt.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.node],
    },
    live: "http://orionmkt.com.ar/",
  },
  {
    id: "rrsintetico",
    categoryKey: "webapp",
    title: "RR Sintético",
    src: "/proyectos/rrsintetico.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.next, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.mongo],
    },
    live: "https://rrsintetico.com/",
  },
  {
    id: "meraki",
    categoryKey: "website",
    title: "Meraki Service",
    src: "/proyectos/meraki.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [],
    },
    live: "https://merakiport.netlify.app/",
  },
  {
    id: "shopnow",
    categoryKey: "ecommerce",
    title: "ShopNow",
    src: "/proyectos/shopnow.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.mongo],
    },
    live: "https://www.shopnow.com.ar",
  },
  {
    id: "adn",
    categoryKey: "webapp",
    title: "ADN Developers",
    src: "/proyectos/adn.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.next, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.node],
    },
    live: "https://adndevelopers.com.ar/",
  },
  {
    id: "paneladn",
    categoryKey: "webapp",
    title: "Panel interno ADN",
    src: "/proyectos/paneladn.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.postgres],
    },
    live: "https://www.adncrm.com.ar/proyectos",
  },
  {
    id: "creditos",
    categoryKey: "webapp",
    title: "Sistema de Préstamos",
    src: "/proyectos/creditos.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.postgres],
    },
    live: "https://sistemadecreditosv2.vercel.app/",
  },
  {
    id: "rrseguimientos",
    categoryKey: "webapp",
    title: "Sistema de seguimiento logístico",
    src: "/proyectos/rrseguimientos.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.mongo],
    },
    live: "https://rr-segumientos.vercel.app/track",
  },
  {
    id: "tierrasabia",
    categoryKey: "website",
    title: "Fundación Tierra Sabia",
    src: "/proyectos/tierrasabia.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.tailwind],
      backend: [],
    },
    live: "https://www.fundaciontierrasabia.org.ar/",
  },
  {
    id: "monacocor",
    categoryKey: "website",
    title: "Monaco Cortinas",
    src: "/proyectos/monacocor.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.tailwind],
      backend: [],
    },
    live: "https://www.monacocortinas.com.ar/",
  },
  {
    id: "monacoseg",
    categoryKey: "website",
    title: "Monaco Seguros",
    src: "/proyectos/monacoseg.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.tailwind],
      backend: [],
    },
    live: "https://monacoseguro.vercel.app/",
  },
  {
    id: "extinfuego",
    categoryKey: "website",
    title: "Extinfuego",
    src: "/proyectos/extinfuego.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.tailwind],
      backend: [],
    },
    live: "https://extinfuegoservices.vercel.app/",
  },
  {
    id: "acceso",
    categoryKey: "website",
    title: "Soul Security",
    src: "/proyectos/acceso.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.tailwind],
      backend: [],
    },
    live: "https://soulsecurity.com.ar/",
  },
  {
    id: "delenda",
    categoryKey: "website",
    title: "Delenda Corp",
    src: "/proyectos/delenda.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.tailwind],
      backend: [],
    },
    live: "https://delenda-corp.vercel.app/en",
  },
  {
    id: "ganamos023",
    categoryKey: "website",
    title: "Ganamos 023",
    src: "/proyectos/ganamos023.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.tailwind],
      backend: [],
    },
    live: "https://landingganamos.vercel.app/MDP",
  },
  {
    id: "markstral",
    categoryKey: "website",
    title: "Markstral",
    src: "/proyectos/meraki.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.tailwind],
      backend: [],
    },
    live: "https://markstral.vercel.app/",
  },
  {
    id: "xpro",
    categoryKey: "webapp",
    title: "Xpro Market",
    src: "/proyectos/xpro.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.postgres],
    },
    live: "https://xpromarkets.com/es/",
  },
  {
    id: "ferrus",
    categoryKey: "webapp",
    title: "Ferrus&Bratos",
    src: "/proyectos/ferrus.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.vue, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.php, PROJECT_SKILLS.mysql],
    },
    live: "https://www.clinicaferrusbratos.com",
  },
];

export default lucasProjects;
