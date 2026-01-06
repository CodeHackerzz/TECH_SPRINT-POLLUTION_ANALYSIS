import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function GovernmentLogin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-950 to-black">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 w-[420px] shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-white mb-2">
          Government Access
        </h2>

        <p className="text-slate-400 mb-8">
          Secure command center login
        </p>

        {}
        <input
          type="text"
          placeholder="Government Email"
          className="w-full mb-5 px-4 py-3 rounded-xl 
                     bg-slate-900 text-white placeholder-slate-400
                     border border-slate-700
                     focus:outline-none focus:border-emerald-500 
                     focus:shadow-[0_0_15px_#10b981]"
        />

        {}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-8 px-4 py-3 rounded-xl 
                     bg-slate-900 text-white placeholder-slate-400
                     border border-slate-700
                     focus:outline-none focus:border-emerald-500 
                     focus:shadow-[0_0_15px_#10b981]"
        />

        <button
          onClick={() => navigate("/gov-dashboard")}
          className="w-full py-4 rounded-2xl bg-emerald-500 text-black font-semibold text-lg
                     hover:scale-105 hover:shadow-[0_0_25px_#10b981] transition-all"
        >
          Login
        </button>
      </motion.div>
    </div>
  );
}
