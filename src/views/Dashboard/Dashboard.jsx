import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Users, User, Users2, Shield } from "lucide-react";
import DataTable from "../../components/ui/table/DataTable";
import { dashboardData } from "../../tables/dashboardData";
import { dashboardColumns } from "../../tables/dashboardColumns";

const Dashboard = () => {
  const navigate = useNavigate();

  const data = useMemo(() => dashboardData, []);
  const columns = useMemo(() => dashboardColumns, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/HomePage")}
            className="group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-slate-100 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 text-slate-700 font-semibold max-w-max"
          >
            <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">Back to Home</span>
          </button>

          <div className="text-center flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 bg-clip-text text-transparent leading-tight">
              User Directory
            </h1>
            <p className="text-lg text-slate-600 mt-2">Manage all system users</p>
          </div>

          <button
            onClick={() => navigate("/addUser")}
            className="group flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
          >
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Add User
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl border border-slate-100 hover:border-indigo-200 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center h-full">
            <Users className="w-16 h-16 text-indigo-500 mb-4 group-hover:scale-110 transition-transform" />
            <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{data.length}</div>
            <div className="text-slate-600 font-semibold">Total Users</div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl border border-slate-100 hover:border-emerald-200 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center h-full">
            <Shield className="w-16 h-16 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
            <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              {data.filter(u => u.role === "Admin").length}
            </div>
            <div className="text-slate-600 font-semibold">Admins</div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl border border-slate-100 hover:border-amber-200 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center h-full">
            <Users2 className="w-16 h-16 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
            <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              {data.filter(u => u.role === "Editor" || u.role === "User").length}
            </div>
            <div className="text-slate-600 font-semibold">Team Members</div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-100 p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                All Users ({data.length})
              </h2>
              <p className="text-lg text-slate-600">View and manage user accounts</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium flex-wrap">
              <span>Quick Actions:</span>
              <span className="px-3 py-1 bg-slate-100 rounded-xl text-slate-700 hover:bg-slate-200 transition-colors">Edit</span>
              <span className="px-3 py-1 bg-slate-100 rounded-xl text-slate-700 hover:bg-slate-200 transition-colors">Delete</span>
              <span className="px-3 py-1 bg-indigo-100 rounded-xl text-indigo-700 font-semibold hover:bg-indigo-200 transition-colors">Export</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <DataTable
              data={data}
              columns={columns}
              showFooter={false}
              enablePagination={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
