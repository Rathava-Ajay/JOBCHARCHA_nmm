export interface Job {
  id: string;
  title: string;
  companyOrDept: string;
  category: string; // UPSC, SSC, Banking, Railways, Defense, State PSC
  location: string;
  district: string;
  vacancyCount: number;
  salary: string;
  qualification: string;
  type: 'public' | 'private';
  lastDate: string;
  postedDate: string;
  isBoosted?: boolean;
  isSaved?: boolean;
  officialNotificationUrl?: string;
  applyUrl?: string;
  syllabusLink?: string;
  tags: string[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  companyOrDept: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  appliedDate: string;
  status: 'Submitted' | 'Under Review' | 'Shortlisted' | 'Rejected' | 'Interview Scheduled';
  resumeUrl: string;
  qualification: string;
  experienceYears: number;
}

export interface AdmitCard {
  id: string;
  examName: string;
  organization: string;
  releaseDate: string;
  examDate: string;
  downloadUrl: string;
  status: 'Released' | 'Upcoming' | 'Postponed';
  category: string;
}

export interface ExamResult {
  id: string;
  examName: string;
  organization: string;
  publishDate: string;
  cutoffGen: number;
  cutoffOBC: number;
  cutoffSC: number;
  cutoffST: number;
  resultPdfUrl: string;
  category: string;
}

export interface MockTest {
  id: string;
  title: string;
  examCategory: string;
  totalQuestions: number;
  durationMinutes: number;
  totalMarks: number;
  attemptsCount: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  isFree: boolean;
  questions: {
    id: string;
    questionText: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface OldPaper {
  id: string;
  title: string;
  examName: string;
  year: number;
  shift?: string;
  fileSize: string;
  downloadCount: number;
  downloadUrl: string;
}

export interface GovtScheme {
  id: string;
  title: string;
  ministry: string;
  eligibility: string;
  benefits: string;
  category: string;
  applyLink: string;
}

export interface NewsPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  imageUrl?: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  category: string;
  subject: string;
  type: 'Notes' | 'Video' | 'Book PDF' | 'Syllabus';
  author: string;
  fileSize: string;
  rating: number;
  downloadUrl: string;
}

export interface Product {
  id: string;
  title: string;
  category: 'Books' | 'Test Series' | 'Video Courses' | 'Class Notes';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  description: string;
  inStock: boolean;
  isDigital: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Processing' | 'Delivered' | 'Shipped' | 'Cancelled';
  paymentMethod: 'Razorpay' | 'Wallet';
  deliveryAddress?: string;
  invoiceUrl: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  targetRole: 'aspirant' | 'employer';
  features: string[];
  popular?: boolean;
  badge?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'aspirant' | 'employer' | 'admin';
  companyName?: string;
  companyLogo?: string;
  isCompanyVerified?: boolean;
  walletBalance: number;
  unlockedResumesCount: number;
  referralCode: string;
  referralsCount: number;
  resumeUrl?: string;
  profileScore?: number;
  education?: string;
  skills?: string[];
  status?: 'Active' | 'Suspended';
}

