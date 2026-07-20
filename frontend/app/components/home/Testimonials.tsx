export default function Testimonials() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-4xl font-bold mb-12">
          What Our Guests Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="shadow-lg rounded-xl p-8">
            ⭐⭐⭐⭐⭐
            <p className="mt-4">
              Amazing experience. Everything was perfect.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-8">
            ⭐⭐⭐⭐⭐
            <p className="mt-4">
              Easy booking and excellent customer service.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-8">
            ⭐⭐⭐⭐⭐
            <p className="mt-4">
              Will definitely book again.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}