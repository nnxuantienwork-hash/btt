import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { newsArticles, getMostRead, formatViews } from '../data/newsData';
import ArticleCard from '../components/ArticleCard';
import CategoryBadge from '../components/CategoryBadge';

export default function HomePage() {
  const [currentMostReadIdx, setCurrentMostReadIdx] = useState(0);

  const featuredArticle = newsArticles[0];
  const topTicker = newsArticles.slice(0, 4);
  const thanhphoNews = newsArticles.filter(a => a.categorySlug === '/thanh-pho').slice(0, 4);
  const phuongxaNews = newsArticles.filter(a => a.categorySlug === '/168-phuong-xa').slice(0, 4);
  const doiSongNews = newsArticles.filter(a => a.categorySlug === '/doi-song').slice(0, 4);
  const gocNhinNews = newsArticles.filter(a => a.categorySlug === '/goc-nhin').slice(0, 4);
  const giaiTriNews = newsArticles.filter(a => a.categorySlug === '/giai-tri').slice(0, 4);
  const mostRead = getMostRead();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

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
            {topTicker.map((article, idx) => (
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

        {/* SECTION 2: FEATURED HERO + MOST READ CAROUSEL */}
        <motion.section
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* Left: Large Featured Article */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link to={`/bai-viet/${featuredArticle.id}`} className="group relative block h-[500px] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-2">
                  <CategoryBadge category={featuredArticle.category} />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2 leading-tight line-clamp-3">
                  {featuredArticle.title}
                </h1>
              </div>
            </Link>
          </motion.div>

          {/* Right: Most Read Carousel */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="h-full flex flex-col">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Bài nổi bật</h2>

              {/* Large featured carousel image */}
              <Link to={`/bai-viet/${mostRead[currentMostReadIdx]?.id}`} className="group relative block aspect-square rounded-lg overflow-hidden shadow-md mb-4">
                <img
                  src={mostRead[currentMostReadIdx]?.image}
                  alt={mostRead[currentMostReadIdx]?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Article title and info */}
              <Link to={`/bai-viet/${mostRead[currentMostReadIdx]?.id}`} className="group mb-4">
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                  {mostRead[currentMostReadIdx]?.title}
                </h3>
                <p className="text-xs text-slate-500">{formatViews(mostRead[currentMostReadIdx]?.views)} lượt xem</p>
              </Link>

              {/* Navigation dots */}
              <div className="flex gap-2">
                {mostRead.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentMostReadIdx(idx)}
                    className={`h-1 flex-1 rounded transition-all ${
                      idx === currentMostReadIdx ? 'bg-slate-900' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* SECTION 3: DIVERSE CATEGORY LAYOUTS */}
        {[
          {
            title: 'Thành Phố Hôm Nay',
            news: thanhphoNews,
            layout: 'featured-grid',
          },
          {
            title: '168 Phường - Xã',
            news: phuongxaNews,
            layout: 'simple-grid',
          },
          {
            title: 'Đời Sống',
            news: doiSongNews,
            layout: 'left-featured',
          },
          {
            title: 'Góc Nhìn',
            news: gocNhinNews,
            layout: 'horizontal-list',
          },
          {
            title: 'Giải Trí',
            news: giaiTriNews,
            layout: 'simple-grid',
          },
        ].map((section, idx) => (
          <motion.section
            key={section.title}
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            {/* Section Header */}
            <div className="mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                <Link
                  to={`/${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Xem tất cả →
                </Link>
              </div>
            </div>

            {/* LAYOUT 1: Featured + Grid */}
            {section.layout === 'featured-grid' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Link to={`/bai-viet/${section.news[0]?.id}`} className="group lg:col-span-2 relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={section.news[0]?.image}
                    alt={section.news[0]?.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-white text-sm line-clamp-2">{section.news[0]?.title}</h3>
                  </div>
                </Link>

                <div className="lg:col-span-2 space-y-4">
                  {section.news.slice(1, 3).map((article) => (
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
            )}

            {/* LAYOUT 2: Simple Grid */}
            {section.layout === 'simple-grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.news.map((article) => (
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
            )}

            {/* LAYOUT 3: Left Featured + Right Vertical */}
            {section.layout === 'left-featured' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Link to={`/bai-viet/${section.news[0]?.id}`} className="group lg:col-span-2 relative h-80 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={section.news[0]?.image}
                    alt={section.news[0]?.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-white line-clamp-3">{section.news[0]?.title}</h3>
                  </div>
                </Link>

                <div className="space-y-4">
                  {section.news.slice(1, 4).map((article) => (
                    <Link key={article.id} to={`/bai-viet/${article.id}`} className="group pb-3 border-b border-gray-200 last:border-0">
                      <h3 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                        {article.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* LAYOUT 4: Horizontal List */}
            {section.layout === 'horizontal-list' && (
              <div className="space-y-4">
                {section.news.map((article, num) => (
                  <Link key={article.id} to={`/bai-viet/${article.id}`} className="group flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                      {num + 1}
                    </div>
                    <div className="flex-1 border-b border-gray-200 pb-4 last:border-0">
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-500">{article.timestamp}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </motion.section>
        ))}

      </main>
    </div>
  );
}