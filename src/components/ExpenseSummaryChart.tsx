import { useBudget } from '@/hooks/useBudget';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function ExpenseSummaryChart() {
  const { state } = useBudget();

  const data = state.items.reduce(
    (acc, item) => {
      const existingCategory = acc.find((c) => c.name === item.category);
      if (existingCategory) {
        existingCategory.value += item.amount;
      } else {
        acc.push({ name: item.category, value: item.amount });
      }
      return acc;
    },
    [] as { name: string; value: number }[]
  );

  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={200}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }>
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
        {/* <Legend layout="vertical" align="right" verticalAlign="middle" /> */}
      </PieChart>
    </ResponsiveContainer>
  );
}
