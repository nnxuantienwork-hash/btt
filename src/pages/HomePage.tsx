import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Eye, TrendingUp, Flame } from 'lucide-react';
import { newsArticles, getMostRead, formatViews } from '../data/newsData';
import ArticleCard from '../components/ArticleCard';
import CategoryBadge from '../components/CategoryBadge';

export default function HomePage() {
  const featuredArticle = newsArticles[0];
  const breakingNews = newsArticles.filter(a => a.isBreaking).slice(0, 4);
  const thanhphoNews = newsArticles.filter(a => a.categorySlug === '/thanh-pho').slice(0, 3);
  const phuongxaNews = newsArticles.filter(a => a.categorySlug === '/168-phuong-xa').slice(0, 3);
  const doiSongNews = newsArticles.filter(a => a.categorySlug === '/doi-song').slice(0, 3);
  const gocNhinNews = newsArticles.filter(a => a.categorySlug === '/goc-nhin').slice(0, 3);
  const giaiTriNews = newsArticles.filter(a => a.categorySlug === '/giai-tri').slice(0, 3);
  const mostRead = getMostRead();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <main className="max-w-[1280px] mx-auto px-6 py-8">

        {/* SECTION 1: FEATURED HERO + LATEST NEWS SIDEBAR */}
        <motion.section
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Left: Large Featured Article */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link to={`/bai-viet/${featuredArticle.id}`} className="group relative block h-[420px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                  <Flame className="w-3.5 h-3.5" />
                  Nổi bật
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-2">
                  <CategoryBadge category={featuredArticle.category} />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-amber-300 transition-colors line-clamp-3">
                  {featuredArticle.title}
                </h1>
                <p className="text-sm text-gray-200 line-clamp-2 mb-4">{featuredArticle.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-300">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredArticle.timestamp}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {formatViews(featuredArticle.views)}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right: Most Read Articles */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg font-bold text-white">Đọc nhiều nhất</h2>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {mostRead.map((article, idx) => (
                  <Link
                    key={article.id}
                    to={`/bai-viet/${article.id}`}
                    className="p-4 hover:bg-gray-50 transition-colors duration-200 group flex gap-3"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-slate-700 flex items-center justify-center text-white font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">{formatViews(article.views)} lượt xem</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* SECTION 2: BREAKING NEWS TICKER */}
        {breakingNews.length > 0 && (
          <motion.section
            className="mb-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
              {breakingNews.map((article) => (
                <Link
                  key={article.id}
                  to={`/bai-viet/${article.id}`}
                  className="flex items-start gap-3 p-3 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-all duration-300 group"
                >
                  <Flame className="w-4 h-4 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-yellow-300 uppercase tracking-wide">Tin nóng</p>
                    <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-yellow-100 transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* SECTION 3: CATEGORY SECTIONS */}
        {[
          { title: 'Thành Phố Hôm Nay', news: thanhphoNews, color: 'from-blue-600 to-blue-700', icon: '🏢', slug: '/thanh-pho' },
          { title: '168 Phường - Xã', news: phuongxaNews, color: 'from-purple-600 to-purple-700', icon: '🏘️', slug: '/168-phuong-xa' },
          { title: 'Đời Sống', news: doiSongNews, color: 'from-green-600 to-green-700', icon: '👥', slug: '/doi-song' },
          { title: 'Góc Nhìn', news: gocNhinNews, color: 'from-cyan-600 to-cyan-700', icon: '💭', slug: '/goc-nhin' },
          { title: 'Giải Trí', news: giaiTriNews, color: 'from-pink-600 to-pink-700', icon: '🎬', slug: '/giai-tri' },
        ].map((section, sectionIdx) => (
          <motion.section
            key={section.title}
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: sectionIdx * 0.1 }}
          >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200">
              <div className="flex items-center gap-3">
                <div className={`bg-gradient-to-br ${section.color} p-3 rounded-xl shadow-lg`}>
                  <span className="text-2xl">{section.icon}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{section.news.length} bài viết</p>
                </div>
              </div>
              <Link
                to={section.slug}
                className={`px-5 py-2.5 bg-gradient-to-br ${section.color} text-white rounded-full font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap`}
              >
                Xem tất cả
              </Link>
            </div>

            {/* Articles Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {section.news.map((article, idx) => (
                <motion.div key={article.id} variants={itemVariants}>
                  <ArticleCard article={article} delay={idx * 50} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        ))}

        {/* SECTION 4: NEWSLETTER CTA */}
        <motion.section
          className="mt-16 mb-8 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -ml-48 -mb-48" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Nhận tin mới mỗi ngày
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  Đăng ký nhận bản tin hàng ngày để cập nhật tin tức mới nhất về TP.HCM
                </p>
              </div>

              <div className="w-full md:w-auto flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="px-6 py-3.5 rounded-lg bg-white/15 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                />
                <button className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                  Đăng ký ngay
                </button>
              </div>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}