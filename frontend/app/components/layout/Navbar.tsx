export default function Navbar() {
  return (
    <header className="w-full bg-white shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        <div>
          <h1 className="text-3xl font-bold text-sky-700">
            Experience Cancun
          </h1>

          <p className="text-gray-500 text-sm">
            Your Dream Vacation Starts Here
          </p>
        </div>

        <nav className="flex gap-8 font-medium">
          <a href="#">Home</a>
          <a href="#">Car Rentals</a>
          <a href="#">Vacation Rentals</a>
          <a href="#">Tours</a>
          <a href="#">Contact</a>
        </nav>

        <button className="bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700">
          Book Now
        </button>

      </div>
    </header>
  );
}