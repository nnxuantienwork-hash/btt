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
  const mostRead = getMostRead().slice(0, 5);
  const radioEpisodes = radioSections[0]?.episodes || [];

  // Get articles by category
  const thanhphoNews = newsArticles.filter(a => a.categorySlug === '/thanh-pho').slice(0, 6);
  const phuongxaNews = newsArticles.filter(a => a.categorySlug === '/168-phuong-xa').slice(0, 6);
  const gocNhinNews = newsArticles.filter(a => a.categorySlug === '/goc-nhin').slice(0, 6);
  const doiSongNews = newsArticles.filter(a => a.categorySlug === '/doi-song').slice(0, 6);
  const giaiTriNews = newsArticles.filter(a => a.categorySlug === '/giai-tri').slice(0, 6);

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

        {/* SECTION 2: FEATURED HERO CAROUSEL + HIGHLIGHTED ARTICLES */}
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

          {/* Right: Highlighted Articles (Vertical List with Dividers) */}
          <motion.div className="lg:col-span-1">
            <div className="space-y-0">
              {mostRead.map((article, idx) => (
                <Link
                  key={article.id}
                  to={`/bai-viet/${article.id}`}
                  className="group py-4 px-4 hover:bg-gray-50 transition-colors duration-200 flex gap-3 border-b border-gray-200 last:border-0"
                >
                  <div className="relative flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-500">{formatViews(article.views)} lượt xem</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* SECTION 3: RADIO SECTION - Simple with dividers */}
        <motion.section
          className="mb-12 border-y border-gray-200 py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 pb-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Radio Nổi bật</h2>
            </div>
            <Link
              to="/radio"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {radioEpisodes.map((episode) => (
              <Link
                key={episode.id}
                to={`/radio/tap/${episode.id}`}
                className="group"
              >
                <div className="relative h-32 overflow-hidden rounded-lg bg-gray-200 mb-3">
                  <img
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold text-blue-600 uppercase mb-1">
                    {episode.category}
                  </p>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
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

        {/* SECTION 4: THÀNH PHỐ HÔM NAY - Featured Left + Grid Right */}
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
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                Xem tất cả →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Featured large item */}
            <Link
              to={`/bai-viet/${thanhphoNews[0]?.id}`}
              className="group lg:col-span-2 relative h-72 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={thanhphoNews[0]?.image}
                alt={thanhphoNews[0]?.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-bold text-white text-lg line-clamp-2">{thanhphoNews[0]?.title}</h3>
              </div>
            </Link>

            {/* Grid items */}
            <div className="lg:col-span-2 space-y-4">
              {thanhphoNews.slice(1, 3).map((article) => (
                <Link key={article.id} to={`/bai-viet/${article.id}`} className="group flex gap-3">
                  <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden">
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
          </div>
        </motion.section>

        {/* SECTION 5: 168 PHƯỜNG - XÃ - 4 Column Grid */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">168 Phường - Xã</h2>
              <Link
                to="/168-phuong-xa"
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                Xem tất cả →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phuongxaNews.map((article) => (
              <Link key={article.id} to={`/bai-viet/${article.id}`} className="group">
                <div className="relative h-40 rounded-lg overflow-hidden shadow-md mb-3 hover:shadow-lg transition-shadow">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* SECTION 6: ĐỜI SỐNG - Horizontal List with Numbers */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Đời Sống</h2>
              <Link
                to="/doi-song"
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                Xem tất cả →
              </Link>
            </div>
          </div>

          <div className="space-y-0">
            {doiSongNews.map((article, idx) => (
              <Link
                key={article.id}
                to={`/bai-viet/${article.id}`}
                className="group py-4 px-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{article.timestamp}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* SECTION 7: GÓC NHÌN - Left Featured + Right List */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Góc Nhìn</h2>
              <Link
                to="/goc-nhin"
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                Xem tất cả →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured large item */}
            <Link
              to={`/bai-viet/${gocNhinNews[0]?.id}`}
              className="group lg:col-span-2 relative h-80 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={gocNhinNews[0]?.image}
                alt={gocNhinNews[0]?.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-bold text-white line-clamp-3">{gocNhinNews[0]?.title}</h3>
              </div>
            </Link>

            {/* Right list */}
            <div className="space-y-0">
              {gocNhinNews.slice(1, 4).map((article) => (
                <Link
                  key={article.id}
                  to={`/bai-viet/${article.id}`}
                  className="group py-3 px-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SECTION 8: GIẢI TRÍ - 2 Large Featured + 2 Small */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Giải Trí</h2>
              <Link
                to="/giai-tri"
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                Xem tất cả →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* First two: large */}
            {giaiTriNews.slice(0, 2).map((article) => (
              <Link
                key={article.id}
                to={`/bai-viet/${article.id}`}
                className="group md:col-span-1 relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-bold text-white text-sm line-clamp-2">{article.title}</h3>
                </div>
              </Link>
            ))}

            {/* Last two: small with image on left */}
            {giaiTriNews.slice(2, 4).map((article) => (
              <Link
                key={article.id}
                to={`/bai-viet/${article.id}`}
                className="group flex gap-3 md:col-span-1"
              >
                <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden">
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

      </main>
    </div>
  );
}
