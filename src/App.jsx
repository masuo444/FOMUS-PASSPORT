import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown, Map as MapIcon, BookOpen, Gift,
  LogOut, Heart, MessageCircle, Share2,
  ChevronLeft, ChevronRight, ArrowUpRight, Calendar, Users, Plus, Minus,
  Settings, X, Globe, Store, Check, User, Stamp,
  QrCode, Scan, BarChart3, Wallet, Camera, Clock, AlertCircle,
  Fingerprint, Mail, ShieldCheck, ArrowRight, Upload, Link as LinkIcon, UserPlus,
  Trophy, Star, Sparkles, Navigation, Search
} from 'lucide-react';

const GOOGLE_FONTS_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Serif+JP:wght@300;400;600&family=Noto+Sans+Arabic:wght@300;400;700&family=Courier+Prime&family=Press+Start+2P&display=swap";

const COLORS = {
  bg: "#F5F7F5",
  text: "#2B2B2B",
  accent: "#3F614C",
  accentDeep: "#2A4234",
  muted: "#888888",
  partnerBg: "#18221C",
  partnerText: "#F5F7F5",
};

const TRANSLATIONS = {
  ja: {
    app_subtitle: "Passport",
    tagline_vertical: true,
    tagline: "日常に、<br />静かな息吹を。",
    enter_btn: "ログイン",
    join_btn: "会員登録",
    copyright: "© FOMUS. All Rights Reserved.",
    auth_title: "FOMUSへようこそ",
    auth_desc: "パスワードは不要です。\n安全かつ瞬時に、あなたを証明します。",
    auth_biometric_btn: "生体認証でログイン",
    auth_email_placeholder: "メールアドレス",
    auth_send_code: "認証コードを送信",
    auth_verify_title: "認証コードを入力",
    auth_verify_desc: "宛に送信された\n4桁のコードを入力してください。",
    auth_resend: "コードを再送",
    auth_secure_note: "FOMUS Secure Authにより保護されています",
    mypage_rank: "MEMBERSHIP RANK",
    mypage_id: "FOMUS ID",
    mypage_pts: "CURRENT POINTS",
    mypage_next: "NEXT RANK",
    mypage_view_passport: "パスポートを確認",
    menu_kuku: "KUKU",
    menu_kuku_sub: "MANGA & ART",
    menu_map: "WORLD MAP",
    menu_map_sub: "MEMBERS & SHOPS",
    menu_journal: "JOURNAL",
    menu_journal_sub: "BEHIND THE SCENE",
    menu_benefits: "BENEFITS",
    menu_benefits_sub: "USE POINTS",
    menu_invite: "INVITE",
    menu_invite_sub: "COMMUNITY FOREST",
    settings_title: "設定",
    settings_icon: "プロフィール写真",
    settings_icon_desc: "タップして画像を変更",
    settings_city: "居住都市",
    settings_city_desc: "WORLD MAPに表示される都市名です。",
    settings_map_show: "マップに表示",
    settings_map_desc: "地図上にあなたの光を灯しますか？",
    settings_lang: "Language / 言語",
    save_changes: "変更を保存",
    map_members: "MEMBERS",
    map_shops: "SHOPS",
    map_you_are_in: "現在地: ",
    map_active: "MEMBERS ACTIVE",
    shop_display: "FOMUSの枡が設置されている店舗を表示中",
    shop_type_cafe: "Cafe",
    shop_type_gallery: "Gallery",
    shop_type_bar: "Bar",
    shop_type_shop: "Shop",
    passport_title: "FOMUS PASSPORT",
    passport_visa: "TRAVEL STAMPS / 旅のスタンプ",
    stamp_immigration: "FOMUS入国",
    stamp_reader: "KUKU読了",
    stamp_explorer: "MAP探索",
    login_mode_user: "USER",
    login_mode_partner: "PARTNER",
    partner_dash_title: "PARTNER CONSOLE",
    partner_scan: "ユーザー読取",
    partner_issue: "QR発行",
    partner_redeem: "ポイント決済",
    partner_analytics: "分析",
    scan_desc: "ユーザーのパスポートQRを読み取ります",
    issue_desc: "イベントQRを発行し、スタンプを付与します",
    redeem_desc: "ポイントを利用してサービスを提供します",
    redeem_amount: "利用ポイント数",
    redeem_btn: "決済を実行",
    analytics_visits: "本日の来店",
    analytics_points: "利用ポイント",
    event_name_label: "イベント名 / スタンプ名",
    event_expiry_label: "QR有効期限",
    event_generate_btn: "QRコード生成",
    event_qr_active: "スキャンしてスタンプ獲得",
    event_qr_expired: "有効期限切れ",
    event_expiry_30s: "30秒",
    event_expiry_1m: "1分",
    event_expiry_5m: "5分",
    scanner_title: "SCAN QR CODE",
    scanner_instruction: "イベント会場のQRコードをスキャン",
    scanner_success: "スタンプを獲得しました！",
    scanner_error_expired: "このQRコードは期限切れです",
    scanner_sim_btn: "カメラでQRを読み取る (シミュレーション)",
    invite_title: "INVITE FRIENDS",
    invite_desc: "友達を招待して、あなたの森を育てましょう。\n招待成立で100ptプレゼント。",
    invite_code_label: "あなたの招待コード",
    invite_btn_share: "招待リンクをシェア",
    invite_btn_sim: "友達参加をシミュレート (+100pt)",
    invite_rank_title: "YOUR FOREST",
    invite_progress: "次の成長まであと {count} 人",
    rank_seed: "Seed / 種",
    rank_sprout: "Sprout / 芽",
    rank_sapling: "Sapling / 双葉",
    rank_tree: "Tree / 木",
    rank_bloom: "Bloom / 開花",
    rank_grove: "Grove / 林",
    rank_forest: "Forest / 森",
    milestone_bonus: "成長ボーナス！",
    map_add_spot: "スポットを追加",
    map_add_spot_desc: "Googleマップのリンクから提携店を追加",
    map_input_placeholder: "GoogleマップのURLを貼り付け",
    map_importing: "情報を取得中...",
    map_import_success: "スポットを追加しました",
  },
  en: {
    app_subtitle: "Passport",
    tagline_vertical: false,
    tagline: "Quiet breath<br />in your daily life.",
    enter_btn: "ENTER",
    join_btn: "JOIN",
    copyright: "© FOMUS. All Rights Reserved.",
    auth_title: "Welcome to FOMUS",
    auth_desc: "No password needed.\nSecure and instant verification.",
    auth_biometric_btn: "Sign in with Passkey",
    auth_email_placeholder: "Email Address",
    auth_send_code: "Send Code",
    auth_verify_title: "Enter Code",
    auth_verify_desc: "Enter the 4-digit code sent to",
    auth_resend: "Resend Code",
    auth_secure_note: "Protected by FOMUS Secure Auth",
    mypage_rank: "MEMBERSHIP RANK",
    mypage_id: "FOMUS ID",
    mypage_pts: "CURRENT POINTS",
    mypage_next: "NEXT RANK",
    mypage_view_passport: "VIEW PASSPORT BOOK",
    menu_kuku: "KUKU",
    menu_kuku_sub: "MANGA & ART",
    menu_map: "WORLD MAP",
    menu_map_sub: "MEMBERS & SHOPS",
    menu_journal: "JOURNAL",
    menu_journal_sub: "BEHIND THE SCENE",
    menu_benefits: "BENEFITS",
    menu_benefits_sub: "USE POINTS",
    menu_invite: "INVITE",
    menu_invite_sub: "COMMUNITY FOREST",
    settings_title: "SETTINGS",
    settings_icon: "Profile Icon",
    settings_icon_desc: "Tap to change image",
    settings_city: "Your City",
    settings_city_desc: "Displayed on the World Map.",
    settings_map_show: "Show on Map",
    settings_map_desc: "Light up your location on the map?",
    settings_lang: "Language",
    save_changes: "SAVE CHANGES",
    map_members: "MEMBERS",
    map_shops: "SHOPS",
    map_you_are_in: "YOU ARE IN ",
    map_active: "MEMBERS ACTIVE",
    shop_display: "Showing shops with FOMUS Masu.",
    shop_type_cafe: "Cafe",
    shop_type_gallery: "Gallery",
    shop_type_bar: "Bar",
    shop_type_shop: "Shop",
    passport_title: "FOMUS PASSPORT",
    passport_visa: "TRAVEL STAMPS",
    stamp_immigration: "ENTRY",
    stamp_reader: "READER",
    stamp_explorer: "EXPLORER",
    login_mode_user: "USER",
    login_mode_partner: "PARTNER",
    partner_dash_title: "PARTNER CONSOLE",
    partner_scan: "SCAN USER",
    partner_issue: "ISSUE QR",
    partner_redeem: "REDEEM PTS",
    partner_analytics: "ANALYTICS",
    scan_desc: "Scan user's passport QR code",
    issue_desc: "Generate Event QR for users to scan",
    redeem_desc: "Accept points for service",
    redeem_amount: "Points to Redeem",
    redeem_btn: "EXECUTE TRANSACTION",
    analytics_visits: "Today's Visits",
    analytics_points: "Points Used",
    event_name_label: "Event / Stamp Name",
    event_expiry_label: "QR Expiry Time",
    event_generate_btn: "GENERATE QR",
    event_qr_active: "Scan to get Stamp",
    event_qr_expired: "QR EXPIRED",
    event_expiry_30s: "30 Sec",
    event_expiry_1m: "1 Min",
    event_expiry_5m: "5 Min",
    scanner_title: "SCAN QR CODE",
    scanner_instruction: "Scan QR at the venue",
    scanner_success: "Stamp Acquired!",
    scanner_error_expired: "This QR code has expired",
    scanner_sim_btn: "Simulate Scan Camera",
    invite_title: "INVITE FRIENDS",
    invite_desc: "Invite friends to grow your forest.\nGet 100pt per invite.",
    invite_code_label: "Your Invite Code",
    invite_btn_share: "Share Invite Link",
    invite_btn_sim: "Simulate Friend Joined (+100pt)",
    invite_rank_title: "YOUR FOREST",
    invite_progress: "{count} more to next stage",
    rank_seed: "Seed",
    rank_sprout: "Sprout",
    rank_sapling: "Sapling",
    rank_tree: "Tree",
    rank_bloom: "Bloom",
    rank_grove: "Grove",
    rank_forest: "Forest",
    milestone_bonus: "Growth Bonus!",
    map_add_spot: "Add Spot",
    map_add_spot_desc: "Add partner shop from Google Maps",
    map_input_placeholder: "Paste Google Maps URL",
    map_importing: "Importing info...",
    map_import_success: "Spot Added Successfully",
  },
  fr: { app_subtitle: "Passeport", enter_btn: "ENTRER", auth_title: "Bienvenue", auth_biometric_btn: "Connexion Biométrique" },
  ar: { app_subtitle: "جواز سفر", enter_btn: "دخول", auth_title: "أهلاً بك", auth_biometric_btn: "تسجيل الدخول الحيوي" }
};

