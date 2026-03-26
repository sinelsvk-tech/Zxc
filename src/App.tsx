/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Home, Users, MessageCircle, LayoutGrid, User, Aperture, Settings, LogOut, Image as ImageIcon, Music, ChevronLeft, Camera, Plus, Heart, Share2, MoreHorizontal, Send, Pin, Search, Bell, X, Eye, EyeOff, UserPlus, UserMinus, Check, CheckCheck, Paperclip, Smile, Mic, MoreVertical, Copy, Reply, Trash2, Play, Newspaper, Coffee, Shield, Lock, Globe, Hash, UsersRound, ImagePlus, ShieldAlert, Activity, FileText, Award, CheckCircle, Ban, Eraser, Crown, Gem, Medal, MessageSquare, Edit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const NAV_ITEMS = [
  { id: 'home', label: 'Лента', icon: Home },
  { id: 'friends', label: 'Друзья', icon: Users },
  { id: 'messages', label: 'Сообщения', icon: MessageCircle },
  { id: 'communities', label: 'Сообщества', icon: LayoutGrid },
  { id: 'profile', label: 'Профиль', icon: User },
];

const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%23e2e8f0'/%3E%3Ccircle cx='12' cy='9' r='4' fill='%2394a3b8'/%3E%3Cpath d='M20 21a8 8 0 0 0-16 0' fill='%2394a3b8'/%3E%3C/svg%3E";
const DEFAULT_COVER = "https://picsum.photos/seed/vkcover/1200/400";

const MOCK_STORIES = [
  { id: 1, name: 'Ваш', avatar: DEFAULT_AVATAR, isAdd: true },
  { id: 2, name: 'Алексей', avatar: 'https://picsum.photos/seed/s1/100/100', hasUnseen: true },
  { id: 3, name: 'Мария', avatar: 'https://picsum.photos/seed/s2/100/100', hasUnseen: true },
  { id: 4, name: 'Дизайн', avatar: 'https://picsum.photos/seed/s3/100/100', hasUnseen: false },
  { id: 5, name: 'IT News', avatar: 'https://picsum.photos/seed/s4/100/100', hasUnseen: true },
  { id: 6, name: 'Спорт', avatar: 'https://picsum.photos/seed/s5/100/100', hasUnseen: false },
];

const MOCK_POSTS = [
  {
    id: 1,
    author: { name: 'Дизайн и Архитектура', avatar: 'https://picsum.photos/seed/community1/100/100' },
    time: 'Сегодня в 14:30',
    text: 'Современный минимализм в интерьере. Как вам такие решения? Делитесь мнением в комментариях! 👇',
    image: 'https://picsum.photos/seed/interior/800/500',
    likes: 342,
    comments: 45,
    shares: 12
  },
  {
    id: 2,
    author: { name: 'Алексей Смирнов', avatar: 'https://picsum.photos/seed/randomUser1/100/100' },
    time: 'Вчера в 18:00',
    text: 'Наконец-то закончил новый проект! Было сложно, но результат того стоил. 🚀',
    image: null,
    likes: 56,
    comments: 4,
    shares: 1
  }
];

const MOCK_COMMENTS = [
  { id: 1, author: 'Елена В.', avatar: 'https://picsum.photos/seed/c1/100/100', text: 'Очень круто выглядит!', time: '1 час назад' },
  { id: 2, author: 'Максим', avatar: 'https://picsum.photos/seed/c2/100/100', text: 'Согласен, особенно цвета подобраны отлично.', time: '45 минут назад' },
];

const MOCK_FRIENDS = [
  { id: 'alex_smirnov', name: 'Алексей Смирнов', avatar: 'https://picsum.photos/seed/randomUser1/100/100', isOnline: true, lastSeen: '' },
  { id: 'maria_k', name: 'Мария Ковалева', avatar: 'https://picsum.photos/seed/randomUser2/100/100', isOnline: false, lastSeen: 'Был(а) 2 часа назад' },
  { id: 'ivan_d', name: 'Иван Дмитриев', avatar: 'https://picsum.photos/seed/randomUser3/100/100', isOnline: true, lastSeen: '' },
];

const MOCK_INCOMING_REQUESTS = [
  { id: 'elena_v', name: 'Елена Волкова', avatar: 'https://picsum.photos/seed/randomUser4/100/100', mutual: 3 },
];

const MOCK_OUTGOING_REQUESTS = [
  { id: 'dmitry_p', name: 'Дмитрий Петров', avatar: 'https://picsum.photos/seed/randomUser5/100/100' },
];

const MOCK_RECOMMENDED = [
  { id: 'anna_s', name: 'Анна Соколова', avatar: 'https://picsum.photos/seed/randomUser6/100/100', mutual: 5 },
  { id: 'sergey_m', name: 'Сергей Морозов', avatar: 'https://picsum.photos/seed/randomUser7/100/100', mutual: 1 },
];

const MOCK_COMMUNITIES = [
  { id: 1, name: 'Дизайн и Архитектура', description: 'Современные тренды в дизайне, архитектуре и искусстве.', members: '1.2M', avatar: 'https://picsum.photos/seed/community1/100/100', cover: 'https://picsum.photos/seed/cover1/600/200' },
  { id: 2, name: 'IT News', description: 'Свежие новости из мира технологий и программирования.', members: '850K', avatar: 'https://picsum.photos/seed/community2/100/100', cover: 'https://picsum.photos/seed/cover2/600/200' },
];

const MOCK_CHANNELS = [
  { id: 'news', name: 'Новости', isReadOnly: true, icon: Newspaper },
  { id: 'general', name: 'Общий чат', isReadOnly: false, icon: Hash },
  { id: 'media', name: 'Медиа', isReadOnly: false, icon: ImageIcon },
  { id: 'offtop', name: 'Оффтоп', isReadOnly: false, icon: Coffee },
];

const MOCK_COMMUNITY_MEMBERS = [
  { id: 1, name: 'Алексей Смирнов', avatar: 'https://picsum.photos/seed/randomUser1/100/100', role: 'Админ' },
  { id: 2, name: 'Мария Ковалева', avatar: 'https://picsum.photos/seed/randomUser2/100/100', role: 'Участник' },
  { id: 3, name: 'Иван Дмитриев', avatar: 'https://picsum.photos/seed/randomUser3/100/100', role: 'Участник' },
];

const MOCK_CHAT_MESSAGES = [
  { id: 1, type: 'date', text: 'Вчера' },
  { id: 2, type: 'text', text: 'Привет! Как дела? Видел новый дизайн?', sender: 'other', time: '12:30', status: 'read' },
  { id: 3, type: 'text', text: 'Привет! Да, выглядит очень круто. Особенно glassmorphism.', sender: 'me', time: '12:35', status: 'read' },
  { id: 4, type: 'image', url: 'https://picsum.photos/seed/chat1/400/300', sender: 'other', time: '12:40', status: 'read' },
  { id: 5, type: 'date', text: 'Сегодня' },
  { id: 6, type: 'voice', duration: '0:15', sender: 'me', time: '10:15', status: 'read' },
  { id: 7, type: 'text', text: 'Скинул тебе правки на почту. Глянь как будет время.', sender: 'me', time: '10:16', status: 'sent' },
];

