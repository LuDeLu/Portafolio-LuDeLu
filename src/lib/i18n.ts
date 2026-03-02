export type Language = 'es' | 'en';

export const translations = {
  es: {
    nav: {
      menu: 'Menú',
      close: 'Cerrar',
    },
    hero: {
      greeting: 'Hola, soy',
      role: 'Desarrollador Web Full Stack',
      resume: 'Descargar CV',
      hireMe: 'Contrátame',
    },
    stats: {
      experience: 'Años de Experiencia',
      projects: 'Proyectos Completados',
      clients: 'Clientes Satisfechos',
    },
    sections: {
      skills: 'Habilidades Técnicas',
      experience: 'Experiencia Laboral',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    skills: {
      title: 'Mis tecnologías',
      hint: 'Tecnologías y herramientas que utilizo',
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Bases de Datos',
      frameworks: 'Frameworks',
      basic: 'Básico',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
      technologies: 'tecnologías',
      categories: {
        Frontend: 'Frontend',
        Backend: 'Backend',
        'Cloud & DevOps': 'Cloud & DevOps',
        Tools: 'Herramientas',
      },
    },
    experience: {
      title: 'Experiencia Laboral',
      subtitle: 'Mi trayectoria profesional',
      present: 'Presente',
      current: 'Actual',
      jobs: [
        {
          title: 'Fundador y desarrollador full stack',
          company: 'Orion Marketing',
          description: [
            'Sitios web full responsive',
            'Landing pages',
            'E-commerces y tiendas online',
            'Integración con herramientas de marketing',
          ],
        },
        {
          title: 'Desarrollador Full Stack',
          company: 'RR Sintético',
          description: [
            'Diseño y desarrollo de página web dinámica con React y Node.js.',
            'Implementación de APIs para cálculos exactos en cotizaciones.',
            'Asistencia de marketing general y optimización de conversión.',
            'Integración de sistemas de pagos y gestión de inventario.',
          ],
        },
        {
          title: 'Desarrollador Full Stack',
          company: 'TheDistance - Londres, Inglaterra',
          description: [
            'Diseño y desarrollo de aplicaciones web con React.js y Node.js.',
            'Migración de aplicaciones legadas a arquitecturas modernas basadas en microservicios.',
            'Implementación de APIs RESTful y optimización de consultas en bases de datos PostgreSQL.',
            'Trabajo en un entorno ágil, participando en reuniones diarias y sprints.',
          ],
        },
        {
          title: 'Desarrollador Frontend',
          company: 'Grove - Buenos Aires, Argentina',
          description: [
            'Creación de interfaces interactivas y responsivas con Vue.js y Tailwind.',
            'Colaboración con diseñadores UX/UI para optimizar la experiencia del usuario.',
            'Mejora del rendimiento y accesibilidad de aplicaciones web.',
            'Integración con APIs internas para gestión de datos en tiempo real.',
          ],
        },
        {
          title: 'Desarrollador Frontend/Backend',
          company: 'Meraki Services - Buenos Aires, Argentina',
          description: [
            'Desarrollo de página web empresarial estática y responsive con HTML, CSS y JavaScript.',
            'Desarrollo de aplicación web dedicada al seguimiento laboral.',
            'Implementación de sistemas de autenticación y gestión de usuarios.',
          ],
        },

      ],
    },
    projects: {
      title: 'Proyectos',
      viewProject: 'Ver Proyecto',
      viewDetails: 'Ver detalles',
      cancel: 'Cancelar',
      visit: 'Visitar',
      visitSite: 'Visitar Sitio',
      frontend: 'Frontend',
      backend: 'Backend',
      emptyMessage: 'No hay proyectos en esta categoría.',
      filterAll: 'Todos',
      filterWebApp: 'App web',
      filterEcommerce: 'Ecommerce',
      filterWebsite: 'Sitio web',
      items: {
        orionmkt: {
          category: 'Página web',
          description: 'Sitio web moderno desarrollado con React, Tailwind y Node.js para agencia de marketing.',
        },
        rrsintetico: {
          category: 'Aplicación web',
          description: 'Aplicación web completa para empresa de sintético deportivo con sistema de cotizaciones y gestión de proyectos.',
        },
        meraki: {
          category: 'Página web',
          description: 'Página web empresarial moderna y responsive para servicios profesionales.',
        },
        shopnow: {
          category: 'Ecommerce',
          description: 'Plataforma de ecommerce completa con gestión de productos, carritos y pagos.',
        },
        adn: {
          category: 'Aplicación web',
          description: 'Plataforma inmobiliaria con sistema de gestión de propiedades y clientes.',
        },
        paneladn: {
          category: 'Aplicación web',
          description: 'CRM personalizado para gestión inmobiliaria con seguimiento de proyectos y clientes.',
        },
        creditos: {
          category: 'Aplicación web',
          description: 'Sistema completo de gestión de préstamos con cálculo de intereses y cuotas.',
        },
        rrseguimientos: {
          category: 'Aplicación web',
          description: 'Plataforma de seguimiento en tiempo real para logística y entregas.',
        },
        tierrasabia: {
          category: 'Página web',
          description: 'Sitio web institucional para fundación sin fines de lucro.',
        },
        monacocor: {
          category: 'Página web',
          description: 'Sitio web comercial con catálogo de productos y formulario de contacto.',
        },
        monacoseg: {
          category: 'Página web',
          description: 'Sitio web para correduría de seguros con cotizador online.',
        },
        extinfuego: {
          category: 'Página web',
          description: 'Página web para empresa de servicios contra incendios.',
        },
        acceso: {
          category: 'Página web',
          description: 'Sitio web corporativo para empresa de seguridad privada.',
        },
        delenda: {
          category: 'Página web',
          description: 'Sitio web corporativo multiidioma para empresa tecnológica.',
        },
        ganamos023: {
          category: 'Página web',
          description: 'Landing page política con diseño moderno y responsive.',
        },
        markstral: {
          category: 'Página web',
          description: 'Página web para agencia de marketing digital.',
        },
        xpro: {
          category: 'Aplicación web',
          description: 'Plataforma de trading y análisis de mercados financieros.',
        },
        ferrus: {
          category: 'Aplicación web',
          description: 'Sistema de gestión para clínica dental con agenda de pacientes.',
        },
      },
    },
    contact: {
      title: 'Contacto',
      subtitle: '¿Trabajemos juntos?',
      name: 'Nombre',
      email: 'Correo Electrónico',
      message: 'Mensaje',
      send: 'Enviar Mensaje',
      sending: 'Enviando...',
    },
    footer: {
      rights: 'Todos los derechos reservados',
      built: 'Hecho con',
    },
  },

  en: {
    nav: {
      menu: 'Menu',
      close: 'Close',
    },
    hero: {
      greeting: 'Hi, I am',
      role: 'Full Stack Web Developer',
      resume: 'Download Resume',
      hireMe: 'Hire Me',
    },
    stats: {
      experience: 'Years of Experience',
      projects: 'Completed Projects',
      clients: 'Satisfied Clients',
    },
    sections: {
      skills: 'Technical Skills',
      experience: 'Work Experience',
      projects: 'Projects',
      contact: 'Contact',
    },
    skills: {
      title: 'Tech Stack',
      hint: 'Technologies and tools I use',
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Databases',
      frameworks: 'Frameworks',
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      technologies: 'technologies',
      categories: {
        Frontend: 'Frontend',
        Backend: 'Backend',
        'Cloud & DevOps': 'Cloud & DevOps',
        Tools: 'Tools',
      },
    },
    experience: {
      title: 'Work Experience',
      subtitle: 'My professional journey',
      present: 'Present',
      current: 'Current',
      jobs: [
        {
          title: 'Founder & Full Stack Developer',
          company: 'Orion Marketing',
          description: [
            'Fully responsive websites',
            'Landing pages',
            'E-commerces and online stores',
            'Integration with marketing tools',
          ],
        },
        {
          title: 'Full Stack Developer',
          company: 'RR Sintético',
          description: [
            'Design and development of a dynamic website with React and Node.js.',
            'Implementation of APIs for precise calculations in quotes.',
            'General marketing assistance and conversion optimization.',
            'Integration of payment systems and inventory management.',
          ],
        },
        {
          title: 'Full Stack Developer',
          company: 'TheDistance - London, England',
          description: [
            'Design and development of web applications using React.js and Node.js.',
            'Migration of legacy applications to modern microservices-based architectures.',
            'Implementation of RESTful APIs and query optimization in PostgreSQL databases.',
            'Work in an agile environment, participating in daily stand-ups and sprints.',
          ],
        },
        {
          title: 'Frontend Developer',
          company: 'Grove - Buenos Aires, Argentina',
          description: [
            'Creation of interactive and responsive interfaces using Vue.js and Tailwind.',
            'Collaboration with UX/UI designers to optimize user experience.',
            'Improvement of web application performance and accessibility.',
            'Integration with internal APIs for real-time data management.',
          ],
        },
        {
          title: 'Frontend/Backend Developer',
          company: 'Meraki Services - Buenos Aires, Argentina',
          description: [
            'Development of a static and responsive corporate website using HTML, CSS, and JavaScript.',
            'Development of a web application dedicated to work tracking.',
            'Implementation of authentication systems and user management.',
          ],
        },
      ],
    },
    projects: {
      title: 'Projects',
      viewProject: 'View Project',
      viewDetails: 'View details',
      cancel: 'Cancel',
      visit: 'Visit',
      visitSite: 'Visit Site',
      frontend: 'Frontend',
      backend: 'Backend',
      emptyMessage: 'No projects in this category.',
      filterAll: 'All',
      filterWebApp: 'Web App',
      filterEcommerce: 'Ecommerce',
      filterWebsite: 'Website',
      items: {
        orionmkt: {
          category: 'Website',
          description: 'Modern website developed with React, Tailwind, and Node.js for a marketing agency.',
        },
        rrsintetico: {
          category: 'Web Application',
          description: 'Full web application for a sports synthetic turf company with a quoting system and project management.',
        },
        meraki: {
          category: 'Website',
          description: 'Modern and responsive corporate website for professional services.',
        },
        shopnow: {
          category: 'Ecommerce',
          description: 'Complete e-commerce platform with product management, carts, and payments.',
        },
        adn: {
          category: 'Web Application',
          description: 'Real estate platform with property and client management system.',
        },
        paneladn: {
          category: 'Web Application',
          description: 'Custom CRM for real estate management with project and client tracking.',
        },
        creditos: {
          category: 'Web Application',
          description: 'Complete loan management system with interest and installment calculations.',
        },
        rrseguimientos: {
          category: 'Web Application',
          description: 'Real-time tracking platform for logistics and deliveries.',
        },
        tierrasabia: {
          category: 'Website',
          description: 'Institutional website for a non-profit foundation.',
        },
        monacocor: {
          category: 'Website',
          description: 'Commercial website with product catalog and contact form.',
        },
        monacoseg: {
          category: 'Website',
          description: 'Insurance brokerage website with an online quote tool.',
        },
        extinfuego: {
          category: 'Website',
          description: 'Website for a fire protection services company.',
        },
        acceso: {
          category: 'Website',
          description: 'Corporate website for a private security company.',
        },
        delenda: {
          category: 'Website',
          description: 'Multilingual corporate website for a technology company.',
        },
        ganamos023: {
          category: 'Website',
          description: 'Political landing page with modern and responsive design.',
        },
        markstral: {
          category: 'Website',
          description: 'Website for a digital marketing agency.',
        },
        xpro: {
          category: 'Web Application',
          description: 'Trading and financial market analysis platform.',
        },
        ferrus: {
          category: 'Web Application',
          description: 'Management system for a dental clinic with patient scheduling.',
        },
      },
    },
    contact: {
      title: 'Contact',
      subtitle: "Let's work together?",
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
    },
    footer: {
      rights: 'All rights reserved',
      built: 'Built with',
    },
  },
};
