import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, CloudSun, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const location = useLocation();
  const [time, setTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  const dateStr = `${time.getDate()}, tháng ${time.getMonth() + 1}, ${time.getFullYear()}`;

  const navItems = [
    { label: 'Trang chủ', slug: '/' },
    { label: 'Thành phố hôm nay', slug: '/thanh-pho' },
    { label: '168 phường - xã', slug: '/168-phuong-xa' },
    { label: 'Góc nhìn', slug: '/goc-nhin' },
    { label: 'Đời sống', slug: '/doi-song' },
    { label: 'Giải trí', slug: '/giai-tri' },
    { label: 'Radio', slug: '/radio' },
  ];

  return (
    <header className="w-full bg-white">
      {/* TẦNG 1: Lịch, Thời tiết & Logo */}
      <div className="max-w-[1280px] mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="font-black text-slate-900 text-xl tracking-tight">TIN TP. HỒ CHÍ MINH</div>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <CalendarDays className="w-9 h-9 text-slate-400" />
              <div className="flex flex-col">
                <span className="text-sm font-extrabold uppercase text-slate-800">{days[time.getDay()]}</span>
                <span className="text-xs text-slate-500 font-medium">{dateStr}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CloudSun className="w-9 h-9 text-orange-500" />
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-slate-800">25°C - Có mưa nhẹ</span>
                <span className="text-xs text-slate-500 font-medium">TP. Hồ Chí Minh</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center bg-slate-100 rounded-full px-5 py-2.5 border border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-sm text-slate-600 w-30 placeholder-slate-400"
          />
        </div>
      </div>

      {/* TẦNG 2: MENU VỚI LINE ĐƯỢC CHỈNH TỈ MỈ */}
      <div className="w-full">
        {/* Đường kẻ trên (nhạt) và dưới (đậm/dày) chỉ nằm trong khung 1280px */}
        <div className="max-w-[1280px] mx-auto px-6 border-t border-slate-80 border-b-[3px] border-slate-200">
          <nav className="h-10 flex items-center justify-between">
            {navItems.map((item) => {
              const isActive = location.pathname === item.slug;
              return (
                <Link
                  key={item.slug}
                  to={item.slug}
                  className={`h-full flex items-center text-sm font-bold transition-all duration-300 relative group whitespace-nowrap ${
                    isActive 
                      ? 'text-slate-900 opacity-100' 
                      : 'text-slate-400 hover:text-slate-900 opacity-70 hover:opacity-100'
                  }`}
                >
                  {item.label}
                  
                  {/* Line chỉ báo dưới chữ (Active Line) */}
                  <div className={`absolute bottom-[-3px] left-1/2 -translate-x-1/2 h-[3px] bg-slate-900 transition-all duration-300 ${
                    isActive ? 'opacity-100 w-[120%]' : 'opacity-0 w-0 group-hover:opacity-100 group-hover:w-[120%]'
                  }`} />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}