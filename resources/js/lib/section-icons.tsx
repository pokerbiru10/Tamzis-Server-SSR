import { faMosque } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Award,
    Banknote,
    BookOpen,
    Building2,
    CheckCircle2,
    Clock,
    Globe,
    GraduationCap,
    HandHeart,
    HeartHandshake,
    Home,
    Landmark,
    Leaf,
    Lock,
    MapPin,
    MousePointer2,
    Phone,
    Scale,
    Shield,
    ShieldCheck,
    Smartphone,
    Star,
    Sun,
    ThumbsUp,
    TrendingUp,
    Users,
    Wallet,
    Zap,
} from 'lucide-react';

type IconComponent = React.ComponentType<{ className?: string }>;

const MosqueIcon: IconComponent = ({ className }) => (
    <FontAwesomeIcon icon={faMosque} className={className} />
);

// Daftar ikon yang bisa dipilih dari dashboard untuk section beranda.
export const sectionIcons: Record<string, IconComponent> = {
    shield: Shield,
    'shield-check': ShieldCheck,
    scale: Scale,
    'check-circle': CheckCircle2,
    'map-pin': MapPin,
    star: Star,
    zap: Zap,
    'mouse-pointer': MousePointer2,
    'trending-up': TrendingUp,
    mosque: MosqueIcon,
    landmark: Landmark,
    'heart-handshake': HeartHandshake,
    'hand-heart': HandHeart,
    users: Users,
    wallet: Wallet,
    building: Building2,
    phone: Phone,
    globe: Globe,
    'book-open': BookOpen,
    'graduation-cap': GraduationCap,
    home: Home,
    banknote: Banknote,
    leaf: Leaf,
    sun: Sun,
    award: Award,
    'thumbs-up': ThumbsUp,
    clock: Clock,
    lock: Lock,
    smartphone: Smartphone,
};

export function getSectionIcon(name?: string | null): IconComponent | undefined {
    return name ? sectionIcons[name] : undefined;
}