const getTranslation = (lang, key) => {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const value = dict[key];
  if (value !== undefined) return value;
  const fallbackValue = TRANSLATIONS.en[key];
  if (fallbackValue !== undefined) return fallbackValue;
  return key;
};

const MOCK_USER_INITIAL = {
  id: "user_001",
  role: "user",
  display_name: "Masu Guest",
  email: "guest@fomus.world",
  city: "Tokyo",
  show_on_map: true,
  rank_id: 1,
  points: 0,
  joined_at: "2023.10.01",
  avatar: null,
  invite_code: "FOMUS-2024-X9Y",
  invite_count: 0,
};

const MOCK_PARTNER_INITIAL = {
  id: "partner_001",
  role: "partner",
  display_name: "FOMUS Cafe Tokyo",
  email: "store@fomus.world",
  city: "Tokyo",
  visits_today: 12,
  points_redeemed_today: 4500,
};

const MOCK_POSTS = [
  {
    id: "kuku_01",
    type: "kuku_manga",
    title: "EP1-01: The Beginning / 始まりの場所",
    summary: "KUKU woke up in a silent white space.",
    episode_number: 1, story_number: 1,
    thumbnail: "https://picsum.photos/seed/kuku1/800/450",
    pages: ["https://picsum.photos/seed/kuku_p1/800/1200", "https://picsum.photos/seed/kuku_p2/800/1200"]
  },
  {
    id: "journal_01",
    type: "masu_journal",
    title: "Art & Tech: Behind the Scenes",
    summary: "Fusion of technology and art supporting the FOMUS worldview.",
    published_at: "2023-10-24",
    thumbnail: "https://picsum.photos/seed/journal1/800/600",
    content: "We want to connect with people all over the world through 'craftsmanship'."
  }
];

const MOCK_SERVICES = [
  { id: "svc_1", name: "KUKU Original Coffee", description: "Free ticket for one cup of original blend coffee.", cost: 500, img: "https://picsum.photos/seed/coffee/400/400" },
  { id: "svc_2", name: "FOMUS Art Poster", description: "Limited Art Poster (A3 Size).", cost: 1500, img: "https://picsum.photos/seed/poster/400/400" },
];

const INITIAL_STAMPS = [
  { id: 1, type: "immigration", date: "2023.10.01", location: "FOMUS WORLD", icon: "logo" },
  { id: 2, type: "reader", date: "2023.10.05", location: "KUKU EP.1", icon: "book" },
];

const INITIAL_SHOPS = [
  { id: "s1", name: "FOMUS Cafe Tokyo", city: "Tokyo", type: "cafe", x: 880, y: 130 },
  { id: "s2", name: "KUKU Gallery Paris", city: "Paris", type: "gallery", x: 490, y: 100 },
  { id: "s3", name: "Masu Bar NY", city: "New York", type: "bar", x: 270, y: 120 },
  { id: "s4", name: "Kyoto Craft Hub", city: "Kyoto", type: "shop", x: 865, y: 135 },
  { id: "s5", name: "Dubai Art Lounge", city: "Dubai", type: "gallery", x: 650, y: 150 },
];

const resizeImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxSize = 500;
        if (width > height) {
          if (width > maxSize) { height *= maxSize / width; width = maxSize; }
        } else {
          if (height > maxSize) { width *= maxSize / height; height = maxSize; }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const base = "inline-flex items-center justify-center rounded-sm text-sm font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none h-11 px-6 tracking-widest border";
  const variants = {
    primary: "bg-[#3F614C] text-white border-[#3F614C] hover:bg-[#2A4234] active:scale-95 shadow-md",
    secondary: "bg-transparent text-[#3F614C] border-[#3F614C] hover:bg-[#3F614C] hover:text-white active:scale-95",
    ghost: "hover:bg-[#3F614C]/5 text-[#2B2B2B] border-transparent",
    ghostWhite: "hover:bg-white/10 text-white border-transparent",
    partnerPrimary: "bg-[#3F614C] text-white border-[#3F614C] hover:bg-[#2A4234] shadow-lg",
    partnerSecondary: "bg-transparent text-[#f9f8f5] border border-[#f9f8f5]/20 hover:bg-[#f9f8f5]/10",
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};

const Card = ({ children, className = "", onClick }) => (
  <div onClick={onClick} className={`rounded-sm border border-[#D8E2DC] bg-white shadow-[0_2px_8px_rgba(63,97,76,0.03)] hover:shadow-[0_4px_12px_rgba(63,97,76,0.08)] hover:border-[#3F614C] transition-all duration-300 ${className}`}>{children}</div>
);

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-[10px] font-medium tracking-wider ${className}`}>{children}</span>
);

const Input = ({ className = "", ...props }) => (
  <input className={`flex h-11 w-full rounded-sm border border-[#D8E2DC] bg-[#FAFCFA] px-3 py-2 text-sm placeholder:text-[#8C8C8C] focus:border-[#3F614C] focus:bg-white focus:ring-0 focus:outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50 font-serif ${className}`} {...props} />
);

const Switch = ({ checked, onCheckedChange }) => (
  <button
    type="button"
    onClick={() => onCheckedChange(!checked)}
    className={`peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none ${
      checked ? "bg-[#3F614C]" : "bg-[#D8E2DC]"
    }`}
  >
    <span
      className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow ring-0 transition-transform ${
        checked ? "translate-x-4 rtl:-translate-x-4" : "translate-x-0"
      }`}
    />
  </button>
);

const Toast = ({ title, description, visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-6 right-6 z-[60] bg-[#2A4234] text-white px-6 py-4 rounded-sm shadow-xl flex flex-col gap-1 min-w-[300px] border-l-2 border-[#7EA17E]"
      >
        <h4 className="font-medium text-sm tracking-widest font-serif">{title}</h4>
        <p className="text-xs opacity-80 font-sans">{description}</p>
      </motion.div>
    )}
  </AnimatePresence>
);

const LanguageSwitcher = ({ currentLang, onChange, variant = "dark" }) => {
  const LANGS = [
    { code: 'ja', label: '日' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'AR' }
  ];

  return (
    <div className="flex gap-1">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => onChange(l.code)}
          className={`text-[10px] font-serif tracking-wider px-3 py-1 rounded-sm transition-colors border ${
            currentLang === l.code
              ? (variant === "light" ? "bg-[#3F614C] text-white border-[#3F614C]" : "bg-white text-[#3F614C] border-white")
              : (variant === "light" ? "text-[#8C8C8C] border-transparent hover:border-[#D8E2DC]" : "text-white/60 border-transparent hover:border-white/30")
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
};

const PixelArt = ({ type, scale = 1 }) => {
  const renderArt = () => {
    switch(type) {
      case 'seed': return (<svg viewBox="0 0 16 16" width={32*scale} height={32*scale} className="pixel-art"><rect x="7" y="10" width="2" height="2" fill="#8B4513" /><rect x="6" y="11" width="4" height="1" fill="#8B4513" /></svg>);
      case 'sprout': return (<svg viewBox="0 0 16 16" width={32*scale} height={32*scale} className="pixel-art"><rect x="7" y="10" width="2" height="4" fill="#8B4513" /><rect x="7" y="8" width="2" height="2" fill="#3F614C" /><rect x="6" y="7" width="1" height="1" fill="#3F614C" /><rect x="9" y="6" width="1" height="2" fill="#3F614C" /></svg>);
      case 'sapling': return (<svg viewBox="0 0 16 16" width={32*scale} height={32*scale} className="pixel-art"><rect x="7" y="10" width="2" height="4" fill="#8B4513" /><rect x="7" y="8" width="2" height="2" fill="#3F614C" /><rect x="5" y="6" width="2" height="2" fill="#3F614C" /><rect x="9" y="6" width="2" height="2" fill="#3F614C" /></svg>);
      case 'tree': return (<svg viewBox="0 0 16 16" width={32*scale} height={32*scale} className="pixel-art"><rect x="7" y="10" width="2" height="4" fill="#8B4513" /><rect x="5" y="6" width="6" height="4" fill="#228B22" /><rect x="6" y="4" width="4" height="2" fill="#228B22" /><rect x="7" y="3" width="2" height="1" fill="#228B22" /></svg>);
      case 'bloom': return (<svg viewBox="0 0 16 16" width={32*scale} height={32*scale} className="pixel-art"><rect x="7" y="10" width="2" height="4" fill="#8B4513" /><rect x="5" y="6" width="6" height="4" fill="#228B22" /><rect x="6" y="4" width="4" height="2" fill="#228B22" /><rect x="6" y="5" width="1" height="1" fill="#FFC0CB" /><rect x="9" y="7" width="1" height="1" fill="#FFC0CB" /><rect x="7" y="3" width="2" height="2" fill="#FFB6C1" /></svg>);
      case 'grove': return (<svg viewBox="0 0 16 16" width={32*scale} height={32*scale} className="pixel-art"><rect x="3" y="11" width="2" height="3" fill="#8B4513" /><rect x="2" y="8" width="4" height="3" fill="#228B22" /><rect x="7" y="10" width="2" height="4" fill="#8B4513" /><rect x="5" y="6" width="6" height="4" fill="#228B22" /><rect x="11" y="11" width="2" height="3" fill="#8B4513" /><rect x="10" y="8" width="4" height="3" fill="#228B22" /></svg>);
      case 'forest': return (<svg viewBox="0 0 16 16" width={32*scale} height={32*scale} className="pixel-art"><rect x="0" y="0" width="16" height="16" fill="#1A2F1A" opacity="0.1" rx="2" /><rect x="2" y="9" width="2" height="2" fill="#3F614C" /><rect x="12" y="9" width="2" height="2" fill="#3F614C" /><rect x="7" y="8" width="2" height="2" fill="#3F614C" /><rect x="3" y="11" width="1" height="3" fill="#8B4513" /><rect x="2" y="8" width="3" height="3" fill="#228B22" /><rect x="7" y="10" width="2" height="4" fill="#8B4513" /><rect x="5" y="6" width="6" height="4" fill="#006400" /><rect x="12" y="11" width="1" height="3" fill="#8B4513" /><rect x="11" y="8" width="3" height="3" fill="#228B22" /></svg>);
      default: return null;
    }
  };
  return renderArt();
};

const NavIcon = ({ icon, active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1.5 p-2 w-16 ${
      active ? 'text-[#2B2B2B]' : 'text-[#B0B0B0] hover:text-[#888]'
    }`}
  >
    {icon}
    <span className="text-[8px] font-sans tracking-widest uppercase truncate max-w-full">{label}</span>
    {active && <div className="w-1 h-1 bg-[#3F614C] rounded-full mt-1"></div>}
  </button>
);

const MenuCard = ({ title, subtitle, icon, onClick }) => (
  <div onClick={onClick} className="bg-white border border-black/5 p-4 rounded-lg h-32 flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden">
    <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">{icon}</div>
    <div className="z-10 text-black/80">{icon}</div>
    <div className="z-10">
      <h3 className="font-serif tracking-widest text-sm text-black">{title}</h3>
      <p className="text-[10px] text-gray-500 font-sans tracking-wide mt-1">{subtitle}</p>
    </div>
  </div>
);

const KukuList = ({ t, onNavigate }) => (
  <div className="space-y-6 pb-12">
    <div className="text-center space-y-2 py-4"><h1 className="font-serif text-3xl tracking-widest">{t('menu_kuku')}</h1><p className="text-xs text-gray-500 font-sans tracking-wide">{t('menu_kuku_sub')}</p></div>
    <div className="grid gap-6">{MOCK_POSTS.filter(p => p.type === 'kuku_manga').map((post) => (<Card key={post.id} onClick={() => onNavigate("kuku_detail", post)} className="overflow-hidden border-none shadow-md group cursor-pointer"><div className="aspect-[16/9] w-full bg-gray-200 relative overflow-hidden"><img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></div><div className="p-4 bg-white relative"><h2 className="font-serif text-lg mb-2 group-hover:text-[#C4A86A] transition-colors">{post.title}</h2><div className="mt-4 flex justify-between items-center text-xs text-gray-400 font-sans tracking-widest group-hover:text-black transition-colors"><span className="flex items-center gap-1"><BookOpen size={12}/> READ</span><ChevronRight size={12} className="rtl:rotate-180" /></div></div></Card>))}</div>
  </div>
);

const JournalList = ({ t, onNavigate }) => (
    <div className="space-y-8 pb-12">
        <div className="py-4 border-b border-black/10"><h1 className="font-serif text-2xl tracking-widest">{t('menu_journal')}</h1><p className="text-xs text-gray-500 font-sans mt-1">{t('menu_journal_sub')}</p></div>
        <div className="space-y-8">{MOCK_POSTS.filter(p => p.type === 'masu_journal').map((post) => (<div key={post.id} onClick={() => onNavigate("journal_detail", post)} className="group cursor-pointer space-y-3"><div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden rounded-sm relative"><img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 saturate-50 group-hover:saturate-100" /></div><div className="space-y-2"><div className="flex justify-between items-start"><h2 className="text-lg font-serif leading-tight group-hover:text-black transition-colors">{post.title}</h2></div><p className="text-xs text-gray-500 line-clamp-2">{post.summary}</p></div></div>))}</div>
    </div>
);

const PartnersList = ({ t, userPoints, onRedeem }) => (
    <div className="space-y-6 pb-20">
       <div className="flex justify-between items-end border-b border-black/10 pb-4"><div><h1 className="font-serif text-2xl tracking-widest">{t('menu_benefits')}</h1><p className="text-xs text-gray-500 font-sans mt-1">{t('menu_benefits_sub')}</p></div><div className="text-right rtl:text-left"><p className="text-[10px] text-gray-500 tracking-widest">{t('mypage_pts')}</p><p className="font-mono text-xl rtl:font-sans">{userPoints.toLocaleString()} <span className="text-xs">pt</span></p></div></div>
       <div className="grid gap-6">{MOCK_SERVICES.map((service) => (<div key={service.id} className="bg-white border border-black/5 rounded-lg overflow-hidden flex h-32"><div className="w-1/3 relative bg-gray-100"><img src={service.img} alt={service.name} className="absolute inset-0 w-full h-full object-cover" /></div><div className="w-2/3 p-4 flex flex-col justify-between"><div><h3 className="font-serif text-sm font-bold truncate">{service.name}</h3><p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{service.description}</p></div><div className="flex items-center justify-between mt-2"><Badge className="font-mono text-[10px] border-[#C4A86A] text-[#C4A86A] bg-[#C4A86A]/5">{service.cost.toLocaleString()} pt</Badge><Button variant={userPoints >= service.cost ? 'primary' : 'secondary'} className="h-7 text-[10px] px-3" onClick={() => onRedeem(service.cost)}>EXCHANGE</Button></div></div></div>))}</div>
    </div>
);

const WorldMap = ({ currentUser, t, lang, shops = [], onAddShop }) => {
  const [mapMode, setMapMode] = useState('members');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isAddingSpot, setIsAddingSpot] = useState(false);
  const [spotUrl, setSpotUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const members = [{x: 88, y: 35, name: "Koji", city: "Tokyo"}, {x: 49, y: 25, name: "Sarah", city: "Paris"}, {x: 27, y: 32, name: "Mike", city: "NY"}, {x: 65, y: 40, name: "Ahmed", city: "Dubai"}, {x: 80, y: 38, name: "Chen", city: "Shanghai"}, {x: 47, y: 23, name: "Emma", city: "London"}];
  const handleAddSpot = () => { if (!spotUrl) return; setIsImporting(true); setTimeout(() => { const newShop = { id: `new_${Date.now()}`, name: "New FOMUS Spot", city: "Imported Location", type: "shop", x: 50 + Math.random() * 10, y: 30 + Math.random() * 10 }; onAddShop(newShop); setIsImporting(false); setIsAddingSpot(false); setSpotUrl(""); }, 1500); };
  return (
    <div className="fixed inset-0 bg-[#151515] z-50 flex items-center justify-center overflow-hidden" dir="ltr">
      <div className="absolute top-6 left-6 z-10 text-white pointer-events-none w-full max-w-xs" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <h1 className="font-serif text-xl tracking-[0.3em] drop-shadow-md text-white/90">WORLD</h1>
        <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono mt-1 mb-5 tracking-wider"><Globe size={12} /><span>PASSPORT MAP</span></div>
        <div className="pointer-events-auto flex flex-col gap-3"><div className="flex bg-white/5 rounded-sm p-1 w-fit backdrop-blur-md border border-white/10"><button onClick={() => setMapMode('members')} className={`px-4 py-2 rounded-sm text-[10px] tracking-widest font-medium transition-all flex items-center gap-2 ${mapMode === 'members' ? 'bg-[#F5F7F5] text-[#1A1A1A] shadow-lg' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}><Users size={12} /> {t('map_members')}</button><button onClick={() => setMapMode('shops')} className={`px-4 py-2 rounded-sm text-[10px] tracking-widest font-medium transition-all flex items-center gap-2 ${mapMode === 'shops' ? 'bg-[#3F614C] text-white shadow-lg' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}><Store size={12} /> {t('map_shops')}</button></div>{mapMode === 'shops' && (<button onClick={() => setIsAddingSpot(true)} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-sm backdrop-blur-md border border-white/10 text-[10px] w-fit transition-colors tracking-wider"><Search size={12} /> {t('map_add_spot')}</button>)}</div>
        {mapMode === 'members' && currentUser?.show_on_map && currentUser?.city && <div className="mt-6 text-[10px] text-[#3F614C] font-mono border-l-2 border-[#3F614C] pl-3 py-1 opacity-80">{t('map_you_are_in')} {currentUser.city.toUpperCase()}</div>}
        {mapMode === 'shops' && <div className="mt-6 text-[10px] text-white/60 font-serif pl-1 tracking-wide border-l-2 border-white/20 pl-3">{t('shop_display')}</div>}
      </div>
      <AnimatePresence>{isAddingSpot && (<div className="absolute inset-0 bg-black/80 z-20 flex items-center justify-center p-6 backdrop-blur-sm"><motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#F5F7F5] text-[#2B2B2B] p-8 rounded-sm w-full max-w-sm shadow-2xl relative border border-[#D8E2DC]"><button onClick={() => setIsAddingSpot(false)} className="absolute top-4 right-4 text-[#8C8C8C] hover:text-black"><X size={20} /></button><h3 className="font-serif text-lg mb-2 tracking-wider">{t('map_add_spot')}</h3><p className="text-xs text-[#8C8C8C] mb-6 font-sans">{t('map_add_spot_desc')}</p><div className="space-y-4"><Input placeholder={t('map_input_placeholder')} value={spotUrl} onChange={(e) => setSpotUrl(e.target.value)} className="bg-white" /><Button onClick={handleAddSpot} disabled={isImporting} className="w-full">{isImporting ? t('map_importing') : "IMPORT"}</Button></div></motion.div></div>)}</AnimatePresence>
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden" onWheel={(e) => { const newZoom = zoom - e.deltaY * 0.001; setZoom(Math.max(1, Math.min(4, newZoom))); }}>
        <motion.div className="w-full h-full" animate={{ scale: zoom, x: pan.x, y: pan.y }} transition={{ type: "spring", stiffness: 300, damping: 30 }} drag dragConstraints={{ left: -1000 * (zoom - 1), right: 0, top: -500 * (zoom - 1), bottom: 0 }}>
          <svg viewBox="0 0 1000 500" className="w-full h-full fill-[#1C1C1C] stroke-[#333] stroke-[0.5]"><rect width="1000" height="500" className="fill-[#151515]" /><g className="hover:fill-[#252525] transition-colors duration-500"><path d="M50,40 L150,20 L280,30 L300,60 L280,150 L200,180 L120,150 L60,100 Z" className="fill-[#1C1C1C]" /><path d="M220,200 L320,200 L350,300 L300,450 L250,420 L220,300 Z" className="fill-[#1C1C1C]" /><path d="M420,30 L550,20 L800,20 L950,50 L950,150 L850,220 L750,250 L650,200 L550,150 L480,100 L420,80 Z" className="fill-[#1C1C1C]" /><path d="M450,150 L580,150 L600,250 L550,380 L480,350 L420,250 Z" className="fill-[#1C1C1C]" /><path d="M820,320 L950,320 L940,420 L820,400 Z" className="fill-[#1C1C1C]" /><path d="M870,130 L890,120 L880,150 Z" className="fill-[#1C1C1C]" /></g><line x1="0" y1="250" x2="1000" y2="250" className="stroke-white/5 stroke-[1]" /><line x1="500" y1="0" x2="500" y2="500" className="stroke-white/5 stroke-[1]" /></svg>
          {mapMode === 'members' && members.map((p, i) => (<div key={i} className="absolute w-2 h-2 transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x / 10}%`, top: `${p.y / 5}%` }}><div className="absolute inset-0 -m-2 rounded-full border border-[#3F614C] opacity-0 animate-pulse-ring"></div><div className="relative w-2 h-2 bg-[#3F614C] rounded-full border border-black shadow-[0_0_10px_#3F614C] group cursor-pointer hover:scale-150 transition-transform"><div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-black text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none shadow-lg font-sans tracking-wide z-50">{p.name} <span className="text-gray-500">in</span> {p.city}</div></div></div>))}
          {mapMode === 'shops' && shops.map((s, i) => (<div key={`s-${i}`} className="absolute w-4 h-4 transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${s.x / 10}%`, top: `${s.y / 5}%` }}><div className="relative w-4 h-4 bg-white rounded-sm border border-black shadow-[0_0_15px_white] group cursor-pointer hover:scale-125 transition-transform flex items-center justify-center text-black"><Store size={8} /><div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#3F614C] text-white text-[10px] px-3 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none shadow-xl font-sans tracking-wide z-50 flex flex-col items-center"><span className="font-bold tracking-wider">{s.name}</span><span className="text-[8px] opacity-80 mt-0.5">{s.city} • {t(`shop_type_${s.type}`)}</span></div></div></div>))}
        </motion.div>
        <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-10"><button onClick={() => setZoom(z => Math.min(4, z + 0.5))} className="w-10 h-10 rounded-sm bg-white/10 text-white flex items-center justify-center hover:bg-white/20 backdrop-blur-md transition-colors border border-white/10"><Plus size={16}/></button><button onClick={() => setZoom(z => Math.max(1, z - 0.5))} className="w-10 h-10 rounded-sm bg-white/10 text-white flex items-center justify-center hover:bg-white/20 backdrop-blur-md transition-colors border border-white/10"><Minus size={16}/></button></div>
      </div>
    </div>
  );
};

const KukuViewer = ({ post, onBack, onLike }) => {
  const [showUI, setShowUI] = useState(true);
  const [liked, setLiked] = useState(false);
  const handleLikeAction = (e) => { e.stopPropagation(); if(!liked) { setLiked(true); onLike(); } };
  return (
    <div className="fixed inset-0 bg-[#111] z-50 overflow-y-auto no-scrollbar" dir="ltr">
       <AnimatePresence>
        {showUI && (
          <motion.header initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/90 to-transparent z-50 flex items-center px-4 text-white">
            <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft /></button>
            <div className="ml-4">
              <p className="text-[10px] opacity-60 font-mono tracking-widest uppercase">EP {post.episode_number}-{String(post.story_number).padStart(2, '0')}</p>
              <h1 className="text-sm font-serif tracking-wide truncate max-w-[200px]">{post.title}</h1>
            </div>
          </motion.header>
        )}
       </AnimatePresence>
       <div onClick={() => setShowUI(!showUI)} className="w-full max-w-md mx-auto min-h-screen pb-32 cursor-pointer bg-black">
          {post.pages.map((url, idx) => ( <img key={idx} src={url} alt={`Page ${idx}`} className="w-full block h-auto" /> ))}
          <div className="py-32 px-6 text-center text-white/60 space-y-8">
            <p className="font-serif text-xs tracking-[0.3em] opacity-50">TO BE CONTINUED</p>
            <div className="flex justify-center gap-6">
              <button onClick={handleLikeAction} className="flex flex-col items-center gap-2 group">
                 <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${liked ? 'bg-[#3F614C] text-white shadow-[0_0_20px_rgba(63,97,76,0.4)]' : 'bg-white/10 text-white group-hover:bg-white/20'}`}><Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} /></div>
                 <span className="text-[9px] tracking-widest uppercase opacity-70 group-hover:opacity-100">LIKE</span>
              </button>
            </div>
          </div>
       </div>
    </div>
  );
};

const JournalViewer = ({ post, onBack }) => (
    <article className="pb-20 bg-[#F5F7F5] min-h-screen bg-noise">
       <div className="sticky top-0 bg-[#F5F7F5]/90 backdrop-blur-md py-4 z-10 flex items-center mb-6 px-4 border-b border-[#D8E2DC]"><button onClick={onBack} className="text-xs text-[#8C8C8C] hover:text-black flex items-center gap-2 font-serif tracking-widest transition-colors"><ChevronLeft size={14} /> BACK</button></div>
       <div className="px-6 space-y-8 max-w-2xl mx-auto">
          <div className="aspect-video w-full overflow-hidden rounded-sm shadow-lg"><img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" /></div>
          <div className="space-y-4 border-b border-[#D8E2DC] pb-6">
             <p className="font-mono text-xs text-[#3F614C] tracking-wider">{post.published_at}</p>
             <h1 className="text-2xl font-serif leading-snug text-[#2B2B2B]">{post.title}</h1>
          </div>
          <div className="font-serif leading-loose text-[#555] text-sm space-y-6">
             <p className="first-letter:text-4xl first-letter:font-light first-letter:mr-2 first-letter:float-left first-letter:text-[#3F614C]">{post.summary}</p>
             <p>{post.content}</p>
          </div>
       </div>
    </article>
);

const PassportModal = ({ user, t, onClose, stamps }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.9, rotateX: -10 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-sm bg-[#F4F1EA] rounded-sm shadow-2xl overflow-hidden min-h-[520px] flex flex-col" style={{ perspective: '1000px' }}>
        <div className="bg-[#18221C] p-5 text-center border-b-4 border-[#3F614C]">
          <h2 className="text-[#7EA17E] font-serif tracking-[0.3em] text-sm flex items-center justify-center gap-3">
            <Globe size={14} strokeWidth={1.5} /> {t('passport_title')} <Globe size={14} strokeWidth={1.5} />
          </h2>
        </div>
        <div className="p-8 flex-1 bg-[#F4F1EA] relative">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center"><Crown size={200} /></div>
          <div className="flex gap-5 border-b border-[#1A1A1A]/10 pb-6 mb-6">
            <div className="w-20 h-24 bg-[#D8E2DC] rounded-sm border border-[#1A1A1A]/10 flex items-center justify-center overflow-hidden grayscale shadow-inner">
               {user.avatar ? <img src={user.avatar} alt="ID" className="w-full h-full object-cover" /> : <User size={32} className="text-white" />}
            </div>
            <div className="flex-1 space-y-2 font-typewriter text-xs text-[#2B2B2B]">
               <div className="flex flex-col"><span className="text-[7px] opacity-40 uppercase tracking-widest">Name</span><span className="font-bold tracking-widest text-sm">{user.display_name}</span></div>
               <div className="flex flex-col"><span className="text-[7px] opacity-40 uppercase tracking-widest">Nationality</span><span className="font-bold tracking-widest">FOMUS CITIZEN</span></div>
               <div className="flex flex-col"><span className="text-[7px] opacity-40 uppercase tracking-widest">Date of Issue</span><span className="font-bold tracking-widest">{user.joined_at}</span></div>
            </div>
          </div>
          <div>
            <h3 className="text-[10px] font-serif text-[#3F614C] tracking-widest mb-4 border-b border-[#3F614C]/20 pb-1 w-max">{t('passport_visa')}</h3>
            <div className="grid grid-cols-3 gap-3">
              {stamps.map((stamp) => (
                <div key={stamp.id} className="aspect-square flex items-center justify-center relative group">
                   <div className="w-16 h-16 rounded-full border-2 border-[#3F614C]/70 flex flex-col items-center justify-center p-1 transform rotate-[-12deg] group-hover:rotate-0 transition-transform opacity-80 hover:opacity-100 bg-[#3F614C]/5 mix-blend-multiply">
                      <span className="text-[6px] font-mono text-[#3F614C] uppercase truncate max-w-full text-center tracking-tighter">{stamp.location}</span>
                      <div className="text-[#3F614C] my-0.5">{stamp.icon === 'logo' && <Crown size={12} />}{stamp.icon === 'book' && <BookOpen size={12} />}{stamp.icon === 'map' && <MapIcon size={12} />}{stamp.icon === 'crown' && <Crown size={12} />}</div>
                      <span className="text-[5px] font-mono text-[#3F614C]">{stamp.date}</span>
                   </div>
                </div>
              ))}
              {[...Array(Math.max(0, 6 - stamps.length))].map((_, i) => (<div key={i} className="aspect-square border border-dashed border-[#1A1A1A]/5 rounded-full flex items-center justify-center"><div className="w-12 h-12 rounded-full opacity-5"></div></div>))}
            </div>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-3 right-3 text-white/30 hover:text-white transition-colors"><X size={18}/></button>
      </motion.div>
    </div>
  );
};

const SettingsModal = ({ user, t, lang, setLang, onClose, onSave }) => {
  const [displayName, setDisplayName] = useState(user.display_name || "");
  const [city, setCity] = useState(user.city || "");
  const [showOnMap, setShowOnMap] = useState(!!user.show_on_map);
  const [avatar, setAvatar] = useState(user.avatar);
  const fileInputRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const resized = await resizeImage(file);
      setAvatar(resized);
    }
  };

  const handleSave = () => {
    onSave({ display_name: displayName, city, show_on_map: showOnMap, avatar });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md bg-white rounded-sm p-8 shadow-2xl border border-[#D8E2DC] space-y-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#8C8C8C] hover:text-black"><X size={18} /></button>
        <div className="space-y-1">
          <p className="text-xs text-[#8C8C8C] tracking-[0.2em]">{t('settings_title')}</p>
          <h2 className="text-xl font-serif tracking-wide">{user.display_name}</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#F5F7F5] border border-[#D8E2DC] flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            {avatar ? <img src={avatar} alt="Avatar" className="w-full h-full object-cover" /> : <User className="text-[#8C8C8C]" />}
          </div>
          <div className="text-xs text-[#8C8C8C] space-y-1">
            <p className="font-serif">{t('settings_icon')}</p>
            <p className="font-sans">{t('settings_icon_desc')}</p>
            <Button variant="secondary" className="h-9 text-[11px] px-4" onClick={() => fileInputRef.current?.click()}>
              <Upload size={14} className="mr-2" /> Upload
            </Button>
            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFile} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-[11px] text-[#8C8C8C] tracking-widest">NAME</p>
            <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <p className="text-[11px] text-[#8C8C8C] tracking-widest">{t('settings_city')}</p>
            <Input value={city} onChange={(e) => setCity(e.target.value)} />
            <p className="text-[11px] text-[#B0B0B0]">{t('settings_city_desc')}</p>
          </div>
          <div className="flex items-center justify-between bg-[#F5F7F5] px-4 py-3 rounded-sm border border-[#D8E2DC]">
            <div>
              <p className="text-xs font-serif">{t('settings_map_show')}</p>
              <p className="text-[11px] text-[#8C8C8C]">{t('settings_map_desc')}</p>
            </div>
            <Switch checked={showOnMap} onCheckedChange={setShowOnMap} />
          </div>
          <div className="space-y-2">
            <p className="text-[11px] text-[#8C8C8C] tracking-widest">{t('settings_lang')}</p>
            <LanguageSwitcher currentLang={lang} onChange={setLang} variant="light" />
          </div>
        </div>
        <Button className="w-full" onClick={handleSave}>{t('save_changes')}</Button>
      </motion.div>
    </div>
  );
};

const InviteModal = ({ user, t, onClose, onBonus }) => {
  const ranks = ['seed','sprout','sapling','tree','bloom','grove','forest'];
  const thresholds = [0,3,10,25,50,80,120];
  const inviteCount = user.invite_count || 0;
  const nextIndex = thresholds.findIndex((thr) => inviteCount < thr);
  const activeIndex = nextIndex === -1 ? ranks.length - 1 : Math.max(0, nextIndex - 1);
  const currentRank = ranks[activeIndex];
  const nextThreshold = thresholds[nextIndex === -1 ? thresholds.length - 1 : nextIndex];
  const remaining = Math.max(0, nextThreshold - inviteCount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-md bg-white rounded-sm p-8 shadow-2xl border border-[#D8E2DC] space-y-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#8C8C8C] hover:text-black"><X size={18}/></button>
        <div className="space-y-2">
          <p className="text-xs text-[#8C8C8C] tracking-[0.2em]">{t('invite_title')}</p>
          <h2 className="text-xl font-serif">{t('invite_rank_title')}</h2>
          <p className="text-xs text-[#8C8C8C] whitespace-pre-line">{t('invite_desc')}</p>
        </div>
        <div className="flex items-center gap-4 bg-[#F5F7F5] border border-[#D8E2DC] rounded-sm p-4">
          <PixelArt type={currentRank} />
          <div className="space-y-1">
            <p className="text-[11px] text-[#8C8C8C]">{t('invite_progress').replace('{count}', remaining)}</p>
            <p className="text-lg font-serif">{(user.invite_count || 0).toLocaleString()} invites</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-[11px] text-[#8C8C8C]">{t('invite_code_label')}</p>
          <div className="flex items-center gap-3">
            <input className="flex-1 h-11 rounded-sm border border-[#D8E2DC] bg-[#FAFCFA] px-3 text-sm font-mono" value={user.invite_code} readOnly />
            <Button variant="secondary" className="h-11 text-[11px] px-4" onClick={() => navigator.clipboard?.writeText(user.invite_code)}>
              <LinkIcon size={14} className="mr-2" /> Copy
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button className="w-full" onClick={() => navigator.share?.({ text: 'Join FOMUS', url: window.location.href })}>{t('invite_btn_share')}</Button>
          <Button variant="secondary" className="w-full" onClick={onBonus}>{t('invite_btn_sim')}</Button>
        </div>
      </motion.div>
    </div>
  );
};

const DashboardLayout = ({ user, t, lang, setLang, onLogout, currentPage, onNavigate, children, activeQr, onStampGet }) => {
  const navItems = [
    { key: 'mypage', label: t('login_mode_user'), icon: <Crown size={18} /> },
    { key: 'kuku', label: t('menu_kuku'), icon: <BookOpen size={18} /> },
    { key: 'map', label: t('menu_map'), icon: <Navigation size={18} /> },
    { key: 'journal', label: t('menu_journal'), icon: <MessageCircle size={18} /> },
    { key: 'partners', label: t('menu_benefits'), icon: <Gift size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7F5] text-[#2B2B2B] flex flex-col">
      <header className="sticky top-0 z-30 bg-[#F5F7F5]/90 backdrop-blur-md border-b border-[#D8E2DC] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#2A4234] flex items-center justify-center text-white shadow-md">
            <Crown size={18} />
          </div>
          <div>
            <p className="text-[10px] text-[#8C8C8C] tracking-widest">FOMUS</p>
            <p className="text-sm font-serif">{user.display_name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher currentLang={lang} onChange={setLang} variant="light" />
          <button onClick={onLogout} className="text-[#8C8C8C] hover:text-black" title="Logout"><LogOut size={18} /></button>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 pb-24">
        {activeQr && (
          <div className="mb-4 bg-white border border-[#D8E2DC] rounded-sm p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[10px] text-[#8C8C8C] tracking-widest">ACTIVE EVENT</p>
              <p className="text-sm font-serif">{activeQr.name}</p>
              <p className="text-[11px] text-[#8C8C8C] flex items-center gap-1"><Clock size={12}/> {activeQr.expiresAt ? `Valid until ${new Date(activeQr.expiresAt).toLocaleTimeString()}` : 'No expiry'}</p>
            </div>
            <Button className="h-9 text-[11px]" onClick={() => onStampGet(activeQr.name)}>Scan & Add Stamp</Button>
          </div>
        )}
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#D8E2DC] shadow-[0_-4px_10px_rgba(0,0,0,0.03)] flex justify-around py-2">
        {navItems.map((item) => (
          <NavIcon key={item.key} icon={item.icon} label={item.label} active={currentPage === item.key} onClick={() => onNavigate(item.key)} />
        ))}
      </nav>
    </div>
  );
};

const PartnerDashboard = ({ user, t, lang, setLang, onLogout, activeQr, setActiveQr }) => {
  const [tab, setTab] = useState('issue');
  const [eventName, setEventName] = useState('FOMUS Entry');
  const [expiryMinutes, setExpiryMinutes] = useState(1);
  const [redeemAmount, setRedeemAmount] = useState(500);
  const [scanMessage, setScanMessage] = useState('');

  useEffect(() => {
    if (!activeQr?.expiresAt) return;
    const timer = setInterval(() => {
      if (Date.now() > activeQr.expiresAt) {
        setActiveQr(null);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [activeQr, setActiveQr]);

  const handleGenerate = () => {
    const expiresAt = Date.now() + expiryMinutes * 60 * 1000;
    setActiveQr({ name: eventName, expiresAt });
  };

  const handleScanUser = () => {
    if (activeQr && Date.now() > activeQr.expiresAt) {
      setScanMessage(t('scanner_error_expired'));
      return;
    }
    setScanMessage(t('scanner_success'));
  };

  return (
    <div className="min-h-screen bg-[#0F1511] text-white">
      <header className="sticky top-0 bg-[#0F1511]/90 backdrop-blur-md px-4 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Store size={18} /></div>
          <div>
            <p className="text-[10px] text-white/50 tracking-widest">{t('partner_dash_title')}</p>
            <p className="text-sm font-serif">{user.display_name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher currentLang={lang} onChange={setLang} />
          <button onClick={onLogout} className="text-white/60 hover:text-white"><LogOut size={18} /></button>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        <div className="grid grid-cols-4 gap-3 text-[10px] uppercase tracking-widest">
          <button onClick={() => setTab('scan')} className={`flex flex-col items-center gap-2 p-3 rounded-sm border ${tab==='scan' ? 'border-[#7EA17E] bg-white/5' : 'border-white/10 hover:border-white/30'}`}><Scan size={18}/> {t('partner_scan')}</button>
          <button onClick={() => setTab('issue')} className={`flex flex-col items-center gap-2 p-3 rounded-sm border ${tab==='issue' ? 'border-[#7EA17E] bg-white/5' : 'border-white/10 hover:border-white/30'}`}><QrCode size={18}/> {t('partner_issue')}</button>
          <button onClick={() => setTab('redeem')} className={`flex flex-col items-center gap-2 p-3 rounded-sm border ${tab==='redeem' ? 'border-[#7EA17E] bg-white/5' : 'border-white/10 hover:border-white/30'}`}><Wallet size={18}/> {t('partner_redeem')}</button>
          <button onClick={() => setTab('analytics')} className={`flex flex-col items-center gap-2 p-3 rounded-sm border ${tab==='analytics' ? 'border-[#7EA17E] bg-white/5' : 'border-white/10 hover:border-white/30'}`}><BarChart3 size={18}/> {t('partner_analytics')}</button>
        </div>

        {tab === 'scan' && (
          <div className="bg-white/5 border border-white/10 rounded-sm p-6 space-y-4">
            <div className="flex items-center gap-3 text-white/70 text-sm"><Camera size={16}/> {t('scan_desc')}</div>
            <Button variant="partnerSecondary" className="w-full" onClick={handleScanUser}>{t('scanner_sim_btn')}</Button>
            {scanMessage && <p className="text-xs text-[#7EA17E]">{scanMessage}</p>}
          </div>
        )}

        {tab === 'issue' && (
          <div className="bg-white/5 border border-white/10 rounded-sm p-6 space-y-4">
            <div className="space-y-2">
              <p className="text-xs text-white/60">{t('issue_desc')}</p>
              <Input value={eventName} onChange={(e) => setEventName(e.target.value)} className="bg-white/5 border-white/20 text-white" placeholder={t('event_name_label')} />
            </div>
            <div className="space-y-2">
              <p className="text-xs text-white/60">{t('event_expiry_label')}</p>
              <div className="grid grid-cols-3 gap-2 text-[12px]">
                {[{label:t('event_expiry_30s'), val:0.5},{label:t('event_expiry_1m'), val:1},{label:t('event_expiry_5m'), val:5}].map(opt => (
                  <button key={opt.label} onClick={() => setExpiryMinutes(opt.val)} className={`py-2 rounded-sm border ${expiryMinutes===opt.val ? 'border-[#7EA17E] bg-white/10' : 'border-white/10 hover:border-white/30'}`}>{opt.label}</button>
                ))}
              </div>
            </div>
            <Button variant="partnerPrimary" className="w-full" onClick={handleGenerate}>{t('event_generate_btn')}</Button>
            {activeQr && (
              <div className="mt-4 bg-white/10 border border-white/20 rounded-sm p-4 text-center space-y-2">
                <p className="text-xs text-white/60">{t('event_qr_active')}</p>
                <div className="h-32 w-32 bg-white text-[#2B2B2B] rounded-sm mx-auto flex items-center justify-center font-mono text-xs">QR</div>
                <p className="text-[11px] text-white/60 flex items-center justify-center gap-2"><Clock size={12}/> {new Date(activeQr.expiresAt).toLocaleTimeString()}</p>
              </div>
            )}
          </div>
        )}

        {tab === 'redeem' && (
          <div className="bg-white/5 border border-white/10 rounded-sm p-6 space-y-4">
            <p className="text-xs text-white/60">{t('redeem_desc')}</p>
            <Input type="number" value={redeemAmount} onChange={(e) => setRedeemAmount(Number(e.target.value))} className="bg-white/5 border-white/20 text-white" placeholder={t('redeem_amount')} />
            <Button variant="partnerPrimary" className="w-full">{t('redeem_btn')} ({redeemAmount} pt)</Button>
          </div>
        )}

        {tab === 'analytics' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-sm p-5 space-y-2">
              <p className="text-[11px] text-white/60 flex items-center gap-2"><Users size={14}/> {t('analytics_visits')}</p>
              <p className="text-2xl font-serif">{user.visits_today}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-sm p-5 space-y-2">
              <p className="text-[11px] text-white/60 flex items-center gap-2"><Wallet size={14}/> {t('analytics_points')}</p>
              <p className="text-2xl font-serif">{user.points_redeemed_today}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TopPage = ({ t, lang, setLang, onEnter }) => (
  <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex min-h-screen flex-col items-center justify-between p-6 relative overflow-hidden bg-noise">
    <div className="absolute inset-0 bg-pattern pointer-events-none"></div>
    <div className="absolute top-4 right-4 z-20"><LanguageSwitcher currentLang={lang} onChange={setLang} variant="light" /></div>
    <div className="absolute top-[-15%] left-[-25%] w-[90vw] h-[90vw] bg-[#3F614C]/5 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-[-15%] right-[-25%] w-[90vw] h-[90vw] bg-[#7EA17E]/10 rounded-full blur-3xl pointer-events-none" />

    <div className="flex-1" />
    <div className="flex flex-col items-center text-center z-10 space-y-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="space-y-3">
        <h1 className="text-5xl md:text-7xl font-serif font-thin tracking-[0.2em] text-[#2B2B2B]">FOMUS</h1>
        <div className="h-[1px] w-12 bg-[#3F614C] mx-auto"></div>
        <h2 className="text-sm md:text-base font-sans font-medium tracking-[0.4em] text-[#8C8C8C] uppercase">{t('app_subtitle')}</h2>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1.5 }} className="py-10">
        {t('tagline_vertical') ? (
          <div className="writing-vertical text-base text-[#555] h-[200px] leading-loose mx-auto border-l border-[#3F614C]/30 pl-6 tracking-widest font-serif">
             <p dangerouslySetInnerHTML={{__html: t('tagline')}} />
          </div>
        ) : (
          <div className="text-base text-[#555] leading-loose max-w-xs mx-auto border-t border-[#3F614C]/30 pt-6 tracking-widest font-serif">
            <p dangerouslySetInnerHTML={{__html: t('tagline')}} />
          </div>
        )}
      </motion.div>
    </div>
    <div className="flex-1 flex flex-col justify-end w-full max-w-xs gap-6 pb-10 z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }} className="flex flex-col gap-4">
        <Button onClick={onEnter} className="w-full h-14 text-sm tracking-[0.25em] shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all border-none bg-[#2B2B2B] text-white">{t('enter_btn')}</Button>
        <div className="flex justify-center gap-8 text-[10px] text-[#8C8C8C] font-sans tracking-wider"><span>PRIVACY</span><span>TERMS</span><span>CONTACT</span></div>
        <p className="text-[9px] text-center text-[#CCCCCC] font-sans tracking-widest mt-2">{t('copyright')}</p>
      </motion.div>
    </div>
  </motion.main>
);

const AuthPage = ({ t, lang, onLogin, onBack }) => {
  const [role, setRole] = useState("user");
  const [step, setStep] = useState("input");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBiometric = () => { setLoading(true); setTimeout(() => { onLogin(role); }, 1500); };
  const handleSendCode = (e) => { e.preventDefault(); setStep("verify"); };
  const handleVerifyCode = (e) => { e.preventDefault(); onLogin(role); };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F5F7F5] relative overflow-hidden bg-noise">
      <div className="absolute top-4 left-4 z-20 rtl:left-auto rtl:right-4">
         <button onClick={onBack} className="text-xs text-[#8C8C8C] hover:text-black flex items-center gap-1 font-serif tracking-wider transition-colors">{lang === 'ar' ? <ChevronRight size={14}/> : <ChevronLeft size={14}/>} BACK</button>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md space-y-10 bg-white p-10 rounded-sm shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-[#D8E2DC] relative">
        {loading && (<div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center"><div className="p-4 border-2 border-[#3F614C] rounded-full animate-pulse"><Fingerprint size={48} className="text-[#3F614C]" /></div><p className="text-xs text-[#8C8C8C] mt-6 tracking-[0.2em] font-serif">AUTHENTICATING...</p></div>)}
        <div className="text-center space-y-6">
          <div className="inline-block p-4 rounded-full bg-[#F5F7F5] text-[#3F614C] mb-2"><Crown size={28} strokeWidth={1.5} /></div>
          <h1 className="text-2xl font-serif font-medium tracking-wide text-[#2B2B2B]">{t('auth_title')}</h1>
          <p className="text-xs text-[#8C8C8C] leading-relaxed whitespace-pre-line font-sans">{t('auth_desc')}</p>
        </div>
        <div className="space-y-6">
            <button onClick={handleBiometric} className={`w-full group relative flex items-center justify-center gap-3 py-4 rounded-sm border transition-all duration-300 ${role === 'partner' ? 'bg-[#18221C] border-[#3F614C] text-[#3F614C]' : 'bg-[#2B2B2B] text-white border-[#2B2B2B] hover:bg-[#404040] hover:shadow-lg'}`}><Fingerprint size={20} className={role === 'partner' ? '' : 'text-[#3F614C]'} /><span className="text-sm font-medium tracking-widest">{t('auth_biometric_btn')}</span><div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1"><ArrowRight size={16} /></div></button>
            <div className="relative flex py-2 items-center"><div className="flex-grow border-t border-[#D8E2DC]"></div><span className="flex-shrink-0 mx-4 text-[10px] text-[#CCCCCC] tracking-widest">OR</span><div className="flex-grow border-t border-[#D8E2DC]"></div></div>
            <AnimatePresence mode="wait">
              {step === "input" ? (
                <motion.form key="input" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} onSubmit={handleSendCode} className="space-y-4">
                  <div className="space-y-2"><div className="relative"><Mail size={16} className="absolute left-4 top-3.5 text-[#3F614C]" /><Input type="email" placeholder={t('auth_email_placeholder')} required value={email} onChange={e => setEmail(e.target.value)} className="pl-12 h-12 bg-[#FAFCFA] border-[#D8E2DC]" /></div></div>
                  <Button type="submit" variant="secondary" className="w-full h-12 border-[#D8E2DC] text-[#555] hover:border-[#3F614C] hover:text-[#3F614C]">{t('auth_send_code')}</Button>
                </motion.form>
              ) : (
                <motion.form key="verify" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} onSubmit={handleVerifyCode} className="space-y-6">
                  <div className="text-center"><h3 className="text-sm font-medium tracking-wide text-[#2B2B2B]">{t('auth_verify_title')}</h3><p className="text-[10px] text-[#8C8C8C] mt-2 leading-relaxed">{t('auth_verify_desc')} <br/><span className="font-mono text-[#3F614C] mt-1 block">{email}</span></p></div>
                  <div className="flex justify-center gap-3">{[...Array(4)].map((_, i) => (<input key={i} type="text" maxLength="1" className="w-12 h-14 text-center text-2xl font-serif border border-[#D8E2DC] bg-[#FAFCFA] rounded-sm focus:border-[#3F614C] focus:ring-0 outline-none transition-colors" defaultValue={Math.floor(Math.random()*10)} />))}</div>
                  <Button type="submit" className="w-full h-12">{t('enter_btn')}</Button>
                  <button type="button" onClick={() => setStep("input")} className="w-full text-center text-[10px] text-[#8C8C8C] hover:text-[#2B2B2B] transition-colors underline underline-offset-4">{t('auth_resend')}</button>
                </motion.form>
              )}
            </AnimatePresence>
        </div>
        <div className="flex justify-between items-end pt-4"><button onClick={() => setRole(role === 'user' ? 'partner' : 'user')} className="text-[9px] text-[#D8E2DC] hover:text-[#8C8C8C] transition-colors uppercase tracking-widest">{role === 'user' ? 'Switch to Partner' : 'Switch to User'}</button><div className="flex items-center gap-1.5 text-[9px] text-[#CCCCCC]"><ShieldCheck size={10} /><span>{t('auth_secure_note')}</span></div></div>
      </motion.div>
    </div>
  );
};

const MyPage = ({ user, t, lang, setLang, points, stamps, onNavigate, onUpdateUser, onInviteBonus }) => {
  const nextRank = 1000;
  const progress = Math.min((points / nextRank) * 100, 100);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <div className="space-y-10 relative">
      <AnimatePresence>
        {isSettingsOpen && (<SettingsModal user={user} t={t} lang={lang} setLang={setLang} onClose={() => setIsSettingsOpen(false)} onSave={(data) => { onUpdateUser(data); setIsSettingsOpen(false); }} />)}
        {isPassportOpen && (<PassportModal user={user} t={t} onClose={() => setIsPassportOpen(false)} stamps={stamps} />)}
        {isInviteOpen && (<InviteModal user={user} t={t} onClose={() => setIsInviteOpen(false)} onBonus={() => { onInviteBonus(); }} />)}
      </AnimatePresence>

      <div className="relative w-full aspect-[1.58/1] rounded-sm p-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#18221C] to-[#2A4234] text-[#F5F7F5] group border-t border-white/10">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#3F614C 1px, transparent 1px)', backgroundSize: '16px 16px'}}></div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#3F614C]/20 rounded-full blur-3xl pointer-events-none"></div>
        <button onClick={() => setIsSettingsOpen(true)} className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 text-white/30 hover:text-[#7EA17E] bg-white/5 rounded-full z-20 transition-colors backdrop-blur-sm"><Settings size={14} /></button>
        <div className="flex justify-between items-start z-10 mt-2">
          <div><p className="text-[9px] text-[#7EA17E] tracking-[0.25em] font-serif mb-1">{t('mypage_rank')}</p><h2 className="text-xl font-serif tracking-[0.1em] flex items-center gap-2 text-white">Standard <span className="text-[#7EA17E] text-sm"><Crown size={14} /></span></h2></div>
        </div>
        <div className="z-10 space-y-4 mb-1">
          <div className="flex justify-between items-end">
             <div><p className="text-[9px] opacity-60 tracking-widest font-serif mb-1">{t('mypage_pts')}</p><p className="text-3xl font-light font-mono text-[#7EA17E] rtl:font-sans">{points.toLocaleString()} <span className="text-xs text-white/60">pt</span></p></div>
             <div className="text-right rtl:text-left pb-1"><p className="text-[9px] opacity-50 tracking-wider">{t('mypage_next')}</p><p className="text-xs font-mono opacity-80 rtl:font-sans">{nextRank} pt</p></div>
          </div>
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#3F614C] shadow-[0_0_10px_#3F614C]" style={{ width: `${progress}%` }} /></div>
          <div className="flex justify-between items-center pt-1">
            <div className="flex items-center gap-3">{user.avatar ? <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-[#3F614C]/30" /> : <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><User size={14} className="text-white/50"/></div>}<p className="text-sm font-serif tracking-wide text-[#F5F7F5]">{user?.display_name}</p></div>
            {user?.city && <p className="text-[10px] text-white/40 font-mono tracking-wider border border-white/10 px-2 py-1 rounded-sm">{user.city.toUpperCase()}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-center"><button onClick={() => setIsPassportOpen(true)} className="group flex items-center gap-3 bg-white text-[#2B2B2B] px-8 py-4 rounded-sm text-xs font-serif tracking-[0.15em] hover:bg-[#2B2B2B] hover:text-white transition-all shadow-sm border border-[#D8E2DC]"><Stamp size={16} className="text-[#3F614C] group-hover:text-white transition-colors" /><span className="font-medium">{t('mypage_view_passport')}</span></button></div>

      <div className="grid grid-cols-2 gap-4">
        <MenuCard title={t('menu_invite')} subtitle={t('menu_invite_sub')} icon={<UserPlus className="w-5 h-5" />} onClick={() => setIsInviteOpen(true)} />
        <MenuCard title={t('menu_kuku')} subtitle={t('menu_kuku_sub')} icon={<BookOpen className="w-5 h-5" />} onClick={() => onNavigate("kuku")} />
        <MenuCard title={t('menu_map')} subtitle={t('menu_map_sub')} icon={<MapIcon className="w-5 h-5" />} onClick={() => onNavigate("map")} />
        <MenuCard title={t('menu_journal')} subtitle={t('menu_journal_sub')} icon={<ArrowUpRight className="w-5 h-5" />} onClick={() => onNavigate("journal")} />
        <MenuCard title={t('menu_benefits')} subtitle={t('menu_benefits_sub')} icon={<Gift className="w-5 h-5" />} onClick={() => onNavigate("partners")} />
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("top");
  const [user, setUser] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const [toast, setToast] = useState({ visible: false, title: "", description: "" });
  const [userPoints, setUserPoints] = useState(0);
  const [lang, setLang] = useState("ja");

  const [activeQr, setActiveQr] = useState(null);
  const [myStamps, setMyStamps] = useState(INITIAL_STAMPS);
  const [shopList, setShopList] = useState(INITIAL_SHOPS);

  const t = (key) => getTranslation(lang, key);

  const showToast = (title, description) => {
    setToast({ visible: true, title, description });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  const handleLogin = (role = "user") => {
    if (role === "partner") {
      setUser(MOCK_PARTNER_INITIAL);
      showToast("Partner Access", "Console initialized.");
      setTimeout(() => setCurrentPage("partner_dash"), 800);
    } else {
      setUser(MOCK_USER_INITIAL);
      setUserPoints(MOCK_USER_INITIAL.points);
      showToast("Authenticated", "Welcome to FOMUS Passport.");
      setTimeout(() => setCurrentPage("mypage"), 800);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("top");
  };

  const navigateTo = (page, post = null) => {
    if (post) setCurrentPost(post);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleUpdateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
    showToast("Saved", "Profile updated.");
  };

  const handleAddPoints = (amount, message) => {
    setUserPoints(prev => prev + amount);
    showToast("Bonus Points", message || `You got ${amount} points!`);
  };

  const handleInviteSimulate = () => {
    const newCount = (user.invite_count || 0) + 1;
    setUser(prev => ({ ...prev, invite_count: newCount }));

    let bonus = 100;
    let message = `Friend joined! +100pt`;

    if (newCount === 3) { bonus += 300; message = `${t('milestone_bonus')} +400pt (Sapling reached)`; }
    else if (newCount === 10) { bonus += 1000; message = `${t('milestone_bonus')} +1100pt (Tree reached)`; }
    else if (newCount === 25) { bonus += 2500; message = `${t('milestone_bonus')} +2600pt (Bloom reached)`; }
    else if (newCount === 50) { bonus += 5000; message = `${t('milestone_bonus')} +5100pt (Grove reached)`; }
    else if (newCount === 100) { bonus += 10000; message = `${t('milestone_bonus')} +10100pt (Forest reached)`; }

    handleAddPoints(bonus, message);
  };

  const handleAddShop = (newShop) => {
    setShopList(prev => [...prev, newShop]);
    showToast(t('map_import_success'), newShop.name);
  };

  useEffect(() => {
    if (activeQr && activeQr.expiresAt && Date.now() > activeQr.expiresAt) {
      setActiveQr(null);
    }
  }, [activeQr]);

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`min-h-screen text-[#2B2B2B] selection:bg-[#3F614C]/30 ${lang === 'ar' ? 'font-arabic' : 'font-serif'}`}>
      <style>{`
        body { background-color: ${COLORS.bg}; }
        .font-serif { font-family: 'Noto Serif JP', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-arabic { font-family: 'Noto Sans Arabic', sans-serif; }
        .font-typewriter { font-family: 'Courier Prime', monospace; }
        .font-pixel { font-family: 'Press Start 2P', cursive; }
        .writing-vertical { writing-mode: vertical-rl; text-orientation: upright; }
      `}</style>

      <link href={GOOGLE_FONTS_URL} rel="stylesheet" />
      <Toast {...toast} />

      <AnimatePresence mode="wait">
        {currentPage === "top" && (
          <TopPage key="top" t={t} lang={lang} setLang={setLang} onEnter={() => navigateTo("auth")} />
        )}

        {currentPage === "auth" && (
          <AuthPage key="auth" t={t} lang={lang} onLogin={handleLogin} onBack={() => navigateTo("top")} />
        )}

        {["mypage", "kuku", "journal", "partners", "map"].includes(currentPage) && user?.role === "user" && (
          <DashboardLayout
            user={user} t={t} lang={lang} setLang={setLang} onLogout={handleLogout} currentPage={currentPage} onNavigate={navigateTo}
            activeQr={activeQr}
            onStampGet={(stampName) => {
              if (activeQr && activeQr.expiresAt && Date.now() > activeQr.expiresAt) {
                showToast("Expired", t('scanner_error_expired'));
                return;
              }
              setMyStamps(prev => [...prev, { id: Date.now(), type: "event", date: new Date().toLocaleDateString(), location: stampName, icon: "crown" }]);
              showToast(t('scanner_success'), `${stampName} stamp added.`);
            }}
          >
             {currentPage === "mypage" && <MyPage user={user} t={t} lang={lang} setLang={setLang} points={userPoints} stamps={myStamps} onNavigate={navigateTo} onUpdateUser={handleUpdateUser} onInviteBonus={handleInviteSimulate} />}
             {currentPage === "kuku" && <KukuList t={t} onNavigate={navigateTo} />}
             {currentPage === "journal" && <JournalList t={t} onNavigate={navigateTo} />}
             {currentPage === "partners" && <PartnersList t={t} userPoints={userPoints} onRedeem={(cost) => {
                if(userPoints < cost) { showToast("Error", "Not enough points"); return false; }
                setUserPoints(prev => prev - cost);
                showToast("Success", "Coupon issued");
                return true;
             }} />}
             {currentPage === "map" && <WorldMap currentUser={user} t={t} lang={lang} shops={shopList} onAddShop={handleAddShop} />}
          </DashboardLayout>
        )}

        {currentPage === "partner_dash" && user?.role === "partner" && (
          <PartnerDashboard user={user} t={t} lang={lang} setLang={setLang} onLogout={handleLogout} activeQr={activeQr} setActiveQr={setActiveQr} />
        )}

        {currentPage === "kuku_detail" && currentPost && (
          <KukuViewer key="kuku_detail" post={currentPost} onBack={() => navigateTo("kuku")} onLike={() => setUserPoints(p => p + 10)} />
        )}
        {currentPage === "journal_detail" && currentPost && (
          <JournalViewer key="journal_detail" post={currentPost} onBack={() => navigateTo("journal")} />
        )}
      </AnimatePresence>
    </div>
  );
}
