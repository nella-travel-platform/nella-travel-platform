export default function Services() {
  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-4xl font-bold mb-12">
        Popular Experiences
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">

        <div className="rounded-xl shadow-lg p-8 border">
          <div className="text-6xl mb-4">🚗</div>
          <h3 className="text-2xl font-bold">Car Rentals</h3>
        </div>

        <div className="rounded-xl shadow-lg p-8 border">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-2xl font-bold">Vacation Rentals</h3>
        </div>

        <div className="rounded-xl shadow-lg p-8 border">
          <div className="text-6xl mb-4">🏝️</div>
          <h3 className="text-2xl font-bold">Tours</h3>
        </div>

        <div className="rounded-xl shadow-lg p-8 border">
          <div className="text-6xl mb-4">✈️</div>
          <h3 className="text-2xl font-bold">Airport Transfers</h3>
        </div>

      </div>
    </section>
  );
}