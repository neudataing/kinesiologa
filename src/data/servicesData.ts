import { 
  Bone, 
  Smartphone, 
  UserCheck, 
  Move, 
  Home, 
  HeartPulse,
  Building, 
  Briefcase, 
  Users, 
  UserCog, 
  ShieldCheck, 
  Zap, 
  Target,
  Activity
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
    description: 'Sesiones personalizadas de terapia manual enfocadas en mejorar la postura y aliviar dolores relacionados con desequilibrios musculares.',
    icon: Bone,
    color: '#007bff'
  },
  {
    id: 'virtual-sessions',
    title: 'Sesiones virtuales',
    description: 'Consultas en línea desde tu hogar para evaluaciones posturales, guía de ejercicios y seguimiento continuo de tu tratamiento.',
    icon: Smartphone,
    color: '#28a745'
  },
  {
    id: 'postural-correction',
    title: 'Corrección postural',
    description: 'Tratamientos especializados para corregir problemas posturales y aliviar dolores relacionados con malas posturas cotidianas.',
    icon: UserCheck,
    color: '#6f42c1'
  },
  {
    id: 'movement-therapy',
    title: 'Terapia del movimiento',
    description: 'Técnicas avanzadas para mejorar patrones de movimiento, aumentar flexibilidad y fortalecer grupos musculares clave.',
    icon: Move,
    color: '#fd7e14'
  },
  {
    id: 'hybrid-treatment',
    title: 'Tratamientos híbridos',
    description: 'Combinación de sesiones presenciales y virtuales para dar continuidad terapéutica con flexibilidad horaria y geográfica.',
    icon: Home,
    color: '#20c997'
  },
  {
    id: 'pain-management',
    title: 'Manejo del dolor',
    description: 'Enfoque integral para el manejo del dolor crónico mediante técnicas kinesiológicas avanzadas y planes personalizados.',
    icon: HeartPulse,
    color: '#dc3545'
  }
];

export const businessServices: Service[] = [
  {
    id: 'occupational-ergonomics',
    title: 'Ergonomía ocupacional',
    description: 'Análisis de puestos de trabajo para identificar riesgos disergonómicos y proponer soluciones adaptadas a cada empresa.',
    icon: Building,
    color: '#007bff'
  },
  {
    id: 'corporate-consulting',
    title: 'Asesoramiento empresarial',
    description: 'Charlas y capacitaciones sobre higiene postural y estrategias para mejorar el bienestar laboral de empleados.',
    icon: Briefcase,
    color: '#28a745'
  },
  {
    id: 'workplace-wellness',
    title: 'Bienestar laboral',
    description: 'Programas integrales para reducir ausentismo y mejorar productividad mediante el cuidado físico de los empleados.',
    icon: Users,
    color: '#6f42c1'
  },
  {
    id: 'team-training',
    title: 'Capacitación de equipos',
    description: 'Formación especializada en prevención de lesiones y técnicas de autocuidado postural para equipos de trabajo.',
    icon: UserCog,
    color: '#fd7e14'
  },
  {
    id: 'risk-assessment',
    title: 'Evaluación de riesgos',
    description: 'Diagnóstico integral de riesgos ergonómicos con planes de acción para prevenir lesiones laborales.',
    icon: ShieldCheck,
    color: '#20c997'
  },
  {
    id: 'productivity-optimization',
    title: 'Optimización de productividad',
    description: 'Estrategias para mejorar rendimiento laboral mediante bienestar físico y adaptación ergonómica de puestos.',
    icon: Zap,
    color: '#dc3545'
  },
  {
    id: 'prevention-programs',
    title: 'Programas de prevención',
    description: 'Diseño e implementación de planes preventivos personalizados para reducir lesiones ocupacionales.',
    icon: Target,
    color: '#6610f2'
  },
  {
    id: 'ergonomic-solutions',
    title: 'Soluciones ergonómicas',
    description: 'Implementación de mejoras ergonómicas integrales para optimizar condiciones laborales y bienestar.',
    icon: Activity,
    color: '#e83e8c'
  }
];