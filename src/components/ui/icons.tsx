import {
  User,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  Search,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  MapPin,
  Users,
  LogOut,
  Clock,
  Check,
  Home,
  Archive,
  Bookmark,
  Heart,
  Star,
  Send,
  Copy,
  Share2,
  Download,
  Upload,
} from "hugeicons-react";

// Export all icons
export {
  User,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  Search,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  MapPin,
  Users,
  LogOut,
  Clock,
  Check,
  Home,
  Archive,
  Bookmark,
  Heart,
  Star,
  Send,
  Copy,
  Share2,
  Download,
  Upload,
};

// Icon component with default className
interface IconProps {
  className?: string;
  size?: number;
}

export function LoginIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <User className={className} size={size} />;
}

export function PasswordIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <Lock className={className} size={size} />;
}

export function ShowPasswordIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <Eye className={className} size={size} />;
}

export function HidePasswordIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <EyeOff className={className} size={size} />;
}

export function SuccessIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <CheckCircle className={className} size={size} />;
}

export function ErrorIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <XCircle className={className} size={size} />;
}

export function WarningIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <AlertCircle className={className} size={size} />;
}

export function InfoIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <Info className={className} size={size} />;
}

export function CloseIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <X className={className} size={size} />;
}

export function MenuIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <Menu className={className} size={size} />;
}

export function SearchIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <Search className={className} size={size} />;
}

export function AddIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <Plus className={className} size={size} />;
}

export function DeleteIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <Trash2 className={className} size={size} />;
}

export function EditIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <Edit2 className={className} size={size} />;
}

export function LogoutIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <LogOut className={className} size={size} />;
}

export function LoadingIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <Clock className={`${className} animate-spin`} size={size} />;
}

export function CheckIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <Check className={className} size={size} />;
}

export function HomeIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <Home className={className} size={size} />;
}

export function CalendarIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <Calendar className={className} size={size} />;
}

export function LocationIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <MapPin className={className} size={size} />;
}

export function UsersIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <Users className={className} size={size} />;
}

export function StarIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <Star className={className} size={size} />;
}

export function HeartIcon({ className = "w-6 h-6", size = 24 }: IconProps) {
  return <Heart className={className} size={size} />;
}
