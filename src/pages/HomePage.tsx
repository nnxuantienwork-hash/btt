import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { newsArticles, getMostRead, formatViews } from '../data/newsData';
import { radioSections, formatDuration, formatPlayCount } from '../data/radioData';
import CategoryBadge from '../components/CategoryBadge';

export default function HomePage() {
  const [currentFeaturedIdx, setCurrentFeaturedIdx] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  const topTicker = newsArticles.slice(0, 4);
  const featuredCarousel = newsArticles.slice(0, 8);
  const thanhphoNews = newsArticles.filter(a => a.categorySlug === '/thanh-pho').slice(0, 4);
  const mostRead = getMostRead().slice(0, 5);
  const radioEpisodes = radioSections[0]?.episodes || [];

  // Auto-scroll featured carousel
  useEffect(() => {
    if (!autoScroll) return;
    const timer = setInterval(() => {
      setCurrentFeaturedIdx(prev => (prev + 1) % featuredCarousel.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoScroll, featuredCarousel.length]);

  const handleCarouselClick = (idx: number) => {
    setCurrentFeaturedIdx(idx);
    setAutoScroll(false);
    setTimeout(() => setAutoScroll(true), 10000);
  };

  const currentFeatured = featuredCarousel[currentFeaturedIdx];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="max-w-[1280px] mx-auto px-6 py-8">

        {/* SECTION 1: TOP 4 NEWS TICKER */}
        <motion.section
          className="mb-10 border-b border-gray-200 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topTicker.map((article) => (
              <Link
                key={article.id}
                to={`/bai-viet/${article.id}`}
                className="group flex gap-3 pb-4 border-b lg:border-b-0 hover:opacity-80 transition-opacity"
              >
                <div className="w-20 h-16 flex-shrink-0 overflow-hidden rounded">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* SECTION 2: FEATURED HERO CAROUSEL + HIGHLIGHTED SECTION */}
        <motion.section
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left: Large Featured Article with Auto-Scroll */}
          <motion.div className="lg:col-span-2">
            <div className="relative group">
              <Link
                to={`/bai-viet/${currentFeatured.id}`}
                className="relative block h-[550px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <img
                  src={currentFeatured.image}
                  alt={currentFeatured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="mb-3">
                    <CategoryBadge category={currentFeatured.category} />
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-3 leading-tight line-clamp-3">
                    {currentFeatured.title}
                  </h1>
                  <p className="text-base text-gray-100 line-clamp-2 mb-4">
                    {currentFeatured.excerpt}
                  </p>
                  <p className="text-sm text-gray-300">{currentFeatured.timestamp}</p>
                </div>
              </Link>

              {/* Carousel Navigation */}
              <div className="absolute bottom-6 left-8 right-8 flex gap-2">
                {featuredCarousel.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCarouselClick(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentFeaturedIdx
                        ? 'bg-white w-8'
                        : 'bg-white/40 w-2 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Highlighted Articles Section (Style Image 3) */}
          <motion.div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h2 className="text-lg font-bold text-white">Bài nổi bật</h2>
              </div>

              <div className="divide-y divide-gray-100">
                {mostRead.map((article, idx) => (
                  <Link
                    key={article.id}
                    to={`/bai-viet/${article.id}`}
                    className="group p-4 hover:bg-blue-50 transition-colors duration-200 flex gap-3"
                  >
                    <div className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden shadow-sm">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">{formatViews(article.views)} lượt xem</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="px-6 py-4 bg-gray-50 text-center">
                <Link
                  to="/thanh-pho"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Xem tất cả →
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* SECTION 3: RADIO SECTION */}
        <motion.section
          className="mb-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 pb-4 border-b border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Radio Nổi bật</h2>
                <p className="text-sm text-slate-600 mt-1">Nghe các chương trình hàng ngày</p>
              </div>
              <Link
                to="/radio"
                className="px-6 py-2.5 bg-orange-600 text-white rounded-full font-semibold text-sm hover:bg-orange-700 transition-colors"
              >
                Khám phá thêm
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {radioEpisodes.map((episode) => (
              <Link
                key={episode.id}
                to={`/radio/tap/${episode.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-32 overflow-hidden bg-gradient-to-br from-orange-200 to-amber-200">
                  <img
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="p-4">
                  <p className="text-xs font-semibold text-orange-600 uppercase mb-2">
                    {episode.category}
                  </p>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors mb-2">
                    {episode.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{formatDuration(episode.duration)}</span>
                    <span>{formatPlayCount(episode.playCount)} nghe</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* SECTION 4: MAIN CATEGORY */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Thành Phố Hôm Nay</h2>
              <Link
                to="/thanh-pho"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Xem tất cả →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {thanhphoNews.map((article) => (
              <Link
                key={article.id}
                to={`/bai-viet/${article.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-4">
                  <div className="mb-2">
                    <CategoryBadge category={article.category} />
                  </div>
                  <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>
                  <p className="text-xs text-slate-500">{article.timestamp}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

      </main>
    </div>
  );
}
