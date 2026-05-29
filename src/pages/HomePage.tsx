import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { newsArticles, getMostRead, formatViews } from '../data/newsData';
import CategoryBadge from '../components/CategoryBadge';

export default function HomePage() {
  const [currentFeaturedIdx, setCurrentFeaturedIdx] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  const topTicker = newsArticles.slice(0, 4);
  const featuredCarousel = newsArticles.slice(0, 8);

  const thanhphoNews = newsArticles.filter(a => a.categorySlug === '/thanh-pho').slice(0, 4);
  const phuongxaNews = newsArticles.filter(a => a.categorySlug === '/168-phuong-xa').slice(0, 4);
  const gocNhinNews = newsArticles.filter(a => a.categorySlug === '/goc-nhin').slice(0, 4);
  const doiSongNews = newsArticles.filter(a => a.categorySlug === '/doi-song').slice(0, 5);
  const giaiTriNews = newsArticles.filter(a => a.categorySlug === '/giai-tri').slice(0, 6);

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
    <div className="min-h-screen bg-white">
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

        {/* SECTION 2: FEATURED HERO CAROUSEL */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.section>

        {/* SECTION 3: THÀNH PHỐ HÔM NAY - Layout Image 2 */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 pb-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-6 bg-blue-600 rounded-sm" />
              <h2 className="text-2xl font-bold text-slate-900">Thành Phố Hôm Nay</h2>
            </div>
            <Link
              to="/thanh-pho"
              className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {thanhphoNews.map((article) => (
              <Link
                key={article.id}
                to={`/bai-viet/${article.id}`}
                className="group"
              >
                <div className="relative h-48 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow mb-3">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="mb-2">
                  <div className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded">
                    {article.category}
                  </div>
                </div>
                <h3 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* SECTION 4: 168 PHƯỜNG - XÃ - Layout Image 3 */}
        <motion.section
          className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="mb-6 pb-4 border-b border-gray-200 flex items-center gap-3">
              <div className="w-4 h-6 bg-emerald-600 rounded-sm" />
              <h2 className="text-2xl font-bold text-slate-900">168 Phường - Xã</h2>
            </div>

            <div className="space-y-4">
              {phuongxaNews.map((article, idx) => (
                <Link
                  key={article.id}
                  to={`/bai-viet/${article.id}`}
                  className="group flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-lg">
                    {idx + 1}
                  </div>
                  <div className="flex-1 border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-1">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-500">{article.timestamp}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SECTION 5: GÓC NHÌN - Layout Image 3 */}
          <div>
            <div className="mb-6 pb-4 border-b border-gray-200 flex items-center gap-3">
              <div className="w-4 h-6 bg-amber-600 rounded-sm" />
              <h2 className="text-2xl font-bold text-slate-900">Góc Nhìn</h2>
            </div>

            <div className="space-y-4">
              {gocNhinNews.map((article, idx) => (
                <Link
                  key={article.id}
                  to={`/bai-viet/${article.id}`}
                  className="group flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded bg-amber-100 flex items-center justify-center font-bold text-amber-700 text-lg">
                    {idx + 1}
                  </div>
                  <div className="flex-1 border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-1">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-500">{article.timestamp}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SECTION 6: ĐỜI SỐNG - Flash Cards */}
        <motion.section
          className="mb-12 -mx-6 px-6 py-12 bg-gradient-to-r from-teal-500 to-teal-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">Đời Sống</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
              {doiSongNews.slice(0, 3).map((article) => (
                <Link
                  key={article.id}
                  to={`/bai-viet/${article.id}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-teal-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {doiSongNews.slice(3, 5).map((article) => (
                <Link
                  key={article.id}
                  to={`/bai-viet/${article.id}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-teal-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SECTION 7: GIẢI TRÍ - Varied Grid */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 pb-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-6 bg-pink-600 rounded-sm" />
              <h2 className="text-2xl font-bold text-slate-900">Giải Trí</h2>
            </div>
            <Link
              to="/giai-tri"
              className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Large featured */}
            <Link
              to={`/bai-viet/${giaiTriNews[0]?.id}`}
              className="group lg:row-span-2 relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-96 lg:h-full">
                <img
                  src={giaiTriNews[0]?.image}
                  alt={giaiTriNews[0]?.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-bold text-white text-lg line-clamp-2 group-hover:text-pink-300 transition-colors">
                    {giaiTriNews[0]?.title}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Grid items */}
            {giaiTriNews.slice(1, 5).map((article) => (
              <Link
                key={article.id}
                to={`/bai-viet/${article.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-pink-600 transition-colors">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}

            {/* Last large item */}
            {giaiTriNews[5] && (
              <Link
                to={`/bai-viet/${giaiTriNews[5]?.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={giaiTriNews[5]?.image}
                    alt={giaiTriNews[5]?.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-pink-600 transition-colors">
                    {giaiTriNews[5]?.title}
                  </h3>
                </div>
              </Link>
            )}
          </div>
        </motion.section>

      </main>
    </div>
  );
}
