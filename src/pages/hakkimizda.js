import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Factory, Users, Award, Zap, Heart, Shield, Globe, CheckCircle2, MapPin, TrendingUp, MessageCircle, Mail, Phone, ArrowRight, Sparkles, Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HakkimizdaPage() {
  const stats = [
    { icon: Zap, value: '3,000+', label: 'Günlük Üretim', gradient: 'from-yellow-400 to-orange-500' },
    { icon: Heart, value: '25', label: 'Yıllık Deneyim', gradient: 'from-pink-400 to-pink-500' },
    { icon: Shield, value: '100%', label: 'Kalite Garantisi', gradient: 'from-teal-400 to-blue-400' },
    { icon: Globe, value: '500+', label: 'Mutlu Müşteri', gradient: 'from-purple-400 to-indigo-400' }
  ];

  const trustItems = [
    {
      icon: Factory,
      badge: '3,000+ Günlük',
      badgeColor: 'from-blue-500 to-cyan-500',
      title: 'Yüksek Üretim Kapasitesi',
      desc: "Günlük 3.000'den fazla atkı üretim kapasitemiz ile büyük siparişleri hızlı ve kaliteli şekilde teslim ediyoruz."
    },
    {
      icon: Users,
      badge: '100% Özel',
      badgeColor: 'from-emerald-500 to-teal-500',
      title: 'Kişiye Özel Üretim',
      desc: 'Müşterilerimizin ihtiyaçlarına göre özel dokuma ve saten atkılar üretiyoruz.'
    },
    {
      icon: Award,
      badge: '25 Yıl',
      badgeColor: 'from-purple-500 to-pink-500',
      title: 'Tecrübe ve Güven',
      desc: '25 yıllık deneyimimizle sektörde güvenilir ve kaliteli üretim yapan bir firmayız.'
    }
  ];

  const advantages = [
    'İstanbul merkezli üretim tesisi',
    'Dokuma ve saten atkı uzmanlığı',
    'Hızlı teslimat garantisi',
    'Rekabetçi fiyat politikası',
    '7/24 müşteri desteği',
    'Çevre dostu üretim'
  ];

  return (
    <>
      <SEO
        title="Hakkımızda | Atkigetir - 25 Yıllık Deneyim ile Kaliteli Üretim"
        description="25 yıllık tecrübesiyle Atkigetir, İstanbul merkezli üretim tesislerinde atkı, bere ve forma üretiminde uzmanlaşmıştır. Yerli üretim, kişiye özel çözümler."
        keywords="atkigetir hakkında, istanbul atkı üreticisi, yerli üretim, 25 yıllık deneyim, kaliteli atkı üretimi"
        url="/hakkimizda"
      />
      
      <div className="bg-[#F8FAFC] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumbs items={[
            { name: 'Anasayfa', href: '/' },
            { name: 'Hakkımızda', href: '/hakkimizda' }
          ]} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section - Yüksek Kaliteli Görsel Üzerinde Başlık */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative rounded-[24px] overflow-visible mb-8 h-[400px] md:h-[500px] bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"
            >
              {/* Arka Plan Görseli */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/20 via-[#1e40af]/20 to-[#1e3a8a]/20 rounded-[24px] overflow-hidden" />
              <div className="absolute inset-0 bg-[url('/images/bannergörsel2.jpg')] bg-cover bg-center rounded-[24px]" />
              <div className="absolute inset-0 bg-black/30 rounded-[24px]" />
              
              {/* Badge Kartları - Görselin Üzerinde ve Köşelerden Taşan */}
              {/* Sağ Üst Köşe - Taşan Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -top-4 -right-4 z-30 bg-white/70 backdrop-blur-md rounded-2xl px-5 py-3 shadow-xl border border-white/20 flex items-center gap-2"
              >
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-[#1A365D] text-sm whitespace-nowrap">25 Yıl Deneyim</span>
              </motion.div>
              
              {/* Sağ Orta - Taşan Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute top-1/2 -right-4 -translate-y-1/2 z-30 bg-white/70 backdrop-blur-md rounded-2xl px-5 py-3 shadow-xl border border-white/20 flex items-center gap-2"
              >
                <Factory className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-[#1A365D] text-sm whitespace-nowrap">3,000+ Günlük</span>
              </motion.div>
              
              {/* Sağ Alt Köşe - Taşan Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 z-30 bg-white/70 backdrop-blur-md rounded-2xl px-5 py-3 shadow-xl border border-white/20 flex items-center gap-2"
              >
                <Star className="w-5 h-5 text-emerald-500" />
                <span className="font-semibold text-[#1A365D] text-sm whitespace-nowrap">%100 Kalite</span>
              </motion.div>
              
              {/* Sol Alt Köşe - Taşan Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 z-30 bg-white/70 backdrop-blur-md rounded-2xl px-5 py-3 shadow-xl border border-white/20 flex items-center gap-2"
              >
                <Award className="w-5 h-5 text-purple-500" />
                <span className="font-semibold text-[#1A365D] text-sm whitespace-nowrap">İstanbul Merkezli</span>
              </motion.div>
              
              <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
                <div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-block mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-semibold text-white"
                  >
                    <Sparkles className="w-4 h-4 inline-block mr-2" />
                    25 Yıllık Güvenilir Partner
                  </motion.div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight text-white drop-shadow-lg">
                    Atkigetir: Kaliteyi Dokuyoruz
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                    25 yıllık deneyimimizle atkı, bere ve forma üretiminde uzmanlaşmış, 
                    İstanbul merkezli üretim tesislerimizde kaliteli ve özel tasarım ürünler sunuyoruz.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Stats Section - Bento Grid (Asimetrik) */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  // Asimetrik boyutlar: İlk ve son kartlar daha büyük
                  const isLarge = index === 0 || index === stats.length - 1;
                  const isGradient = index === 1 || index === 2; // Ortadaki iki kart gradient
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className={`${isLarge ? 'md:col-span-2' : ''} ${isGradient ? 'bg-gradient-to-br from-blue-900 to-indigo-800 text-white' : 'bg-white/80 backdrop-blur-md'} rounded-[2.5rem] shadow-2xl shadow-blue-500/5 border border-gray-100/50 p-6 md:p-8 text-center transition-all duration-300`}
                    >
                      <div className={`w-16 h-16 rounded-xl ${isGradient ? 'bg-white/20' : `bg-gradient-to-br ${stat.gradient}`} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                        <IconComponent className={`w-8 h-8 ${isGradient ? 'text-white' : 'text-white'}`} />
                      </div>
                      <div className={`text-4xl md:text-5xl font-bold mb-2 tracking-tighter ${isGradient ? 'text-white' : `bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}`}>{stat.value}</div>
                      <div className={`text-sm ${isGradient ? 'text-white/90' : 'text-slate-700'} font-semibold`}>{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Trust Section - Bento Grid (Asimetrik) */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#1A365D] mb-4 tracking-tighter">
                  Neden Bizi Tercih Ediyorlar?
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
                  Sektördeki deneyimimiz ve kaliteli üretim anlayışımızla müşterilerimize en iyi hizmeti sunuyoruz.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                {trustItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const isLarge = index === 0; // İlk kart büyük
                  const isGradient = index === 1; // İkinci kart gradient
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ y: -4 }}
                      className={`${isLarge ? 'md:col-span-2' : ''} ${isGradient ? 'bg-gradient-to-br from-blue-900 to-indigo-800 text-white' : 'bg-white/80 backdrop-blur-md'} rounded-[2.5rem] shadow-2xl shadow-blue-500/5 border border-gray-100/50 p-6 md:p-8 text-center transition-all duration-300`}
                    >
                      <div className={`w-16 h-16 rounded-xl ${isGradient ? 'bg-white/20' : 'bg-gradient-to-br from-slate-50 to-slate-100'} flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className={`w-8 h-8 ${isGradient ? 'text-white' : 'text-[#1A365D]'}`} />
                      </div>
                      <span className={`inline-block mb-3 px-3 py-1.5 rounded-full text-xs font-semibold ${isGradient ? 'bg-white/20 text-white' : `text-white bg-gradient-to-r ${item.badgeColor}`}`}>
                        {item.badge}
                      </span>
                      <h3 className={`text-xl font-bold mb-3 tracking-tight ${isGradient ? 'text-white' : 'text-[#1A365D]'}`}>{item.title}</h3>
                      <p className={`text-sm leading-relaxed ${isGradient ? 'text-white/90' : 'text-slate-600'}`}>{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Üretim Aşamalarımız - Grid Yapısı */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-12"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#0F172A] mb-4 tracking-tight">
                  Üretim Aşamalarımız
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                  Her ürünümüz titizlikle kontrol edilen aşamalardan geçer
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: '01',
                    title: 'Tasarım & Planlama',
                    description: 'Müşteri ihtiyaçlarına göre özel tasarım ve üretim planlaması',
                    icon: Factory,
                    gradient: 'from-blue-500 to-cyan-500'
                  },
                  {
                    step: '02',
                    title: 'Malzeme Seçimi',
                    description: 'Yüksek kaliteli iplik ve kumaş seçimi',
                    icon: Award,
                    gradient: 'from-emerald-500 to-teal-500'
                  },
                  {
                    step: '03',
                    title: 'Üretim',
                    description: 'Modern makinelerle hassas üretim süreci',
                    icon: Factory,
                    gradient: 'from-purple-500 to-pink-500'
                  },
                  {
                    step: '04',
                    title: 'Kalite Kontrol',
                    description: 'Her ürün titizlikle kontrol edilir ve paketlenir',
                    icon: CheckCircle2,
                    gradient: 'from-orange-500 to-red-500'
                  }
                ].map((stage, index) => {
                  const IconComponent = stage.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-6 text-center"
                    >
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stage.gradient} flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-slate-400 mb-2">{stage.step}</div>
                      <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{stage.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{stage.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Referanslarımız - Logo Slider */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-12"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#0F172A] mb-4 tracking-tight">
                  Referanslarımız
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                  Bugüne kadar çalıştığımız güvenilir markalar
                </p>
              </div>
              
              <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      whileHover={{ scale: 1.1, opacity: 1 }}
                      className="w-24 h-24 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 font-semibold text-sm"
                    >
                      Logo {i}
                    </motion.div>
                  ))}
                </div>
                <p className="text-center text-xs text-slate-400 mt-6">
                  * Referans logoları eklenecek
                </p>
              </div>
            </motion.section>

            {/* Advantages Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-[#0F172A] text-center mb-8 tracking-tighter">
                Avantajlarımız
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {advantages.map((adv, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className="flex items-center bg-white rounded-xl px-5 py-4 shadow-sm border border-slate-200"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                      <span className="text-[#0F172A] font-medium text-sm">{adv}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ y: -4 }}
                  className="bg-gradient-to-br from-[#2563EB] to-[#1e40af] rounded-[24px] shadow-md p-7 text-white"
                >
                  <div className="flex items-center mb-3">
                    <MapPin className="w-6 h-6 mr-2" />
                    <span className="font-bold text-lg">İstanbul Merkezli Üretim</span>
                  </div>
                  <p className="text-white/90 mb-4 text-sm leading-relaxed">
                    Modern tesislerimizde son teknoloji makinelerle üretim yapıyoruz. Kalite kontrol süreçlerimiz sayesinde her ürünümüz en yüksek standartlarda üretilir.
                  </p>
                  <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>Sürekli Gelişim ve İnovasyon</span>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* Üretim Gücümüz Section - Yeni */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-12"
            >
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Sol: Üretim Görseli */}
                  <div className="lg:w-1/2 h-64 lg:h-auto bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/bannergörsel3.jpg')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  
                  {/* Sağ: Metinler */}
                  <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-6 tracking-tight">
                      Üretim Gücümüz
                    </h2>
                    
                    <div className="space-y-6">
                      {/* Yüksek Kapasite */}
                      <div>
                        <h3 className="text-xl font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1e40af] flex items-center justify-center">
                            <Factory className="w-4 h-4 text-white" />
                          </div>
                          Yüksek Kapasite
                        </h3>
                        <p className="text-slate-600 leading-relaxed ml-10">
                          Günlük 3.000+ ürün üretim kapasitemizle büyük siparişleri hızlı ve kaliteli şekilde teslim ediyoruz.
                        </p>
                      </div>
                      
                      {/* Hızlı Teslimat */}
                      <div>
                        <h3 className="text-xl font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                          </div>
                          Hızlı Teslimat
                        </h3>
                        <p className="text-slate-600 leading-relaxed ml-10">
                          Modern tesislerimizde hızlı üretim süreçleri sayesinde siparişlerinizi en kısa sürede kapınıza getiriyoruz.
                        </p>
                      </div>
                      
                      {/* Sıfır Hata */}
                      <div>
                        <h3 className="text-xl font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
                            <Award className="w-4 h-4 text-white" />
                          </div>
                          Sıfır Hata
                        </h3>
                        <p className="text-slate-600 leading-relaxed ml-10">
                          Her aşamada titizlikle kontrol edilen üretim sürecimiz sayesinde kaliteli ve hatasız ürünler sunuyoruz.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* About Content - Üretim Görseli ile */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mb-12"
            >
              <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden">
                {/* Atölye/Üretim Görseli - Üstte */}
                <div className="h-64 md:h-80 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/images/bannergörsel4.jpg')] bg-cover bg-center" />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                
                {/* Hikaye Metni */}
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6 text-center tracking-tight">
                    Atkigetir Hikayesi
                  </h2>
                  <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-[#0F172A]">Atkigetir</strong>, 25 yıllık deneyimiyle atkı, bere ve forma üretiminde uzmanlaşmış bir firmadır. İstanbul'daki tesislerimizde, yüksek kaliteli <strong className="text-[#0F172A]">dokuma ve saten atkılar</strong> üreterek sektörde fark yaratıyoruz. Kişiye özel tasarım ve imalat hizmetlerimiz sayesinde müşterilerimizin taleplerine uygun, tamamen özelleştirilmiş ürünler sunuyoruz.
                </p>
                <p>
                  Üretim sürecimizin her aşamasında <strong className="text-[#0F172A]">kaliteye ve yeniliğe</strong> önem veriyor, günlük 3.000'den fazla ürün kapasitemizle hızlı ve güvenilir çözümler sağlıyoruz. <strong className="text-[#0F172A]">Müşteri memnuniyeti</strong>, bizim için her zaman en büyük önceliktir.
                </p>
                <p>
                  <strong className="text-[#0F172A]">İstanbul merkezli fabrikamızda</strong> modern teknoloji ve deneyimli ekibimizle, toptan atkı siparişlerinden kişiye özel tasarımlara kadar geniş bir yelpazede hizmet veriyoruz. Çevre dostu üretim anlayışımız ve sürdürülebilir iş modelimizle gelecek nesillere daha iyi bir dünya bırakmayı hedefliyoruz.
                </p>
              </div>
                </div>
              </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-gradient-to-r from-[#2563EB] to-[#1e40af] rounded-[24px] p-8 text-center text-white"
            >
              <h2 className="text-2xl font-bold mb-4 tracking-tighter">
                Projeleriniz İçin Bizimle İletişime Geçin
              </h2>
              <p className="text-lg text-white/90 mb-6 leading-relaxed">
                25 yıllık deneyimimizle sizin de projelerinizde yer almak istiyoruz. Özel üretim talepleriniz için hemen iletişime geçin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:05337498266"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#2563EB] font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <span>Hemen Ara</span>
                </motion.a>
                <motion.a
                  href="https://wa.me/905337498266?text=Merhabalar%20Kerim%20Bey%20Sipariş%20Vermek%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 transition-all group"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp ile Yaz</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.a>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 transition-all"
                  >
                    <Mail className="w-5 h-5" />
                    <span>E-posta Gönder</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </>
  );
}
