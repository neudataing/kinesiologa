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
    id: 'personal-banking',
    title: 'Personal Banking',
    description: 'Comprehensive banking solutions including checking accounts, savings accounts, and personal loans tailored to your financial goals.',
    icon: User,
    color: '#007bff'
  },
  {
    id: 'investment-planning',
    title: 'Investment Planning',
    description: 'Professional investment advisory services to help you build wealth through diversified portfolios and strategic financial planning.',
    icon: TrendingUp,
    color: '#28a745'
  },
  {
    id: 'insurance-protection',
    title: 'Insurance Protection',
    description: 'Protect what matters most with our comprehensive insurance solutions including life, health, auto, and home insurance.',
    icon: Shield,
    color: '#6f42c1'
  },
  {
    id: 'credit-solutions',
    title: 'Credit Solutions',
    description: 'Access to personal loans, credit cards, and mortgage solutions with competitive rates and flexible terms.',
    icon: CreditCard,
    color: '#fd7e14'
  },
  {
    id: 'retirement-planning',
    title: 'Retirement Planning',
    description: 'Secure your future with our retirement planning services including 401(k) management, IRA accounts, and pension strategies.',
    icon: PiggyBank,
    color: '#20c997'
  },
  {
    id: 'financial-consulting',
    title: 'Financial Consulting',
    description: 'One-on-one financial consulting to help you make informed decisions about budgeting, debt management, and financial goals.',
    icon: Calculator,
    color: '#dc3545'
  }
];

export const businessServices: Service[] = [
  {
    id: 'business-banking',
    title: 'Business Banking',
    description: 'Complete business banking solutions including commercial accounts, business loans, and cash management services.',
    icon: Building,
    color: '#007bff'
  },
  {
    id: 'corporate-finance',
    title: 'Corporate Finance',
    description: 'Strategic financial planning and capital structuring to support your business growth and operational efficiency.',
    icon: Briefcase,
    color: '#28a745'
  },
  {
    id: 'merchant-services',
    title: 'Merchant Services',
    description: 'Streamlined payment processing solutions including point-of-sale systems, online payments, and mobile transactions.',
    icon: CreditCard,
    color: '#6f42c1'
  },
  {
    id: 'payroll-services',
    title: 'Payroll Services',
    description: 'Comprehensive payroll management including tax compliance, direct deposit, and employee benefits administration.',
    icon: Users,
    color: '#fd7e14'
  },
  {
    id: 'international-trade',
    title: 'International Trade',
    description: 'Global trade finance solutions including letters of credit, foreign exchange, and international wire transfers.',
    icon: Globe,
    color: '#20c997'
  },
  {
    id: 'treasury-management',
    title: 'Treasury Management',
    description: 'Advanced treasury solutions for cash flow optimization, risk management, and automated financial operations.',
    icon: Zap,
    color: '#dc3545'
  },
  {
    id: 'business-consulting',
    title: 'Business Consulting',
    description: 'Strategic business consulting services to help you optimize operations, improve efficiency, and drive growth.',
    icon: Target,
    color: '#6610f2'
  },
  {
    id: 'equipment-financing',
    title: 'Equipment Financing',
    description: 'Flexible financing options for business equipment, machinery, and technology to support your operational needs.',
    icon: TrendingUp,
    color: '#e83e8c'
  }
];