export default function App() {
  const [isRegistered, setIsRegistered] = useState(() => {
    return localStorage.getItem('isRegistered') === 'true';
  });
  const [activeTab, setActiveTab] = useState('home');
  
  // Состояния для профиля
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [viewingProfile, setViewingProfile] = useState<{ id: string, name: string, avatar: string, isFriend?: boolean, isOnline?: boolean, lastSeen?: string, about?: string } | null>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  // Состояния для друзей
  const [friendsTab, setFriendsTab] = useState<'all' | 'requests' | 'add'>('all');
  const [friendsSearch, setFriendsSearch] = useState('');
  const [addFriendSearch, setAddFriendSearch] = useState('');

  // Состояния для чата
  const [activeChat, setActiveChat] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState(MOCK_CHAT_MESSAGES);
  const [newChatMessage, setNewChatMessage] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Состояния для сообществ
  const [communitiesSearch, setCommunitiesSearch] = useState('');
  const [activeCommunity, setActiveCommunity] = useState<any>(null);
  const [activeChannel, setActiveChannel] = useState<any>(MOCK_CHANNELS[0]);
  const [communityView, setCommunityView] = useState<'chat' | 'members'>('chat');
  const [isCreatingCommunity, setIsCreatingCommunity] = useState(false);
  const [isCommunitySettingsOpen, setIsCommunitySettingsOpen] = useState(false);

  // Состояния админ-панели
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [adminTab, setAdminTab] = useState('dashboard');

  useEffect(() => {
    if (activeChat) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeChat]);

  const handleSendMessage = () => {
    if (!newChatMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      type: 'text',
      text: newChatMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    setChatMessages([...chatMessages, newMsg]);
    setNewChatMessage('');
  };

  const handleDeleteMessage = (id: number) => {
    setChatMessages(chatMessages.filter(m => m.id !== id));
    setSelectedMessageId(null);
  };

  // Состояния для регистрации
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Логика проверки пароля
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 0) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strengthScore = getPasswordStrength(password);
  const strengthColors = ['bg-gray-300', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-400', 'bg-green-600'];
  const strengthLabels = ['', 'Очень слабый', 'Слабый', 'Средний', 'Хороший', 'Надежный'];

  if (!isRegistered) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-vk-bg px-6 font-sans">
        {/* Анимированный логотип */}
        <motion.div
          initial={{ scale: 0, rotate: -90, borderRadius: "50%" }}
          animate={{ scale: 1, rotate: 0, borderRadius: "25%" }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="w-20 h-20 bg-vk-accent flex items-center justify-center shadow-lg mb-6 text-white"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Aperture size={40} strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Название */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-3xl font-bold text-vk-text mb-8 tracking-tight"
        >
          RDIS Social
        </motion.h1>

        {/* Форма регистрации */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="w-full max-w-sm flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem('isRegistered', 'true');
            setIsRegistered(true);
          }}
        >
          <input 
            type="text" 
            placeholder="Имя" 
            required
            className="w-full bg-vk-panel border border-vk-border/50 rounded-xl px-4 py-3.5 outline-none focus:border-vk-accent transition-colors text-vk-text placeholder:text-vk-text-muted" 
          />
          <input 
            type="email" 
            placeholder="Email" 
            required
            className="w-full bg-vk-panel border border-vk-border/50 rounded-xl px-4 py-3.5 outline-none focus:border-vk-accent transition-colors text-vk-text placeholder:text-vk-text-muted" 
          />
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Пароль" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-vk-panel border border-vk-border/50 rounded-xl px-4 py-3.5 pr-12 outline-none focus:border-vk-accent transition-colors text-vk-text placeholder:text-vk-text-muted" 
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-vk-text-muted hover:text-vk-text transition-colors outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {/* Индикатор надежности пароля */}
          {password.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex flex-col gap-1.5 px-1"
            >
              <div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden bg-black/5">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div 
                    key={level} 
                    className={`h-full flex-1 transition-colors duration-300 ${level <= strengthScore ? strengthColors[strengthScore] : 'bg-transparent'}`}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className={`font-medium ${strengthScore <= 2 ? 'text-red-500' : strengthScore <= 3 ? 'text-yellow-500' : 'text-green-500'}`}>
                  {strengthLabels[strengthScore]}
                </span>
                <span className="text-vk-text-muted">
                  {password.length}/8+ символов
                </span>
              </div>
            </motion.div>
          )}

          <button 
            type="submit" 
            className="w-full bg-vk-accent text-white font-medium rounded-xl px-4 py-3.5 mt-2 hover:opacity-90 active:scale-[0.98] transition-all"
          >
            Зарегистрироваться
          </button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-vk-bg text-vk-text font-sans relative">
      {/* Контентная область */}
      <div className={`flex-1 flex flex-col overflow-hidden relative transition-opacity duration-300 ${activeChat || activeCommunity ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {viewingProfile ? (
          <div className="flex-1 flex flex-col w-full h-full overflow-y-auto bg-vk-bg pb-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col w-full">
              {/* Обложка и шапка */}
              <div className="relative h-48 sm:h-64 w-full">
                <img 
                  src={`https://picsum.photos/seed/${viewingProfile.id}cover/1200/400`} 
                  alt="Cover" 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#f0f9ff]"></div>
                
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setViewingProfile(null)} 
                      className="p-2 text-white hover:bg-black/20 rounded-full backdrop-blur-md transition-all outline-none"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <h2 className="text-white font-bold text-xl drop-shadow-md">Профиль</h2>
                  </div>
                </div>
              </div>

              {/* Информация пользователя */}
              <div className="px-4 relative max-w-md mx-auto w-full">
                <div className="flex flex-col items-center -mt-20 sm:-mt-24 mb-8">
                  <motion.div 
                    className="relative mb-4"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  >
                    <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-[4px] border-[#f0f9ff] bg-vk-panel overflow-hidden shadow-2xl backdrop-blur-md">
                      <img src={viewingProfile.avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-8 h-8 sm:w-9 sm:h-9 bg-green-500 rounded-full border-[4px] border-[#f0f9ff] shadow-sm" />
                  </motion.div>

                  <div className="text-center mb-5">
                    <h2 className="text-3xl font-extrabold leading-tight tracking-tight drop-shadow-sm animate-text-shimmer">{viewingProfile.name}</h2>
                    <div className="flex items-center justify-center gap-1.5 mt-1 mb-1">
                      {viewingProfile.isOnline ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>
                          <span className="text-sm font-medium text-green-600">В сети</span>
                        </>
                      ) : (
                        <span className="text-sm font-medium text-vk-text-muted">{viewingProfile.lastSeen || 'Был(а) недавно'}</span>
                      )}
                    </div>
                    <p className="text-vk-text-muted text-sm font-medium">@{viewingProfile.id} • Москва, Россия</p>
                  </div>

                  {viewingProfile.about && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="text-center px-4 mb-6 text-sm text-vk-text leading-relaxed"
                    >
                      {viewingProfile.about.split('\n').map((line, i) => (
                        <React.Fragment key={i}>{line}<br/></React.Fragment>
                      ))}
                    </motion.div>
                  )}

                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <span className="bg-vk-accent/10 text-vk-accent px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-vk-accent/20 transition-colors">Музыка</span>
                    <span className="bg-vk-accent/10 text-vk-accent px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-vk-accent/20 transition-colors">Дизайн</span>
                    <span className="bg-vk-accent/10 text-vk-accent px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-vk-accent/20 transition-colors">Спорт</span>
                    <span className="bg-vk-accent/10 text-vk-accent px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-vk-accent/20 transition-colors">Путешествия</span>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        setViewingProfile(null);
                        setActiveChat({ id: viewingProfile.id, name: viewingProfile.name, avatar: viewingProfile.avatar, isOnline: viewingProfile.isOnline });
                      }}
                      className="bg-vk-accent text-white px-8 py-3 rounded-full font-semibold text-base shadow-lg hover:opacity-90 active:scale-95 transition-all backdrop-blur-md flex items-center gap-2"
                    >
                      <MessageCircle size={20} /> Сообщение
                    </button>
                    {viewingProfile.isFriend ? (
                      <button className="bg-vk-panel border border-black/10 text-vk-text px-8 py-3 rounded-full font-semibold text-base shadow-lg hover:bg-black/5 active:scale-95 transition-all backdrop-blur-md flex items-center gap-2">
                        <UserMinus size={20} /> Убрать
                      </button>
                    ) : (
                      <button className="bg-vk-panel border border-black/10 text-vk-text px-8 py-3 rounded-full font-semibold text-base shadow-lg hover:bg-black/5 active:scale-95 transition-all backdrop-blur-md flex items-center gap-2">
                        <UserPlus size={20} /> Добавить
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Блок фотографий */}
              <div className="w-full max-w-3xl mx-auto px-4 sm:px-4 mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-[13px] font-bold text-vk-text-muted uppercase tracking-wider">Фотографии</h3>
                  <span className="text-sm text-vk-accent cursor-pointer hover:underline">Показать все</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                      <img src={`https://picsum.photos/seed/${viewingProfile.id}photo${i}/300/300`} alt={`Photo ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Стена публикаций на всю ширину */}
              <div className="w-full max-w-3xl mx-auto flex flex-col sm:px-4 mb-8 pb-20">
                <h3 className="text-[11px] font-bold text-vk-text-muted mb-2 mt-2 uppercase tracking-wider px-5 sm:px-1">Стена</h3>
                
                <div className="bg-vk-panel border-y border-black/10 sm:border sm:rounded-2xl shadow-lg backdrop-blur-md flex flex-col divide-y divide-black/10">
                  {/* Закрепленный пост */}
                  <div className="p-4 bg-vk-accent/5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img src={viewingProfile.avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-vk-text">{viewingProfile.name}</h4>
                          <p className="text-xs text-vk-text-muted">21 марта в 10:00</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-vk-accent flex items-center gap-1 bg-vk-accent/10 px-2 py-1 rounded-md">
                          <Pin size={14} /> Закреплено
                        </span>
                        <button className="text-vk-text-muted hover:text-vk-text p-1">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-vk-text mb-3 leading-relaxed">
                      Привет! Рад видеть вас на моей странице. Я увлекаюсь дизайном и музыкой. Давайте общаться! 👋
                    </div>
                    <div className="flex items-center gap-4 pt-1">
                      <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-red-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full">
                        <Heart size={18} />
                        <span className="text-xs font-medium">45</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-blue-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full">
                        <MessageCircle size={18} />
                        <span className="text-xs font-medium">12</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-green-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full ml-auto">
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Пост 1 */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img src={viewingProfile.avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-vk-text">{viewingProfile.name}</h4>
                          <p className="text-xs text-vk-text-muted">Вчера в 15:20</p>
                        </div>
                      </div>
                      <button className="text-vk-text-muted hover:text-vk-text p-1">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                    <div className="text-sm text-vk-text mb-3 leading-relaxed">
                      Отличный день! ☀️
                    </div>
                    <div className="flex items-center gap-4 pt-1">
                      <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-red-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full">
                        <Heart size={18} />
                        <span className="text-xs font-medium">12</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-blue-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full">
                        <MessageCircle size={18} />
                        <span className="text-xs font-medium">1</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-green-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full ml-auto">
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : activeTab === 'friends' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col w-full h-full overflow-y-auto bg-vk-bg pb-20 px-4 pt-6 sm:px-8">
            <div className="max-w-3xl mx-auto w-full">
              <h2 className="text-2xl font-bold text-vk-text mb-6">Друзья</h2>
              
              {/* Навигация друзей */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <button 
                  onClick={() => setFriendsTab('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${friendsTab === 'all' ? 'bg-vk-accent text-white' : 'bg-vk-panel text-vk-text hover:bg-black/5'}`}
                >
                  Все друзья
                </button>
                <button 
                  onClick={() => setFriendsTab('requests')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${friendsTab === 'requests' ? 'bg-vk-accent text-white' : 'bg-vk-panel text-vk-text hover:bg-black/5'}`}
                >
                  Заявки <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">1</span>
                </button>
                <button 
                  onClick={() => setFriendsTab('add')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${friendsTab === 'add' ? 'bg-vk-accent text-white' : 'bg-vk-panel text-vk-text hover:bg-black/5'}`}
                >
                  Поиск
                </button>
              </div>

              {friendsTab === 'all' && (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-vk-text-muted" size={18} />
                    <input 
                      type="text" 
                      placeholder="Поиск друзей" 
                      value={friendsSearch}
                      onChange={(e) => setFriendsSearch(e.target.value)}
                      className="w-full bg-vk-panel border border-black/10 rounded-xl py-3 pl-10 pr-4 text-vk-text placeholder-vk-text-muted focus:outline-none focus:border-vk-accent transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    {MOCK_FRIENDS.filter(f => f.name.toLowerCase().includes(friendsSearch.toLowerCase())).map(friend => (
                      <div 
                        key={friend.id}
                        onClick={() => setViewingProfile({ id: friend.id, name: friend.name, avatar: friend.avatar, isFriend: true, isOnline: friend.isOnline, lastSeen: friend.lastSeen, about: 'Информация профиля...' })}
                        className="bg-vk-panel border border-black/10 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:bg-black/5 transition-colors cursor-pointer"
                      >
                        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 relative">
                          <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          {friend.isOnline && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-vk-panel" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-bold text-vk-text">{friend.name}</h4>
                          <p className="text-sm text-vk-text-muted">{friend.isOnline ? 'Online' : friend.lastSeen}</p>
                        </div>
                        <button 
                          className="w-10 h-10 rounded-full bg-vk-accent/10 text-vk-accent flex items-center justify-center hover:bg-vk-accent/20 transition-colors" 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setActiveChat({ id: friend.id, name: friend.name, avatar: friend.avatar, isOnline: friend.isOnline }); 
                          }}
                        >
                          <MessageCircle size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {friendsTab === 'requests' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-vk-text-muted uppercase tracking-wider mb-3">Входящие заявки</h3>
                    <div className="space-y-2">
                      {MOCK_INCOMING_REQUESTS.map(req => (
                        <div key={req.id} className="bg-vk-panel border border-black/10 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                          <div 
                            className="w-14 h-14 rounded-full overflow-hidden shrink-0 cursor-pointer"
                            onClick={() => setViewingProfile({ id: req.id, name: req.name, avatar: req.avatar, isFriend: false, isOnline: true, about: 'Информация профиля...' })}
                          >
                            <img src={req.avatar} alt={req.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div className="flex-1">
                            <h4 
                              className="text-base font-bold text-vk-text cursor-pointer hover:underline"
                              onClick={() => setViewingProfile({ id: req.id, name: req.name, avatar: req.avatar, isFriend: false, isOnline: true, about: 'Информация профиля...' })}
                            >
                              {req.name}
                            </h4>
                            <p className="text-sm text-vk-text-muted">{req.mutual} общих друзей</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full bg-vk-accent text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                              <Check size={20} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-black/5 text-vk-text flex items-center justify-center hover:bg-black/10 transition-colors">
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-vk-text-muted uppercase tracking-wider mb-3">Исходящие заявки</h3>
                    <div className="space-y-2">
                      {MOCK_OUTGOING_REQUESTS.map(req => (
                        <div key={req.id} className="bg-vk-panel border border-black/10 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                          <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                            <img src={req.avatar} alt={req.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-base font-bold text-vk-text">{req.name}</h4>
                            <p className="text-sm text-vk-text-muted">Подписаны</p>
                          </div>
                          <button className="px-4 py-2 rounded-full bg-black/5 text-vk-text text-sm font-medium hover:bg-black/10 transition-colors">
                            Отменить
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {friendsTab === 'add' && (
                <div className="space-y-6">
                  <div className="relative flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-vk-text-muted" size={18} />
                      <input 
                        type="text" 
                        placeholder="Имя или ID пользователя" 
                        value={addFriendSearch}
                        onChange={(e) => setAddFriendSearch(e.target.value)}
                        className="w-full bg-vk-panel border border-black/10 rounded-xl py-3 pl-10 pr-4 text-vk-text placeholder-vk-text-muted focus:outline-none focus:border-vk-accent transition-colors"
                      />
                    </div>
                    <button className="bg-vk-accent text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
                      Найти
                    </button>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-vk-text-muted uppercase tracking-wider mb-3">Возможно, вы знакомы</h3>
                    <div className="space-y-2">
                      {MOCK_RECOMMENDED.map(rec => (
                        <div key={rec.id} className="bg-vk-panel border border-black/10 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                          <div 
                            className="w-14 h-14 rounded-full overflow-hidden shrink-0 cursor-pointer"
                            onClick={() => setViewingProfile({ id: rec.id, name: rec.name, avatar: rec.avatar, isFriend: false, isOnline: false, lastSeen: 'Был(а) недавно', about: 'Информация профиля...' })}
                          >
                            <img src={rec.avatar} alt={rec.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div className="flex-1">
                            <h4 
                              className="text-base font-bold text-vk-text cursor-pointer hover:underline"
                              onClick={() => setViewingProfile({ id: rec.id, name: rec.name, avatar: rec.avatar, isFriend: false, isOnline: false, lastSeen: 'Был(а) недавно', about: 'Информация профиля...' })}
                            >
                              {rec.name}
                            </h4>
                            <p className="text-sm text-vk-text-muted">{rec.mutual} общих друзей</p>
                          </div>
                          <button className="w-10 h-10 rounded-full bg-vk-accent/10 text-vk-accent flex items-center justify-center hover:bg-vk-accent/20 transition-colors">
                            <UserPlus size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : activeTab === 'messages' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col w-full h-full overflow-y-auto bg-vk-bg pb-20 px-4 pt-6 sm:px-8">
            <div className="max-w-3xl mx-auto w-full">
              <h2 className="text-2xl font-bold text-vk-text mb-6">Сообщения</h2>
              <div 
                onClick={() => setActiveChat({ id: 'alex_smirnov', name: 'Алексей Смирнов', avatar: 'https://picsum.photos/seed/randomUser1/100/100', isOnline: true })}
                className="bg-vk-panel border border-black/10 rounded-2xl p-4 flex items-center gap-4 shadow-lg backdrop-blur-md cursor-pointer hover:bg-black/5 transition-colors"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 relative">
                  <img src="https://picsum.photos/seed/randomUser1/100/100" alt="Friend Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-vk-panel" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-base font-bold text-vk-text truncate">Алексей Смирнов</h4>
                    <span className="text-xs text-vk-text-muted shrink-0">12:30</span>
                  </div>
                  <p className="text-sm text-vk-text-muted truncate">Привет! Как дела? Видел новый дизайн?</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'communities' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col w-full h-full overflow-y-auto bg-vk-bg pb-20 px-4 pt-6 sm:px-8">
            <div className="max-w-3xl mx-auto w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-vk-text">Сообщества</h2>
                <button 
                  onClick={() => setIsCreatingCommunity(true)}
                  className="w-10 h-10 rounded-full bg-vk-accent/10 text-vk-accent flex items-center justify-center hover:bg-vk-accent/20 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-vk-text-muted" size={18} />
                <input 
                  type="text" 
                  placeholder="Поиск сообществ" 
                  value={communitiesSearch}
                  onChange={(e) => setCommunitiesSearch(e.target.value)}
                  className="w-full bg-vk-panel border border-black/10 rounded-xl py-3 pl-10 pr-4 text-vk-text placeholder-vk-text-muted focus:outline-none focus:border-vk-accent transition-colors shadow-sm"
                />
              </div>

              <div className="space-y-3">
                {MOCK_COMMUNITIES.filter(c => c.name.toLowerCase().includes(communitiesSearch.toLowerCase())).map(community => (
                  <div 
                    key={community.id}
                    onClick={() => {
                      setActiveCommunity(community);
                      setActiveChannel(MOCK_CHANNELS[0]);
                      setCommunityView('chat');
                    }}
                    className="bg-vk-panel border border-black/10 rounded-2xl p-4 flex items-center gap-4 shadow-sm cursor-pointer hover:bg-black/5 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative">
                      <img src={community.avatar} alt={community.name} className="w-full h-full object-cover relative z-10" referrerPolicy="no-referrer" />
                      <img src={community.cover} className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="text-base font-bold text-vk-text truncate">{community.name}</h4>
                      <p className="text-sm text-vk-text-muted truncate mb-1">{community.description}</p>
                      <p className="text-xs font-medium text-vk-accent">{community.members} участников</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'home' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col w-full h-full overflow-y-auto bg-vk-bg pb-20">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-vk-panel/80 backdrop-blur-md sticky top-0 z-20 border-b border-black/5">
              <h1 className="text-xl font-bold text-vk-text">Лента</h1>
              <div className="flex items-center gap-3">
                <button className="p-2 text-vk-text hover:bg-black/5 rounded-full transition-colors"><Search size={22} /></button>
                <button className="p-2 text-vk-text hover:bg-black/5 rounded-full transition-colors"><Bell size={22} /></button>
              </div>
            </div>

            {/* Stories */}
            <div className="py-4 bg-vk-panel border-b border-black/5 mb-2">
              <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar">
                {MOCK_STORIES.map(story => (
                  <div key={story.id} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer">
                    <div className={`w-16 h-16 rounded-full p-[2px] ${story.hasUnseen ? 'bg-gradient-to-tr from-vk-accent to-purple-500' : 'bg-transparent'}`}>
                      <div className="w-full h-full rounded-full border-2 border-vk-panel overflow-hidden relative bg-vk-panel">
                        <img src={story.avatar} alt={story.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        {story.isAdd && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
                            <Plus size={24} />
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-vk-text truncate w-16 text-center">{story.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Posts */}
            <div className="flex flex-col gap-3 sm:px-4 max-w-3xl mx-auto w-full">
              {MOCK_POSTS.map(post => (
                <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key={post.id} className="bg-vk-panel border-y border-black/10 sm:border sm:rounded-2xl shadow-sm cursor-pointer hover:bg-black/[0.02] transition-colors" onClick={() => setSelectedPost(post)}>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img src={post.author.avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-vk-text">{post.author.name}</h4>
                          <p className="text-xs text-vk-text-muted">{post.time}</p>
                        </div>
                      </div>
                      <button className="text-vk-text-muted hover:text-vk-text p-1" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                    <div className="text-sm text-vk-text mb-3 leading-relaxed">
                      {post.text}
                    </div>
                    {post.image && (
                      <div className="rounded-xl overflow-hidden mb-3 border border-black/5 -mx-4 sm:mx-0 sm:rounded-xl">
                        <img src={post.image} alt="Post content" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}
                    <div className="flex items-center gap-4 pt-1">
                      <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-red-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full" onClick={(e) => e.stopPropagation()}>
                        <Heart size={18} />
                        <span className="text-xs font-medium">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-blue-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full" onClick={(e) => e.stopPropagation()}>
                        <MessageCircle size={18} />
                        <span className="text-xs font-medium">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-green-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full ml-auto" onClick={(e) => e.stopPropagation()}>
                        <Share2 size={18} />
                        <span className="text-xs font-medium">{post.shares}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FAB Create Post */}
            <button 
              onClick={() => setIsCreatingPost(true)} 
              className="fixed bottom-20 right-4 sm:right-8 w-14 h-14 bg-vk-accent text-white rounded-full shadow-lg shadow-vk-accent/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-30"
            >
              <Plus size={28} />
            </button>
          </motion.div>
        ) : activeTab === 'profile' ? (
          <div className="flex-1 flex flex-col w-full h-full overflow-y-auto bg-vk-bg pb-20">
            {isEditingProfile ? (
              /* СОВРЕМЕННАЯ ФОРМА РЕДАКТИРОВАНИЯ */
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col w-full h-full">
                <div className="flex items-center px-4 py-4 bg-vk-bg/80 backdrop-blur-md sticky top-0 z-20">
                  <button onClick={() => setIsEditingProfile(false)} className="p-2 -ml-2 text-vk-text hover:bg-vk-panel rounded-full transition-colors">
                    <ChevronLeft size={24} />
                  </button>
                  <h2 className="text-lg font-bold ml-2">Редактирование</h2>
                </div>

                <div className="relative h-32 sm:h-48 w-full mb-12">
                  <img src={DEFAULT_COVER} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-70" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <button className="bg-black/50 text-white px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-md hover:bg-black/60 transition-colors">
                      <Camera size={18} />
                      <span className="text-sm font-medium">Изменить обложку</span>
                    </button>
                  </div>
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="relative group cursor-pointer">
                      <div className="w-24 h-24 rounded-full bg-vk-panel border-4 border-vk-bg shadow-md overflow-hidden relative">
                        <img src="https://picsum.photos/seed/user/200/200" alt="Avatar" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">
                          <Camera size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-8 max-w-md mx-auto w-full mt-4">
                  <div className="space-y-6">
                    {/* Блок: О себе */}
                    <div className="bg-vk-panel rounded-3xl p-1.5 shadow-sm border border-vk-border/40">
                      <div className="px-4 py-3">
                        <label className="text-[11px] font-bold text-vk-text-muted uppercase tracking-wider">О себе</label>
                      </div>
                      <div className="px-2 pb-2">
                        <textarea 
                          placeholder="Расскажите немного о себе..." 
                          rows={3}
                          className="w-full bg-vk-bg border-none rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-vk-accent/50 text-sm font-medium transition-all resize-none"
                          defaultValue="Создаю красивые интерфейсы и пишу чистый код. &#10;Всегда в поиске вдохновения! ✨"
                        />
                      </div>
                    </div>

                    {/* Блок: Основное */}
                    <div className="bg-vk-panel rounded-3xl p-1.5 shadow-sm border border-vk-border/40">
                      <div className="px-4 py-3">
                        <label className="text-[11px] font-bold text-vk-text-muted uppercase tracking-wider">Основное</label>
                      </div>
                      <div className="px-2 pb-2 space-y-2">
                        <input type="text" placeholder="Имя и фамилия" className="w-full bg-vk-bg border-none rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-vk-accent/50 text-sm font-medium transition-all" />
                        <select defaultValue="" className="w-full bg-vk-bg border-none rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-vk-accent/50 text-sm font-medium appearance-none text-vk-text transition-all">
                          <option value="" disabled>Пол</option>
                          <option value="male">Мужской</option>
                          <option value="female">Женский</option>
                        </select>
                        <input type="text" placeholder="User ID" className="w-full bg-vk-bg border-none rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-vk-accent/50 text-sm font-medium transition-all" />
                      </div>
                    </div>

                    {/* Блок: Контакты */}
                    <div className="bg-vk-panel rounded-3xl p-1.5 shadow-sm border border-vk-border/40">
                      <div className="px-4 py-3">
                        <label className="text-[11px] font-bold text-vk-text-muted uppercase tracking-wider">Контакты</label>
                      </div>
                      <div className="px-2 pb-2 space-y-2">
                        <div className="flex gap-2">
                          <input type="text" placeholder="Страна" className="w-1/2 bg-vk-bg border-none rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-vk-accent/50 text-sm font-medium transition-all" />
                          <input type="text" placeholder="Город" className="w-1/2 bg-vk-bg border-none rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-vk-accent/50 text-sm font-medium transition-all" />
                        </div>
                        <input type="email" placeholder="Email адрес" className="w-full bg-vk-bg border-none rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-vk-accent/50 text-sm font-medium transition-all" />
                      </div>
                    </div>

                    <button 
                      onClick={() => setIsEditingProfile(false)} 
                      className="w-full bg-vk-accent text-white font-bold rounded-2xl px-4 py-4 mt-4 shadow-lg shadow-vk-accent/20 hover:opacity-90 active:scale-[0.98] transition-all"
                    >
                      Сохранить изменения
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* СОВРЕМЕННЫЙ ВИД ПРОФИЛЯ */
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col w-full">
                {/* Обложка и шапка */}
                <div className="relative h-48 sm:h-64 w-full">
                  <img 
                    src={DEFAULT_COVER} 
                    alt="Cover" 
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#f0f9ff]"></div>
                  
                  <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
                    <h2 className="text-white font-bold text-xl drop-shadow-md">Профиль</h2>
                    <div className="flex items-center gap-2 relative">
                      <button onClick={() => setIsAdminPanelOpen(true)} className="p-2 text-white bg-vk-accent/80 hover:bg-vk-accent rounded-full backdrop-blur-md transition-all outline-none shadow-sm">
                        <ShieldAlert size={20} />
                      </button>
                      <button 
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)} 
                        className="p-2 text-white hover:bg-black/20 rounded-full backdrop-blur-md transition-all outline-none"
                      >
                        <Settings size={22} />
                      </button>
                      
                      {/* Выпадающее меню настроек */}
                      {isSettingsOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsSettingsOpen(false)} />
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="absolute right-0 mt-2 w-48 bg-vk-panel border border-vk-border/50 rounded-2xl shadow-xl py-1.5 z-50 overflow-hidden"
                          >
                            <button 
                              onClick={() => {
                                setIsSettingsOpen(false);
                                localStorage.removeItem('isRegistered');
                                setIsRegistered(false);
                                setActiveTab('home');
                              }} 
                              className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 transition-colors text-sm font-bold outline-none"
                            >
                              <LogOut size={18} />
                              Выйти из аккаунта
                            </button>
                          </motion.div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Информация пользователя */}
                <div className="px-4 relative max-w-md mx-auto w-full">
                  <div className="flex flex-col items-center -mt-20 sm:-mt-24 mb-8">
                    <motion.div 
                      className="relative mb-4"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                      <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-[4px] border-[#f0f9ff] bg-vk-panel overflow-hidden shadow-2xl backdrop-blur-md">
                        <img src={DEFAULT_AVATAR} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-8 h-8 sm:w-9 sm:h-9 bg-green-500 rounded-full border-[4px] border-[#f0f9ff] shadow-sm" />
                    </motion.div>

                    <div className="text-center mb-5">
                      <h2 className="text-3xl font-extrabold leading-tight tracking-tight drop-shadow-sm animate-text-shimmer">Имя Пользователя</h2>
                      <div className="flex items-center justify-center gap-1.5 mt-1 mb-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>
                        <span className="text-sm font-medium text-green-600">В сети</span>
                      </div>
                      <p className="text-vk-text-muted text-sm font-medium">@username • Москва, Россия</p>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="text-center px-4 mb-6 text-sm text-vk-text leading-relaxed italic"
                    >
                      "Создаю красивые интерфейсы и пишу чистый код. <br/> Всегда в поиске вдохновения! ✨"
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      <span className="bg-vk-accent/10 text-vk-accent px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-vk-accent/20 transition-colors">Программирование</span>
                      <span className="bg-vk-accent/10 text-vk-accent px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-vk-accent/20 transition-colors">Технологии</span>
                      <span className="bg-vk-accent/10 text-vk-accent px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-vk-accent/20 transition-colors">Игры</span>
                    </div>

                    <button 
                      onClick={() => setIsEditingProfile(true)}
                      className="bg-vk-panel border border-black/10 text-vk-text px-8 py-3 rounded-full font-semibold text-base shadow-lg hover:bg-black/5 active:scale-95 transition-all backdrop-blur-md"
                    >
                      Редактировать профиль
                    </button>
                  </div>
                </div>

                {/* Блок фотографий */}
                <div className="w-full max-w-3xl mx-auto px-4 sm:px-4 mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-[13px] font-bold text-vk-text-muted uppercase tracking-wider">Мои фотографии</h3>
                    <span className="text-sm text-vk-accent cursor-pointer hover:underline">Показать все</span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                        <img src={`https://picsum.photos/seed/myphoto${i}/300/300`} alt={`Photo ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Стена публикаций на всю ширину */}
                <div className="w-full max-w-3xl mx-auto flex flex-col sm:px-4 mb-8 pb-20">
                  <h3 className="text-[11px] font-bold text-vk-text-muted mb-2 mt-2 uppercase tracking-wider px-5 sm:px-1">Стена</h3>
                  
                  <div className="bg-vk-panel border-y border-black/10 sm:border sm:rounded-2xl shadow-lg backdrop-blur-md flex flex-col divide-y divide-black/10">
                    {/* Создание записи */}
                    <div className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <img src={DEFAULT_AVATAR} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 bg-black/5 rounded-full px-4 py-2.5 text-vk-text-muted text-sm cursor-text hover:bg-black/10 transition-colors">
                        Что у вас нового?
                      </div>
                      <button className="w-10 h-10 rounded-full bg-vk-accent/20 text-vk-accent flex items-center justify-center shrink-0 hover:bg-vk-accent/30 transition-colors">
                        <ImageIcon size={18} />
                      </button>
                    </div>

                    {/* Закрепленный пост */}
                    <div className="p-4 bg-vk-accent/5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img src={DEFAULT_AVATAR} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-vk-text">Имя Пользователя</h4>
                            <p className="text-xs text-vk-text-muted">1 января в 12:00</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-vk-accent flex items-center gap-1 bg-vk-accent/10 px-2 py-1 rounded-md">
                            <Pin size={14} /> Закреплено
                          </span>
                          <button className="text-vk-text-muted hover:text-vk-text p-1">
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-vk-text mb-3 leading-relaxed">
                        Добро пожаловать в мой профиль! Здесь я делюсь своими мыслями и интересными находками. 🚀
                      </div>
                      <div className="flex items-center gap-4 pt-1">
                        <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-red-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full">
                          <Heart size={18} />
                          <span className="text-xs font-medium">128</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-blue-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full">
                          <MessageCircle size={18} />
                          <span className="text-xs font-medium">24</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-green-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full ml-auto">
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Пост 1 */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img src={DEFAULT_AVATAR} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-vk-text">Имя Пользователя</h4>
                            <p className="text-xs text-vk-text-muted">Только что</p>
                          </div>
                        </div>
                        <button className="text-vk-text-muted hover:text-vk-text p-1">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                      <div className="text-sm text-vk-text mb-3 leading-relaxed">
                        Всем привет! Это моя первая запись на новой стене. Как вам новый дизайн профиля? ✨
                      </div>
                      <div className="rounded-xl overflow-hidden mb-3 border border-black/5 -mx-4 sm:mx-0 sm:rounded-xl">
                        <img src="https://picsum.photos/seed/post1/800/500" alt="Post content" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex items-center gap-4 pt-1">
                        <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-red-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full">
                          <Heart size={18} />
                          <span className="text-xs font-medium">12</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-blue-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full">
                          <MessageCircle size={18} />
                          <span className="text-xs font-medium">3</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-green-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full ml-auto">
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Пост 2 */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img src={DEFAULT_AVATAR} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-vk-text">Имя Пользователя</h4>
                            <p className="text-xs text-vk-text-muted">Вчера в 18:30</p>
                          </div>
                        </div>
                        <button className="text-vk-text-muted hover:text-vk-text p-1">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                      <div className="text-sm text-vk-text mb-3 leading-relaxed">
                        Отличный вечер для того, чтобы послушать хорошую музыку и расслабиться 🎧
                      </div>
                      <div className="flex items-center gap-4 pt-1">
                        <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-red-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full">
                          <Heart size={18} />
                          <span className="text-xs font-medium">45</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-blue-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full">
                          <MessageCircle size={18} />
                          <span className="text-xs font-medium">8</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-green-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full ml-auto">
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ) : null}
      </div>

      {/* Post Details Modal */}
      {selectedPost && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="fixed inset-0 bg-vk-bg z-50 flex flex-col">
          <div className="flex items-center px-4 py-3 bg-vk-panel/80 backdrop-blur-md sticky top-0 z-20 border-b border-black/5">
            <button onClick={() => setSelectedPost(null)} className="p-2 -ml-2 text-vk-text hover:bg-black/5 rounded-full transition-colors">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-bold ml-2">Запись</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto pb-20">
            <div className="bg-vk-panel border-b border-black/10">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img src={selectedPost.author.avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-vk-text">{selectedPost.author.name}</h4>
                      <p className="text-xs text-vk-text-muted">{selectedPost.time}</p>
                    </div>
                  </div>
                  <button className="text-vk-text-muted hover:text-vk-text p-1">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                <div className="text-base text-vk-text mb-3 leading-relaxed">
                  {selectedPost.text}
                </div>
                {selectedPost.image && (
                  <div className="rounded-xl overflow-hidden mb-3 border border-black/5 -mx-4 sm:mx-0 sm:rounded-xl">
                    <img src={selectedPost.image} alt="Post content" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                  </div>
                )}
                <div className="flex items-center gap-4 pt-2 border-t border-black/5 mt-4">
                  <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-red-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full">
                    <Heart size={18} />
                    <span className="text-xs font-medium">{selectedPost.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-blue-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full">
                    <MessageCircle size={18} />
                    <span className="text-xs font-medium">{selectedPost.comments}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-vk-text-muted hover:text-green-400 transition-colors bg-black/5 px-3 py-1.5 rounded-full ml-auto">
                    <Share2 size={18} />
                    <span className="text-xs font-medium">{selectedPost.shares}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-vk-panel mt-2 p-4 min-h-screen">
              <h3 className="font-bold text-vk-text mb-4">Комментарии ({selectedPost.comments})</h3>
              <div className="flex flex-col gap-5">
                {MOCK_COMMENTS.map(c => (
                  <div key={c.id} className="flex gap-3">
                    <img src={c.avatar} className="w-8 h-8 rounded-full shrink-0" referrerPolicy="no-referrer" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-vk-text">{c.author}</span>
                        <span className="text-xs text-vk-text-muted">{c.time}</span>
                      </div>
                      <p className="text-sm text-vk-text mt-0.5">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-vk-panel border-t border-black/10 p-3 flex items-center gap-3 pb-safe z-30">
            <img src={DEFAULT_AVATAR} className="w-8 h-8 rounded-full shrink-0" referrerPolicy="no-referrer" />
            <input type="text" placeholder="Написать комментарий..." className="flex-1 bg-black/5 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-vk-accent/50 transition-all" />
            <button className="text-vk-accent p-2 hover:bg-vk-accent/10 rounded-full transition-colors">
              <Send size={20} />
            </button>
          </div>
        </motion.div>
      )}

      {/* Chat View Overlay */}
      <AnimatePresence>
        {activeChat && (
          <motion.div 
            key="chat-view"
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-vk-bg flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-vk-panel/90 backdrop-blur-md border-b border-black/5 z-20 shadow-sm">
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveChat(null)} className="p-2 -ml-2 text-vk-text hover:bg-black/5 rounded-full transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <div 
                  className="flex items-center gap-3 cursor-pointer" 
                  onClick={() => {
                    setActiveChat(null);
                    setViewingProfile({ id: activeChat.id, name: activeChat.name, avatar: activeChat.avatar, isFriend: true, isOnline: activeChat.isOnline, about: 'Информация профиля...' });
                  }}
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <img src={activeChat.avatar} alt={activeChat.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    {activeChat.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-vk-panel" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-vk-text text-sm leading-tight">{activeChat.name}</h3>
                    <p className="text-xs text-vk-accent animate-pulse">печатает...</p>
                  </div>
                </div>
              </div>
              <button className="p-2 text-vk-text-muted hover:text-vk-text hover:bg-black/5 rounded-full transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-vk-bg relative" onClick={() => setSelectedMessageId(null)}>
              {chatMessages.map(msg => {
                if (msg.type === 'date') {
                  return (
                    <div key={msg.id} className="flex justify-center my-4">
                      <span className="bg-black/5 text-vk-text-muted text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                        {msg.text}
                      </span>
                    </div>
                  );
                }

                const isMe = msg.sender === 'me';
                
                return (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="relative group max-w-[80%] sm:max-w-[70%]">
                      <div 
                        onClick={(e) => { e.stopPropagation(); setSelectedMessageId(selectedMessageId === msg.id ? null : msg.id); }}
                        className={`p-3 shadow-sm cursor-pointer transition-transform active:scale-[0.98] ${
                          isMe 
                            ? 'bg-vk-accent text-white rounded-2xl rounded-br-sm' 
                            : 'bg-vk-panel border border-black/5 text-vk-text rounded-2xl rounded-bl-sm'
                        }`}
                      >
                        {msg.type === 'text' && (
                          <p className="text-sm break-words whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                        )}
                        {msg.type === 'image' && (
                          <div className="rounded-xl overflow-hidden -mx-1 -mt-1 mb-1">
                            <img src={msg.url} alt="Attachment" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                          </div>
                        )}
                        {msg.type === 'voice' && (
                          <div className="flex items-center gap-3 min-w-[160px]">
                            <button className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isMe ? 'bg-white/20 text-white' : 'bg-vk-accent/10 text-vk-accent'}`}>
                              <Play size={18} className="ml-1" />
                            </button>
                            <div className="flex-1 h-1.5 bg-black/10 rounded-full overflow-hidden relative">
                              <div className={`absolute left-0 top-0 bottom-0 w-1/3 rounded-full ${isMe ? 'bg-white' : 'bg-vk-accent'}`} />
                            </div>
                            <span className={`text-xs font-medium ${isMe ? 'text-white/80' : 'text-vk-text-muted'}`}>{msg.duration}</span>
                          </div>
                        )}
                        
                        <div className={`flex items-center justify-end gap-1 mt-1.5 ${isMe ? 'text-white/70' : 'text-vk-text-muted'}`}>
                          <span className="text-[10px] font-medium">{msg.time}</span>
                          {isMe && (
                            msg.status === 'read' ? <CheckCheck size={14} /> : <Check size={14} />
                          )}
                        </div>
                      </div>

                      {/* Context Menu */}
                      <AnimatePresence>
                        {selectedMessageId === msg.id && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: isMe ? -10 : 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: isMe ? -10 : 10 }}
                            className={`absolute ${isMe ? 'top-full right-0 mt-2' : 'bottom-full left-0 mb-2'} bg-vk-panel border border-black/10 shadow-xl rounded-xl p-1.5 z-30 flex flex-col min-w-[140px] backdrop-blur-xl`}
                          >
                            <button className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-vk-text hover:bg-black/5 rounded-lg transition-colors">
                              <Copy size={16} className="text-vk-text-muted" /> Копировать
                            </button>
                            <button className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-vk-text hover:bg-black/5 rounded-lg transition-colors">
                              <Reply size={16} className="text-vk-text-muted" /> Ответить
                            </button>
                            <div className="h-px bg-black/5 my-1 mx-2" />
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleDeleteMessage(msg.id); }} 
                              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} /> Удалить
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
              <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-vk-panel/90 backdrop-blur-md border-t border-black/5 z-20">
              <div className="flex items-end gap-2 max-w-4xl mx-auto w-full">
                <button className="p-2.5 text-vk-text-muted hover:text-vk-text hover:bg-black/5 rounded-full transition-colors shrink-0">
                  <Paperclip size={22} />
                </button>
                
                <div className="flex-1 bg-black/5 border border-black/5 rounded-2xl flex items-end relative transition-colors focus-within:bg-white focus-within:border-vk-accent/30 focus-within:shadow-sm">
                  <textarea 
                    value={newChatMessage} 
                    onChange={e => setNewChatMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Сообщение..." 
                    className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-3 px-4 text-sm text-vk-text placeholder-vk-text-muted"
                    rows={1}
                  />
                  <button className="p-2.5 text-vk-text-muted hover:text-vk-text transition-colors shrink-0 mb-0.5 mr-0.5">
                    <Smile size={22} />
                  </button>
                </div>

                {newChatMessage.trim() ? (
                  <motion.button 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileTap={{ scale: 0.9 }} 
                    onClick={handleSendMessage} 
                    className="w-11 h-11 bg-vk-accent text-white rounded-full shadow-md flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
                  >
                    <Send size={20} className="ml-1" />
                  </motion.button>
                ) : (
                  <button className="w-11 h-11 text-vk-text-muted hover:text-vk-text hover:bg-black/5 rounded-full flex items-center justify-center transition-colors shrink-0">
                    <Mic size={22} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Community View Overlay */}
      <AnimatePresence>
        {activeCommunity && (
          <motion.div 
            key="community-view"
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-vk-bg flex flex-col"
          >
            {/* Header with Cover */}
            <div className="relative h-32 sm:h-40 shrink-0">
              <img src={activeCommunity.cover} className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center z-10">
                <button onClick={() => setActiveCommunity(null)} className="p-2 text-white hover:bg-white/20 rounded-full backdrop-blur-md transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={() => setIsCommunitySettingsOpen(true)} className="p-2 text-white hover:bg-white/20 rounded-full backdrop-blur-md transition-colors">
                  <MoreVertical size={24} />
                </button>
              </div>
              <div className="absolute -bottom-8 left-4 flex items-end gap-3 z-10">
                <div className="w-20 h-20 rounded-2xl border-4 border-vk-bg overflow-hidden bg-vk-panel shadow-md">
                  <img src={activeCommunity.avatar} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
            
            <div className="px-4 pt-10 pb-4 bg-vk-panel border-b border-black/5 shrink-0">
              <h2 className="text-xl font-bold text-vk-text leading-tight">{activeCommunity.name}</h2>
              <p className="text-sm text-vk-text-muted mt-1">{activeCommunity.members} участников</p>
            </div>

            {/* Channels & Tabs Navigation */}
            <div className="bg-vk-panel border-b border-black/5 shrink-0">
              <div className="flex gap-2 px-4 py-2 overflow-x-auto no-scrollbar">
                {MOCK_CHANNELS.map(ch => (
                  <button 
                    key={ch.id}
                    onClick={() => { setCommunityView('chat'); setActiveChannel(ch); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${communityView === 'chat' && activeChannel?.id === ch.id ? 'bg-vk-accent text-white' : 'bg-black/5 text-vk-text hover:bg-black/10'}`}
                  >
                    <ch.icon size={16} /> {ch.name}
                  </button>
                ))}
                <button 
                  onClick={() => setCommunityView('members')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${communityView === 'members' ? 'bg-vk-accent text-white' : 'bg-black/5 text-vk-text hover:bg-black/10'}`}
                >
                  <UsersRound size={16} /> Участники
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative flex flex-col bg-vk-bg">
              {communityView === 'chat' ? (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Chat Messages */}
                    {chatMessages.map(msg => {
                      if (msg.type === 'date') {
                        return (
                          <div key={msg.id} className="flex justify-center my-4">
                            <span className="bg-black/5 text-vk-text-muted text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                              {msg.text}
                            </span>
                          </div>
                        );
                      }
                      const isMe = msg.sender === 'me';
                      return (
                        <div key={msg.id} className={`flex gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                          {!isMe && (
                            <img src={MOCK_COMMUNITY_MEMBERS[1].avatar} className="w-8 h-8 rounded-full shrink-0 mt-auto" referrerPolicy="no-referrer" />
                          )}
                          <div className={`relative group max-w-[75%] sm:max-w-[65%] p-3 shadow-sm ${isMe ? 'bg-vk-accent text-white rounded-2xl rounded-br-sm' : 'bg-vk-panel border border-black/5 text-vk-text rounded-2xl rounded-bl-sm'}`}>
                            {!isMe && <p className="text-xs font-bold text-vk-accent mb-1">{MOCK_COMMUNITY_MEMBERS[1].name}</p>}
                            {msg.type === 'text' && <p className="text-sm break-words whitespace-pre-wrap leading-relaxed">{msg.text}</p>}
                            {msg.type === 'image' && (
                              <div className="rounded-xl overflow-hidden -mx-1 -mt-1 mb-1">
                                <img src={msg.url} alt="Attachment" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                              </div>
                            )}
                            <div className={`flex items-center justify-end gap-1 mt-1.5 ${isMe ? 'text-white/70' : 'text-vk-text-muted'}`}>
                              <span className="text-[10px] font-medium">{msg.time}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Input Area */}
                  {activeChannel?.isReadOnly ? (
                    <div className="p-4 bg-vk-panel/90 backdrop-blur-md border-t border-black/5 text-center text-vk-text-muted text-sm font-medium">
                      Только администраторы могут писать в этот канал
                    </div>
                  ) : (
                    <div className="p-3 bg-vk-panel/90 backdrop-blur-md border-t border-black/5 z-20">
                      <div className="flex items-end gap-2 max-w-4xl mx-auto w-full">
                        <button className="p-2.5 text-vk-text-muted hover:text-vk-text hover:bg-black/5 rounded-full transition-colors shrink-0">
                          <Paperclip size={22} />
                        </button>
                        <div className="flex-1 bg-black/5 border border-black/5 rounded-2xl flex items-end relative transition-colors focus-within:bg-white focus-within:border-vk-accent/30 focus-within:shadow-sm">
                          <textarea 
                            placeholder="Сообщение..." 
                            className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-3 px-4 text-sm text-vk-text placeholder-vk-text-muted"
                            rows={1}
                          />
                          <button className="p-2.5 text-vk-text-muted hover:text-vk-text transition-colors shrink-0 mb-0.5 mr-0.5">
                            <Smile size={22} />
                          </button>
                        </div>
                        <button className="w-11 h-11 text-vk-text-muted hover:text-vk-text hover:bg-black/5 rounded-full flex items-center justify-center transition-colors shrink-0">
                          <Mic size={22} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-vk-text-muted" size={18} />
                    <input 
                      type="text" 
                      placeholder="Поиск участников" 
                      className="w-full bg-vk-panel border border-black/10 rounded-xl py-3 pl-10 pr-4 text-vk-text placeholder-vk-text-muted focus:outline-none focus:border-vk-accent transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    {MOCK_COMMUNITY_MEMBERS.map(member => (
                      <div key={member.id} className="bg-vk-panel border border-black/10 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                        <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                        <div className="flex-1">
                          <h4 className="text-base font-bold text-vk-text">{member.name}</h4>
                          <p className={`text-xs font-medium ${member.role === 'Админ' ? 'text-vk-accent' : 'text-vk-text-muted'}`}>{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Community Modal */}
      <AnimatePresence>
        {isCreatingCommunity && (
          <motion.div key="create-community" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed inset-0 bg-vk-bg z-50 flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-vk-panel/80 backdrop-blur-md sticky top-0 z-20 border-b border-black/5">
              <div className="flex items-center gap-2">
                <button onClick={() => setIsCreatingCommunity(false)} className="p-2 -ml-2 text-vk-text hover:bg-black/5 rounded-full transition-colors">
                  <X size={24} />
                </button>
                <h2 className="text-lg font-bold">Новое сообщество</h2>
              </div>
              <button onClick={() => setIsCreatingCommunity(false)} className="bg-vk-accent text-white px-4 py-1.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity">
                Создать
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-black/5 border-2 border-dashed border-black/10 flex items-center justify-center text-vk-text-muted hover:bg-black/10 transition-colors cursor-pointer">
                  <Camera size={32} />
                </div>
                <span className="text-sm font-medium text-vk-accent cursor-pointer">Загрузить аватар</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-vk-text-muted mb-1.5 ml-1">Название</label>
                  <input type="text" placeholder="Введите название" className="w-full bg-vk-panel border border-black/10 rounded-xl py-3 px-4 text-vk-text placeholder-vk-text-muted focus:outline-none focus:border-vk-accent transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-vk-text-muted mb-1.5 ml-1">Описание</label>
                  <textarea placeholder="Расскажите о сообществе" className="w-full bg-vk-panel border border-black/10 rounded-xl py-3 px-4 text-vk-text placeholder-vk-text-muted focus:outline-none focus:border-vk-accent transition-colors resize-none h-24" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-vk-text-muted mb-1.5 ml-1">Обложка</label>
                  <div className="w-full h-32 rounded-xl bg-black/5 border-2 border-dashed border-black/10 flex flex-col items-center justify-center text-vk-text-muted hover:bg-black/10 transition-colors cursor-pointer">
                    <ImagePlus size={28} className="mb-2" />
                    <span className="text-xs font-medium">Добавить обложку</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Community Settings Modal */}
      <AnimatePresence>
        {isCommunitySettingsOpen && (
          <motion.div key="community-settings" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-vk-panel w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
                <h2 className="text-lg font-bold text-vk-text">Настройки</h2>
                <button onClick={() => setIsCommunitySettingsOpen(false)} className="p-2 -mr-2 text-vk-text-muted hover:bg-black/5 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-vk-text-muted mb-1.5 ml-1">Название</label>
                    <input type="text" defaultValue={activeCommunity?.name} className="w-full bg-black/5 border border-transparent rounded-xl py-3 px-4 text-vk-text focus:outline-none focus:border-vk-accent focus:bg-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-vk-text-muted mb-1.5 ml-1">Описание</label>
                    <textarea defaultValue={activeCommunity?.description} className="w-full bg-black/5 border border-transparent rounded-xl py-3 px-4 text-vk-text focus:outline-none focus:border-vk-accent focus:bg-white transition-colors resize-none h-24" />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-black/5">
                  <h3 className="text-sm font-bold text-vk-text-muted uppercase tracking-wider">Приватность</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-vk-accent/10 text-vk-accent flex items-center justify-center"><Lock size={20} /></div>
                      <div>
                        <p className="font-medium text-vk-text text-sm">Закрытое сообщество</p>
                        <p className="text-xs text-vk-text-muted">Вступление по заявкам</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-black/10 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-vk-accent/10 text-vk-accent flex items-center justify-center"><MessageCircle size={20} /></div>
                      <div>
                        <p className="font-medium text-vk-text text-sm">Сообщения сообщества</p>
                        <p className="text-xs text-vk-text-muted">Разрешить писать в ЛС</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-vk-accent rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-black/5 bg-black/[0.02]">
                <button onClick={() => setIsCommunitySettingsOpen(false)} className="w-full bg-vk-accent text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
                  Сохранить изменения
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Panel Overlay */}
      <AnimatePresence>
        {isAdminPanelOpen && (
          <motion.div
            key="admin-panel"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[70] bg-vk-bg flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-vk-panel border-b border-black/5 shrink-0 shadow-sm z-10">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsAdminPanelOpen(false)} className="p-2 -ml-2 text-vk-text hover:bg-black/5 rounded-full transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <h2 className="text-lg font-bold text-vk-text flex items-center gap-2">
                  <ShieldAlert className="text-vk-accent" size={20} />
                  Админ-панель
                </h2>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-vk-panel border-b border-black/5 shrink-0 overflow-x-auto no-scrollbar">
              <div className="flex px-2 py-2 gap-1 min-w-max">
                {ADMIN_TABS.map(tab => {
                  const isActive = adminTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setAdminTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        isActive ? 'bg-vk-accent text-white' : 'text-vk-text-muted hover:bg-black/5 hover:text-vk-text'
                      }`}
                    >
                      <tab.icon size={16} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 bg-vk-bg">
              <div className="max-w-4xl mx-auto w-full">
                
                {/* Dashboard */}
                {adminTab === 'dashboard' && (
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-vk-panel p-5 rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                      <Users className="text-vk-accent mb-3" size={28} />
                      <p className="text-3xl font-extrabold text-vk-text mb-1">15,234</p>
                      <p className="text-xs font-medium text-vk-text-muted">Всего пользователей</p>
                    </div>
                    <div className="bg-vk-panel p-5 rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                      <UsersRound className="text-purple-500 mb-3" size={28} />
                      <p className="text-3xl font-extrabold text-vk-text mb-1">1,042</p>
                      <p className="text-xs font-medium text-vk-text-muted">Всего сообществ</p>
                    </div>
                    <div className="bg-vk-panel p-5 rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                      <MessageSquare className="text-blue-500 mb-3" size={28} />
                      <p className="text-3xl font-extrabold text-vk-text mb-1">842K</p>
                      <p className="text-xs font-medium text-vk-text-muted">Всего сообщений</p>
                    </div>
                    <div className="bg-vk-panel p-5 rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                      <Activity className="text-green-500 mb-3" size={28} />
                      <p className="text-3xl font-extrabold text-vk-text mb-1">3,421</p>
                      <p className="text-xs font-medium text-vk-text-muted">Активные сегодня</p>
                    </div>
                  </motion.div>
                )}

                {/* Users */}
                {adminTab === 'users' && (
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-vk-panel p-4 rounded-3xl border border-black/5 shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                          <img src={`https://picsum.photos/seed/user${i}/100/100`} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                          <div className="flex-1">
                            <h4 className="font-bold text-vk-text text-sm sm:text-base">Пользователь {i}</h4>
                            <p className="text-xs text-vk-text-muted">@user_{i} • {i === 1 ? 'Админ' : 'Пользователь'}</p>
                          </div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"><CheckCircle size={14}/> Вериф</button>
                          <button className="px-3 py-1.5 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"><Shield size={14}/> Админ</button>
                          <button className="px-3 py-1.5 bg-orange-50 text-orange-600 hover:bg-orange-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"><Crown size={14}/> Бронза</button>
                          <button className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"><Crown size={14}/> Серебро</button>
                          <button className="px-3 py-1.5 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"><Crown size={14}/> Золото</button>
                          <button className="px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"><Gem size={14}/> Платина</button>
                          <button className="px-3 py-1.5 bg-cyan-50 text-cyan-600 hover:bg-cyan-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"><Gem size={14}/> Диамант</button>
                          <button className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ml-auto"><Ban size={14}/> Блок</button>
                          <button className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"><Trash2 size={14}/> Удал</button>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Communities */}
                {adminTab === 'communities' && (
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="bg-vk-panel p-4 rounded-3xl border border-black/5 shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                          <img src={`https://picsum.photos/seed/community${i}/100/100`} className="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
                          <div className="flex-1">
                            <h4 className="font-bold text-vk-text text-sm sm:text-base">Сообщество {i}</h4>
                            <p className="text-xs text-vk-text-muted">1.2M участников • Публичное</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button className="px-3 py-1.5 bg-black/5 text-vk-text hover:bg-black/10 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"><Edit size={14}/> Ред.</button>
                          <button className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"><CheckCircle size={14}/> Вериф</button>
                          <button className="px-3 py-1.5 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"><Crown size={14}/> VIP</button>
                          <button className="px-3 py-1.5 bg-orange-50 text-orange-600 hover:bg-orange-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ml-auto"><Lock size={14}/> Закрыть</button>
                          <button className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"><Trash2 size={14}/> Удал</button>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Chats */}
                {adminTab === 'chats' && (
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-vk-panel p-4 rounded-3xl border border-black/5 shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center"><MessageSquare size={24} className="text-vk-text-muted"/></div>
                          <div className="flex-1">
                            <h4 className="font-bold text-vk-text text-sm sm:text-base">Чат {i}</h4>
                            <p className="text-xs text-vk-text-muted">Участников: {i * 12} • Активен</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button className="px-3 py-1.5 bg-black/5 text-vk-text hover:bg-black/10 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"><Eraser size={14}/> Очистить</button>
                          <button className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"><Pin size={14}/> Закрепить</button>
                          <button className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ml-auto"><Trash2 size={14}/> Удалить</button>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Posts */}
                {adminTab === 'posts' && (
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="bg-vk-panel p-4 rounded-3xl border border-black/5 shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                          <img src={`https://picsum.photos/seed/user${i}/100/100`} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                          <div className="flex-1">
                            <h4 className="font-bold text-vk-text text-sm">Пользователь {i}</h4>
                            <p className="text-xs text-vk-text-muted">Сегодня в 12:00</p>
                          </div>
                        </div>
                        <p className="text-sm text-vk-text bg-black/5 p-3 rounded-xl">Пример текста поста для модерации. Здесь может быть любой контент пользователя...</p>
                        <div className="flex flex-wrap gap-2">
                          <button className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"><Pin size={14}/> Закрепить</button>
                          <button className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ml-auto"><Trash2 size={14}/> Удалить</button>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Settings */}
                {adminTab === 'settings' && (
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="bg-vk-panel p-5 rounded-3xl border border-black/5 shadow-sm space-y-5">
                      <h3 className="font-bold text-vk-text text-base">Настройки интерфейса</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-vk-text">Управление вкладками</p>
                          <p className="text-xs text-vk-text-muted">Скрывать неиспользуемые</p>
                        </div>
                        <div className="w-12 h-6 bg-vk-accent rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" /></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-vk-text">Push-уведомления</p>
                          <p className="text-xs text-vk-text-muted">Включить системные алерты</p>
                        </div>
                        <div className="w-12 h-6 bg-vk-accent rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" /></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-vk-text">Режим отладки</p>
                          <p className="text-xs text-vk-text-muted">Для разработчиков</p>
                        </div>
                        <div className="w-12 h-6 bg-black/10 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" /></div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Post Modal */}
      <AnimatePresence>
        {isCreatingPost && (
          <motion.div key="create-post" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed inset-0 bg-vk-bg z-50 flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-vk-panel/80 backdrop-blur-md sticky top-0 z-20 border-b border-black/5">
              <div className="flex items-center gap-2">
                <button onClick={() => setIsCreatingPost(false)} className="p-2 -ml-2 text-vk-text hover:bg-black/5 rounded-full transition-colors">
                  <X size={24} />
                </button>
                <h2 className="text-lg font-bold">Новая запись</h2>
              </div>
              <button onClick={() => setIsCreatingPost(false)} className="bg-vk-accent text-white px-4 py-1.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity">
                Опубликовать
              </button>
            </div>
            
            <div className="flex-1 p-4 flex flex-col bg-vk-panel">
              <div className="flex gap-3 mb-4">
                <img src={DEFAULT_AVATAR} className="w-10 h-10 rounded-full shrink-0" referrerPolicy="no-referrer" />
                <textarea 
                  placeholder="Что у вас нового?" 
                  className="flex-1 bg-transparent resize-none outline-none text-vk-text text-base pt-2 placeholder:text-vk-text-muted" 
                  rows={8} 
                  autoFocus 
                />
              </div>
              
              <div className="mt-auto border-t border-black/10 pt-4 flex gap-2 pb-safe">
                <button className="flex items-center gap-2 text-vk-accent bg-vk-accent/10 px-4 py-2.5 rounded-xl font-medium hover:bg-vk-accent/20 transition-colors">
                  <ImageIcon size={20} />
                  <span className="text-sm">Фотография</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Минималистичная нижняя панель навигации */}
      <AnimatePresence>
        {!activeChat && !activeCommunity && (
          <motion.div 
            key="bottom-nav"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 bg-transparent px-6 flex justify-between items-center h-16 pb-safe z-30 pointer-events-none"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setViewingProfile(null);
                  }}
                  className="relative flex flex-col items-center justify-center w-12 h-full outline-none pointer-events-auto"
                >
                  <motion.div
                    initial={false}
                    animate={{ 
                      color: isActive ? 'var(--vk-accent)' : 'var(--vk-text-muted)',
                      opacity: isActive ? 1 : 0.6,
                      scale: isActive ? [1, 1.2, 1] : 1
                    }}
                    transition={{ 
                      duration: 0.2,
                      scale: { duration: 0.4, ease: "easeInOut" }
                    }}
                  >
                    <Icon size={24} strokeWidth={isActive ? 2 : 1.5} />
                  </motion.div>
                  
                  {isActive && (
                    <motion.div
                      layoutId="minimal-dot"
                      className="absolute bottom-2 w-1 h-1 bg-vk-accent rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

