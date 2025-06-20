import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useDashboardStats } from '../hooks/useDashboardStats';

const COLORS = ['#6366F1', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'];

export default function AdminDashboard() {
  const { data, loading } = useDashboardStats();

  if (loading || !data) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Loading dashboard...
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SummaryCard
          label="Total Conversations"
          value={data.totalConversations}
        />
        <SummaryCard
          label="Avg. Session Length"
          value={data.averageSessionLength}
        />
      </div>

      {/* Most Common Questions - Bar Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">
          Most Common Questions Answered
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.mostCommonQuestions}>
            <XAxis dataKey="question" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Drop-Off Points - Pie Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Top Drop-Off Points</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.dropOffPoints}
              dataKey="dropCount"
              nameKey="step"
              outerRadius={100}
              label
            >
              {data.dropOffPoints.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}
