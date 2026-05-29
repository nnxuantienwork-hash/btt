import { useState } from 'react';
import { motion } from 'framer-motion';
import { radioEpisodes } from '../data/radioEpisodes';
import RadioHero from '../components/radio/RadioHero';
import RadioGrid from '../components/radio/RadioGrid';
import SuggestedCarousel from '../components/radio/SuggestedCarousel';

export default function RadioPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const featuredEpisode = radioEpisodes[0];

  const categories = ['Tất cả', 'Thời Sự', 'Kinh Tế', 'Văn Hóa', 'Giải Trí', 'Thể Thao', 'Sức Khỏe'];

  // Filter episodes by category
  const filteredEpisodes = selectedCategory === 'Tất cả'
    ? radioEpisodes
    : radioEpisodes.filter(ep => ep.category === selectedCategory);

  const latestEpisodes = filteredEpisodes.slice(0, 4);
  const suggestedEpisodes = filteredEpisodes.slice(4, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <RadioHero episode={featuredEpisode} />

      {/* Categories Strip */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full font-semibold text-sm transition-all border-2 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Filtered Episodes Section */}
      {selectedCategory !== 'Tất cả' && (
        <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-1 h-8 rounded"
                style={{
                  background: 'linear-gradient(180deg, #3B82F6 0%, #0B5ED7 100%)'
                }}
              />
              <h2 className="text-2xl font-headline font-bold text-gray-900">
                Radio {selectedCategory}
              </h2>
              <div className="flex-grow h-px bg-gray-200 mx-4" />
              <span className="text-sm text-gray-500">
                {filteredEpisodes.length} tập
              </span>
            </div>

            {filteredEpisodes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredEpisodes.map((episode, idx) => (
                  <motion.div
                    key={episode.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all">
                      <div className="relative aspect-square">
                        <img
                          src={episode.thumbnail}
                          alt={episode.title}
                          className="w-full h-full object-cover"
                        />
                        {episode.isLive && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                            LIVE
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="text-xs font-semibold text-blue-600 mb-2">
                          {episode.category}
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                          {episode.title}
                        </h3>
                        <div className="text-xs text-gray-500">
                          {Math.floor(episode.duration / 60)} phút
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <div className="text-5xl mb-4">📻</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Chưa có tập nào
                </h3>
                <p className="text-gray-600">
                  Chưa có radio {selectedCategory.toLowerCase()} nào được cập nhật
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Default Sections (when "Tất cả" is selected) */}
      {selectedCategory === 'Tất cả' && (
        <>
          {/* Latest Episodes */}
          <RadioGrid title="Mới nhất" episodes={latestEpisodes} />

          {/* Suggested Carousel */}
          <SuggestedCarousel title="Gợi ý cho bạn" episodes={suggestedEpisodes} />

          {/* All Episodes */}
          <RadioGrid title="Tất cả tập" episodes={radioEpisodes} />
        </>
      )}

      {/* Spacer for mini player */}
      <div className="h-20" />
    </div>
  );
}
