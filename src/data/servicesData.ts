import { 
  User, 
  Building, 
  Shield, 
  CreditCard, 
  PiggyBank, 
  TrendingUp,
  Users,
  Briefcase,
  Calculator,
  Globe,
  Zap,
  Target
} from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

export const individualServices: Service[] = [
  {
    id: 'rpg-treatment',
    title: 'RPG (Reeducación Postural Global)',
    description: 'Sesiones personalizadas de terapia manual que brindan diagnóstico y tratamiento, con el objetivo de mejorar la postura y aliviar la sintomatología que ésta puede ocasionar.',
    icon: User,
    color: '#007bff'
  },
  {
    id: 'virtual-sessions',
    title: 'Sesiones Virtuales',
    description: 'Consultas en línea desde la comodidad de tu hogar. Ideal para evaluaciones posturales, orientación sobre ejercicios y seguimiento continuo.',
    icon: TrendingUp,
    color: '#28a745'
  },
  {
    id: 'postural-correction',
    title: 'Corrección Postural',
    description: 'Tratamientos especializados para corregir problemas posturales y aliviar dolores relacionados con malas posturas en el trabajo y vida diaria.',
    icon: Shield,
    color: '#6f42c1'
  },
  {
    id: 'movement-therapy',
    title: 'Terapia del Movimiento',
    description: 'Técnicas especializadas para mejorar patrones de movimiento, flexibilidad y fuerza muscular adaptadas a cada paciente.',
    icon: CreditCard,
    color: '#fd7e14'
  },
  {
    id: 'hybrid-treatment',
    title: 'Tratamientos Híbridos',
    description: 'Combinación de sesiones presenciales y virtuales para dar continuidad y adherencia a las propuestas terapéuticas desde la comodidad del hogar.',
    icon: PiggyBank,
    color: '#20c997'
  },
  {
    id: 'pain-management',
    title: 'Manejo del Dolor',
    description: 'Tratamientos especializados para el manejo y reducción del dolor crónico a través de técnicas kinesiológicas avanzadas.',
    icon: Calculator,
    color: '#dc3545'
  }
];

export const businessServices: Service[] = [
  {
    id: 'occupational-ergonomics',
    title: 'Ergonomía Ocupacional',
    description: 'Análisis de puestos de trabajo para evaluar factores de riesgo disergonómicos y brindar recomendaciones personalizadas para empresas.',
    icon: Building,
    color: '#007bff'
  },
  {
    id: 'corporate-consulting',
    title: 'Asesoramiento Empresarial',
    description: 'Charlas y formaciones para empleados y empleadores sobre higiene postural y estrategias para mejorar el bienestar laboral.',
    icon: Briefcase,
    color: '#28a745'
  },
  {
    id: 'workplace-wellness',
    title: 'Bienestar Laboral',
    description: 'Programas integrales de bienestar para empresas enfocados en reducir ausentismo y mejorar la productividad del equipo.',
    icon: CreditCard,
    color: '#6f42c1'
  },
  {
    id: 'team-training',
    title: 'Capacitación de Equipos',
    description: 'Formación especializada para equipos de trabajo sobre prevención de lesiones y técnicas de autocuidado postural.',
    icon: Users,
    color: '#fd7e14'
  },
  {
    id: 'risk-assessment',
    title: 'Evaluación de Riesgos',
    description: 'Evaluación integral de riesgos ergonómicos en el ambiente laboral con planes de acción para la prevención de lesiones.',
    icon: Globe,
    color: '#20c997'
  },
  {
    id: 'productivity-optimization',
    title: 'Optimización de Productividad',
    description: 'Estrategias para mejorar la productividad laboral a través del bienestar físico y la correcta ergonomía del puesto de trabajo.',
    icon: Zap,
    color: '#dc3545'
  },
  {
    id: 'prevention-programs',
    title: 'Programas de Prevención',
    description: 'Desarrollo e implementación de programas preventivos personalizados para reducir lesiones laborales y mejorar la salud ocupacional.',
    icon: Target,
    color: '#6610f2'
  },
  {
    id: 'ergonomic-solutions',
    title: 'Soluciones Ergonómicas',
    description: 'Implementación de soluciones ergonómicas integrales para mejorar las condiciones de trabajo y el bienestar de los empleados.',
    icon: TrendingUp,
    color: '#e83e8c'
  }
];