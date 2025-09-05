import { Zap, Heart, Shield, Globe } from "lucide-react";

export default function StatsSection() {
  return (
    <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center justify-center">
          <div>
            <div className="flex justify-center mb-3">
              <span className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500">
                <Zap className="w-7 h-7 text-white" />
              </span>
            </div>
            <div className="text-2xl font-bold text-white">3,000+</div>
            <div className="text-sm text-gray-200 mt-1">Günlük Üretim</div>
          </div>

          <div>
            <div className="flex justify-center mb-3">
              <span className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-pink-500">
                <Heart className="w-7 h-7 text-white" />
              </span>
            </div>
            <div className="text-2xl font-bold text-white">25</div>
            <div className="text-sm text-gray-200 mt-1">Yıllık Deneyim</div>
          </div>

          <div>
            <div className="flex justify-center mb-3">
              <span className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-400 to-blue-400">
                <Shield className="w-7 h-7 text-white" />
              </span>
            </div>
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-sm text-gray-200 mt-1">Kalite Garantisi</div>
          </div>

          <div>
            <div className="flex justify-center mb-3">
              <span className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-400">
                <Globe className="w-7 h-7 text-white" />
              </span>
            </div>
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-sm text-gray-200 mt-1">Mutlu Müşteri</div>
          </div>
        </div>
      </div>
    </section>
  );
}
