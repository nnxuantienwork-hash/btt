export default function HomePage() {
  const latestNews = [
    { title: "Nợ công bình quân đầu người tăng gấp đôi trong năm qua", date: "15 Thg 5, 2026", img: "https://images.unsplash.com/photo-1591696206503-298a3952932c?auto=format&fit=crop&w=200" },
    { title: "Chủ sở hữu Tập đoàn S Alam bị cơ quan chức năng điều tra", date: "14 Thg 5, 2026", img: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=200" },
    { title: "Dự án năng lượng sạch khởi công tại khu đô thị mới", date: "13 Thg 5, 2026", img: "https://images.unsplash.com/photo-1509391366360-2e956784a3a7?auto=format&fit=crop&w=200" },
    { title: "Người Catalan ăn mừng chiến thắng sau loạt trận lịch sử", date: "11 Thg 5, 2026", img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=200" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <main className="max-w-[1280px] mx-auto px-20">
        
        {/* --- SECTION 1: TIN TIÊU ĐIỂM & SIDEBAR --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Cột trái: Ảnh Featured lớn */}
          <div className="lg:col-span-2 relative h-[450px] rounded-2xl overflow-hidden group shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1541872710-85888e2802d2?auto=format&fit=crop&w=1000" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Tin tiêu điểm" 
            />
            <div className="absolute bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
              <span className="bg-blue-600 text-white px-3 py-1 text-xs font-bold uppercase rounded">Tin tiêu điểm</span>
              <h1 className="text-3xl font-bold mt-3 leading-tight">Vận động viên Sabalenka hướng tới vị trí số 1 thế giới cuối năm</h1>
              <p className="text-sm text-gray-200 mt-2 line-clamp-2">Dự án tập trung vào việc lắp đặt hệ thống pin năng lượng mặt trời để khai thác ánh sáng và chuyển hóa thành năng lượng sạch cho thành phố.</p>
            </div>
          </div>

          {/* Cột phải: Tin vắn có ảnh */}
          <div className="lg:col-span-1 flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">Tin tức gần đây</h2>
            {latestNews.map((news, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <div className="w-24 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                  <img src={news.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt={news.title} />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] text-blue-600 font-bold uppercase">{news.date}</span>
                  <h3 className="text-sm font-bold text-slate-800 leading-snug mt-1 group-hover:text-blue-700 transition-colors line-clamp-2">{news.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: DANH MỤC TIN TỨC --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <h2 className="col-span-full text-2xl font-black text-slate-900 uppercase">Mới nhất trong ngày</h2>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className="overflow-hidden h-56">
                <img src="https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?auto=format&fit=crop&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="news" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
                  Hệ thống xe buýt điện đầu tiên chạy thử nghiệm tại TP.HCM
                </h3>
                <p className="text-sm text-slate-400 mt-2 font-medium">20 phút trước</p>
              </div>
            </div>
          ))}
        </section>

      </main>
    </div>
  );
}