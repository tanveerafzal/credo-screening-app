export function StatsBar() {
  const stats = [
    { value: '1.2M+', label: 'Entities Screened Against' },
    { value: '80+', label: 'Global Data Sources' },
    { value: '<3s', label: 'Average Response Time' },
    { value: '99.9%', label: 'Uptime SLA' },
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
