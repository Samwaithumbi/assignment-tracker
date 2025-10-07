const StatsAssignment = () => {
    const stats = [
      {
        title: "Total",
        value: 120,
      },
      {
        title: "Completed",
        value: 95,
      },
      {
        title: "In Progress",
        value: 120,
      },
      {
        title: "Not started",
        value: 95,
      },
    ];
  
    return (
      <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white text-center p-4 rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{stat.title}</h2>
            <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default StatsAssignment;
  