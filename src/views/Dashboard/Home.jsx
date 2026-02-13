import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { FiUsers, FiShield, FiEdit, FiUser, FiArrowRight } from "react-icons/fi";
import { dashboardData } from "../../tables/dashboardData";

const HomePage = () => {
  const navigate = useNavigate();

  const totalUsers = dashboardData.length;
  const adminCount = dashboardData.filter(u => u.role === "Admin").length;
  const editorCount = dashboardData.filter(u => u.role === "Editor").length;
  const userCount = dashboardData.filter(u => u.role === "User").length;

  const stats = [
    { title: "Total Users", value: totalUsers, icon: FiUsers, color: "indigo" },
    { title: "Admins", value: adminCount, icon: FiShield, color: "purple" },
    { title: "Editors", value: editorCount, icon: FiEdit, color: "indigo" },
    { title: "Users", value: userCount, icon: FiUser, color: "slate" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent leading-tight">
              Dashboard
            </h1>
            <p className="text-xl text-slate-500 mt-2 font-medium">
              Welcome back! Here's what's happening with your system.
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-slate-100 hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1 text-slate-700 font-semibold hover:text-indigo-700"
            title="Logout"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Logout</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={<stat.icon />}
              color={stat.color}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Action Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 p-8 lg:p-12 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
                User Management
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                View, edit, and manage all system users with complete control over roles and permissions.
              </p>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="group flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
            >
              <span>View Users</span>
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, delay = 0 }) => {
  return (
    <div
      className="group bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl border border-slate-100 hover:border-indigo-200 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div className={`p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 shadow-md group-hover:scale-110 transition-all duration-500 mb-6`}>
        <div className={`p-3 bg-white/60 rounded-lg shadow-sm backdrop-blur-sm w-14 h-14 flex items-center justify-center`}>
          <div className={`text-${color}-600 text-xl group-hover:scale-110 transition-all duration-300`}>
            {icon}
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3 opacity-90">
          {title}
        </p>
        <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default HomePage;
